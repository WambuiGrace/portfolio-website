// Theme Toggle Functionality

// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const themeWrapper = document.querySelector(".theme-wrapper")

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")

  // Apply saved theme or default to light
  if (savedTheme === "dark") {
    themeWrapper.classList.remove("light-theme")
    themeWrapper.classList.add("dark-theme")
  } else {
    themeWrapper.classList.add("light-theme")
    themeWrapper.classList.remove("dark-theme")
  }

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
})

// Toggle theme function
function toggleTheme() {
  // Toggle theme class
  if (themeWrapper.classList.contains("light-theme")) {
    themeWrapper.classList.remove("light-theme")
    themeWrapper.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")

    // Unlock "Night Owl" badge if dark mode is enabled
    if (typeof unlockBadge === "function") {
      unlockBadge("night-owl")
    }
  } else {
    themeWrapper.classList.add("light-theme")
    themeWrapper.classList.remove("dark-theme")
    localStorage.setItem("theme", "light")
  }
}

