/*
export function checkWinner(board,size){
    // check for rows
    for(let i=0;i<size;i++){
        const symbol = board[i][0];
        if(symbol){
            let winner = true;
            for(let j=1;j<size;j++){
                if(symbol != board[i][j]){
                    winner = false;
                    break;
                }
            }// end of for
            if(winner){
                return symbol;
            }
        }
    }

      //check for columns
      for(let j=0;j<size;j++){
        const symbol = board[0][j];
        if(symbol){
            let winner = true;
            for(let i=1;i<size;i++){
                if(symbol != board[i][j]){
                    winner= false;
                    break;
                }
            }
            if(winner){
                return symbol;
            }
        }
      }
 //   check for main diagnal
  let symbol = board[0][0];
  let winner = true;
  if (symbol) {
    for (let i = 1; i < size; i++) {
      if (symbol != board[i][i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  // check for anti diagnal.
  symbol = board[0][size - 1];
  winner = true;
  if (symbol) {
    for (let i = 1; i < size; i++) {
      if (symbol != board[i][size - 1 - i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }
      return null;
}
*/
function allEqual(arr){
    // console.log("arr ",arr);
    const first = arr[0];
    if(!first) return false;
    return arr.every(cell => cell === first);
}
export function checkWinner(board,size){
    //rows
    for(let i=0;i<size;i++){
        if(allEqual(board[i])){
            return board[i][0];
        }
    }
    //columns
    for(let j=0;j<size;j++){
        const column = [];
        for(let i=0;i<size;i++){
            column.push(board[i][j]);
        }
        if(allEqual(column)){
            return board[0][j];
        }
    }

    //main diagonal
    const mainDiagonal=[];
    for(let i=0;i<size;i++){
        mainDiagonal.push(board[i][i]);
    }
    if(allEqual(mainDiagonal)){
        return board[0][0];
    }

    // anti diagonal
    const antiDiagonal = [];
    for(let i=0;i<size;i++){
        antiDiagonal.push(board[i][size-1-i]);
    }
    if(allEqual(antiDiagonal)){
        return board[0][size-1];
    }
    return null;
}

export function initialState(size){
    return Array.from({length:size},()=>{
        return Array(size).fill(null);
    })
}