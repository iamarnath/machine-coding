import React from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Grid from './components/Grid/Grid';
import TrafficLight from './components/TrafficLight/TrafficLight';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import MultiTimerDashboard from './components/MultiTimer/MultiTimerDashboard';
import { ClockProvider } from './components/MultiTimer/ClockContext';
import VirtualPaging from './components/VirtualPaging/VirtualPaging';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';
import NestedCheckbox from './components/NestedCheckbox/NestedCheckbox';
import TicTacToe from './components/TicTacToe/TicTacToe';
import SnakeGame from './components/SnakeGame/SnakeGame';
import StarRating from './components/StarRating/StarRating';
import Sudoku from './components/Sudoku/Sudoku';
import BalloonGame from './components/BalloonGame/BalloonGame';
import './App.css';

/*  
const snakeCase = (str) =>{
    return str.replace(/([A-Z])/g,'_$1').toLowerCase();
}

console.log(snakeCase("getUserInfo"))
*/
function App() {
  return (
    <ClockProvider>  
    <BrowserRouter>
    <div className="App">
      <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem' }}>
        <Link to="/"  style={{ marginRight: '10px' }} >TicTacToe</Link>
        <Link to="/grid"  style={{ marginRight: '10px' }}>Grid sequence</Link>
        <Link to="/traffic" style={{marginRight:'10px'}}>Traffic Light</Link>
        <Link to="/countdown" style={{marginRight:'10px'}}>Countdown Timer</Link>
        <Link to="/multitimer" style={{marginRight:'10px'}}>MultiTimerDashboard</Link>
        <Link to="/virtualpaging" style={{marginRight:'10px'}}>Virtualization</Link>
        <Link to="/infinitescroll" style={{marginRight:'10px'}}>Infinite Scroll</Link>
        <Link to="/nestedcheckbox" style={{marginRight:'10px'}}>Nested checkbox</Link>
        <Link to="/snakegame" style={{marginRight:'10px'}}>Snake game</Link>
        <Link to="/starrating" style={{marginRight:'10px'}}>Star Rating</Link>
        <Link to="/sudoku" style={{marginRight:'10px'}}>Sudoku</Link>
        <Link to="/balloon" style={{marginRight:'10px'}}>Balloon burst</Link>

      </nav> 
      <Routes>
        <Route path="/" element = {<TicTacToe></TicTacToe>}></Route>
        <Route path="/grid" element = {<Grid></Grid>}></Route>
        <Route path ="/traffic" element ={<TrafficLight
        redDuration={3000}
        yellowDuration={1000}
        greenDuration={2000}/>}></Route>
       <Route path="/countdown" element={<CountdownTimer/>}></Route>
       <Route path="/multitimer" element={<MultiTimerDashboard/>}></Route>
       <Route path="/virtualpaging" element={<VirtualPaging/>}></Route>
       <Route path="/infinitescroll" element={<InfiniteScroll/>}></Route>
       <Route path="/nestedcheckbox" element={<NestedCheckbox/>}></Route>
       <Route path="/snakegame" element={<SnakeGame/>}></Route>
       <Route path="/starrating" element={<StarRating starCount={10}/>}></Route>
       <Route path="/sudoku" element={<Sudoku/>}></Route>
       <Route path="/balloon" element={<BalloonGame/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
    </ClockProvider>
  );
}

export default App;
