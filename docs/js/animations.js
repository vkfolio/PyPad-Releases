document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     Hero entrance
     ===================== */
  anime({
    targets: '.nav',
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-title .line',
    translateY: [40, 0],
    opacity: [0, 1],
    delay: anime.stagger(120, { start: 300 }),
    duration: 1100,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-subtitle',
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 900,
    delay: 800,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-actions .btn',
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(80, { start: 1000 }),
    duration: 900,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-badges .badge',
    scale: [0.9, 1],
    opacity: [0, 1],
    delay: anime.stagger(60, { start: 1200 }),
    duration: 700,
    easing: 'easeOutBack'
  });

  anime({
    targets: '.hero-mock .window',
    rotateX: [14, 0],
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 1400,
    delay: 600,
    easing: 'easeOutExpo'
  });

  /* =====================
     Video entrance
     ===================== */
  anime({
    targets: '#heroVideo',
    scale: [1.15, 1.0],
    duration: 2800,
    easing: 'easeOutQuad'
  });

  /* =====================
     Scroll-driven hero fade
     ===================== */
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('#heroVideo');
  const heroContent = document.querySelector('.hero-grid');
  if (hero && heroVideo && heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(scrollY / heroHeight, 1);
      heroVideo.style.transform = `scale(${1 + progress * 0.08}) translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity = 1 - progress * 1.2;
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }, { passive: true });
  }

  /* =====================
     Video mute toggle
     ===================== */
  const videoToggle = document.getElementById('videoToggle');
  const heroVideoEl = document.getElementById('heroVideo');
  if (videoToggle && heroVideoEl) {
    videoToggle.addEventListener('click', () => {
      heroVideoEl.muted = !heroVideoEl.muted;
      videoToggle.textContent = heroVideoEl.muted ? '🔇' : '🔊';
    });
  }

  /* =====================
     Floating orbs
     ===================== */
  /* =====================
     Scroll reveal
     ===================== */
  const grids = document.querySelectorAll('.features-grid, .download-grid, .why-grid, .modes-grid, .showcase-list');
  grids.forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      child.dataset.animeIndex = i;
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const idx = parseInt(el.dataset.animeIndex || '0', 10);
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 800,
          delay: idx * 80,
          easing: 'easeOutQuad',
          complete: () => el.classList.remove('reveal')
        });

        if (el.classList.contains('showcase-row')) {
          anime({
            targets: el.querySelectorAll('.c-line, .c-out, .set-row, .sb-item, .c-popup-item, .tab'),
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(35, { start: 240 }),
            duration: 600,
            easing: 'easeOutQuad'
          });
          anime({
            targets: el.querySelectorAll('.sbar'),
            scaleY: [0, 1],
            delay: anime.stagger(60, { start: 240 }),
            duration: 700,
            easing: 'easeOutBack'
          });
        }

        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* =====================
     Showcase window tilt on mouse move
     ===================== */
  document.querySelectorAll('.showcase-media').forEach((media) => {
    const win = media.querySelector('.showcase-window');
    if (!win) return;
    media.addEventListener('mousemove', (e) => {
      const rect = media.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * -4;
      const ry = (x - cx) / cx * 4;
      anime({
        targets: win,
        rotateX: rx,
        rotateY: ry,
        duration: 400,
        easing: 'easeOutQuad'
      });
    });
    media.addEventListener('mouseleave', () => {
      anime({
        targets: win,
        rotateX: 0,
        rotateY: 0,
        duration: 500,
        easing: 'easeOutQuad'
      });
    });
  });
});
