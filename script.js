document.addEventListener('DOMContentLoaded', function () {

  /* ---- Terminal typing effect ---- */
  const commands = [
    'open_to_work --status="associate software engineer"',
    './build.sh --project stickify-ecommerce',
    'git commit -m "shipped job portal auth"',
    'echo "let\'s build something"'
  ];
  let ci = 0, cj = 0, deleting = false;
  const typingEl = document.querySelector('.typing');

  function typeLoop() {
    if (!typingEl) return;
    const current = commands[ci];
    typingEl.textContent = deleting
      ? current.substring(0, cj--)
      : current.substring(0, cj++);

    if (!deleting && cj === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
    if (deleting && cj === 0) {
      deleting = false;
      ci = (ci + 1) % commands.length;
    }
    setTimeout(typeLoop, deleting ? 30 : 45);
  }
  typeLoop();

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => nav.classList.remove('active'))
    );
  }

  /* ---- Active tab tracking on scroll ---- */
  const tabs = document.querySelectorAll('.tab');
  const sections = Array.from(tabs).map(tab =>
    document.querySelector(tab.getAttribute('href'))
  ).filter(Boolean);

  function setActiveTab() {
    let currentIndex = 0;
    const scrollY = window.scrollY + 120;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollY) currentIndex = i;
    });
    tabs.forEach(tab => tab.classList.remove('active'));
    if (tabs[currentIndex]) tabs[currentIndex].classList.add('active');
  }
  window.addEventListener('scroll', setActiveTab, { passive: true });
  setActiveTab();

  /* ---- Lightweight scroll reveal (AOS replacement) ---- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
});
