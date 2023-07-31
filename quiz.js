const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of the following HTML Elements is used for making any text bold?',
    answers: [
      { text: '<p>', correct: false },
      { text: '<i>', correct: false },
      { text: '<li>', correct: false },
      { text: '<b>', correct: true }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Home Tool Markup Language', correct: false },
      { text: 'Hyperlinks and Text Markup Language', correct: true },
      { text: 'Hyper Text Markup Language', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'Which of the following characters indicate closing of a tag?',
    answers: [
      { text: '.', correct: false },
      { text: '/', correct: true },
      { text: '//', correct: false },
      { text: '!', correct: false }
    ]
  },
  {
    question: 'Which of the following tag is used to add a line-break in HTML?',
    answers: [
      { text: '<break>', correct: false },
      { text: '<br>', correct: true },
      { text: '</br>', correct: false },
      { text: '</break>', correct: false }
    ]
  }
]