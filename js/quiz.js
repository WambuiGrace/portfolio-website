// Personality Quiz Functionality

// DOM Elements
const quizContainer = document.getElementById("quiz-container")
const quizQuestions = document.getElementById("quiz-questions")
const quizResult = document.getElementById("quiz-result")
const progressBar = document.getElementById("quiz-progress-bar")
const startQuizBtn = document.getElementById("start-quiz")
const nextQuestionBtn = document.getElementById("next-question")
const retakeQuizBtn = document.getElementById("retake-quiz")

// Quiz questions
const questions = [
  {
    question: "How do you prefer to work?",
    options: [
      "Independently with minimal supervision",
      "In a collaborative team environment",
      "A mix of both, depending on the task",
      "In a structured environment with clear guidelines",
    ],
  },
  {
    question: "What motivates you most in a project?",
    options: [
      "Creative freedom and innovation",
      "Solving complex problems",
      "Making a positive impact on users",
      "Learning new skills and technologies",
    ],
  },
  {
    question: "How do you handle deadlines?",
    options: [
      "I work best under pressure, close to the deadline",
      "I plan everything in advance and finish early",
      "I maintain a steady pace throughout the project",
      "I adapt my approach based on the project's needs",
    ],
  },
  {
    question: "What's your approach to feedback?",
    options: [
      "I actively seek feedback to improve my work",
      "I prefer to perfect my work before showing it to others",
      "I'm open to feedback but stand by my creative decisions",
      "I value collaborative feedback sessions",
    ],
  },
  {
    question: "What environment helps you work best?",
    options: [
      "A quiet, distraction-free space",
      "A bustling, energetic environment",
      "Changing environments based on my mood",
      "A structured office setting",
    ],
  },
]

// Personality types
const personalityTypes = [
  {
    type: "The Innovator",
    description:
      "You thrive on creative freedom and thinking outside the box. You're always looking for new approaches and aren't afraid to take risks to achieve something extraordinary.",
    icon: "fa-lightbulb",
  },
  {
    type: "The Strategist",
    description:
      "You excel at planning and organization. Your methodical approach ensures projects are completed efficiently and to a high standard.",
    icon: "fa-chess",
  },
  {
    type: "The Collaborator",
    description:
      "You shine in team environments where ideas can be shared freely. You value input from others and use it to create something greater than the sum of its parts.",
    icon: "fa-users",
  },
  {
    type: "The Adaptable",
    description:
      "You're flexible and responsive to changing circumstances. You can switch between different work styles and environments with ease.",
    icon: "fa-sync-alt",
  },
]

// Quiz state
let currentQuestion = 0
let answers = []

// Declare trackInteraction (assuming it's a global function or imported elsewhere)
// If it's supposed to be imported, replace this with the appropriate import statement
const trackInteraction = (event) => {
  console.log("Interaction tracked:", event)
  // In a real application, this would send data to an analytics service
}

// Initialize quiz
document.addEventListener("DOMContentLoaded", () => {
  if (quizContainer) {
    // Start quiz button
    if (startQuizBtn) {
      startQuizBtn.addEventListener("click", startQuiz)
    }

    // Next question button
    if (nextQuestionBtn) {
      nextQuestionBtn.addEventListener("click", nextQuestion)
    }

    // Retake quiz button
    if (retakeQuizBtn) {
      retakeQuizBtn.addEventListener("click", retakeQuiz)
    }
  }
})

// Start quiz
function startQuiz() {
  currentQuestion = 0
  answers = []

  if (startQuizBtn) {
    startQuizBtn.style.display = "none"
  }

  if (nextQuestionBtn) {
    nextQuestionBtn.style.display = "block"
  }

  showQuestion()
  updateProgressBar()
}

// Show current question
function showQuestion() {
  if (!quizQuestions) return

  quizQuestions.innerHTML = ""

  const questionDiv = document.createElement("div")
  questionDiv.classList.add("quiz-question")

  const questionTitle = document.createElement("h3")
  questionTitle.textContent = questions[currentQuestion].question
  questionDiv.appendChild(questionTitle)

  const optionsDiv = document.createElement("div")
  optionsDiv.classList.add("quiz-options")

  questions[currentQuestion].options.forEach((option, index) => {
    const optionDiv = document.createElement("div")
    optionDiv.classList.add("quiz-option")
    optionDiv.textContent = option
    optionDiv.setAttribute("data-index", index)

    optionDiv.addEventListener("click", function () {
      // Remove selected class from all options
      document.querySelectorAll(".quiz-option").forEach((opt) => {
        opt.classList.remove("selected")
      })

      // Add selected class to clicked option
      this.classList.add("selected")
    })

    optionsDiv.appendChild(optionDiv)
  })

  questionDiv.appendChild(optionsDiv)
  quizQuestions.appendChild(questionDiv)
}

// Go to next question
function nextQuestion() {
  const selectedOption = document.querySelector(".quiz-option.selected")

  if (!selectedOption) {
    alert("Please select an option to continue")
    return
  }

  // Save answer
  answers.push(Number.parseInt(selectedOption.getAttribute("data-index")))

  // Move to next question or show result
  if (currentQuestion < questions.length - 1) {
    currentQuestion++
    showQuestion()
    updateProgressBar()
  } else {
    showResult()
  }
}

// Update progress bar
function updateProgressBar() {
  if (progressBar) {
    const progress = ((currentQuestion + 1) / questions.length) * 100
    progressBar.style.width = `${progress}%`
  }
}

// Show quiz result
function showResult() {
  if (!quizResult || !quizQuestions || !nextQuestionBtn || !retakeQuizBtn) return

  // Hide questions and next button
  quizQuestions.style.display = "none"
  nextQuestionBtn.style.display = "none"

  // Show result and retake button
  quizResult.style.display = "block"
  retakeQuizBtn.style.display = "block"

  // Calculate personality type
  const personalityType = calculatePersonalityType()

  // Display result
  quizResult.innerHTML = `
        <div class="result-badge">
            <i class="fas ${personalityType.icon}"></i>
        </div>
        <h3>${personalityType.type}</h3>
        <p>${personalityType.description}</p>
    `

  // Unlock badge
  if (typeof trackInteraction === "function") {
    trackInteraction("quiz_completed")
  }
}

// Calculate personality type based on answers
function calculatePersonalityType() {
  // Count frequency of each answer type
  const counts = [0, 0, 0, 0]

  answers.forEach((answer) => {
    counts[answer]++
  })

  // Find most frequent answer type
  let maxCount = 0
  let maxIndex = 0

  counts.forEach((count, index) => {
    if (count > maxCount) {
      maxCount = count
      maxIndex = index
    }
  })

  return personalityTypes[maxIndex]
}

// Retake quiz
function retakeQuiz() {
  if (!quizResult || !quizQuestions) return

  // Hide result
  quizResult.style.display = "none"

  // Show questions
  quizQuestions.style.display = "block"

  // Restart quiz
  startQuiz()
}

