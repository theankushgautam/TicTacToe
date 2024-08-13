import { playerFactory } from './playerFactory.js';
import { GameModule } from './GameModule.js';

const startBtn = document.querySelector('#startGame');
const gameBoard = document.querySelector('.game-container');

const TicTacToe = (() => {
  const gameBox = document.querySelectorAll('.box');
  const gameStatus = document.querySelector('.game-message');

  const playerX = playerFactory('John', 'X');
  const playerO = playerFactory('Robb', 'O');
  let currentPlayer = playerX;

  const handlePlayerTurn = (event) => {
    const choice = event.target.dataset.choice;

    event.target.textContent = currentPlayer.symbol;

    if (!choice || currentPlayer.allChoices.includes(choice)) {
      return; //Ignoring invalid or duplicate choices
    }

    currentPlayer.choice = choice;
    currentPlayer.allChoices.push(choice);

    const result = GameModule.playRound(currentPlayer);
    console.log(result);

    if (!result) {
      switchPlayer();
    } else {
      const messageBox = document.createElement('h3');
      messageBox.textContent = `Game Over: ${result}`;
      gameStatus.appendChild(messageBox);

      gameBox.forEach((button) =>
        button.removeEventListener('click', handlePlayerTurn)
      );
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const initializeGame = () => {
    const messageBox1 = document.createElement('p');
    messageBox1.textContent = playerX.sayHello();

    const messageBox2 = document.createElement('p');
    messageBox2.textContent = playerO.sayHello();

    gameStatus.appendChild(messageBox1);
    gameStatus.appendChild(messageBox2);

    gameBox.forEach((button) =>
      button.addEventListener('click', handlePlayerTurn)
    );
  };

  return {
    initializeGame,
  };
})();

//initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
  startBtn.addEventListener('click', () => {
    gameBoard.classList.remove('hidden');
    startBtn.classList.add('hidden');
    TicTacToe.initializeGame();
  });
});
