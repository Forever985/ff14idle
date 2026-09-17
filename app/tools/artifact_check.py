"""
产物引用检查：产物里还有没有**会阻断加载**的外部引用。

为什么要单独抽一个模块，而不是各测试各写一遍正则：
  这个判断已经写错过两次了。第一版是"任何 src=/href= 都算外部引用"，
  于是单文件版 head 里的 `manifest` / `favicon`（可选装饰，取不到也不影响游戏）
  被判成致命问题；更要命的是它还会命中**内联 JS 里的模板字符串**
  （形如 `<script src="${e}">`），报出一个根本不存在的引用。

  所以现在只认两件事，而且都要求引用看起来是"真路径"：
    · `<script src="…">`           —— 少了它整个游戏都不跑
    · `<link rel="stylesheet">`    —— 少了它界面全裸
  `data:` / `#` / `blob:` / 含 `${` 的一律不算。
"""
import re

_SCRIPT_SRC = re.compile(r'<script[^>]*\bsrc="([^"]+)"', re.I)
_LINK_TAG = re.compile(r'<link\b[^>]*>', re.I)
_HREF = re.compile(r'\bhref="([^"]+)"', re.I)
_REL = re.compile(r'\brel="([^"]+)"', re.I)


def _is_real_url(url: str) -> bool:
    if not url:
        return False
    if url.startswith(("data:", "#", "blob:")):
        return False
    if "${" in url or "{{" in url:      # 模板字符串，不是真的标签
        return False
    return True


def blocking_refs(html: str) -> list[str]:
    """返回会阻断加载的外部引用（去重、保持出现顺序）"""
    found: list[str] = []
    for m in _SCRIPT_SRC.finditer(html):
        if _is_real_url(m.group(1)):
            found.append(m.group(1))
    for tag_match in _LINK_TAG.finditer(html):
        tag = tag_match.group(0)
        href, rel = _HREF.search(tag), _REL.search(tag)
        if not href:
            continue
        if rel and "stylesheet" in rel.group(1).lower() and _is_real_url(href.group(1)):
            found.append(href.group(1))
    seen: set[str] = set()
    return [u for u in found if not (u in seen or seen.add(u))]
