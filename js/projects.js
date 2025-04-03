// Projects Page Functionality

// DOM Elements
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const viewProjectBtns = document.querySelectorAll(".view-project-btn")
const projectModal = document.getElementById("project-modal")
const closeModal = document.querySelector(".close-modal")
const modalProjectTitle = document.getElementById("modal-project-title")
const modalProjectImage = document.getElementById("modal-project-image")
const modalProjectDescription = document.getElementById("modal-project-description")
const modalProjectTechnologies = document.getElementById("modal-project-technologies")
const modalProjectFeatures = document.getElementById("modal-project-features")
const modalProjectCode = document.getElementById("modal-project-code")
const modalProjectDemo = document.getElementById("modal-project-demo")

// Project data
const projectsData = {
  project1: {
    title: "E-Commerce Website",
    image: "/images/projects/ecommerce.png",
    description:
      "A fully responsive e-commerce platform with product listings, shopping cart functionality, and checkout process. The website features a clean, modern design with intuitive navigation and smooth animations.",
    technologies: ["HTML", "CSS", "JavaScript", "LocalStorage API"],
    features: [
      "Responsive design for all device sizes",
      "Product filtering and sorting",
      "Shopping cart with localStorage persistence",
      "Product quick view and detailed pages",
      "Checkout form with validation",
    ],
    codeLink: "#",
    demoLink: "#",
  },
  project2: {
    title: "Portfolio Design",
    image: "/images/projects/portfolio.png",
    description:
      "A creative portfolio website with animations and interactions. This project showcases a modern approach to personal branding with a focus on visual appeal and user experience.",
    technologies: ["HTML", "CSS", "JavaScript", "Animation Libraries"],
    features: [
      "Interactive UI elements",
      "Smooth page transitions",
      "Responsive layout",
      "Custom animations",
      "Dark/light mode toggle",
    ],
    codeLink: "#",
    demoLink: "#",
  },
  project3: {
    title: "Weather App",
    image: "/images/projects/weather.png",
    description:
      "A weather application that displays current and forecasted weather conditions for any location. The app uses a weather API to fetch real-time data and presents it in a user-friendly interface.",
    technologies: ["HTML", "CSS", "JavaScript", "Weather API", "Geolocation API"],
    features: [
      "Current weather conditions",
      "5-day forecast",
      "Location search",
      "Geolocation detection",
      "Weather alerts and notifications",
      "Dynamic background based on weather",
    ],
    codeLink: "#",
    demoLink: "#",
  },
  project4: {
    title: "Fitness Tracker",
    image: "/images/projects/fitness.png",
    description:
      "A mobile-first fitness tracking application with progress visualization. This app allows users to track their workouts, set goals, and monitor their progress over time.",
    technologies: ["HTML", "CSS", "JavaScript", "Chart.js", "LocalStorage API"],
    features: [
      "Workout logging and tracking",
      "Progress charts and statistics",
      "Goal setting and achievements",
      "Workout suggestions",
      "Responsive design optimized for mobile",
    ],
    codeLink: "#",
    demoLink: "#",
  },
  project5: {
    title: "Brand Identity",
    image: "/images/projects/brand.jpeg",
    description:
      "A complete brand identity design for a local coffee shop. This project included logo design, color palette selection, typography, and brand guidelines.",
    technologies: ["Design", "Branding", "Logo Design", "Typography"],
    features: [
      "Logo design with variations",
      "Color palette and typography selection",
      "Brand guidelines document",
      "Mockups for various applications",
      "Social media templates",
    ],
    codeLink: "#",
    demoLink: "#",
  },
  project6: {
    title: "Task Manager",
    image: "/images/projects/task.jpg",
    description:
      "A task management application with drag-and-drop functionality. This app helps users organize their tasks into categories and track their progress.",
    technologies: ["HTML", "CSS", "JavaScript", "Drag & Drop API", "LocalStorage API"],
    features: [
      "Task creation and editing",
      "Drag-and-drop task organization",
      "Task categories and priorities",
      "Due dates and reminders",
      "Progress tracking",
      "Data persistence with localStorage",
    ],
    codeLink: "#",
    demoLink: "#",
  },
}

// Declare trackInteraction (assuming it's defined elsewhere or should be a no-op)
const trackInteraction = trackInteraction || (() => {})

// Initialize projects page
document.addEventListener("DOMContentLoaded", () => {
  // Filter buttons
  if (filterBtns) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Filter projects
        const filter = this.getAttribute("data-filter")
        filterProjects(filter)
      })
    })
  }

  // View project buttons
  if (viewProjectBtns) {
    viewProjectBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project")
        showProjectDetails(projectId)
      })
    })
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      projectModal.classList.remove("active")
    })
  }

  // Close modal when clicking outside
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active")
      }
    })
  }
})

// Filter projects
function filterProjects(filter) {
  projectCards.forEach((card) => {
    if (filter === "all" || card.getAttribute("data-category") === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Show project details in modal
function showProjectDetails(projectId) {
  const project = projectsData[projectId]

  if (!project) return

  // Set modal content
  modalProjectTitle.textContent = project.title
  modalProjectImage.src = project.image
  modalProjectImage.alt = project.title
  modalProjectDescription.textContent = project.description

  // Set technologies
  modalProjectTechnologies.innerHTML = ""
  project.technologies.forEach((tech) => {
    const span = document.createElement("span")
    span.textContent = tech
    modalProjectTechnologies.appendChild(span)
  })

  // Set features
  modalProjectFeatures.innerHTML = ""
  project.features.forEach((feature) => {
    const li = document.createElement("li")
    li.textContent = feature
    modalProjectFeatures.appendChild(li)
  })

  // Set links
  modalProjectCode.href = project.codeLink
  modalProjectDemo.href = project.demoLink

  // Show modal
  projectModal.classList.add("active")

  // Track project view for badges
  if (typeof trackInteraction === "function") {
    trackInteraction("project_viewed")
  }
}

