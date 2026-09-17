/** 轻量提示条 */
let el: HTMLDivElement | null = null;
let timer: number | null = null;

function ensure(): HTMLDivElement {
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  return el;
}

export function flash(msg: string): void {
  const node = ensure();
  node.textContent = msg;
  node.classList.add('show');
  if (timer !== null) window.clearTimeout(timer);
  timer = window.setTimeout(() => node.classList.remove('show'), 2200);
}
