// tecotec.us demo tĩnh. Một hành vi: nút Mục lục trên màn hình hẹp.
// Header và footer đã được ghi sẵn vào từng trang lúc build; loadComponent giữ lại để tương thích
// với cách làm của tumiki-design nhưng không chạy vì không có placeholder.

async function loadComponent(elementId, url) {
  const element = document.getElementById(elementId);
  if (!element) return;
  try {
    const response = await fetch(url);
    if (response.ok) element.outerHTML = await response.text();
  } catch (error) {
    console.error('Không tải được ' + url, error);
  }
}

function initMenu() {
  const toggle = document.querySelector('.bar__toggle');
  const panel = document.querySelector('.bar__panel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', function () {
    const open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  const tasks = [];
  if (document.getElementById('site-header')) tasks.push(loadComponent('site-header', 'header/header.html'));
  if (document.getElementById('site-footer')) tasks.push(loadComponent('site-footer', 'footer/footer.html'));
  if (tasks.length) await Promise.all(tasks);
  initMenu();
});
