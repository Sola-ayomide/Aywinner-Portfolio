// Scroll fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Trigger hero elements immediately on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
});

// Mobile nav toggle 
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// API Playground
document.querySelectorAll('.endpoint-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const url    = btn.dataset.url;
    const target = btn.dataset.target;
    const box    = document.getElementById(target);
    if (!box) return;

    btn.disabled     = true;
    btn.textContent  = 'Loading...';
    box.textContent  = '';
    box.classList.remove('active');

    try {
      const res  = await fetch(url);
      const data = await res.json();
      box.textContent = JSON.stringify(data, null, 2);
      box.classList.add('active');
    } catch (err) {
      box.textContent = '// Error: could not reach endpoint';
      box.classList.add('active');
    } finally {
      btn.disabled    = false;
      btn.textContent = 'Run request →';
    }
  });
});

// Active nav link highlight
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath.startsWith('/blog') && href === '/blog')) {
    link.style.color = 'var(--ink)';
    link.style.fontWeight = '500';
  }
});
