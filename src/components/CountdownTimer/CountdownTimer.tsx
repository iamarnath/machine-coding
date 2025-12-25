import React, { useState, useEffect, ChangeEvent } from 'react';

const CountdownTimer = () =>{
  const [hour,setHour] = useState<number|string>("");
  const [min,setMin] = useState<number|string>("");
  const [sec,setSec] = useState<number|string>("");
  // State to track timer status
  const [isRunning,setIsRunning] = useState<boolean>(false);
  const [isPaused,setIsPaused] = useState<boolean>(false);


  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(runTimerLogic, 1000);
    return () => clearInterval(interval);
  }, [isRunning, hour, min, sec]);

  const runTimerLogic = () => {
    let h = parseInt(String(hour || 0));
    let m = parseInt(String(min || 0));
    let s = parseInt(String(sec || 0));
    if(s>60){
      m++;
      s=s-60;
    }
    if(m>60){
      h++;
      m=m-60;
    }
    if(h === 0 && m === 0 && s === 0){
        handleStop();
        resetInputs();
    }
    else if(s>0){
      setSec(formatTime(s-1));
      setMin(formatTime(m));
      setHour(formatTime(h));
    }
    else if(m >0 && s===0){
      setSec(59);
      setMin(formatTime(m-1));
      setHour(formatTime(h));
    }
    else if(h >0 && m===0){
      setSec(59);
      setMin(59);
      setHour(formatTime(h-1));
    }
  }
  const formatTime =(val:number):string|number=>{
    return val<10 ? `0${val}`:`${val}`;
  }
  const handleStart = () =>{
    if((!hour && !min && !sec) ||
     (hour ===0 && min === 0 && sec===0)) {
       return;
     }
    setIsRunning(true);
    setIsPaused(false);
  }
  const handleStop = () =>{
    setIsRunning(false);
    setIsPaused(true);
  }
  const handleReset = () =>{
    setIsRunning(false);
    setIsPaused(false);
    resetInputs();
  }
  const resetInputs = () =>{
    setSec("");
    setMin("");
    setHour("");
  }
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>,
    setter:React.Dispatch<React.SetStateAction<string|number>>,
    limitLength:boolean=false
  )=>{
    const valStr = e.target.value;
    if(limitLength && valStr.length>2){
      return;
    }
    const val = parseInt(valStr);
    //allow empty string or invalid number
    if(isNaN(val)){
      setter("");
    }
    else{
      setter(val);
    }

  }
  return (
    <>
      <div className='container'>
          <h4 className='container-title'>Timer</h4>
          <div className='container-labels'>
              <p className='container-labels-label'>Hours</p>
              <p className='container-labels-label'>Min</p>
              <p className='container-labels-label'>Sec</p>
          </div>
          <div className='container-inputs'>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className='container-inputs-time hour'
                placeholder='00'
                value = {hour}
                onChange={(e)=> handleInputChange(e,setHour)}
                readOnly={isRunning}
              />
              <p className='container-inputs-colon'>:</p>
               <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className='container-inputs-time min'
                placeholder='00'
                value = {min}
                onChange={(e)=> handleInputChange(e,setMin,true)}
                readOnly={isRunning}
              />
              <p className='container-inputs-colon'>:</p>
               <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className='container-inputs-time sec'
                placeholder='00'
                value = {sec}
                onChange={(e)=> handleInputChange(e,setSec,true)}
                readOnly={isRunning}
              />
          </div>
     {/* Buttons rows */}
     <div className='container-btns'>
      {
        !isRunning ?
         (<button className='btn start' onClick={handleStart}>
          {isPaused?"Continue":"Start"}
         </button>) 
         :
         (<button className='btn stop' onClick={handleStop} 
         style={{display:'initial'}}>
          Stop
         </button>)
      }
      <button className='btn reset' onClick={handleReset}>
        Reset
      </button>
     </div>
      </div>
    </>
  )
}

export default CountdownTimer;