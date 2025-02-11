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
        }
    
}; 

const placeToken = (location,player)=>{
    if (location.value==0){
        board.addToken(player); 
    }
    else{
        return; 
    }
}


