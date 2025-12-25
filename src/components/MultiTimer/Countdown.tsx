import React, { useEffect, useState } from "react";
import { useClock } from "./ClockContext";
import "./style.css";

type Props = {
  id: string;
  label: string;
  initialHour: number;
  initialMin: number;
  initialSec: number;
  onComplete?: (id: string) => void;
};

const Countdown: React.FC<Props> = ({
  id,
  label,
  initialHour,
  initialMin,
  initialSec,
  onComplete,
}) => {
  const now = useClock();

  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [display, setDisplay] = useState("00:00:00");
  const [isCompleted, setIsCompleted] = useState(false);

  const format = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const computeDisplay = (ms: number) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${format(h)}:${format(m)}:${format(s)}`;
  };

  // Recompute display whenever "now" changes
  useEffect(() => {
    if (!isRunning || endTime == null) return;

    const remaining = endTime - now;

    if (remaining <= 0) {
      setDisplay("00:00:00");
      setIsCompleted(true);
      setIsRunning(false);
      if (onComplete) onComplete(id);
      return;
    }

    setDisplay(computeDisplay(remaining));
  }, [now, isRunning, endTime]);

  const handleStart = () => {
    const durationMs =
      initialHour * 3600_000 + initialMin * 60_000 + initialSec * 1000;

    if (durationMs <= 0) return;

    setEndTime(Date.now() + durationMs);
    setIsRunning(true);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setDisplay("00:00:00");
    setEndTime(null);
  };

  return (
    <div className={`timer-card ${isCompleted ? "timer-card--done" : ""}`}>
      <div className="timer-card__header">
        <span>{label}</span>
        {isCompleted && <span className="timer-card__badge">Done</span>}
      </div>

      <div className="timer-display">{display}</div>

      <div className="timer-buttons">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Countdown;
