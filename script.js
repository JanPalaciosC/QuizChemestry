const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
var success = 0;
var wrong = 0;
var containerAnswer;
var containerWrong;

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
  //const correct = selectedButton.dataset.correct
  //setStatusClass(document.body, correct) 
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    if(selectedButton == true){
      disableButtons();
      //countSuccess(); <-- Function count
      console.log("button disabled");
    }else{
      //countWrong(); <-- Function count
      disableButtons();
      console.log("button disabled");
    }
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    alert("Juego Finalizado"); //Alert end game, here is where we use "our" alert
  }
 

}

function setStatusClass(element, correct) {

  if (correct) {
    element.classList.add('correct')
   

  }else{
    element.classList.add('wrong')
  }

}

function clearStatusClass(element) {

  element.classList.remove('correct')
  element.classList.remove('wrong')

}

function disableButtons(){ //After a answer is selected, disabled all buttons, but the nexts answer will not
  answerButtonsElement.disabled = true;
}

function countSuccess(){
    success++;
    containerAnswer = document.getElementById('resultscontainer').innerHTML = "Respuestas Acertadas: " + success;
}

function countWrong(){
    wrong++;
    containerWrong = document.getElementById('resultscontainerWrong').innerHTML = "Respuestas Erroneas: " + wrong;
}

const questions = [

  {
    question: '¿Cual de estos elementos, no es un metal?',
    answers: [
      { text: 'Antimonio', correct: true },
      { text: 'Osmio', correct: false },
      { text: 'Circonio', correct: false },
      { text: 'Dubnio', correct: false }
    ]
  },
  {
    question: '¿Cual de estos elementos, es un "no metal gaseoso"?',
    answers: [
      { text: 'Fluor', correct: true },
      { text: 'Carbono', correct: false },
      { text: 'Selenio', correct: false },
      { text: 'Azufre', correct: false }
    ]
  },
  {
    question: '¿A que elemento pertenece este simbolo "Y"?',
    answers: [
      { text: 'Yodo', correct: false },
      { text: 'Itrio', correct: true },
      { text: 'Livermonio', correct: false },
      { text: 'Iridio', correct: false }
    ]
  },
  {
    question: 'El Francio es un alcalino.',
    answers: [
      { text: 'Falso', correct: false },
      { text: 'Verdadero', correct: true }
    ]
  }

]
