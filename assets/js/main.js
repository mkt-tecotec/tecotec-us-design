// tecotec.us demo tĩnh. Hai hành vi: banner nháp thu lên khi cuộn xuống, nút Mục lục trên màn hình hẹp.
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

function initBanner() {
  const top = document.querySelector('.site-top');
  if (!top) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const draftH = top.querySelector('.draft') ? top.querySelector('.draft').offsetHeight : 40;
  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    if (reduced.matches) { top.classList.remove('is-compact'); lastY = y; return; }
    if (y < draftH) {
      top.classList.remove('is-compact');
    } else if (y > lastY + 4) {
      top.classList.add('is-compact');
    } else if (y < lastY - 4) {
      top.classList.remove('is-compact');
    }
    lastY = y;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
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
  initBanner();
  initMenu();
});
