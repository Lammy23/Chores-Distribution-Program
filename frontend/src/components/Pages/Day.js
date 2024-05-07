import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import ChoreCard from "../ChoreCard.js";
import { useChoresContext } from "../context/choresContext.js";
import { getAllChores } from "../../services/apiService.js";
import { getTodayNum } from "../../services/helpers.js";
import Refresh from "../Refresh.js";
import Fetching from "../Fetching.js";

const styles = {
  p: {
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
    margin: "35.02px 92px 0px 92px",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

function Day() {
  const { today, setToday, allChores, setAllChores, time } = useChoresContext();
  const [loading, setLoading] = useState(false); // calls for useEffect
  const [error, setError] = useState(""); // calls for useEffect
  const [checking, setChecking] = useState(false);

  // Define behaviour of the day card
  useEffect(() => {
    // Reassignments
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(getTodayNum()));
    }
    if (allChores.length === 0)
      getAllChores(setAllChores, setError, setLoading);

    // if the time is 12:01am, refresh the chores on this page
    // import Fetching with text "Fetching chores for today"
    if (time.getHours() === 0 && time.getMinutes() === 1) {
      setChecking(true);
      getAllChores(setAllChores, setError, setLoading);
      setTimeout(() => {
        setChecking(false);
      }, 3000);
    }
  }, [today, setToday, setAllChores, allChores.length, time]);

  // DEBUG
  // console.log("allchores", allChores);
  // console.log("today", today);
  // console.log("gettodaynum", getTodayNum());
  // console.log("loading", loading);

  if (checking) {
    return (
      <>
        <Header />
        <Fetching text="Fetching chores for today" />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={styles.center}>
        {today !== 7 ? (
          <>
            <div style={styles.row}>
              <p style={styles.p}>The chores for today are</p>
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
            <p style={styles.p}>No chores for today</p>
          </>
        )}
      </div>
    </>
  );
}

export default Day;