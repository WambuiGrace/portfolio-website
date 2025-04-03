// QR Code Generator

// DOM Elements
const qrTabs = document.querySelectorAll(".qr-tab")
const qrCodeImage = document.getElementById("qr-code-image")
const downloadQrBtn = document.getElementById("download-qr")
const saveContactBtn = document.getElementById("save-contact")

// QR Code data and image paths
const qrData = {
  linkedin: {
    url: "https://www.linkedin.com/in/grace-mwangi-4201a4240/",
    imagePath: "/images/profile/linkedin-qrcode.png",
  },
  email: {
    url: "mailto:wambuigm55@gmail.com",
    imagePath: "/images/profile/email-qr-code.png",
  },
  phone: {
    url: "tel:+254 745272040",
    imagePath: "/images/profile/phone-qr-code.png",
  },
}

// Initialize QR Code display
document.addEventListener("DOMContentLoaded", () => {
  if (qrTabs) {
    // Display initial QR code (LinkedIn by default)
    displayQRCode("linkedin")

    // Tab switching
    qrTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        qrTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Display QR code for selected tab
        const type = this.getAttribute("data-tab")
        displayQRCode(type)
      })
    })
  }

  // Download QR code
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener("click", downloadQRCode)
  }

  // Save contact
  if (saveContactBtn) {
    saveContactBtn.addEventListener("click", saveContact)
  }
})

// Display QR code based on selected tab
function displayQRCode(type) {
  if (!qrCodeImage) return

  // Set the image source to the corresponding QR code image
  qrCodeImage.src = qrData[type].imagePath
  qrCodeImage.alt = `QR Code for ${type}: ${qrData[type].url}`
}

// Download QR code
function downloadQRCode() {
  // Get the active tab type
  const activeTab = document.querySelector(".qr-tab.active")
  const type = activeTab ? activeTab.getAttribute("data-tab") : "linkedin"

  // Create a temporary link element
  const link = document.createElement("a")
  link.href = qrData[type].imagePath
  link.download = `${type}-qr-code.png`

  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Save contact
function saveContact() {
  // Get the active tab type
  const activeTab = document.querySelector(".qr-tab.active")
  const type = activeTab ? activeTab.getAttribute("data-tab") : "linkedin"

  let contactInfo = ""

  switch (type) {
    case "linkedin":
      contactInfo = "LinkedIn: https://www.linkedin.com/in/grace-mwangi-4201a4240/"
      break
    case "email":
      contactInfo = "Email: wambuigm55@gmail.com"
      break
    case "phone":
      contactInfo = "Phone: +254 745272040"
      break
  }

  alert(`Contact information would be saved:
${contactInfo}`)
}

