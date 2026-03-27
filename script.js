// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
    burger.classList.remove('active');
  }
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#f5a623';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .machine-card, .testimonial-card, .stat, .about-feature, .contact-item'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Add visible class via CSS
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xeepovbg', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMsg.classList.remove('hidden');
      setTimeout(() => successMsg.classList.add('hidden'), 6000);
    } else {
      alert('Une erreur est survenue. Veuillez réessayer ou nous appeler au 06 99 61 62 94.');
    }
  } catch {
    alert('Erreur réseau. Veuillez réessayer ou nous appeler au 06 99 61 62 94.');
  }

  btn.textContent = 'Envoyer ma demande';
  btn.disabled = false;
});

// ===== STAT COUNTER ANIMATION =====
const statNums = document.querySelectorAll('.stat-num');
const statsSection = document.getElementById('stats');

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    statNums.forEach(el => {
      el.style.animation = 'statPop 0.4s ease forwards';
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

statsSection && statsObserver.observe(statsSection);

// Inject stat animation
const statStyle = document.createElement('style');
statStyle.textContent = `
  @keyframes statPop {
    0% { transform: scale(0.8); opacity: 0.5; }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(statStyle);
