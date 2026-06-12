// ── THEME TOGGLE ──
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');
if (initial === 'light') html.setAttribute('data-theme', 'light');

toggleBtn.addEventListener('click', () => {
  const isLight = html.getAttribute('data-theme') === 'light';
  if (isLight) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// ── TYPEWRITER ──
const lines = [
  'API integrations & webhooks',
  'SaaS migrations & onboarding',
  'Technical support & escalations',
  'AI tooling & automation',
  'Cross-functional engineering comms',
];
let lineIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = lines[lineIndex];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  setTimeout(type, deleting ? 40 : 55);
}
setTimeout(type, 800);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.job, .skill-card').forEach(el => observer.observe(el));
