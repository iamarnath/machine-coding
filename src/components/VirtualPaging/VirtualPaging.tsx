import React,{useEffect,useState,useRef} from 'react';

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 10;
const BUFFER = 5;
type ListItem = {
  id:number,
  list:string
}

const VirtualPaging = () =>{
  const [data,setData] = useState<ListItem[]>([]);
  const [scrollTop,setScrollTop] = useState(0);
 // const containerRef = useRef(null);
  const UPPER_LIMIT = 1000;
  const containerHeight = ITEM_HEIGHT * VISIBLE_COUNT;
  console.log("containerHeight ",containerHeight)
  useEffect(()=>{
    const sampleData = Array.from({length:UPPER_LIMIT},(_,i)=>({
      id: i+1,
      list:`Testing Vistualized scroll for ${i+1}`
    }));
    setData(sampleData);
  },[]);

  const handleScroll = (e:any) =>{
    //console.log("e.currentTarget ==",e.currentTarget);
    setScrollTop(e.currentTarget.scrollTop);
  }
  // Calculate visible range
  //console.log("start index ==",{scrollTop,ITEM_HEIGHT,BUFFER});
  
  const startIndex = Math.max(0,Math.floor(scrollTop/ITEM_HEIGHT) - BUFFER);
  //console.log("start index cacl ==",scrollTop/ITEM_HEIGHT,startIndex);
  const endIndex = Math.min(
    data.length,
    startIndex + VISIBLE_COUNT + BUFFER
  );
  //console.log("endIndex ",endIndex);
  const visibleItems = data.slice(startIndex,endIndex);
  console.log("visibleItems ==",startIndex,ITEM_HEIGHT,startIndex * ITEM_HEIGHT)

  return (
    <div
    style ={{
      height:containerHeight,
      overflowY:'auto',
      border:'1px solid #ccc'
    }}
    onScroll={handleScroll}>
      <div 
      style ={{
        height:data.length * ITEM_HEIGHT,
        position:'relative'
      }}>
        <div style={{
          transform:`translateY(${startIndex * ITEM_HEIGHT}px)`,
          position:'absolute',
          top:0,
          left:0,
          right:0
        }}>
          { visibleItems.map((item)=>(
            <div key={item.id}
              style={{
                height:ITEM_HEIGHT,
                display:'flex',
                alignItems:'center',
                padding:'0 12px',
                borderBottom:'1px solid #eee',
                boxSizing:'border-box'
              }}>
              {item.list}
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default VirtualPaging;