// Initialize Animations
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});


// FAQ Accordion Logic
document.addEventListener("DOMContentLoaded", function () {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Dynamic Footer Year
document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Preloader Hide Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    // Hilangkan dari DOM setelah transisi selesai
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Navbar Scroll & Back to Top Effect
const backToTopBtn = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  
  // Scroll Progress Calculation
  if (scrollProgress) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  }

  // Navbar Effect
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.padding = '12px 5%';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      nav.style.padding = '18px 5%';
      nav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
  }

  // Back to Top Button Visibility
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
});

// Back to Top Click Action
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// Animated Statistics Counter
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector('.stats-section');
  const counters = [
    { id: "projectCount", target: 350 },
    { id: "customerCount", target: 200 },
    { id: "universityCount", target: 30 }
  ];

  let hasStarted = false;

  function animate(element, target) {
    let start = 0;
    const duration = 2000; // 2 detik pengerjaan
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = Math.floor(easeProgress * target);
      element.textContent = currentValue + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function startAllCounters() {
    if (hasStarted) return;
    hasStarted = true;
    counters.forEach(counter => {
      const el = document.getElementById(counter.id);
      if (el) animate(el, counter.target);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startAllCounters();
    }
  }, { threshold: 0.5 });

  if (statsSection) observer.observe(statsSection);
});

// Portfolio Filter Logic
document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.remove('show');
          card.classList.add('hide');
        }
      });

      // Refresh AOS to detect newly visible elements
      AOS.refresh();
    });
  });
});

// Testimonial Slider Logic
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.review-track');
  const cards = document.querySelectorAll('.review-card');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  let cardsPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
  let maxIndex = Math.ceil(cards.length / cardsPerView) - 1;

  // Create Dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    const cardWidth = cards[0].offsetWidth + 30; // 30 is the gap
    track.style.transform = `translateX(-${currentIndex * (cardWidth * cardsPerView)}px)`;
    updateDots();
  }

  // Auto Slide
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    goToSlide(currentIndex);
  }, 5000);

  // Resize handler
  window.addEventListener('resize', () => {
    const newCardsPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = 0;
      createDots();
      goToSlide(0);
    }
  });

  createDots();
});

// WhatsApp Form Submission Handler
const waForm = document.getElementById('waForm');
if (waForm) {
  waForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const layanan = document.getElementById('layananPilihan').value;
    const pesan = document.getElementById('pesan').value;

    // Target WhatsApp Number
    const whatsappNumber = "6282328143785";

    // Formatting the message for WhatsApp
    const message = `Halo Admin Technorra, saya ingin konsultasi/memesan layanan:%0A%0A` +
      `*Nama:* ${nama}%0A` +
      `*Layanan:* ${layanan}%0A` +
      `*Detail Pesan:* ${pesan}%0A%0A` +
      `Mohon informasi lebih lanjut. Terima kasih.`;

    // Create WhatsApp URL
    const waURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Show Loading Feedback
    const submitBtn = waForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      
      // Simulate brief delay for feedback then open WhatsApp
      setTimeout(() => {
        window.open(waURL, '_blank');
        submitBtn.classList.remove('loading');
      }, 800);
    }
  });
}
