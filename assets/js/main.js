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

  // Artist Roster Carousel Navigation
  const artistCarousel = document.querySelector('.artist-carousel');
  if (artistCarousel) {
    const prevBtn = document.querySelector('.artist-carousel-nav-btn--prev, .artist-carousel-btn--prev');
    const nextBtn = document.querySelector('.artist-carousel-nav-btn--next, .artist-carousel-btn--next');
    const counterEl = document.querySelector('.artist-carousel-counter-badge, .artist-carousel-counter');
    const progressBar = document.querySelector('.artist-carousel-progress__bar');
    const cards = artistCarousel.querySelectorAll('.artist-card');

    function updateCarouselState() {
      const scrollLeft = artistCarousel.scrollLeft;
      const maxScroll = artistCarousel.scrollWidth - artistCarousel.clientWidth;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 340;
      const activeIndex = Math.min(
        cards.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );

      if (counterEl) {
        counterEl.textContent = `0${activeIndex + 1} / 0${cards.length}`;
      }

      if (progressBar && maxScroll > 0) {
        const progressPercent = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
        progressBar.style.transform = `translateX(${progressPercent}%)`;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 340;
        artistCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 340;
        artistCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    artistCarousel.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState, { passive: true });
    updateCarouselState();
  // 4. Scroll Trigger Full Dark Backdrop Overlay (triggers light mode return near section end)
  const categorySection = document.querySelector('#category-section');
  if (categorySection) {
    let darkOverlay = document.querySelector('.dark-screen-overlay');
    if (!darkOverlay) {
      darkOverlay = document.createElement('div');
      darkOverlay.className = 'dark-screen-overlay';
      document.body.appendChild(darkOverlay);
    }

    function checkDarkSectionPosition() {
      const rect = categorySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Dark section top is approaching/in viewport AND bottom has not reached upper portion of screen
      const isTopInView = rect.top <= viewportHeight * 0.7;
      const isBottomNotEnded = rect.bottom >= viewportHeight * 0.45;

      if (isTopInView && isBottomNotEnded) {
        darkOverlay.classList.add('is-active');
        categorySection.classList.add('is-dark-active');
      } else {
        // Automatically return to LIGHT MODE when scrolling near the end of section or before entering top
        darkOverlay.classList.remove('is-active');
        categorySection.classList.remove('is-dark-active');
      }
    }

    window.addEventListener('scroll', checkDarkSectionPosition, { passive: true });
    window.addEventListener('resize', checkDarkSectionPosition, { passive: true });
    checkDarkSectionPosition();
  }
});

