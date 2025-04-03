// Particles Animation for Hero Section

// DOM Elements
const particlesContainer = document.getElementById("particles-container")

// Configuration
const particlesConfig = {
  particleCount: 50,
  circleCount: 3,
  particleColors: ["rgba(37, 99, 235, 0.3)", "rgba(59, 130, 246, 0.3)", "rgba(96, 165, 250, 0.3)"],
  circleColors: ["rgba(37, 99, 235, 0.1)", "rgba(59, 130, 246, 0.1)", "rgba(96, 165, 250, 0.1)"],
  minSize: 3,
  maxSize: 8,
  minSpeed: 0.5,
  maxSpeed: 2,
  minCircleSize: 100,
  maxCircleSize: 300,
}

// Initialize particles
document.addEventListener("DOMContentLoaded", () => {
  if (particlesContainer) {
    createParticles()
    createCircles()
  }
})

// Create floating particles
function createParticles() {
  for (let i = 0; i < particlesConfig.particleCount; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Random properties
    const size = Math.random() * (particlesConfig.maxSize - particlesConfig.minSize) + particlesConfig.minSize
    const colorIndex = Math.floor(Math.random() * particlesConfig.particleColors.length)
    const x = Math.random() * 100
    const y = Math.random() * 100
    const speedX =
      (Math.random() * (particlesConfig.maxSpeed - particlesConfig.minSpeed) + particlesConfig.minSpeed) *
      (Math.random() > 0.5 ? 1 : -1)
    const speedY =
      (Math.random() * (particlesConfig.maxSpeed - particlesConfig.minSpeed) + particlesConfig.minSpeed) *
      (Math.random() > 0.5 ? 1 : -1)

    // Set styles
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = particlesConfig.particleColors[colorIndex]
    particle.style.left = `${x}%`
    particle.style.top = `${y}%`

    // Add to container
    particlesContainer.appendChild(particle)

    // Animate particle
    animateParticle(particle, speedX, speedY)
  }
}

// Create pulsing circles
function createCircles() {
  for (let i = 0; i < particlesConfig.circleCount; i++) {
    const circle = document.createElement("div")
    circle.classList.add("circle")

    // Random properties
    const size =
      Math.random() * (particlesConfig.maxCircleSize - particlesConfig.minCircleSize) + particlesConfig.minCircleSize
    const colorIndex = Math.floor(Math.random() * particlesConfig.circleColors.length)
    const x = Math.random() * 100
    const y = Math.random() * 100

    // Set styles
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.borderColor = particlesConfig.circleColors[colorIndex]
    circle.style.left = `${x}%`
    circle.style.top = `${y}%`

    // Add animation
    circle.style.animation = `pulse ${2 + Math.random() * 3}s ease-in-out infinite`
    circle.style.animationDelay = `${Math.random() * 2}s`

    // Add to container
    particlesContainer.appendChild(circle)
  }
}

// Animate particle movement
function animateParticle(particle, speedX, speedY) {
  let x = Number.parseFloat(particle.style.left)
  let y = Number.parseFloat(particle.style.top)

  function update() {
    // Update position
    x += speedX * 0.05
    y += speedY * 0.05

    // Boundary check
    if (x < 0) {
      x = 0
      speedX *= -1
    } else if (x > 100) {
      x = 100
      speedX *= -1
    }

    if (y < 0) {
      y = 0
      speedY *= -1
    } else if (y > 100) {
      y = 100
      speedY *= -1
    }

    // Apply position
    particle.style.left = `${x}%`
    particle.style.top = `${y}%`

    // Continue animation
    requestAnimationFrame(update)
  }

  update()
}

