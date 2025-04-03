// Chatbot Functionality

// DOM Elements
const chatbotToggle = document.querySelector(".chatbot-toggle")
const chatbotBox = document.querySelector(".chatbot-box")
const closeChat = document.querySelector(".close-chat")
const chatMessages = document.getElementById("chatbot-messages")
const chatInput = document.getElementById("chat-input")
const sendChat = document.getElementById("send-chat")
const suggestionBtns = document.querySelectorAll(".suggestion-btn")

// Chatbot responses
const chatbotResponses = {
  greeting: "Hi there! I'm Grace's virtual assistant. How can I help you today?",
  skills:
    "Grace is skilled in HTML, CSS, JavaScript, responsive design, UI/UX design, and web animations. She specializes in creating beautiful, functional websites that provide great user experiences.",
  projects:
    "Grace has worked on various projects including e-commerce websites, portfolio designs, weather applications, fitness trackers, and brand identity designs. You can check them out in the Projects section!",
  contact:
    "You can reach Grace via email at grace.wambui@example.com or by phone at +1 (234) 567-8901. Alternatively, you can use the contact form on the Contact page.",
  default: "I'm not sure I understand. Would you like to know about Grace's skills, projects, or contact information?",
  thanks: "You're welcome! Is there anything else you'd like to know?",
  bye: "Thanks for chatting! Feel free to reach out if you have more questions.",
}

// Declare trackInteraction (assuming it's a global function or imported elsewhere)
// If it's supposed to be imported, replace this with the appropriate import statement.
// For example: import { trackInteraction } from './utils';
// For now, we'll define it as an empty function to avoid errors.
const trackInteraction = () => {}

// Initialize chatbot
document.addEventListener("DOMContentLoaded", () => {
  if (chatbotToggle) {
    // Toggle chatbot visibility
    chatbotToggle.addEventListener("click", () => {
      chatbotBox.classList.toggle("active")

      // Track chatbot interaction for badges
      if (typeof trackInteraction === "function") {
        trackInteraction("chatbot_opened")
      }
    })

    // Close chatbot
    if (closeChat) {
      closeChat.addEventListener("click", () => {
        chatbotBox.classList.remove("active")
      })
    }

    // Send message on button click
    if (sendChat) {
      sendChat.addEventListener("click", sendMessage)
    }

    // Send message on Enter key
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage()
        }
      })
    }

    // Handle suggestion buttons
    if (suggestionBtns) {
      suggestionBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const query = this.getAttribute("data-query")
          handleSuggestion(query)
        })
      })
    }
  }
})

// Send message function
function sendMessage() {
  if (!chatInput || !chatInput.value.trim()) return

  const userMessage = chatInput.value.trim()
  addMessage(userMessage, "user")
  chatInput.value = ""

  // Show typing indicator
  showTypingIndicator()

  // Process response after a short delay
  setTimeout(() => {
    removeTypingIndicator()
    const response = getBotResponse(userMessage)
    addMessage(response, "bot")
  }, 1000)
}

// Handle suggestion button clicks
function handleSuggestion(query) {
  let message = ""

  switch (query) {
    case "skills":
      message = "What skills does Grace have?"
      break
    case "projects":
      message = "Tell me about Grace's projects"
      break
    case "contact":
      message = "How can I contact Grace?"
      break
    default:
      message = query
  }

  // Add user message
  addMessage(message, "user")

  // Show typing indicator
  showTypingIndicator()

  // Process response after a short delay
  setTimeout(() => {
    removeTypingIndicator()
    const response = getBotResponse(message)
    addMessage(response, "bot")
  }, 1000)
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.classList.add("message", sender)

  const messagePara = document.createElement("p")
  messagePara.textContent = text

  messageDiv.appendChild(messagePara)
  chatMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement("div")
  typingDiv.classList.add("message", "bot", "typing-indicator")

  const dots = document.createElement("div")
  dots.classList.add("typing-dots")

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span")
    dots.appendChild(dot)
  }

  typingDiv.appendChild(dots)
  chatMessages.appendChild(typingDiv)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.querySelector(".typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

// Get bot response based on user input
function getBotResponse(userMessage) {
  userMessage = userMessage.toLowerCase()

  // Check for keywords
  if (userMessage.includes("skill") || userMessage.includes("know") || userMessage.includes("do")) {
    return chatbotResponses.skills
  } else if (userMessage.includes("project") || userMessage.includes("work") || userMessage.includes("portfolio")) {
    return chatbotResponses.projects
  } else if (
    userMessage.includes("contact") ||
    userMessage.includes("email") ||
    userMessage.includes("phone") ||
    userMessage.includes("reach")
  ) {
    return chatbotResponses.contact
  } else if (userMessage.includes("thank") || userMessage.includes("thanks")) {
    return chatbotResponses.thanks
  } else if (userMessage.includes("bye") || userMessage.includes("goodbye")) {
    return chatbotResponses.bye
  } else {
    return chatbotResponses.default
  }
}

