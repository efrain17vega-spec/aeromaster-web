/* =============================================
   AEROMASTER AIRPORT SHUTTLE — HUARAZ
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ===== GALERÍA DE VANS (slider) =====
  const track   = document.querySelector('.van-gallery-track');
  const slides  = document.querySelectorAll('.van-slide');
  const dots    = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  let current   = 0;
  let autoTimer = null;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoTimer = setInterval(function () {
      goToSlide(current + 1);
    }, 4500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Inicializar primer slide activo
  slides[0].classList.add('active');

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(current - 1);
      resetAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(current + 1);
      resetAuto();
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goToSlide(parseInt(this.dataset.index));
      resetAuto();
    });
  });

  // Swipe táctil en móvil
  let touchStartX = 0;
  if (track) {
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? current + 1 : current - 1);
        resetAuto();
      }
    }, { passive: true });
  }

  startAuto();


  // ===== HAMBURGER MENU (móvil) =====
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mainNav.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mainNav.classList.remove('open');
      }
    });
  }

  // ===== DROPDOWN EN MÓVIL =====
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  dropdownParents.forEach(function (item) {
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // ===== HEADER SOMBRA AL SCROLL =====
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.15)'
        : '0 2px 8px rgba(0,0,0,0.08)';
    });
  }

  // ===== ANIMACIÓN FADE-IN AL SCROLL =====
  const animatables = document.querySelectorAll(
    '.intro-block, .info-block, .includes-block, .schedule-block, .warning-block, .cta-buttons, .map-block'
  );

  animatables.forEach(function (el) {
    el.classList.add('fade-in-target');
  });

  const style = document.createElement('style');
  style.textContent = `
    .fade-in-target {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-in-target.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatables.forEach(function (el) {
    observer.observe(el);
  });

});