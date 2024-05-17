import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import ChoreCard from "../ChoreCard.js";
import { useChoresContext } from "../context/choresContext.js";
import { getAllChores } from "../../services/apiService.js";
import { getTodayNum } from "../../services/helpers.js";
import Refresh from "../Refresh.js";
import Footer from "../Footer.js";

/**
 * Day component is the main component for the Day page
 * It displays the chores for the current day
 *
 * @returns {JSX.Element} Day component
 */
function Day() {

  const { today, setToday, allChores, setAllChores } = useChoresContext(); // Get the chores context
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  
  useEffect(() => {
    // Reassignments
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(getTodayNum()));
    }
    if (allChores.length === 0)
      getAllChores(setAllChores, setError, setLoading);
  }, [today, setToday, setAllChores, allChores.length]);

  // DEBUG
  // console.log("allchores", allChores);
  // console.log("today", today);
  // console.log("gettodaynum", getTodayNum());
  // console.log("loading", loading);

  return (
    <>
      <Header />
      <div className="main-div">
        {today !== 7 ? (
          <>
            <div className="row-div">
              <p>The chores for today are</p>
              <Refresh setError={setError} setLoading={setLoading} />
            </div>

            <ChoreCard
              assignments={allChores[today - 1]}
              error={error}
              loading={loading}
            />
          </>
        ) : (
          <>
            <p>No chores for today</p>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Day;
