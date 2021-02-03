// loading a function from an external dependency
//require is to load modules
const prompt = require("readline-sync").question;

// defining unchanging global variables, 
//accounting for different format inputs
const acceptableVariants = {
  rock: ["rock", "Rock"],
  paper: ["paper", "Paper"],
  scissors: ["scissors", "Scissors"],
  lizard: ["lizard", "Lizard"],
  spock:  ["spock", "Spock"],

};
// takes user input and returns in an array if 'acceptable'
function asStandardChoice(inputStr) {
  /** An nested array: array of array of strings- 
   * acceptable strings taken from acceptableVariants */
  const arrayOfVariantArrays = Object.values(acceptableVariants);
  
  // alternative `for ... of ...` loop syntax - great for arrays
  // defines an array and loops it through accaptable variants 
  //to check if user input matches- if true returns array with user input
  for (let variantArray of arrayOfVariantArrays) {
    if (variantArray.includes(inputStr)) {
      return variantArray[0];
    }
  }
}
// prints correct winner message
function declareWinner(userPick, computerPick) {
  const resultMessage = makeResultMessage(userPick, computerPick);
  console.log(resultMessage);
}

/**
 * Check if the first choice beats the second choice
 * defining winning combinations */
function isWinningChoice(firstChoice, secondChoice) {
  const weaknesses = {
    rock: "paper",
    rock: "spock",
    paper: "lizard",
    paper: "scissors",
    scissors: "rock",
    scissors: "spock",
    lizard: "rock",
    lizard: "scissors",
    spock: "paper",
    spock: "lizard",
  };
  return weaknesses[secondChoice] === firstChoice;
}
/* standardising acceptable inputs and returning error message if not accepted
  and if acceptable returns user input */
function getUserChoice() {
  while (true) {
    const answer = prompt("Your choice: rock, paper or scissors? \n> ");
    const standardisedChoice = asStandardChoice(answer);
    if (standardisedChoice) {
      // if choice can be standardised, we can exit out of the while loop with a return of the standardisd choice
      return standardisedChoice;
    } else {
      // otherwise, log a helpful message and continue the while loop
      console.log(
        "Sorry, I don't recognise that as a choice! \nPlease try 'rock', 'paper' or 'scissors' (without quotation marks)."
      );
    }
  }
}
// returns message if win, lose or draw
//returns input from user and computer choice too
function makeResultMessage(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return `You both chose ${computerChoice} - it's a draw!`;
  } else if (isWinningChoice(userChoice, computerChoice)) {
    return `Your ${userChoice} beat the computer's ${computerChoice}! You are a mighty champion!`;
  } else {
    return `The computer's ${computerChoice} beat your ${userChoice}! Bad luck...`;
  }
}

function playRound() {
  const computerChoice = randomPick(); 
  const userChoice = getUserChoice();
  declareWinner(userChoice, computerChoice);
}
/* computer randomly chooses an option from pre-defined dictionary
returns as computerChoice */
function randomPick() {
  const choiceOptions = Object.keys(acceptableVariants);
  const randomIndex = Math.floor(Math.random() * choiceOptions.length);
  const computerChoice = choiceOptions[randomIndex];
  return computerChoice;
}
// export functions so they can be used in other scripts
module.exports = {
  asStandardChoice,
  isWinningChoice,
  makeResultMessage,
  playRound,
};
