import { useRef,useState } from "react";

const StarRating = ({starCount = 5}) =>{
    const [starValue,setStarValue] = useState();
    const [hoverValue,setHoverValue] = useState(0);
    const starArray = new Array(starCount).fill(0);
    console.log("hoverValue ==",hoverValue);
     console.log("starValue ==",starValue);
    return (
        <div>
            {
                starArray.map((value,index)=>{
                    return (
                        <span
                        key={index}
                        className={
                            (hoverValue == 0 && index < starValue) || index < hoverValue
                            ?"gold":""
                        }
                        onClick={()=>setStarValue(index+1)}
                        onMouseEnter={() => setHoverValue(index+1)}
                        onMouseLeave={() => setHoverValue(0)}
                        >
                        ★
                        </span>
                    );
                })
            }
        </div>
    );
}

export default StarRating;