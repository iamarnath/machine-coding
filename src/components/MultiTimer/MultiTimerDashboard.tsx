// MultiTimerDashboard.tsx
import React, { useState, useCallback } from "react";
import Countdown from "./Countdown";
import "./style.css";

type TimerConfig = {
  id: string;
  label: string;
  hour: number;
  min: number;
  sec: number;
};

const MultiTimerDashboard: React.FC = () => {
  const [timers, setTimers] = useState<TimerConfig[]>([]);
  const [label, setLabel] = useState("");
  const [hour, setHour] = useState("0");
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("0");
  const [log, setLog] = useState<string[]>([]);

  const addTimer = () => {
    const h = Number(hour) || 0;
    const m = Number(min) || 0;
    const s = Number(sec) || 0;

    if (!label.trim() || (h === 0 && m === 0 && s === 0)) return;

    setTimers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label,
        hour: h,
        min: m,
        sec: s,
      },
    ]);

    setLabel("");
    setHour("0");
    setMin("0");
    setSec("0");
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleComplete = useCallback((id: string) => {
    const timer = timers.find((t) => t.id === id);
    if (!timer) return;
    const msg = `Timer "${timer.label}" completed.`;
    setLog((prev) => [msg, ...prev].slice(0, 5));
  }, [timers]);

  return (
    <div className="multi-timer-app">
      <h2>Multi Countdown Timers</h2>

      <div className="add-timer-card">
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} />
        <input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
        <input type="number" value={sec} onChange={(e) => setSec(e.target.value)} />
        <button onClick={addTimer}>Add</button>
      </div>

      <div className="timers-grid">
        {timers.map((t) => (
          <div key={t.id} className="timers-grid-item">
            <button className="remove-btn" onClick={() => removeTimer(t.id)}>✕</button>

            <Countdown
              id={t.id}
              label={t.label}
              initialHour={t.hour}
              initialMin={t.min}
              initialSec={t.sec}
              onComplete={handleComplete}
            />
          </div>
        ))}
      </div>

      {log.length > 0 && (
        <div className="completion-log">
          <h4>Recent Completions</h4>
          <ul>
            {log.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiTimerDashboard;
