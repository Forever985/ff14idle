"""
一键发布到 GitHub Pages。

为什么要有它：
  你（人）要的是"双击一下就更新"，而不是记一串命令。所以本脚本把
  「查环境 → 构建 → 自检 → 把源码推到 main → 把产物推到 gh-pages」串成一条线，
  最后把可点的网址打出来。

为什么用 Python 而不是 .bat / .ps1：
  Windows 上 .bat 和 BOM-less 的 .ps1 都会按 GBK 解释非 ASCII 字节，
  中文提示会变成乱码甚至把脚本解析坏（这个坑项目里已经踩过一次，
  见 app/README.md 第七节）。Python 源文件是 UTF-8，控制台切到 UTF-8 即可。

发布模型（刻意选得最"抗造"的一种）：
  · main 分支      = 源码（以后想改内容、换电脑都能继续）
  · gh-pages 分支  = 构建产物（GitHub Pages 就发布这个分支的根目录）
  产物是用一个**临时仓库**推上去的，不碰 main 的历史，也不需要任何 CI。
  每次发布是 `push -f`，所以 gh-pages 的历史只有一条提交，不会越滚越大。

用法：
    双击 ff14-idle/一键发布.bat
    python tools/deploy.py                # 正常发布
    python tools/deploy.py --bump patch   # 先升版本号再发布
    python tools/deploy.py --dry-run      # 只构建 + 自检，不推送
    python tools/deploy.py --skip-source  # 只发产物，不动 main
"""
from __future__ import annotations

import argparse
import ctypes
import json
import os
import re
import shutil
import stat
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))
from artifact_check import blocking_refs  # noqa: E402

APP = Path(__file__).resolve().parent.parent      # .../ff14-idle/app
REPO = APP.parent                                  # .../ff14-idle
PUBLISH_BRANCH = "gh-pages"                        # Pages 发布的分支
SOURCE_BRANCH = "main"
SINGLE_NAME = "ff14-idle-single.html"              # 发布出去的"双击即玩"单文件
CONFIG = REPO / ".deploy.json"                     # 记住仓库地址，别每次重新输

EXCLUDE_DIRS = {
    "node_modules", ".git", "dist", "dist-single", "__pycache__", ".pytest_cache",
}


# --------------------------------------------------------------------------- #
# 控制台：中文要能正常显示
# --------------------------------------------------------------------------- #
def setup_console() -> None:
    try:
        ctypes.windll.kernel32.SetConsoleOutputCP(65001)
        ctypes.windll.kernel32.SetConsoleCP(65001)
    except Exception:
        pass
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
        except Exception:
            pass


def say(msg: str = "") -> None:
    print(msg, flush=True)


def step(n: str, msg: str) -> None:
    say(f"\n=== {n} {msg} " + "=" * max(0, 46 - len(msg)))


def die(msg: str) -> None:
    say(f"\n❌ {msg}")
    say("\n窗口先别关，把上面的信息看一眼；修好再双击一次即可。")
    sys.exit(1)


# --------------------------------------------------------------------------- #
# 环境
# --------------------------------------------------------------------------- #
def find_node_dir() -> str | None:
    """node 常常不在 PATH 上（本机就是靠 nvm 装的），所以主动去找一圈。"""
    if shutil.which("node") and shutil.which("npm"):
        return os.path.dirname(shutil.which("node") or "")
    roots = [
        Path(os.environ.get("LOCALAPPDATA", "")) / "nvm",
        Path(os.environ.get("ProgramFiles", "C:/Program Files")) / "nodejs",
        Path("C:/nvm4w/nodejs"),
    ]
    candidates: list[Path] = []
    for root in roots:
        if not root.exists():
            continue
        if (root / "node.exe").exists():
            candidates.append(root)
        for child in sorted(root.glob("v*")):
            if (child / "node.exe").exists():
                candidates.append(child)
    if not candidates:
        return None
    # nvm 目录下可能并存多个版本，挑版本号最大的那个
    def ver(p: Path) -> tuple:
        m = re.match(r"v(\d+)\.(\d+)\.(\d+)", p.name)
        return tuple(int(x) for x in m.groups()) if m else (0, 0, 0)

    return str(max(candidates, key=ver))


def run(cmd: list[str], cwd: Path, env: dict, capture: bool = False) -> str:
    proc = subprocess.run(
        cmd, cwd=str(cwd), env=env,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.STDOUT if capture else None,
        text=True, encoding="utf-8", errors="replace",
    )
    if proc.returncode != 0:
        if capture and proc.stdout:
            say(proc.stdout.strip())
        die(f"命令失败（退出码 {proc.returncode}）：{' '.join(cmd)}")
    return proc.stdout or ""


def run_soft(cmd: list[str], cwd: Path, env: dict) -> tuple[int, str]:
    """和 run() 一样，但**失败不退出**，把退出码和输出交回来自己判断。"""
    proc = subprocess.run(
        cmd, cwd=str(cwd), env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True, encoding="utf-8", errors="replace",
    )
    return proc.returncode, proc.stdout or ""


def git(args: list[str], cwd: Path, env: dict, capture: bool = False) -> str:
    """所有 git 调用都走这里，统一带上几个 `-c`（理由见下面 commit_source 的注释）。

    1) `safe.directory=*`
       Windows 上如果仓库目录的属主和当前用户不一致（比如目录是用管理员身份
       创建的），git 会直接以 `detected dubious ownership` 拒绝执行。
       带上它只对**这一次调用**生效，不去改用户全局的 git 配置。

    2) `core.fsync=all` + `pack.threads=1`
       本机实测到的偶发问题：`git add` 写进去的松散对象**会写坏**
       （`git fsck` 报 `inflate: data stream error` / `corrupt loose object`），
       症状是 `git commit` 打印了成功、紧接着以退出码 128 失败。
       实测 4 次里：带 fsync 2/2 干净，不带 1/2 干净 —— 也就是说
       fsync 能减少但**不能消除**，所以真正靠得住的是 commit_source() 里的
       "提交后校验 + 损坏就重建"。

    3) `core.autocrlf=false`
       只是为了让输出干净：默认设置会为每个 LF 文件打一行
       "LF will be replaced by CRLF" 警告，一百多行警告会把真正的报错淹掉。
    """
    return run(["git", *GIT_FLAGS, *args], cwd, env, capture)


GIT_FLAGS = [
    "-c", "safe.directory=*",
    "-c", "core.fsync=all",
    "-c", "pack.threads=1",
    "-c", "core.autocrlf=false",
]


def run_git(cwd: Path, env: dict, args: list[str]) -> tuple[int, str]:
    """不抛异常的 git（用 retry / 校验的地方）"""
    return run_soft(["git", *GIT_FLAGS, *args], cwd, env)


def repo_is_sound(cwd: Path, env: dict) -> bool:
    """git fsck 能不能干净读完整个对象库"""
    code, out = run_git(cwd, env, ["fsck", "--no-progress", "--no-dangling"])
    bad = code != 0 or any(k in out for k in ("corrupt", "fatal", "error:"))
    if bad:
        tail = "\n".join(line for line in out.splitlines() if "error" in line or "fatal" in line)
        say("    " + (tail.strip() or out.strip())[:400].replace("\n", "\n    "))
    return not bad


def resolve_author(env: dict) -> tuple[str, str]:
    """提交署名：优先用这台机器上已经配好的 git 身份。

    为什么不写死一个名字：提交记录里挂着谁，是用户自己的事。
    这台机器上 `git config --global user.name` 已经有值，直接沿用即可；
    没配过就退回占位名，并提示一句怎么设。
    """
    name = (run_soft(["git", "config", "--get", "user.name"], REPO, env)[1] or "").strip()
    mail = (run_soft(["git", "config", "--get", "user.email"], REPO, env)[1] or "").strip()
    if name and mail:
        return name, mail
    if not name and not mail:
        say("  （没找到 git 身份，本次提交用占位名；想换成你自己的：")
        say("    git config --global user.name \"你的名字\"")
        say("    git config --global user.email \"你的邮箱\" ）")
    return name or "ff14-idle", mail or "ff14-idle@local"


def wipe_git(path: Path) -> None:
    """彻底删掉 .git —— 而且必须**确认它真的没了**。

    这里踩过一次坑：`.git` 里有只读文件（Windows 上 git 会给部分文件加只读属性），
    直接 `shutil.rmtree` 会中途失败，留下一个"半死不活的 .git 目录"。
    之后每条 git 命令都报 `not a git repository`，而 `if not .git.exists()` 又因为
    目录还在而跳过了重新 init —— 结果重试三次全是同一个错，看起来像"修不好"。

    所以：先清只读属性再删；删不掉就改名挪走（改名比删除更容易成功）。
    """
    git_dir = path / ".git"
    if not git_dir.exists():
        return

    def force(func, target, _exc):
        try:
            os.chmod(target, stat.S_IWRITE)
            func(target)
        except Exception:
            pass

    shutil.rmtree(git_dir, onerror=force)
    if git_dir.exists():
        moved = path / f".git.corrupt-{int(time.time())}"
        try:
            git_dir.rename(moved)
            say(f"  （旧的 .git 删不掉，已改名为 {moved.name}，确认无用后可手动删除）")
        except Exception as exc:
            die(f"无法清掉损坏的 {git_dir}：{exc}")
    if git_dir.exists():
        die(f"{git_dir} 仍然存在，请手动删除后重试。")


def sync_with_remote(env: dict, remote: str) -> None:
    """把远端 main 接成我们这次提交的**父提交**，避免历史分叉。

    为什么必须做：本机的 git 偶尔会把对象写坏，修法是"删掉 .git 重新提交"。
    但重建之后本地是一个**全新的根提交**，而远端 main 上已经有上一次的提交 ——
    两者没有共同祖先，推送就会被拒（non-fast-forward）。
    症状是"第一次发布成功、第二次怎么说都不让推"，非常莫名其妙。

    所以每次提交之前先 fetch 一次：如果远端那条提交还不在本地历史里，
    就把本地分支指到它，然后在其之上提交。这样推送永远是快进，
    而且**不会丢掉远端已有的历史**（比上来就 --force 安全得多）。
    """
    code, out = run_git(REPO, env, ["fetch", remote, SOURCE_BRANCH])
    if code != 0:
        # 远端还没有这个分支（首次发布）或者网络不通 —— 都不是错误，继续即可
        first = any(k in out for k in ("couldn't find remote ref", "not found", "does not exist"))
        if not first:
            say("  （连不上远端，跳过历史同步；如果推送被拒会提示）")
        return
    ancestor, _ = run_git(REPO, env, ["merge-base", "--is-ancestor", "FETCH_HEAD", "HEAD"])
    if ancestor == 0:
        return  # 远端提交已经在本地历史里，无需处理
    say("  远端 main 上有本地没有的提交，先把它接上（避免推送被拒）…")
    run_git(REPO, env, ["update-ref", f"refs/heads/{SOURCE_BRANCH}", "FETCH_HEAD"])


def commit_source(env: dict, remote: str, attempts: int = 3) -> None:
    """把源码提交到本地仓库；**提交后必须校验**，坏了就重建。

    为什么要重建而不是修：源码的每一个字节都在工作区里，`.git` 只是派生数据。
    所以"删掉 .git 重来一遍"是最简单、也最不可能留下隐患的修法。
    """
    author, mail = resolve_author(env)
    say(f"  提交署名：{author} <{mail}>")
    for attempt in range(1, attempts + 1):
        if attempt > 1:
            wipe_git(REPO)
        if not (REPO / ".git").exists():
            git(["init", "-b", SOURCE_BRANCH], REPO, env)
        # 先接上远端历史，再在其之上提交（重建过的仓库尤其需要）
        sync_with_remote(env, remote)
        # 这几步都可能因为对象写坏而失败，所以用 run_git 拿退出码，自己决定要不要重来
        run_git(REPO, env, ["add", "-A"])
        staged = run_git(REPO, env, ["diff", "--cached", "--name-only"])[1].strip()
        if staged:
            count = len(staged.splitlines())
            code, out = run_git(
                REPO, env,
                ["-c", f"user.name={author}", "-c", f"user.email={mail}",
                 "commit", "-m", f"更新源码（{count} 个文件）"],
            )
            if code == 0:
                say(f"  已提交 {count} 个文件")
            else:
                say(f"  提交失败（退出码 {code}）：")
                say("    " + "\n    ".join(out.strip().splitlines()[-3:]))
        else:
            say("  源码没有变化，跳过提交")

        if repo_is_sound(REPO, env):
            return
        say(f"  ⚠️ 本地 git 对象库损坏（第 {attempt}/{attempts} 次；本机已知的偶发问题），重建后重试…")
    die("连续多次写坏本地 git 对象库。这不是你的操作问题——"
        "可以先重跑一次；若持续出现，检查磁盘/杀毒软件的实时扫描。")


def git_push(cwd: Path, env: dict, remote: str, refspec: str, expect_sha: str = "",
             attempts: int = 3, force: bool = False) -> None:
    """推送并**验证远端真的收到了**。

    为什么要重试 + 校验：实测遇到过一次推送假成功/半途损坏
    （远端 index-pack 报 inflate 错误），重推即好。一键发布的脚本不能有
    "偶发失败"，所以这里失败就重试，推完再用 ls-remote 核对提交号。

    `force=True` 只给 gh-pages 用：那个分支每次都是"从零重建 + 一条提交"，
    和远端已有的那条提交之间**没有共同祖先**，永远不可能快进。
    （这个 `-f` 曾在重构时被我漏掉，症状是"第一次发布成功，第二次怎么都推不上去、
    报 non-fast-forward"——排查时特别容易怀疑到权限或网络上去。）
    """
    cmd = ["git", *GIT_FLAGS, "push"]
    if force:
        cmd.append("-f")
    cmd += [remote, refspec]
    for attempt in range(1, attempts + 1):
        code, out = run_soft(cmd, cwd, env)
        if code == 0:
            break
        say(f"  推送失败（第 {attempt}/{attempts} 次），重试…")
        tail = "\n".join(out.strip().splitlines()[-4:])
        if tail:
            say("    " + tail.replace("\n", "\n    "))
        rejected = "non-fast-forward" in out or "fetch first" in out or "rejected" in out
        if rejected and not force and attempt == attempts:
            die("远端分支上有你本地没有的提交（多半是在网页上直接改过文件）。\n"
                "    为了不覆盖你的改动，脚本不会强行推送。两个选择：\n"
                "      1) 先把远端的改动拉到本地： git pull --rebase\n"
                "      2) 如果远端那些改动你不要了： git push -f origin main")
        if attempt == attempts:
            die(f"推送连续失败 {attempts} 次，请检查网络与仓库权限。")
        time.sleep(2)
    if expect_sha:
        code, out = run_soft(
            ["git", "-c", "safe.directory=*", "ls-remote", remote, refspec.split(":")[-1]],
            cwd, env,
        )
        got = out.strip().split()[0][:12] if code == 0 and out.strip() else ""
        if got != expect_sha[:12]:
            die(f"推送后核对失败：远端是 {got or '（读不到）'}，本地是 {expect_sha[:12]}。"
                f"可能是网络中断，再双击一次即可。")
        say(f"  已核对远端提交号 {got}")


# --------------------------------------------------------------------------- #
# 版本号
# --------------------------------------------------------------------------- #
def read_json(path: Path, default: Any = None) -> Any:
    """读 JSON，容忍 Windows 记事本写出来的 BOM。

    这个坑是真踩过的：PowerShell 的 `Set-Content -Encoding utf8`（5.1）和记事本
    默认都会在文件开头写 BOM，而 `json.loads` 遇到 BOM 直接抛异常 ——
    于是"我明明填了仓库地址，脚本还是每次都问我一遍"。
    """
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except FileNotFoundError:
        return default
    except Exception:
        return default


def bump_version(kind: str) -> str:
    pkg_path = APP / "package.json"
    pkg = read_json(pkg_path, {})
    major, minor, patch = (int(x) for x in pkg["version"].split("."))
    if kind == "major":
        major, minor, patch = major + 1, 0, 0
    elif kind == "minor":
        minor, patch = minor + 1, 0
    else:
        patch += 1
    new = f"{major}.{minor}.{patch}"
    pkg["version"] = new
    pkg_path.write_text(json.dumps(pkg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return new


# --------------------------------------------------------------------------- #
# 自检：产物是不是真的能独立跑
# --------------------------------------------------------------------------- #
def check_artifacts() -> str:
    dist = APP / "dist"
    index = dist / "index.html"
    single_src = APP / "dist-single" / "index.html"
    if not index.exists():
        die("dist/index.html 不存在，构建没成功")
    if not single_src.exists():
        die("dist-single/index.html 不存在，单文件构建没成功")

    # 1) 单文件必须是"真的单文件"：没有任何**会阻断加载**的外部引用。
    #    判定规则统一在 artifact_check.py 里（只认 script src / link stylesheet，
    #    并且会跳过内联 JS 里的模板字符串），别在这里另写一份正则 —— 已经写错过一次。
    html = single_src.read_text(encoding="utf-8", errors="replace")
    blocking = blocking_refs(html)
    if blocking:
        die(f"单文件版里还有外部 JS/CSS 引用，file:// 下会打不开：{blocking[:3]}")

    # 2) 多文件版引用的资源必须都在
    index_html = index.read_text(encoding="utf-8", errors="replace")
    missing = []
    for ref in re.findall(r'(?:src|href)="(?!data:|#|https?:)([^"]+)"', index_html):
        target = (dist / ref.lstrip("./")).resolve()
        if not target.exists():
            missing.append(ref)
    if missing:
        die(f"dist 里缺少被引用的文件：{missing}")

    # 3) version.json 要被写出来（页面靠它发现新版本）
    vj = dist / "version.json"
    if not vj.exists():
        die("没有生成 version.json，页面无法发现新版本")
    info = json.loads(vj.read_text(encoding="utf-8"))
    say(f"  产物自检通过：dist/index.html + 单文件（{len(html) // 1024} KB）+ version.json "
        f"(v{info.get('version')} {info.get('build')})")
    return str(info.get("version", ""))


def assemble_site() -> Path:
    """把要发布的整站拼到一个临时目录：dist + 可下载的单文件 + .nojekyll"""
    site = Path(tempfile.mkdtemp(prefix="ff14idle-site-"))
    for item in (APP / "dist").iterdir():
        target = site / item.name
        if item.is_dir():
            shutil.copytree(item, target)
        else:
            shutil.copy2(item, target)
    shutil.copy2(APP / "dist-single" / "index.html", site / SINGLE_NAME)
    # .nojekyll：不让 GitHub Pages 用 Jekyll 处理产物（Jekyll 会忽略下划线开头的文件）
    (site / ".nojekyll").write_text("", encoding="utf-8")
    return site


# --------------------------------------------------------------------------- #
# 发布
# --------------------------------------------------------------------------- #
def parse_pages_url(remote: str) -> str:
    m = re.search(r"github\.com[:/]+([^/]+)/([^/]+?)(?:\.git)?$", remote.strip())
    if not m:
        return ""
    user, repo = m.group(1), m.group(2)
    if repo.lower() == f"{user.lower()}.github.io":
        return f"https://{user}.github.io/"
    return f"https://{user}.github.io/{repo}/"


def ask_remote(cli_remote: str = "") -> str:
    if cli_remote:
        CONFIG.write_text(
            json.dumps({"remote": cli_remote}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        return cli_remote
    saved = (read_json(CONFIG, {}) or {}).get("remote", "")
    if saved:
        say(f"  使用上次记住的仓库：{saved}")
        return saved
    say("")
    say("第一次发布，需要告诉你 GitHub 仓库的地址。")
    say("  格式例子： https://github.com/你的用户名/ff14-idle.git")
    say("  （仓库名随便起，任何名字都能做静态站；建的时候选 Public 即可）")
    say("  留空直接回车 = 只构建，不推送")
    try:
        remote = input("仓库地址: ").strip()
    except EOFError:
        # 没有交互终端（比如被别的程序调用）。给一条能直接照抄的命令。
        say("  当前环境没法读键盘输入。请改用：")
        say("    python tools/deploy.py --remote https://github.com/你的用户名/仓库名.git")
        return ""
    if remote:
        CONFIG.write_text(
            json.dumps({"remote": remote}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        say(f"  已记住到 {CONFIG.name}（下次不用再输；换仓库就删掉这个文件）")
    return remote


def push_source(env: dict, remote: str) -> None:
    """源码推到 main：以后换电脑、或者想回滚，都靠它"""
    commit_source(env, remote)
    remotes = git(["remote"], REPO, env, capture=True).split()
    if "origin" not in remotes:
        git(["remote", "add", "origin", remote], REPO, env)
    else:
        git(["remote", "set-url", "origin", remote], REPO, env)
    say("  正在推送源码到 main …")
    sha = git(["rev-parse", "HEAD"], REPO, env, capture=True).strip()
    git_push(REPO, env, "origin", f"{SOURCE_BRANCH}:{SOURCE_BRANCH}", expect_sha=sha)


def push_site(site: Path, env: dict, remote: str, message: str) -> None:
    """产物推到 gh-pages：用一个干净临时仓库，不污染 main 的历史。

    这个仓库是现建现推的，所以遇到对象写坏时的处理最简单——整个重来一遍。
    """
    author, mail = resolve_author(env)
    for attempt in range(1, 4):
        work = Path(tempfile.mkdtemp(prefix="ff14idle-push-"))
        git(["init", "-b", PUBLISH_BRANCH], work, env)
        for item in site.iterdir():
            target = work / item.name
            if item.is_dir():
                shutil.copytree(item, target)
            else:
                shutil.copy2(item, target)
        run_git(work, env, ["add", "-A"])
        run_git(
            work, env,
            ["-c", f"user.name={author}", "-c", f"user.email={mail}",
             "commit", "-m", message],
        )
        if not repo_is_sound(work, env):
            say(f"  ⚠️ 产物仓库对象损坏（第 {attempt}/3 次），重建后重试…")
            shutil.rmtree(work, ignore_errors=True)
            continue
        git(["remote", "add", "origin", remote], work, env)
        say(f"  正在推送产物到 {PUBLISH_BRANCH} …")
        sha = git(["rev-parse", "HEAD"], work, env, capture=True).strip()
        git_push(work, env, "origin", f"{PUBLISH_BRANCH}:{PUBLISH_BRANCH}",
                 expect_sha=sha, force=True)
        shutil.rmtree(work, ignore_errors=True)
        return
    die("产物仓库连续 3 次写坏，没能发布。可以重跑一次；持续出现请检查磁盘与杀毒软件。")


# --------------------------------------------------------------------------- #
def main() -> int:
    setup_console()
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("--bump", choices=["patch", "minor", "major"], help="发布前先升版本号")
    ap.add_argument("--remote", default="", help="GitHub 仓库地址；给了就记下来，下次不用再输")
    ap.add_argument("--dry-run", action="store_true", help="只构建 + 自检，不推送")
    ap.add_argument("--skip-source", action="store_true", help="只发产物，不推源码")
    ap.add_argument("--skip-tests", action="store_true", help="跳过构建前的类型检查之外的测试")
    args = ap.parse_args()

    say("=" * 62)
    say("  艾欧泽亚放置 · 一键发布到 GitHub Pages")
    say("=" * 62)

    step("1/6", "检查环境")
    node_dir = find_node_dir()
    if not node_dir:
        die("找不到 node/npm。请先装 Node.js（或确认 nvm 目录存在）。")
    say(f"  node   {node_dir}")
    say(f"  python {sys.executable}")
    env = dict(os.environ)
    env["PATH"] = node_dir + os.pathsep + env.get("PATH", "")
    env["DEPLOY"] = "1"          # 构建时标记：这是"要发布"的构建
    npx = str(Path(node_dir) / ("npx.cmd" if os.name == "nt" else "npx"))
    if not Path(npx).exists():
        npx = shutil.which("npx") or "npx"

    if args.bump:
        step("2/6", f"升级版本号（{args.bump}）")
        new = bump_version(args.bump)
        say(f"  package.json 版本 → {new}")
    else:
        pkg = json.loads((APP / "package.json").read_text(encoding="utf-8"))
        step("2/6", f"当前版本 v{pkg['version']}（要升版本就加 --bump patch）")

    step("3/6", "类型检查 + 构建")
    if not args.skip_tests:
        say("  tsc --noEmit …")
        run([npx, "tsc", "--noEmit"], APP, env)
    say("  vite build（多文件版）…")
    run([npx, "vite", "build"], APP, env)
    say("  vite build（单文件版）…")
    run([npx, "vite", "build", "--config", "vite.config.single.ts"], APP, env)

    step("4/6", "产物自检")
    version = check_artifacts()
    if args.dry_run:
        say("\n--dry-run：构建完成，没有推送。")
        return 0

    step("5/6", "确定仓库地址")
    remote = ask_remote(args.remote)
    if not remote:
        say("\n没有填仓库地址，只完成构建。")
        say("产物在 app/dist（网站）与 app/dist-single/index.html（单文件）。")
        return 0

    step("6/6", "发布")
    if not args.skip_source:
        push_source(env, remote)
    site = assemble_site()
    push_site(site, env, remote, f"发布 v{version}")
    shutil.rmtree(site, ignore_errors=True)

    url = parse_pages_url(remote)
    say("\n" + "=" * 62)
    say("  ✅ 发布完成")
    say("=" * 62)
    if url:
        say(f"\n  电脑/手机打开：{url}")
        say(f"  单文件版下载：  {url}{SINGLE_NAME}")
        say("\n  手机安装：浏览器里打开上面的网址 →")
        say("    · iPhone Safari：分享 → 添加到主屏幕")
        say("    · Android Chrome：菜单 → 添加到主屏幕 / 安装应用")
        say("\n  ⚠️ 如果网址打不开或者还是旧版本：")
        say("    去仓库 Settings → Pages，把 Source 设成")
        say(f"    “Deploy from a branch”，分支选 {PUBLISH_BRANCH}，目录选 / (root)。")
        say("    第一次发布后需要设置一次，之后每次双击本脚本就会自动更新。")
    else:
        say(f"\n  已推送。仓库地址是 {remote}（没能自动识别 Pages 网址）")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        say("\n已取消。")
        sys.exit(130)
