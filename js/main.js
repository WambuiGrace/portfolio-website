// Main JavaScript file

// DOM Elements
const navToggle = document.querySelector(".nav-toggle")
const navLinks = document.querySelector(".nav-links")
const navbar = document.querySelector(".navbar")
const modals = document.querySelectorAll(".modal")
const closeModalBtns = document.querySelectorAll(".close-modal")
const badgesNotification = document.getElementById("badges-notification")
const badgesModal = document.getElementById("badges-modal")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle for mobile
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close navigation when clicking a link (mobile)
  const navLinkItems = document.querySelectorAll(".nav-links a")
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Modal functionality
  if (badgesNotification) {
    badgesNotification.addEventListener("click", () => {
      badgesModal.classList.add("active")
    })
  }

  // Close modals
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal")
      modal.classList.remove("active")
    })
  })

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.classList.remove("active")
      })
    }
  })

  // Check if page has been visited before
  const isFirstVisit = !localStorage.getItem("visited")
  if (isFirstVisit) {
    localStorage.setItem("visited", "true")
  }
})

// Helper functions
function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function () {
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// Scroll animation for elements
function checkSlide() {
  const slideInElements = document.querySelectorAll(".slide-in")
  slideInElements.forEach((element) => {
    // Half way through the element
    const slideInAt = window.scrollY + window.innerHeight - element.offsetHeight / 2
    // Bottom of the element
    const elementBottom = element.offsetTop + element.offsetHeight
    const isHalfShown = slideInAt > element.offsetTop
    const isNotScrolledPast = window.scrollY < elementBottom

    if (isHalfShown && isNotScrolledPast) {
      element.classList.add("active")
    } else {
      element.classList.remove("active")
    }
  })
}

window.addEventListener("scroll", debounce(checkSlide))

