import { playerFactory } from './playerFactory.js';
import { GameModule } from './GameModule.js';

const TicTacToe = (() => {
  const gameBox = document.querySelectorAll('.box');

  const playerX = playerFactory('John', 'X');
  const playerO = playerFactory('Robb', 'O');
  let currentPlayer = playerX;

  const handlePlayerTurn = (event) => {
    const choice = event.target.dataset.choice;

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
      console.log('Game Over: ${result}');
      gameBox.forEach((button) =>
        button.removeEventListener('click', handlePlayerTurn)
      );
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const initializeGame = () => {
    console.log(playerX.sayHello());
    console.log(playerO.sayHello());

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
  TicTacToe.initializeGame();
});
