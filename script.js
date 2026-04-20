document.addEventListener('DOMContentLoaded', function () {
  const roles = [
    'Full Stack Developer',
    'Java Developer',
    'React Developer',
    'Python Developer',
  ]

  let i = 0
  let j = 0
  let current = ''
  let isDeleting = false

  const element = document.querySelector('.typing')

  function typeEffect() {
    if (!element) return

    current = roles[i]

    if (isDeleting) {
      element.textContent = current.substring(0, j--)
    } else {
      element.textContent = current.substring(0, j++)
    }

    if (!isDeleting && j === current.length) {
      isDeleting = true
      setTimeout(typeEffect, 1000)
      return
    }

    if (isDeleting && j === 0) {
      isDeleting = false
      i = (i + 1) % roles.length
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100)
  }

  typeEffect()
})

const toggle = document.getElementById('menu-toggle')
const nav = document.getElementById('nav-menu')

toggle.addEventListener('click', () => {
  nav.classList.toggle('active')
})
