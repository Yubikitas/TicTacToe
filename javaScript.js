function gameBoard(){
    const rows = 3; 
    const columns =3; 
    const board = []; 

    for (let i = 0; i < rows; i++) {    
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
    }

    const getBoard=()=>board; 

    const placeToken = (row,column,player)=>{
     if (board[row][column].getValue()===0){
        board[row][column].addToken(player); 
        console.log(`Placed token${player} at ${row},${column}`); 
     }
    else{
        console.log(`Cell at ${row},${column} is already occupied.`); 
        return; 
    }
    }

const printBoard = () =>{ 
    const boardWithCellValues = board.map((row)=>row.map((cell)=>cell.getValue()))
    console.log(boardWithCellValues); 
}
return {getBoard,placeToken,printBoard}; 
}

function Cell(){ 
    let value = 0; 

    const addToken = (player) =>{
        value = player; 
    }

    const getValue = ()=> value; 

        return {
            addToken,
            getValue 
        };

} 



function GameControl(
    playerOneName = "Player One", 
    playerTwoName = "Player Two"
){
    const board = gameBoard(); 

    const players = [
        {
            name: playerOneName, 
            token: 1
        },
        {
            name: playerTwoName, 
            token: 2
        }
    ]

    let activePlayer = players[0]; 

    const switchPlayerTurn = () =>{
        activePlayer = activePlayer ===players[0] ? players[1] : players[0]; 
    }

    const getActivePlayer = () => activePlayer; 

    const printNewRound =()=>{
        board.printBoard(); 
        console.log(`${getActivePlayer().name}'s turn.`); 
    }; 

    const checkGameStatus = ()=>{
        const boardStatus = board.getBoard(); 
        let gameStatus = ""; 
        
        for (let i =0;i<boardStatus.length;i++){
                if(boardStatus[i][0].getValue()==boardStatus[i][1].getValue()&& boardStatus[i][1].getValue()==boardStatus[i][2].getValue()){
                    gameStatus = "victory"; 
                }
        }
        
        for (let j =0;j<boardStatus[0].length;j++){
            if(boardStatus[0][j].getValue()==boardStatus[1][j].getValue()&& boardStatus[2][j].getValue()==boardStatus[2][j].getValue()){
                gameStatus = "victory"; 
            }
            
        for (let k=0; k<)    
        

            return gameStatus; 
    }


    }

    const playRound = (row, column) =>{     
        console.log(`Placing ${getActivePlayer().name}'s token into ${row},${column}...`); 
        board.placeToken(row,column,getActivePlayer().token); 
        checkGameStatus(); 
        switchPlayerTurn(); 
        printNewRound(); 
    }

    printNewRound(); 

    return {
        playRound, 
        getActivePlayer,
        getBoard: board.getBoard
    }; 
}

function ScreenController() {
    const game = GameControl();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Add both row and column data attributes
          cellButton.dataset.row = rowIndex;
          cellButton.dataset.column = columnIndex;
          cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        });
      });
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row; 
        // Make sure I've clicked a column and row
        if (selectedColumn === undefined || selectedRow === undefined) return;
        
        // Convert row and column to integers before passing them
        game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
        updateScreen();
      }

    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();