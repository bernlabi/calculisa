'use strict';

// **** DOM Elements ********************
const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const lastResults = document.getElementById('lastResults');
const lastScore = localStorage.getItem('finalScore');
const lastAttempts = localStorage.getItem('totalAttempts');
const operatorDisplay = document.getElementById('operator');

let problem = 0;
let num1 = 0;
let num2 = 0;
let score = 0;
let attempts = 0;
answerInput.value = '';

lastResults.textContent = `Your last score was ${
  localStorage.getItem('finalScore') || 0
} out of ${localStorage.getItem('totalAttempts') || 0} attempts.`;

// **** Event Listeners ********************
startBtn.addEventListener('click', () => {
  startGame();
  answerInput.focus();
});

answerInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// **** Functions ********************
function generateRandomNumber(range) {
  return Math.floor(Math.random() * range); // range defines the numbers limit to be used
}

const multiplications = (() => {
  const multiply = (a, b) => {
    if (a === 0 || b === 0) return 0;
    if (a === 1) return b;
    if (b === 1) return a;
    if (a < 0 && b < 0) return multiply(-a, -b);
    if (a < 0 || b < 0) return -multiply(Math.abs(a), Math.abs(b));
    let result = 0;
    for (let i = 0; i < b; i++) {
      result += a;
    }
    return result;
  };
  return {
    multiply,
  };
})();

const additions = (() => {
  const add = (a, b) => {
    let result = 0;
    result = a + b;
    return result;
  };

  return {
    add,
  };
})();

const substractions = (() => {
  const substract = (a, b) => {
    let result = 0;
    result = a - b;
    return result;
  };

  return {
    substract,
  };
})();

function startGame() {
  answerInput.value = '';

  switch (generateProblem()) {
    case 1:
      console.log(problem);
      operatorDisplay.textContent = '+';
      num1 = generateRandomNumber(999);
      num2 = generateRandomNumber(999);
      additions.add(num1, num2);
      console.log(additions.add(num1, num2));
      break;
    case 2:
      console.log(problem);
      operatorDisplay.textContent = '-';
      num1 = generateRandomNumber(999);
      num2 = generateRandomNumber(999);
      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      substractions.substract(num1, num2);
      console.log(substractions.substract(num1, num2));
      break;
    case 3:
      console.log(problem);
      operatorDisplay.textContent = 'x';
      num1 = generateRandomNumber(5);
      num2 = generateRandomNumber(5);
      multiplications.multiply(num1, num2);
      console.log(multiplications.multiply(num1, num2));
      break;
    default:
      console.log('Something went wrong!!');
  }

  number1.textContent = num1;
  number2.textContent = num2;
  // multiplications.multiply(num1, num2);
  if (lastScore !== null && lastAttempts !== null) {
    return;
  } else {
    alert(
      'Welcome to Multipliz! Try to get as many correct answers as possible!'
    );
  }
}

function generateProblem() {
  problem = Math.floor(Math.random() * 3 + 1);
  return problem;
}

function checkAnswer() {
  console.log('value= ', typeof answerInput.value);
  if (answerInput.value != '' || answerInput.value != null) {
    if (
      answerInput.value ==
        multiplications.multiply(
          parseInt(number1.textContent),
          parseInt(number2.textContent)
        ) ||
      answerInput.value ==
        substractions.substract(
          parseInt(number1.textContent),
          parseInt(number2.textContent)
        ) ||
      answerInput.value ==
        additions.add(
          parseInt(number1.textContent),
          parseInt(number2.textContent)
        )
    ) {
      feedback.textContent = 'Correct!';
      incrementScore();
      incrementAttempts();
      updateScore();
      startGame();
    } else {
      feedback.textContent = 'Incorrect. Try again!';
      incrementAttempts();
      updateScore();
      answerInput.value = '';
    }
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} out of  ${attempts} attempt(s) `;
}

function incrementScore() {
  score++;
}

function incrementAttempts() {
  attempts++;
  if (attempts === 20) {
    updateScore();
    localStorage.setItem('finalScore', score);
    localStorage.setItem('totalAttempts', attempts);
    alert(`Game Over! Your final score is ${score} out of ${attempts}.`);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  attempts = 0;
  updateScore();
  location.reload();
}

updateScore();
