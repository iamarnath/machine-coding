// ClockContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ClockContext = createContext<number>(Date.now());

export const useClock = () => useContext(ClockContext);

export const ClockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000); // 1-second tick globally

    return () => clearInterval(id);
  }, []);

  return <ClockContext.Provider value={now}>{children}</ClockContext.Provider>;
};
