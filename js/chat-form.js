// Conversational Contact Form

// DOM Elements
const chatForm = document.getElementById("chat-form")
const chatFormMessages = document.getElementById("chat-form-messages")
const chatFormInput = document.getElementById("chat-form-input")
const chatFormField = document.getElementById("chat-form-field")
const chatFormSubmit = document.getElementById("chat-form-submit")

// Form data
const formData = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

// Form flow
const formFlow = [
  {
    field: "name",
    question: "Hi there! I'd love to hear from you. What's your name?",
    placeholder: "Type your name...",
    validation: (value) => value.trim().length > 0,
    errorMessage: "Please enter your name to continue.",
  },
  {
    field: "email",
    question: (name) => `Nice to meet you, ${name}! What's your email address so I can get back to you?`,
    placeholder: "Type your email...",
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "Please enter a valid email address.",
  },
  {
    field: "subject",
    question: "Great! What's the subject of your message?",
    placeholder: "Type a subject...",
    validation: (value) => value.trim().length > 0,
    errorMessage: "Please enter a subject for your message.",
  },
  {
    field: "message",
    question: "Awesome! Now, please tell me how I can help you:",
    placeholder: "Type your message...",
    validation: (value) => value.trim().length > 10,
    errorMessage: "Please enter a message with at least 10 characters.",
  },
]

// Current step in the form flow
let currentStep = 0

// Declare trackInteraction (assuming it's a global function or imported elsewhere)
const trackInteraction =
  window.trackInteraction ||
  (() => {
    console.log("trackInteraction function is not defined.")
  })

// Initialize chat form
document.addEventListener("DOMContentLoaded", () => {
  if (chatForm && chatFormSubmit) {
    // Submit button event listener
    chatFormSubmit.addEventListener("click", submitFormInput)

    // Enter key event listener
    if (chatFormField) {
      chatFormField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          submitFormInput()
        }
      })
    }
  }
})

// Submit form input
function submitFormInput() {
  if (!chatFormField) return

  const value = chatFormField.value.trim()
  const currentField = formFlow[currentStep].field

  // Validate input
  if (!formFlow[currentStep].validation(value)) {
    showErrorMessage(formFlow[currentStep].errorMessage)
    return
  }

  // Add user message to chat
  addMessage(value, "user")

  // Save input to form data
  formData[currentField] = value

  // Clear input field
  chatFormField.value = ""

  // Show typing indicator
  showTypingIndicator()

  // Process next step after a short delay
  setTimeout(() => {
    removeTypingIndicator()

    // If this was the last step, submit the form
    if (currentStep === formFlow.length - 1) {
      submitForm()
    } else {
      // Otherwise, move to next step
      currentStep++
      showNextQuestion()
    }
  }, 1000)
}

// Show next question
function showNextQuestion() {
  const nextStep = formFlow[currentStep]
  let question = nextStep.question

  // If question is a function, call it with form data
  if (typeof question === "function") {
    question = question(formData.name)
  }

  // Add bot message to chat
  addMessage(question, "bot")

  // Update input field placeholder
  if (chatFormField) {
    chatFormField.placeholder = nextStep.placeholder
    chatFormField.setAttribute("data-field", nextStep.field)

    // Focus input field
    chatFormField.focus()
  }
}

// Add message to chat
function addMessage(text, sender) {
  if (!chatFormMessages) return

  const messageDiv = document.createElement("div")
  messageDiv.classList.add("chat-message", sender)

  const messagePara = document.createElement("p")
  messagePara.textContent = text

  messageDiv.appendChild(messagePara)
  chatFormMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatFormMessages.scrollTop = chatFormMessages.scrollHeight
}

// Show error message
function showErrorMessage(message) {
  if (!chatFormMessages) return

  const errorDiv = document.createElement("div")
  errorDiv.classList.add("chat-message", "bot", "error")

  const errorPara = document.createElement("p")
  errorPara.textContent = message

  errorDiv.appendChild(errorPara)
  chatFormMessages.appendChild(errorDiv)

  // Scroll to bottom
  chatFormMessages.scrollTop = chatFormMessages.scrollHeight

  // Shake input field
  if (chatFormField) {
    chatFormField.classList.add("shake")
    setTimeout(() => {
      chatFormField.classList.remove("shake")
    }, 500)
  }
}

// Show typing indicator
function showTypingIndicator() {
  if (!chatFormMessages) return

  const typingDiv = document.createElement("div")
  typingDiv.classList.add("chat-message", "bot", "typing-indicator")

  const dots = document.createElement("div")
  dots.classList.add("typing-dots")

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span")
    dots.appendChild(dot)
  }

  typingDiv.appendChild(dots)
  chatFormMessages.appendChild(typingDiv)

  // Scroll to bottom
  chatFormMessages.scrollTop = chatFormMessages.scrollHeight
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.querySelector(".typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

// Submit form
function submitForm() {
  if (!chatFormInput || !chatFormMessages) return

  // Hide input container
  chatFormInput.style.display = "none"

  // Show success message
  addMessage(
    `Thank you, ${formData.name}! Your message has been sent. I'll get back to you as soon as possible at ${formData.email}.`,
    "bot",
  )

  // In a real implementation, you would send the form data to a server
  console.log("Form submitted:", formData)

  // Unlock badge
  if (typeof trackInteraction === "function") {
    trackInteraction("contact_submitted")
  }
}

// Add shake animation style if not already in CSS
const shakeStyle = `
.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% {
        transform: translateX(-1px);
    }
    20%, 80% {
        transform: translateX(2px);
    }
    30%, 50%, 70% {
        transform: translateX(-4px);
    }
    40%, 60% {
        transform: translateX(4px);
    }
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--text-light);
    animation: typing-dot 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) {
    animation-delay: 0s;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing-dot {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
`

// Add shake style to document
const styleElement = document.createElement("style")
styleElement.textContent = shakeStyle
document.head.appendChild(styleElement)

