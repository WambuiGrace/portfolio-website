// Gamification System

// Badge definitions
const badges = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Visited all main sections of the portfolio",
    icon: "fa-compass",
    unlocked: false,
  },
  {
    id: "curious-mind",
    name: "Curious Mind",
    description: "Completed the personality quiz",
    icon: "fa-brain",
    unlocked: false,
  },
  {
    id: "project-enthusiast",
    name: "Project Enthusiast",
    description: "Viewed 3+ projects in detail",
    icon: "fa-folder-open",
    unlocked: false,
  },
  {
    id: "lets-connect",
    name: "Let's Connect",
    description: "Used the contact form",
    icon: "fa-handshake",
    unlocked: false,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Enabled dark mode",
    icon: "fa-moon",
    unlocked: false,
  },
]

// DOM Elements
const badgesContainer = document.getElementById("badges-container")
const badgeNotification = document.getElementById("badges-notification")
const badgeDot = document.querySelector(".badge-dot")

// Initialize badges system
document.addEventListener("DOMContentLoaded", () => {
  // Load saved badges from localStorage
  loadBadges()

  // Render badges in modal
  renderBadges()

  // Track page visit
  trackPageVisit()

  // Check if all pages have been visited
  checkExplorerBadge()
})

// Load badges from localStorage
function loadBadges() {
  const savedBadges = localStorage.getItem("badges")

  if (savedBadges) {
    const parsedBadges = JSON.parse(savedBadges)

    // Update badges with saved state
    badges.forEach((badge, index) => {
      if (parsedBadges[index]) {
        badge.unlocked = parsedBadges[index].unlocked
      }
    })
  }
}

// Save badges to localStorage
function saveBadges() {
  localStorage.setItem("badges", JSON.stringify(badges))
}

// Render badges in modal
function renderBadges() {
  if (!badgesContainer) return

  badgesContainer.innerHTML = ""

  badges.forEach((badge) => {
    const badgeItem = document.createElement("div")
    badgeItem.classList.add("badge-item")

    if (!badge.unlocked) {
      badgeItem.classList.add("locked")
    }

    badgeItem.innerHTML = `
            <div class="badge-icon-container">
                <i class="fas ${badge.icon}"></i>
            </div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            <div class="badge-status ${badge.unlocked ? "unlocked" : "locked"}">
                ${badge.unlocked ? "Unlocked" : "Locked"}
            </div>
        `

    badgesContainer.appendChild(badgeItem)
  })
}

// Unlock a badge
function unlockBadge(badgeId) {
  const badge = badges.find((b) => b.id === badgeId)

  if (badge && !badge.unlocked) {
    badge.unlocked = true
    saveBadges()
    renderBadges()
    showBadgeNotification()
    showToast(`🏆 Achievement Unlocked: ${badge.name}`)
  }
}

// Show badge notification
function showBadgeNotification() {
  if (badgeDot) {
    badgeDot.classList.add("active")
  }
}

// Track page visit
function trackPageVisit() {
  const currentPage = window.location.pathname
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]")

  if (!visitedPages.includes(currentPage)) {
    visitedPages.push(currentPage)
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages))
  }
}

// Check if all pages have been visited
function checkExplorerBadge() {
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]")
  const requiredPages = ["/index.html", "/about.html", "/projects.html", "/contact.html"]

  // Check if all required pages have been visited
  const allVisited = requiredPages.every((page) => {
    return visitedPages.some(
      (visitedPage) => visitedPage.includes(page) || (page === "/index.html" && visitedPage === "/"),
    )
  })

  if (allVisited) {
    unlockBadge("explorer")
  }
}

// Track interactions
function trackInteraction(interactionType) {
  switch (interactionType) {
    case "quiz_completed":
      unlockBadge("curious-mind")
      break
    case "project_viewed":
      trackProjectViews()
      break
    case "contact_submitted":
      unlockBadge("lets-connect")
      break
  }
}

// Track project views
function trackProjectViews() {
  const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "[]")
  const currentProject = document.getElementById("modal-project-title").textContent

  if (!viewedProjects.includes(currentProject)) {
    viewedProjects.push(currentProject)
    localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects))
  }

  if (viewedProjects.length >= 3) {
    unlockBadge("project-enthusiast")
  }
}

// Show toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement("div")
  toast.classList.add("toast")
  toast.textContent = message

  // Add to document
  document.body.appendChild(toast)

  // Show toast
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Remove toast after delay
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Add toast styles if not already in CSS
const toastStyles = `
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: var(--primary-color);
    color: white;
    padding: 12px 20px;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    z-index: 1000;
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`

// Add toast styles to document
const styleElement = document.createElement("style")
styleElement.textContent = toastStyles
document.head.appendChild(styleElement)

