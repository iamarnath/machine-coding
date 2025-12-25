import React,{useState,useCallback} from 'react';
import '../../index.css';
interface cellProps{
    filled:boolean;
    index:number;
    onClick:() => void;
    isDisabled:boolean;
    label:string;
}
function Cell({filled,onClick,isDisabled,label,index }:cellProps){
 
    return (
        <button
            type="button"
            aria-label={label}
            disabled={isDisabled}
            onClick={onClick}
            className={filled?"cell cell-activated":"cell"}
        >
        </button>
    );
}

const Grid = () =>{
    const [order,setOrder] = useState<number[]>([]);
    const [isDeactivating,setIsDeactivating] = useState(false);
    const config=[[1,1,1],
                [1,0,1],
                [1,1,1]];
    const activateCells = (index:number) =>{
        const newOrder = [...order,index];
        setOrder(newOrder);
        //deactivate
        if(newOrder.length === config.flat(1).filter(Boolean).length){
            deactivateCells();
        }

    };

    const deactivateCells = useCallback(() =>{
        setIsDeactivating(true);
        const timer = setInterval(()=>{
            setOrder((origOrder)=>{
                const newOrder = origOrder.slice();
                // console.log("origOrder ",JSON.stringify(origOrder))
                // console.log("newOrder ",JSON.stringify(newOrder))
                newOrder.pop();
                if(newOrder.length === 0){
                    clearInterval(timer);
                    setIsDeactivating(false);
                }
                return newOrder;
            });
        
        },300);

    },[]);


    //console.log(config.flat())
    return (
        <div className='grid-wrapper'>
            <div className='grid'
            style={{
                gridTemplateColumns:`repeat(${config[0].length},1fr)`
            }}
            >
                {
                    config.flat().map((value,index)=>{
                        return (
                            value ? 
                            (<Cell
                                key ={index}
                                index={index} 
                                label={`Cell ${index}`}
                                filled={order.includes(index)}
                                onClick={()=>activateCells(index)}
                                isDisabled = {order.includes(index) || isDeactivating}
                                />

                            ) : 
                            (<span/>)
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Grid;