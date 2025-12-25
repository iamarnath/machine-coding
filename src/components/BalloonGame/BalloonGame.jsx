import { useEffect, useRef, useState } from "react";

export default function BalloonGame() {
  const [gameRunning, setGameRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);

  const balloonContainerRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const timeIntervalRef = useRef(null);

  /* ---------------- CREATE BALLOON ---------------- */
  const createBalloon = () => {
    if (!gameRunning) return;

    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = "🎈";

    balloon.style.left =
      Math.random() * (window.innerWidth - 80) + "px";

    const duration = Math.random() * 3 + 4;
    balloon.style.animationDuration = `${duration}s`;

    balloon.onclick = () => {
      balloon.remove();
      setScore((prev) => prev + 1);
    };

    balloon.onanimationend = () => balloon.remove();

    balloonContainerRef.current.appendChild(balloon);
  };

  /* ---------------- START GAME ---------------- */
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameRunning(true);
  };

  /* ---------------- GAME EFFECT ---------------- */
  useEffect(() => {
    if (!gameRunning) return;

    gameIntervalRef.current = setInterval(createBalloon, 400);

    timeIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameIntervalRef.current);
      clearInterval(timeIntervalRef.current);
    };
  }, [gameRunning]);

  /* ---------------- END GAME ---------------- */
  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameIntervalRef.current);
    clearInterval(timeIntervalRef.current);
  };

  return (
    <div className="game-root">
      {!gameRunning && timeLeft === 30 && (
        <div className="overlay">
          <h1>🎈 Balloon Pop Game 🎈</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameRunning && (
        <div className="scoreboard">
          Time: {timeLeft}s | Score: {score}
        </div>
      )}

      <div ref={balloonContainerRef} className="balloon-container" />

      {!gameRunning && timeLeft === 0 && (
        <div className="overlay">
          <h1>Game Over!</h1>
          <p>Your Score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
