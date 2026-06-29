// ── Dark / Light mode toggle ──────────────────────────
const html      = document.documentElement;
const toggleBtn = document.getElementById('darkToggle');
const icon      = document.getElementById('darkIcon');

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

function updateIcon(theme) {
  if (theme === 'dark') {
    icon.className = 'bi bi-moon-fill';
    toggleBtn.title = 'Switch to Light Mode';
  } else {
    icon.className = 'bi bi-sun-fill';
    toggleBtn.title = 'Switch to Dark Mode';
  }
}


// Contact form submit
function handleSubmit() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert(`Thank you for contacting me!`);

  // Clear form
  document.getElementById('contactName').value    = '';
  document.getElementById('contactEmail').value   = '';
  document.getElementById('contactMessage').value = '';
}


// Gallery filter tabs
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});


// Navbar scroll effect
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.padding = '10px 0';
  } else {
    nav.style.padding = '16px 0';
  }
});


// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


// Typed text effect
const words   = ['Data Engineer', 'Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl   = document.querySelector('.typed-text');

function type() {
  const current = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    wordIndex   = (wordIndex + 1) % words.length;
    setTimeout(type, 400);
  } else {
    setTimeout(type, isDeleting ? 60 : 100);
  }
}

type();
