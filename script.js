/* ================================================================
   NEXUS DIGITAL -- Animation Orchestration
   Apple-style micro-interactions: parallax, reveals, blur-ins.
   ================================================================ */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------------
  // 1. MOBILE MENU
  // ----------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      menuOverlay.classList.toggle('is-open');
      document.body.style.overflow = menuOverlay.classList.contains('is-open') ? 'hidden' : '';
    });

    menuOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        menuOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----------------------------------------------------------------
  // 2. NAVBAR GLASS EFFECT
  // ----------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');

  if (navbar && hero) {
    const obs = new IntersectionObserver(([entry]) => {
      navbar.classList.toggle('navbar--glass', !entry.isIntersecting);
    }, { threshold: 0, rootMargin: '-52px 0px 0px 0px' });
    obs.observe(hero);
  } else if (navbar) {
    navbar.classList.add('navbar--glass');
  }

  // ----------------------------------------------------------------
  // 3. SCROLL PROGRESS
  // ----------------------------------------------------------------
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
    }, { passive: true });
  }

  // ----------------------------------------------------------------
  // 4. READING PROGRESS (blog posts)
  // ----------------------------------------------------------------
  const readingBar = document.querySelector('.reading-progress');
  if (readingBar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      readingBar.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
    }, { passive: true });
  }

  // ----------------------------------------------------------------
  // 5. GSAP -- RESPONSIVE ANIMATION SETUP
  // ----------------------------------------------------------------
  const mm = gsap.matchMedia();

  // === DESKTOP (>= 1024px): hero pinning ===
  mm.add('(min-width: 1024px)', () => {
    const layer1 = document.getElementById('heroLayer1');
    const layer2 = document.getElementById('heroLayer2');
    const layer3 = document.getElementById('heroLayer3');

    if (layer1 && layer2 && layer3) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          pin: true,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
        }
      });

      // Phase 1: fade out main headline
      tl.to('#heroLayer1', { opacity: 0, y: -30, duration: 1 })
        // Phase 2: second message
        .to('#heroLayer2', { opacity: 1, duration: 0.4 }, '>')
        .from('#heroLayer2 .t-section', { y: 20, duration: 0.6 }, '<')
        // Phase 3: final CTA
        .to('#heroLayer2', { opacity: 0, duration: 0.4 }, '+=0.3')
        .to('#heroLayer3', { opacity: 1, duration: 0.4 }, '<')
        .from('#heroLayer3 .t-tile', { y: 16, duration: 0.5 }, '<');

      // Fade scroll hint
      gsap.to('.scroll-hint', {
        opacity: 0,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=150', scrub: true }
      });

      // Parallax on hero orbs
      gsap.to('.hero__orb--blue', {
        y: -80,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__orb--dim', {
        y: 60,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  });

  // === TABLET (768-1023px): simplified pin ===
  mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
    const layer1 = document.getElementById('heroLayer1');
    if (layer1) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '#hero', pin: true, start: 'top top', end: '+=1500', scrub: 1 }
      });
      tl.to('#heroLayer1', { opacity: 0, y: -20, duration: 1 })
        .to('#heroLayer3', { opacity: 1, duration: 0.5 }, '>')
        .from('#heroLayer3 .t-tile', { y: 16, duration: 0.5 }, '<');
    }
  });

  // === MOBILE (<768px): no pin, just fade hint ===
  mm.add('(max-width: 767px)', () => {
    gsap.to('.scroll-hint', {
      opacity: 0,
      scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=80', scrub: true }
    });
  });

  // === ALL BREAKPOINTS ===
  mm.add('all', () => {

    // ---- Standard reveal: 20px translateY fade-up ----
    gsap.set('.reveal', { opacity: 0, y: 20 });

    ScrollTrigger.batch('.reveal', {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      }),
      start: 'top 90%',
      once: true,
    });

    // ---- Scale reveal: zoom from 0.92 ----
    gsap.set('.reveal-scale', { opacity: 0, scale: 0.92 });

    ScrollTrigger.batch('.reveal-scale', {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true,
      }),
      start: 'top 88%',
      once: true,
    });

    // ---- Blur reveal: blur(12px) to clear ----
    gsap.set('.reveal-blur', { opacity: 0, filter: 'blur(12px)', y: 10 });

    ScrollTrigger.batch('.reveal-blur', {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: true,
      }),
      start: 'top 88%',
      once: true,
    });

    // ---- Horizontal slide reveals (direction-aware) ----
    var dirFactor = document.documentElement.dir === 'rtl' ? -1 : 1;
    gsap.set('.reveal-left', { opacity: 0, x: -40 * dirFactor });
    gsap.set('.reveal-right', { opacity: 0, x: 40 * dirFactor });

    ScrollTrigger.batch('.reveal-left, .reveal-right', {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: true,
      }),
      start: 'top 88%',
      once: true,
    });

    // ---- Image reveal: scale from 1.15 to 1 inside overflow-hidden ----
    document.querySelectorAll('.img-reveal').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          el.classList.add('is-visible');
          gsap.fromTo(el, { clipPath: 'inset(8% 8% 8% 8%)' }, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power3.out',
          });
        }
      });
    });

    // ---- Parallax images: subtle scroll-linked Y movement ----
    document.querySelectorAll('.parallax-img').forEach(img => {
      gsap.to(img, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.img-wrap, .case-card, .bento-card, .card') || img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    // ---- Image zoom on scroll through viewport ----
    document.querySelectorAll('.zoom-on-scroll').forEach(el => {
      gsap.fromTo(el, { scale: 1.08 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.img-wrap, .img-reveal') || el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    // ---- Section divider line animation ----
    document.querySelectorAll('.section-divider').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => el.classList.add('is-visible'),
      });
    });

    // ---- Footer CTA orb parallax ----
    document.querySelectorAll('.footer-cta__orb--left').forEach(el => {
      gsap.to(el, {
        y: -30, x: 20,
        scrollTrigger: { trigger: el.closest('.footer-cta'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    document.querySelectorAll('.footer-cta__orb--right').forEach(el => {
      gsap.to(el, {
        y: 30, x: -20,
        scrollTrigger: { trigger: el.closest('.footer-cta'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // ---- Counter animations ----
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target, 1400);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

    function animateCounter(el, target, duration) {
      const start = performance.now();
      el.style.filter = 'blur(4px)';
      gsap.to(el, { filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' });
      (function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      })(start);
    }

    // ---- Staggered children in grids ----
    document.querySelectorAll('.stagger-children').forEach(grid => {
      const children = grid.children;
      gsap.set(children, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });
    });
  });

  // === REDUCED MOTION ===
  mm.add('(prefers-reduced-motion: reduce)', () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.set('.reveal, .reveal-scale, .reveal-blur, .reveal-left, .reveal-right', {
      opacity: 1, y: 0, x: 0, scale: 1, filter: 'none'
    });
    document.querySelectorAll('.img-reveal').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.section-divider').forEach(el => el.classList.add('is-visible'));
  });

  // Refresh after load
  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
