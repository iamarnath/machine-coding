import { useEffect,useRef,useState } from "react";

const n =9;
//Generate empty grid
//[
//   ["", "", "", ...],
//   ["", "", "", ...],
//   ...
// ]
// Used as initial state and during puzzle creation.
const generateGrid = (n)=>{
    return Array.from({length:n},()=>Array.from({length:n},()=>""));
}
//[
//  Set(), Set(), Set(), ... (9 times)
//]
// Used to track:

// Numbers already present in each row
// Each column
// Each 3×3 sub-grid
// This gives O(1) lookup for validity checks.

const generateArrayOfSet = (n) =>{
    return Array.from({length:n},()=>new Set());
}
//Maps a cell to its 3×3 box:
// | Cell  | Subgrid |
// | ----- | ------- |
// | (0,0) | 0       |
// | (4,7) | 5       |
// | (8,8) | 8       |

const getSubGridIndex = (rowIdx,colIdx) =>{
    return Math.floor(rowIdx/3)*3 + Math.floor(colIdx/3);
}
//Used later to remove random cells to create the puzzle.
const generateRowOrColIndexForSudoku = ()=>{
    return Math.floor(Math.random()*9);
}

const Sudoku = () =>{
    //Stores the current Sudoku board.
    const [gameGrid,setGameGrid] = useState(()=>generateGrid(n));
//   {
//      rowArrOfSets,
//      colArrOfSets,
//      subGridArrOfSet
//  }
// Why useRef?
// Avoids re-rendering
// Shared mutable state
// Fast constraint checking during solving & user input

    const memo = useRef({});
// Only numbers 1–9 allowed
// Invalid moves blocked immediately
// Grid updates immutably
    const handlePlayerInput = (e,rowIdx,colIdx) =>{
        const num = Number(e.target.value);
        if(!num || num < 1 || num >9){
            return;
        }
        const safeToPlace = checkIfSafeToPlace(num,rowIdx,colIdx);
        if(!safeToPlace){
            alert("Not a valid move");
            return;
        }
        const subGridIdx = getSubGridIndex(rowIdx,colIdx);
        memo.current.rowArrOfSets[rowIdx].add(num);
        memo.current.colArrOfSets[colIdx].add(num);
        memo.current.subGridArrOfSet[subGridIdx].add(num);
        setGameGrid((prevGrid) =>{
            const grid = prevGrid.map((row)=> [...row]);
            grid[rowIdx][colIdx] = num;
            return grid;
        });
    };
//     Checks Sudoku rules:
// No duplicate in row
// No duplicate in column
// No duplicate in 3×3 subgrid
    const checkIfSafeToPlace = (num,rowIdx,colIdx) =>{
        const subGridIdx = getSubGridIndex(rowIdx,colIdx);
        if(memo.current.rowArrOfSets[rowIdx].has(num) ||
          memo.current.colArrOfSets[colIdx].has(num) || 
         memo.current.subGridArrOfSet[subGridIdx].has(num)
        ){
            return false;
        }
        return true;
    };
    //Place number
    const placeNumber = (sudoku,num,rowIdx,colIdx) =>{
        const subGridIdx = getSubGridIndex(rowIdx,colIdx);
        memo.current.rowArrOfSets[rowIdx].add(num);
        memo.current.colArrOfSets[colIdx].add(num);
        memo.current.subGridArrOfSet[subGridIdx].add(num);
        sudoku[rowIdx][colIdx] = num;
    };
    //Remove number (backtrack)
    //Used when:
    // Solver hits a dead end
    // Random cells are removed
    const removeNumber = (sudoku,num,rowIdx,colIdx) =>{
        const subGridIdx = getSubGridIndex(rowIdx,colIdx);
        memo.current.rowArrOfSets[rowIdx].delete(num);
        memo.current.colArrOfSets[colIdx].delete(num);
        memo.current.subGridArrOfSet[subGridIdx].delete(num);
        sudoku[rowIdx][colIdx] = "";
    };
    //Removes 15 cells to create a puzzle from a full solution.
    const removeRandomNumFromSudoku = (sudoku,m)=>{
        for(let i=0;i<m;i++){
            const rowIdx = generateRowOrColIndexForSudoku(m);
            const colIdx = generateRowOrColIndexForSudoku(m);
            removeNumber(sudoku,sudoku[rowIdx][colIdx],rowIdx,colIdx);
        }
    };

    useEffect(()=>{
        const sudoku = gameGrid.map((row)=>row.map((cell)=>cell));
      
        memo.current = {
            rowArrOfSets: generateArrayOfSet(n),
            colArrOfSets:generateArrayOfSet(n),
            subGridArrOfSet:generateArrayOfSet(n)
        };
        const sudokuSolver = (sudoku,rowIdx,colIdx) =>{
            if(rowIdx === n){
                return true;
            }
            for(let num=1;num<10;num++){
                const isSafeToPlace = checkIfSafeToPlace(num,rowIdx,colIdx);
                if(isSafeToPlace){
                    //place the number
                    placeNumber(sudoku,num,rowIdx,colIdx);
                    // Move to next cell
                    let newRowIdx = rowIdx;
                    let newColIdx = colIdx+1;
                    if(newColIdx === n){
                        newColIdx = 0;
                        newRowIdx = rowIdx+1;
                    }
                    const result = sudokuSolver(sudoku,newRowIdx,newColIdx);
                    if(result) return true;// early exit
                    removeNumber(sudoku,num,rowIdx,colIdx);// backtrack
                }
            }
            return false;
        };
        sudokuSolver(sudoku,0,0);
        removeRandomNumFromSudoku(sudoku,15);
        setGameGrid(sudoku);
    },[])
    return (
        <div className="gameWrapper">
            {
                gameGrid.map((row,rowIdx)=>{
                    return (
                        <div className="sudoku-row" key={rowIdx}>
                            {
                                row.map((cell,colIdx)=>{
                                    return (
                                        <input
                                            key={`${rowIdx}-${colIdx}`}
                                            maxLength={1}
                                            value={cell}
                                            className="sudoku-cell"
                                            onChange={(e)=>handlePlayerInput(e,rowIdx,colIdx)}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Sudoku;