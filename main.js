import { playerFactory } from './playerFactory.js';
import {GameModule} from './GameModule.js';

const TicTacToe = (()=> {

    const gameBox = document.querySelectorAll('.box');

    const playerX = playerFactory('John','X');
    const playerO = playerFactory('Robb', 'O');

    const playerTurn = (player) => {
        gameBox.forEach(button => button.addEventListener('click', (event) => {
            player.choice = event.target.dataset.choice;
            
        }));

        player.addChoice(player.choice);
        const result = GameModule.playRound(player);

        console.log(result);
        return result;
    }

    const initializeGame = () => {
        console.log(playerX.sayHello());
        console.log(playerO.sayHello());

        let currentPlayer = 'X';
        let result = false;    
   
        while(!result) {
            if(currentPlayer == 'X') {
                result = playerTurn(playerX);
                console.log(result);
                currentPlayer = 'O';
            } else {
                result =  playerTurn(playerO);
                console.log(result);
                currentPlayer = 'X';
            }
        }
        
    }

    return {
        initializeGame,
    }

})(); 

//initialize game on page load
document.addEventListener('DOMContentLoaded',() => {
    TicTacToe.initializeGame();
})