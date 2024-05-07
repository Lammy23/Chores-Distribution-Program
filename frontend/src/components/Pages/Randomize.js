import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import Button from "../Button.js";
import ChoreCard from "../ChoreCard.js";
import { useChoresContext } from "../context/choresContext.js";
import { getTodayNum, getTodayString } from "../../services/helpers.js";
import {
  getAllChores,
  getRandomizedStatusForDay,
  randomizeAndUpdate,
} from "../../services/apiService.js";
import Refresh from "../Refresh.js";
import Fetching from "../Fetching.js";

const styles = {
  p: {
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
    margin: "35.02px 92px 0px 92px",
  },
  error: {
    color: "red",
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
    margin: "35.02px 92px 0px 92px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

function Randomize() {
  const { today, setToday, allChores, setAllChores } = useChoresContext();
  const [randomized, setRandomized] = useState(
    JSON.parse(sessionStorage.getItem("randomized")) || false
  );
  const [cardError, setCardError] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Reassignments
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(today));
    }

    if (allChores.length === 0)
      getAllChores(setAllChores, setCardError, setCardLoading);

    // Update random status for today
    getRandomizedStatusForDay(today, setRandomized, setPageError);

    setTimeout(() => {
      setChecking(false);
    }, 3000);
  }, [today, setToday, setAllChores, allChores.length, allChores]);
  if (checking) {
    return (
      <>
        <Header />
        <Fetching text={"Checking randomize status"} />
      </>
    );
  }
  if (pageError) {
    return (
      <>
        <Header />
        <p style={styles.error}>{pageError}</p>
      </>
    );
  }
  return (
    <>
      <Header />
      {!randomized ? (
        <>
          <div style={styles.row}>
            <p style={styles.p}>
              Welcome to the Randomizer!
              <br />
              Today is {getTodayString()}
              <br /> Here is the chore card
            </p>
            <Refresh setError={setCardError} setLoading={setCardLoading} />
          </div>
          <ChoreCard
            assignments={allChores[today - 1]}
            error={cardError}
            loading={cardLoading}
          />
          <p style={styles.p}>
            You have not yet assigned chores for today <br /> Click the button
            below to randomize chores
          </p>

          <Button
            text={"Randomize"}
            handler={() => {
              randomizeAndUpdate(today, allChores, setAllChores, setRandomized);
            }}
          />
        </>
      ) : (
        <p style={styles.p}>Randomized 😊</p>
      )}
    </>
  );
}

export default Randomize;
