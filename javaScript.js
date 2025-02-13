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
        console.log('Placed token${player} at ${row},${column}'); 
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

    const playRound = (row,column) =>{ 
        console.log(`Placing ${getActivePlayer().name}'s token into ${row},${column}...`); 
        board.placeToken(row,column,getActivePlayer().token); 
        switchPlayerTurn(); 
        printNewRound(); 
    }

    printNewRound(); 

    return {
        playRound, 
        getActivePlayer
    }; 
}

const game = GameControl(); 
