import React,{useState,useEffect} from 'react';
interface LightProps {
  active: boolean;
  color: string;
}
const Light = React.memo(({ active, color }: { active: boolean; color: string }) => (
  <div className={`circle ${active ? `${color}-on` : ''}`} />
));

const TrafficLight = ({
  redDuration = 3000,
  yellowDuration = 1000,
  greenDuration = 2000,
})=>{
    const [light,setLight] = useState('red');

    useEffect(()=>{
        let duration;
        if(light=== "red") duration=redDuration;
        else if(light=== "yellow") duration=yellowDuration;
        else if(light=== "green") duration=greenDuration;
        const timer = setTimeout(()=>{
            setLight((prev) => {
                if(prev==='red') return 'yellow';
                if(prev === "yellow") return "green";
                return "red";
            })
        },duration);

        return ()=>{
            clearTimeout(timer);
        }
    },[light])

    return (
        <>
            <h2>Traffic Lights</h2>
            <div className="traffic-wrapper">
           <div id="traffic-light" className="traffic-light"
           aria-label="Traffic signal showing red,yellow,green lights" >
                 {/* <Light color="red" active={light === 'red'} />
                <Light color="yellow" active={light === 'yellow'} />
                <Light color="green" active={light === 'green'} /> */}
                <div aria-live="polite" aria-atomic="true"
                 className="sr-only">
  {light === 'red' && 'Red light. Stop.'}
  {light === 'yellow' && 'Yellow light. Prepare to stop.'}
  {light === 'green' && 'Green light. Go.'}
</div>
                <div id="red-light"  
                className={`circle ${light === "red"? "red-on":""}`} ></div>
                <div id="yellow-light" 
                className={`circle ${light === "yellow"? "yellow-on":""}`} ></div>
                <div id="green-light" 
                className={`circle ${light === "green"? "green-on":""}`} ></div>
           </div>
           </div>
        </>
    )
}

export default TrafficLight;