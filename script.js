// Earth Tone Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navigation active highlighting
  function updateActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
  updateActiveNav();
  window.addEventListener('popstate', updateActiveNav);

  // Gallery lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<img src=\"\" alt=\"\"> <button class=\"close-btn\">&times;</button>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close-btn');

  document.querySelectorAll('figure.polaroid img').forEach(img => {
    img.addEventListener('click', function() {
      const figure = this.closest('figure');
      if (figure) {
        figure.classList.add('snap');
        setTimeout(() => figure.classList.remove('snap'), 360);
      }
      lightbox.classList.add('active');
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Form validation and submission
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const message = document.getElementById('message')?.value;
      
      if (name && email && message) {
        // Simulate submission
        alert(`Terima kasih, ${name}! Pesan Anda telah dikirim. Saya akan balas melalui email ${email} segera.`);
        form.reset();
      } else {
        alert('Mohon isi semua field dengan benar!');
      }
    });
  });

  // Fade-in animation for images on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(img);
  });

  // Mobile/Drawer nav toggle (hamburger)
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerLinks = document.querySelectorAll('#drawer a');

  if (hamburger && drawer) {
    const openDrawer = () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });

    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }

});

