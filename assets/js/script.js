// Typing Effect Logic
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".typed-cursor");

const textArray = ["Target", "Tugas Kuliah", "Website Bisnis", "Desain Visual", "Karya Tulis"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(typedTextSpan && cursorSpan) {
    typedTextSpan.textContent = "";
    setTimeout(type, newTextDelay + 250);
  }
});

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

// FOMO Notification Logic
const fomoData = [
  { message: "Mahasiswa dari <strong>UGM</strong> baru saja memesan <strong>Cek Turnitin</strong>", time: "2 menit yang lalu" },
  { message: "Klien UMKM baru saja memesan <strong>Jasa Web Dev</strong>", time: "15 menit yang lalu" },
  { message: "Seseorang dari <strong>UI</strong> baru saja memesan <strong>Desain PPT</strong>", time: "1 jam yang lalu" },
  { message: "Mahasiswa <strong>ITB</strong> baru saja memesan <strong>Jasa Karya Tulis</strong>", time: "Beberapa saat yang lalu" },
  { message: "Klien Corporate memesan <strong>Editing Video</strong>", time: "30 menit yang lalu" },
  { message: "Seseorang baru saja memesan <strong>Optimasi PC</strong>", time: "5 menit yang lalu" }
];

function showFomo() {
  const fomoNotif = document.getElementById('fomo-notification');
  const fomoMsg = document.getElementById('fomo-message');
  const fomoTime = document.getElementById('fomo-time');
  
  if(!fomoNotif) return;

  const randomFomo = fomoData[Math.floor(Math.random() * fomoData.length)];
  
  fomoMsg.innerHTML = randomFomo.message;
  fomoTime.textContent = randomFomo.time;
  
  fomoNotif.classList.add('show');
  
  setTimeout(() => {
    fomoNotif.classList.remove('show');
  }, 5000); // Tampil selama 5 detik
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    showFomo();
    setInterval(showFomo, Math.floor(Math.random() * 15000) + 20000); // Muncul setiap 20-35 detik
  }, 5000); // Delay pertama kali muncul 5 detik setelah load
});

// Portfolio Modal Logic
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('portfolio-modal');
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.close-modal');
  const modalOrderBtn = document.getElementById('modal-order-btn');
  const selectLayanan = document.getElementById('layananPilihan');
  
  if (!modal) return;

  const modalPreview = document.getElementById('modal-preview');
  const modalIcon = document.getElementById('modal-icon');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');

  let currentSelectedService = "";
  const serviceMap = {
    "Web Development": "Pembuatan Web/Aplikasi",
    "Desain Grafis": "Desain Grafis/PPT",
    "Editing Video": "Editing Video",
    "Karya Tulis": "Bantuan Akademik/Makalah",
    "Teknik Sipil": "Desain Teknik Sipil",
    "Ilustrasi": "Jasa Gambar/Ilustrasi"
  };

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', function() {
      // Get data from clicked card
      const previewBg = this.querySelector('.portfolio-preview').style.background;
      const iconClass = this.querySelector('.portfolio-preview i').className;
      const tagText = this.querySelector('.portfolio-tag').textContent;
      const titleText = this.querySelector('h3').textContent;
      const descText = this.querySelector('p').textContent;

      // Set data to modal
      modalPreview.style.background = previewBg;
      modalIcon.className = iconClass;
      modalTag.textContent = tagText;
      modalTitle.textContent = titleText;
      modalDesc.textContent = descText;

      currentSelectedService = serviceMap[tagText] || "Layanan Lainnya";

      // Show modal
      modal.classList.add('show');
    });
  });

  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', function() {
      if (selectLayanan && currentSelectedService) {
        selectLayanan.value = currentSelectedService;
      }
      closeModal();
    });
  }

  // Close Modal functions
  function closeModal() {
    modal.classList.remove('show');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
});
