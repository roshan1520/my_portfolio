document.addEventListener('DOMContentLoaded', function () {
  /* ---- Terminal typing effect ---- */
  const commands = [
    'open_to_work --status="associate software engineer"',
    'git checkout learning/power-platform',
    './deploy.sh --target sharepoint-power-apps',
    './build.sh --project stickify-ecommerce',
    'echo "let\'s build something"',
  ]
  let ci = 0,
    cj = 0,
    deleting = false
  const typingEl = document.querySelector('.typing')

  function typeLoop() {
    if (!typingEl) return
    const current = commands[ci]
    typingEl.textContent = deleting
      ? current.substring(0, cj--)
      : current.substring(0, cj++)

    if (!deleting && cj === current.length) {
      deleting = true
      setTimeout(typeLoop, 1400)
      return
    }
    if (deleting && cj === 0) {
      deleting = false
      ci = (ci + 1) % commands.length
    }
    setTimeout(typeLoop, deleting ? 30 : 45)
  }
  typeLoop()

  /* ---- Sidebar drawer (mobile) ---- */
  const toggle = document.getElementById('menu-toggle')
  const sidebar = document.getElementById('sidebar')
  const backdrop = document.getElementById('drawer-backdrop')

  function openDrawer() {
    sidebar.classList.add('open')
    backdrop.classList.add('open')
  }
  function closeDrawer() {
    sidebar.classList.remove('open')
    backdrop.classList.remove('open')
  }
  if (toggle && sidebar && backdrop) {
    toggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeDrawer() : openDrawer()
    })
    backdrop.addEventListener('click', closeDrawer)
    sidebar
      .querySelectorAll('a')
      .forEach((link) => link.addEventListener('click', closeDrawer))
  }

  /* ---- Active file tracking on scroll (sidebar + breadcrumb + statusbar) ---- */
  const fileItems = document.querySelectorAll('.file-item')
  const sections = Array.from(fileItems)
    .map((item) => document.querySelector(item.getAttribute('href')))
    .filter(Boolean)

  const crumbEl = document.getElementById('crumb-current')
  const statusFileEl = document.getElementById('statusbar-file')

  function fileLabelFor(item) {
    return item.textContent.trim()
  }

  function setActiveFile() {
    let currentIndex = 0
    const scrollY = window.scrollY + 140
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollY) currentIndex = i
    })
    fileItems.forEach((item) => item.classList.remove('active'))
    const active = fileItems[currentIndex]
    if (active) {
      active.classList.add('active')
      const label = fileLabelFor(active)
      if (crumbEl) crumbEl.textContent = label
      if (statusFileEl) statusFileEl.textContent = label
    }
  }
  window.addEventListener('scroll', setActiveFile, { passive: true })
  setActiveFile()

  /* ---- Lightweight scroll reveal (AOS replacement) ---- */
  const revealEls = document.querySelectorAll('[data-aos]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  revealEls.forEach((el) => observer.observe(el))
})
