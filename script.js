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
const selectedOperation = document.getElementById('operation');

let problem = 0;
let num1 = 0;
let num2 = 0;
let score = 0;
let attempts = 0;
let result = 0;
answerInput.value = '';
let num1Digit2 = 0;
let num2Digit2 = 0;

function oprationSelector() {
  const operation = selectedOperation.value;
  return operation;
}

function startGame() {
  const operation = oprationSelector();
  if (operation === 'addition') {
    additionProblem();
  } else if (operation === 'subtraction') {
    subtractionProblem();
  } else if (operation === 'multiplication') {
    multiplicationProblem();
  } else if (operation === 'random') {
    startRandom();
  } else {
    alert('Please select an option to start the game.');
  }
}

// **** Display Last Results ************
lastResults.textContent = `Your last score was ${
  localStorage.getItem('finalScore') || 0
} out of ${localStorage.getItem('totalAttempts') || 0} attempts.`;

// **** Event Listeners *******************************************************************
startBtn.addEventListener('click', () => {
  startGame();
  answerInput.focus();
});

answerInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// **** Functions *************************************************************************

function generateRandomNumber(range) {
  return Math.floor(Math.random() * range); // range defines the numbers limit to be used
}

// ** Addition Module ***********
const additions = (() => {
  const add = (a, b) => {
    result = a + b;
    return result;
  };

  return {
    add,
  };
})();

function additionProblem() {
  answerInput.value = '';
  operatorDisplay.textContent = '+';
  num1 = generateRandomNumber(99);
  num2 = generateRandomNumber(99);

  // additions.add(num1, num2);
  result = num1 + num2;
  number1.textContent = num1;
  number2.textContent = num2;
  return result;
}

// ** Subtraction Problem ***********
function subtractionProblem() {
  answerInput.value = '';
  operatorDisplay.textContent = '-';

  num1 = Math.floor(Math.random() * 99) + 1;
  num2 = Math.floor(Math.random() * 99) + 1;

  // If num1 < num2, swap them
  if (num1 < num2) {
    [num1, num2] = [num2, num1];
  }
  // If num2 has two digits, check the ones digit constraint
  if (num2 >= 10) {
    const onesDigitNum1 = num1 % 10;
    const onesDigitNum2 = num2 % 10;

    // If ones digit of num2 > ones digit of num1, adjust num2
    if (onesDigitNum2 > onesDigitNum1) {
      // Reduce num2's ones digit to be <= num1's ones digit
      num2 =
        Math.floor(num2 / 10) * 10 + Math.min(onesDigitNum2, onesDigitNum1);
    }
  }
  result = num1 - num2;
  number1.textContent = num1;
  number2.textContent = num2;
  return result;
}

function multiplicationProblem() {
  answerInput.value = '';
  operatorDisplay.textContent = 'x';

  num1 = generateRandomNumber(11);
  while (num1 === 6 || num1 === 7 || num1 === 8 || num1 === 9) {
    num1 = generateRandomNumber(11);
  }
  num2 = generateRandomNumber(11);
  while (num2 === 6 || num2 === 7 || num2 === 8 || num2 === 9) {
    num2 = generateRandomNumber(11);
  }
  // multiplications.multiply(num1, num2);

  result = num1 * num2;
  number1.textContent = num1;
  number2.textContent = num2;
  return result;
}

// ** Game Logic *******************
function startRandom() {
  answerInput.value = '';

  switch (generateProblem()) {
    case 1:
      additionProblem();
      break;

    case 2:
      subtractionProblem();
      break;

    case 3:
    case 4:
    case 5:
      multiplicationProblem();
      break;

    default:
      console.log('Something went wrong!!');
  }

  number1.textContent = num1;
  number2.textContent = num2;
}

// ** Generate Problem Type ***********
function generateProblem() {
  problem = Math.floor(Math.random() * 5 + 1);
  return problem;
}

// ** Check Answer *******************
function checkAnswer() {
  if (
    answerInput.value === '' ||
    answerInput.value === null ||
    isNaN(answerInput.value)
  ) {
    alert('Please enter a valid number.');
    return;
  }

  if (Number(answerInput.value) === result) {
    feedback.textContent = 'Correct!';
    feedback.style.color = 'green';
    incrementScore();
    incrementAttempts();
    updateScore();
    startGame();
  } else {
    feedback.textContent = 'Incorrect. Try again!';
    feedback.style.color = 'red';
    incrementAttempts();
    updateScore();
    answerInput.value = '';
  }
}

// ** Update Score Display ***********
function updateScore() {
  scoreDisplay.textContent = `Score: ${score} out of  ${attempts} attempt(s) `;
}

// ** Increment Score ***************
function incrementScore() {
  score++;
}

// ** Increment Attempts ************
function incrementAttempts() {
  attempts++;
  if (attempts === 10) {
    updateScore();
    localStorage.setItem('finalScore', score);
    localStorage.setItem('totalAttempts', attempts);
    alert(`Game Over! Your final score is ${score} out of ${attempts}.`);
    resetGame();
  }
}

// ** Reset Game ********************
function resetGame() {
  score = 0;
  attempts = 0;
  updateScore();
  location.reload();
}

updateScore();
