export const GameModule = (() => {
  const winConditions = [
    ['1', '2', '3'], //first row
    ['4', '5', '6'], //second row
    ['7', '8', '9'], //third row
    ['1', '4', '7'], //first column
    ['2', '5', '8'], //second column
    ['3', '6', '9'], //third col
    ['1', '5', '9'], //main diagonal
    ['3', '5', '7'], //cross diagonal
  ];

  const gameBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const determineWinner = (player) => {
    const defaultValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    //checking for draw
    const hasEmptyInput = gameBoard.some((num) => defaultValue.includes(num));

    if (!hasEmptyInput) return `Game is draw`;

    if (checkWinCondition(player)) return `${player.symbol} won!!`;

    //return false until game is won
    return false;
  };

  const checkWinCondition = (player) => {
    for (let i = 0; i < winConditions.length; i++) {
      let pattern = winConditions[i];

      //if every choices done by a single player leads to create the winning patter, player wins
      if (pattern.every((num) => player.allChoices.includes(num))) return true;
    }

    return false;
  };

  const updateGameBoard = (player) => {
    if (gameBoard.includes(player.choice)) {
      gameBoard[player.choice - 1] = player.symbol;
    } else return `Invalid Choice: cannot play in already played box.`;
  };

  const playRound = (player) => {
    updateGameBoard(player);
    return determineWinner(player);
  };

  return {
    playRound,
  };
})();
