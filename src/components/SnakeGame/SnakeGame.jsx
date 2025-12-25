import { useEffect,useRef,useState } from "react";

const GRID_SIZE = 15;
const GAMEGRID = Array.from({length:GRID_SIZE},()=>new Array(GRID_SIZE).fill(""));
const INITIAL_SNAKE = [[5,5]];
const generatedFood = () =>{
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return [x,y];
}

const SnakeGame = () =>{
    const [snakeBody,setSnakeBody] = useState(INITIAL_SNAKE);
    const directionRef = useRef([1,0]);
    const foodRef = useRef(generatedFood());
    const isSnakeBodyDiv = (xr,yc) =>{
        return snakeBody.some(([x,y])=>{
            return x === xr && y === yc
        });
    }

    useEffect(()=>{
        const interverId = setInterval(()=>{
            setSnakeBody((prevSnakeBody) =>{
                const newhead = [
                    prevSnakeBody[0][0] + directionRef.current[0],
                    prevSnakeBody[0][1] + directionRef.current[1]
                ];
                if(newhead[0] < 0 ||
                   newhead[0] >= GRID_SIZE || 
                   newhead[1] < 0 || 
                   newhead[1] >= GRID_SIZE || 
                   prevSnakeBody.some(([x,y]) =>{
                    return newhead[0] === x && newhead[1] === y 
                   })
                ){
                    directionRef.current = [1,0];
                    return INITIAL_SNAKE;
                }
                const copySnakeBody = prevSnakeBody.map((arr) =>[...arr]);
                if(newhead[0] === foodRef.current[0] &&
                    newhead[1] === foodRef.current[1]
                ){
                    foodRef.current = generatedFood();
                }
                else{
                    copySnakeBody.pop();
                }
                copySnakeBody.unshift(newhead);
                return copySnakeBody;
            });
        },1000);
        const handleDirection = (e) =>{
            const key = e.key;
            if(key === "ArrowUp" && directionRef.current[1] != 1){
                directionRef.current=[0,-1];
            }
            else if(key === "ArrowLeft" && directionRef.current[0] != 1){
                directionRef.current=[-1,0];
            }
            else if(key === "ArrowRight" && directionRef.current[0] != 1){
                directionRef.current=[1,0];
            }
            else if(key === "ArrowDown" && directionRef.current[1] != -1){
                directionRef.current=[0,1];
            }
        };
        window.addEventListener("keydown",handleDirection);

        return () =>{
            clearInterval(interverId);
            window.removeEventListener("keydown",handleDirection);
        };
    },[])
    return (
        <div className="snake-container">
            {GAMEGRID.map((row,yc)=>{
                return row.map((cell,xc)=>{
                    return(
                        <div 
                        className={`snake-cell ${isSnakeBodyDiv(xc,yc) ? "snake" : ""}
                        ${foodRef.current[0] === xc && foodRef.current[1] === yc ? "snake-food":""}
                        `}
                        >
                        </div>
                    )
                })
            })}
        </div>
   
    )
}

export default SnakeGame;