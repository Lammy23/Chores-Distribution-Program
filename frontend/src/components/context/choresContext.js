import React, { createContext, useContext, useState } from "react";

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

  return (
    <ChoresContext.Provider
      value={{
        today,
        allChores,
        setToday,
        setAllChores,
      }}
    >
      {children}
    </ChoresContext.Provider>
  );
};