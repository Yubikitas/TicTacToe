function gameBoard() {
    const rows = 3; 
    const columns = 3; 
    const board = []; 

    for (let i = 0; i < rows; i++) {    
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
            console.log(`Placed token ${player} at ${row},${column}`);
        } else {
            console.log(`Cell at ${row},${column} is already occupied.`);
            return;
        }
    };

    const printBoard = () => { 
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues); 
    };

    return { getBoard, placeToken, printBoard };
}

function Cell() { 
    let value = 0; 

    const addToken = (player) => {
        value = player; 
    };

    const getValue = () => value; 

    return {
        addToken,
        getValue
    };
}

function GameControl(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = gameBoard();

    const players = [
        { name: playerOneName, token: 1 },
        { name: playerTwoName, token: 2 }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkGameStatus = () => {
        const boardStatus = board.getBoard();
        let gameStatus = "";
        let winner = null;  // Store the winner if there's one

        // Check Rows, Columns, and Diagonals for a win
        for (let i = 0; i < boardStatus.length; i++) {
            if (boardStatus[i][0].getValue() === boardStatus[i][1].getValue() && 
                boardStatus[i][1].getValue() === boardStatus[i][2].getValue() && 
                boardStatus[i][0].getValue() > 0) {
                gameStatus = "victory";
                winner = boardStatus[i][0].getValue();
                return { gameStatus, winner }; 
            }
        }

        for (let j = 0; j < boardStatus[0].length; j++) {
            if (boardStatus[0][j].getValue() === boardStatus[1][j].getValue() && 
                boardStatus[1][j].getValue() === boardStatus[2][j].getValue() && 
                boardStatus[0][j].getValue() > 0) {
                gameStatus = "victory";
                winner = boardStatus[0][j].getValue();
                return { gameStatus, winner }; 
            }
        }

        if (boardStatus[0][0].getValue() === boardStatus[1][1].getValue() && 
            boardStatus[1][1].getValue() === boardStatus[2][2].getValue() && 
            boardStatus[0][0].getValue() > 0 || 
            boardStatus[0][2].getValue() === boardStatus[1][1].getValue() && 
            boardStatus[1][1].getValue() === boardStatus[2][0].getValue()) {
            gameStatus = "victory";
            winner = boardStatus[1][1].getValue();
            return { gameStatus, winner }; 
        }

        // Check for tie
        let isTie = true;
        for (let i = 0; i < boardStatus.length; i++) {
            for (let j = 0; j < boardStatus[i].length; j++) {
                if (boardStatus[i][j].getValue() === 0) {
                    isTie = false; 
                    break;
                }
            }
        }

        if (isTie) {
            gameStatus = "tie";
            return { gameStatus };
        }

        return { gameStatus: "" };  // Continue if no win/tie
    };

    const playRound = (row, column) => {
        board.placeToken(row, column, activePlayer.token);
        const status = checkGameStatus();
        if (status.gameStatus === "victory") {
            return `Player ${status.winner} wins!`;
        } else if (status.gameStatus === "tie") {
            return "It's a tie!";
        }
        switchPlayerTurn();
    };

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        checkGameStatus
    };
}

function ScreenController() {
    let game = GameControl();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const messageDiv = document.querySelector('.message');
    const restartButton = document.querySelector('.restart-button');
    
    const updateScreen = () => {
      boardDiv.textContent = ""; // Clear the board
      
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
      
      // Render the board squares
      board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          cellButton.dataset.row = rowIndex;
          cellButton.dataset.column = columnIndex;
          cellButton.textContent = cell.getValue() === 0 ? "" : cell.getValue(); // Only show value if not 0
          boardDiv.appendChild(cellButton);
        });
      });
      
      // Update player turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    };
    
    // Restart game
    restartButton.addEventListener('click', () => {
      game = GameControl();  // Reinitialize the game
      messageDiv.textContent = "";
      playerTurnDiv.textContent = `${game.getActivePlayer().name}'s turn...`;
      updateScreen(); // Update the screen
    });
    
    // Attach click event to the board
    boardDiv.addEventListener("click", (e) => {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      
      if (selectedColumn === undefined || selectedRow === undefined) return;
      
      const result = game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
      messageDiv.textContent = result || "";
      updateScreen();
    });
    
    // Initial render
    updateScreen();
}

ScreenController();
