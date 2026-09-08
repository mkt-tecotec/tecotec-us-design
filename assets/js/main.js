// tecotec.us demo - Main JS (Mobile Menu & Lightbox)
document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const toggle = document.querySelector('.bar__toggle');
  const panel = document.querySelector('.bar__panel');
  if (toggle && panel) {
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

  // 2. Lightbox Feature for Artwork Detail Images
  const galleryImages = Array.from(document.querySelectorAll('.plate img, .plate__box img, [data-lightbox]'));
  if (galleryImages.length === 0) return;

  // Create Lightbox DOM structure dynamically
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Hình ảnh phóng to');
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Đóng (ESC)">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Ảnh trước">&larr;</button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Ảnh tiếp">&rarr;</button>
    <div class="lightbox__container">
      <img class="lightbox__img" src="" alt="">
      <div class="lightbox__caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  let currentIndex = 0;

  function updateLightbox(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const imgEl = galleryImages[currentIndex];
    const highResSrc = imgEl.getAttribute('data-full-src') || imgEl.getAttribute('src');
    const captionText = imgEl.getAttribute('alt') || document.querySelector('.title, h1')?.textContent || '';
    
    lightboxImg.src = highResSrc;
    lightboxImg.alt = captionText;
    lightboxCaption.textContent = captionText ? `${captionText} (${currentIndex + 1}/${galleryImages.length})` : '';

    if (galleryImages.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  galleryImages.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex + 1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__container')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });

  // 3. Hero Archival Carousel Slider
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('.hero-slide');
    const dots = heroCarousel.querySelectorAll('.hero-carousel__dot');
    const prevBtn = heroCarousel.querySelector('.hero-carousel__btn--prev');
    const nextBtn = heroCarousel.querySelector('.hero-carousel__btn--next');
    const counterEl = heroCarousel.querySelector('.hero-carousel__counter');
    let activeIndex = 0;
    let timer = null;

    function goToSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === activeIndex);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIndex);
        dot.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false');
      });
      if (counterEl) {
        counterEl.textContent = `0${activeIndex + 1} / 0${slides.length}`;
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      timer = setInterval(() => {
        goToSlide(activeIndex + 1);
      }, 5000);
    }

    function stopAutoSlide() {
      if (timer) clearInterval(timer);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(activeIndex - 1);
        startAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(activeIndex + 1);
        startAutoSlide();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoSlide();
      });
    });

    heroCarousel.addEventListener('mouseenter', stopAutoSlide);
    heroCarousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
  }

  // 4. Scroll Trigger Full Dark Backdrop Overlay (70vh threshold)
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

  // Intersection Observer for Reveal Animations (Triggers early when 10% visible)
  const categoryCards = document.querySelectorAll('.category-spread-item');
  if (categoryCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const anims = entry.target.querySelectorAll('.anim-reveal-left, .anim-reveal-right, .anim-reveal-fade');
          anims.forEach(el => el.classList.add('is-visible'));
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1 // Triggers early when 10% visible
    });

    categoryCards.forEach(card => cardObserver.observe(card));
  }

  // Standalone Reveal Animations (outside category cards)
  const standaloneAnims = document.querySelectorAll('.anim-reveal-left:not(.category-spread-item *), .anim-reveal-right:not(.category-spread-item *), .anim-reveal-fade:not(.category-spread-item *)');
  if (standaloneAnims.length > 0) {
    const standaloneObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    standaloneAnims.forEach(el => standaloneObserver.observe(el));
  }

  // 5. Artist Roster Carousel Navigation
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
  }
});

