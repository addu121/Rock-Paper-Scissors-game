const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
   intervalId =  setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
 .addEventListener('click', () => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

function playGame(playerMove) {
   const computerMove = pickComputerMove();

   let result = '';

   if(playerMove === 'scissors'){
      if (computerMove === 'paper') {
       result = 'you win';
      }
      else if(computerMove === 'rock') {
       result = 'Computer wins';
      } 
      else {
       result = 'Tie.';
      }

    }

    else if(playerMove === 'paper'){
      if (computerMove === 'paper') {
        result = 'Tie.';
      }
      else if(computerMove === 'rock') {
        result = 'you win';
      } 
      else {
        result = 'computer wins';
      }
    }

    else {
      if (computerMove === 'rock') {
        result= 'Tie.';
      }
      else if(computerMove === 'paper') {
        result = 'computer wins';
      } 
      else {
        result = 'you win';
      }
    }
  
    if(result === 'you win') {
      score.wins += 1;
    }
    else if (result === 'computer wins') {
      score.loses += 1;
    }
    else {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    
    document.querySelector('.js-moves').innerHTML = ` You
      <img src="images/${playerMove}-emoji.png" class="images">
      <img src="images/${computerMove}-emoji.png" class="images">
      Computer`;


}

function updateScoreElement() {
    document.querySelector('.js-score')
     .innerHTML = `wins: ${score.  wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

  
  
  
function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = ' ' ;
      

    if(randomNumber >=0 && randomNumber < 1/3) {
      computerMove = 'rock';

    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
    }
    else{
      computerMove = 'scissors';
    }
    return computerMove;
}   

  