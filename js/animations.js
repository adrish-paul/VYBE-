/**
 * VYBE Motion & Animation Controller
 * Handles organic ambient floating background canvas/particles,
 * scroll reveals, interactive 3D card tilt, navbar scroll dynamics,
 * and testimonial carousel with touch & autoplay.
 */

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNavbarScroll();
  initNavScrollSpy();
  initScrollObserver();
  initScrollProgressBar();
  initAnimatedCounters();
  initTestimonialCarousel(prefersReduced);

  if (!prefersReduced) {
    initAmbientOrbsCanvas();
    initTiltEffects();
    initParallaxElements();
    initKineticScrollMarquee();
    initKineticScrollParallax();
  }
}

/**
 * Navbar Active Section Spy on Scroll
 */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links-desktop .nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active-section');
          } else {
            link.classList.remove('active-section');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Navbar scroll behavior: increase blur, glass opacity & shadow on scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-pill');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Scroll Reveal Animations via IntersectionObserver
 */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, unobserve for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Floating Ambient Canvas with Soft Organic Glow Orbs
 * Fluid theme-aware particle glow with mouse parallax & harmonic breathing
 */
function initAmbientOrbsCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const getThemePalette = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      return [
        'rgba(185, 244, 93, 0.12)',   // Electric Lime
        'rgba(183, 164, 255, 0.14)',  // Soft Lavender
        'rgba(255, 181, 157, 0.11)',  // Peach
        'rgba(139, 201, 255, 0.12)',  // Sky Blue
        'rgba(185, 244, 93, 0.08)'    // Lime accent
      ];
    }
    return [
      'rgba(245, 215, 130, 0.28)',  // Warm Amber Gold
      'rgba(235, 195, 110, 0.22)',  // Rich Champagne Ochre
      'rgba(255, 205, 140, 0.24)',  // Soft Luminous Peach-Gold
      'rgba(225, 29, 98, 0.12)',   // Warm Velvet Scarlet-Purple
      'rgba(250, 225, 150, 0.26)'   // Radiant Warm Sunlight
    ];
  };

  let palette = getThemePalette();

  window.addEventListener('vybe:theme-changed', () => {
    palette = getThemePalette();
    orbs.forEach((orb, i) => {
      orb.color = palette[i % palette.length];
    });
  });

  // Floating pastel blurred orbs that drift gently with phase
  const orbs = [
    { x: width * 0.18, y: height * 0.22, vx: 0.22, vy: 0.15, r: 260, baseR: 260, phase: 0, color: palette[0] },
    { x: width * 0.82, y: height * 0.32, vx: -0.18, vy: 0.19, r: 300, baseR: 300, phase: 1.5, color: palette[1] },
    { x: width * 0.45, y: height * 0.78, vx: 0.16, vy: -0.18, r: 280, baseR: 280, phase: 3.0, color: palette[2] },
    { x: width * 0.88, y: height * 0.88, vx: -0.20, vy: -0.14, r: 240, baseR: 240, phase: 4.5, color: palette[3] }
  ];

  let mouseX = width / 2;
  let mouseY = height / 2;
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    scrollVelocity = (currentY - lastScrollY) * 0.15;
    lastScrollY = currentY;
  }, { passive: true });

  let isPaused = false;
  document.addEventListener('visibilitychange', () => {
    isPaused = document.hidden;
  });

  let startTime = performance.now();

  function render(time) {
    if (!isPaused) {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (time - startTime) * 0.001;
      scrollVelocity *= 0.94; // Smooth dampening

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy - scrollVelocity * 0.35; // Kinetic depth displacement

        // Subtle interactive mouse attraction
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        orb.x += dx * 0.0004;
        orb.y += dy * 0.0004;

        // Organic harmonic breathing
        orb.r = orb.baseR + Math.sin(elapsed * 0.8 + orb.phase) * 30;

        // Soft bounce boundaries
        if (orb.x - orb.r < -120 || orb.x + orb.r > width + 120) orb.vx *= -1;
        if (orb.y - orb.r < -120 || orb.y + orb.r > height + 120) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, Math.max(10, orb.r));
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.04)'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, Math.max(10, orb.r), 0, Math.PI * 2);
        ctx.fill();
      });
    }
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * 3D Claymorphic Tilt on Hover for Hero Card
 */
function initTiltEffects() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
  });
}

/**
 * Subtle parallax for floating decorative stickers & badges
 */
function initParallaxElements() {
  const floaters = document.querySelectorAll('.hero-floater');
  if (!floaters.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function tick() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    floaters.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-depth') || '15');
      const moveX = currentX * depth;
      const moveY = currentY * depth;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    requestAnimationFrame(tick);
  }

  tick();
}

/**
 * Testimonials Carousel with Autoplay, Touch Swipe, and Pause on Hover
 */
function initTestimonialCarousel(reducedMotion) {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('test-prev-btn');
  const nextBtn = document.getElementById('test-next-btn');
  const dotsContainer = document.getElementById('test-dots');

  if (!track) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isHovered = false;

  // Generate pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, i) => 
      `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
    ).join('');

    dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goToSlide(idx);
      });
    });
  }

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  function goToSlide(idx) {
    currentIndex = idx;
    updateSlidePosition();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  // Autoplay unless reduced motion
  function startAutoplay() {
    if (reducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  track.addEventListener('mouseenter', () => { isHovered = true; });
  track.addEventListener('mouseleave', () => { isHovered = false; });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoplay();
    }
  }

  startAutoplay();
}

/**
 * Top Luminescent Scroll Progress Bar (Game Website Aesthetic)
 */
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-fill');
  if (!bar) return;

  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/**
 * Kinetic Infinite Marquee Ticker with Scroll Velocity Reaction
 */
function initKineticScrollMarquee() {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  let currentTranslate = 0;
  let baseSpeed = 0.8;
  let extraSpeed = 0;
  let lastScrollY = window.scrollY;
  let isHovered = false;

  track.addEventListener('mouseenter', () => { isHovered = true; });
  track.addEventListener('mouseleave', () => { isHovered = false; });

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = Math.abs(currentY - lastScrollY);
    extraSpeed = Math.min(8, delta * 0.28);
    lastScrollY = currentY;
  }, { passive: true });

  function drift() {
    if (!isHovered) {
      currentTranslate -= (baseSpeed + extraSpeed);
      extraSpeed *= 0.93; // Smooth damping
      const chunk = track.firstElementChild;
      const chunkWidth = chunk ? chunk.offsetWidth : 1200;
      if (Math.abs(currentTranslate) >= chunkWidth) {
        currentTranslate = 0;
      }
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }
    requestAnimationFrame(drift);
  }

  drift();
}

/**
 * Kinetic Scroll Parallax & 3D Stage Tilting
 */
function initKineticScrollParallax() {
  const parallaxNodes = document.querySelectorAll('[data-scroll-parallax]');
  if (!parallaxNodes.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    parallaxNodes.forEach(node => {
      const speed = parseFloat(node.getAttribute('data-scroll-parallax') || '0.1');
      const offset = scrollY * speed;
      if (node.id === 'hero-card-stage') {
        const tilt = Math.min(10, Math.max(-10, (scrollY * 0.012)));
        node.style.transform = `perspective(1000px) translateY(${offset}px) rotateX(${tilt}deg)`;
      } else {
        node.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Animated Number Counters (Odometer Effect)
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeProgress);

          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

