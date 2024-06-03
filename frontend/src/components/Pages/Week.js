import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import ChoreCard from "../ChoreCard.js";
import { useChoresContext } from "../context/choresContext.js";
import { getAllChores, sendChoresToWhatsApp } from "../../services/apiService.js";
// $ npm install react-loader-spinner --save
import { getTodayNum } from "../../services/helpers.js";
import Refresh from "../Refresh.js";
import Footer from "../Footer.js";

function Week() {
  const { allChores, setAllChores, today, setToday } = useChoresContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Change chores on day change
  useEffect(() => {
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(getTodayNum()));
    }
    if (allChores.length === 0)
      getAllChores(setAllChores, setError, setLoading);
  }, [setToday, setAllChores, today, allChores.length]);
  return (
    <>
      <Header />
      <div className="main-div">
        <div className="row-div">
          <p>The chores for the week are</p>
          <Refresh setError={setError} setLoading={setLoading} />
        </div>

        {loading ? (
          allChores.map((chores) => (
            <ChoreCard key={chores.day} assignments={chores} loading={true} />
          ))
        ) : !error ? (
          <>
            <div className="regular-button" onClick={() => {sendChoresToWhatsApp(allChores)}}>Send Chores to WhatsApp</div>
            {allChores.map((chores) => (
              <ChoreCard key={chores.day} assignments={chores} />
            ))}
          </>
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Week;
