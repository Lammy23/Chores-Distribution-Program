import React, { createContext, useContext, useEffect, useState } from "react";

const ChoresContext = createContext();

export const useChoresContext = () => {
  return useContext(ChoresContext);
};

export const ChoresProvider = ({ children }) => {
  // State Variables
  // today
  // allChores

  const [today, setToday] = useState(
    JSON.parse(sessionStorage.getItem("today")) || null
  ); // invalid default to test
  const [allChores, setAllChores] = useState(
    JSON.parse(sessionStorage.getItem("allChores")) || []
  ); // empty list default
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update time every minute

    return () => {
      clearInterval(timer); // Cleanup on unmount
    };
  }, []);

  return (
    <ChoresContext.Provider
      value={{
        today,
        allChores,
        time,
        setToday,
        setAllChores,
        setTime,
      }}
    >
      {children}
    </ChoresContext.Provider>
  );
};