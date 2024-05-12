import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import Button from "../Button.js";
import ChoreCard from "../ChoreCard.js";
import Footer from "../Footer.js";
import { useChoresContext } from "../context/choresContext.js";
import { getTodayNum, getTodayString } from "../../services/helpers.js";
import {
  getAllChores,
  getRandomizedStatusForDay,
  randomizeAndUpdate,
} from "../../services/apiService.js";
import Refresh from "../Refresh.js";
import Fetching from "../Fetching.js";

function Randomize() {
  const { today, setToday, allChores, setAllChores } = useChoresContext();
  const [randomized, setRandomized] = useState(
    JSON.parse(sessionStorage.getItem("randomized")) || false
  );
  const [cardError, setCardError] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [checking, setChecking] = useState(true);
  const [ValidDay, setValidDay] = useState(true);

  useEffect(() => {
    // Reassignments
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(today));
    }

    if (allChores.length === 0)
      getAllChores(setAllChores, setCardError, setCardLoading);

    // Check if today is valid
    if (today > 2) {
      setValidDay(false);
    } else {
      // Update random status for today
      getRandomizedStatusForDay(today, setRandomized, setPageError);
    }
      setChecking(false);
  }, [today, setToday, setAllChores, allChores.length, allChores]);

  return (
    <>
      <Header />
      <div className="main-div">
        {checking ? (
          <Fetching />
        ) : pageError ? (
          <p className="error">{pageError}</p>
        ) : !ValidDay ? (
          <p>No randomization today</p>
        ) : !randomized ? (
          <>
            <div className="row-div">
              <p>
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
            <p>
              You have not yet assigned chores for today <br /> Click the button
              below to randomize chores
            </p>
            <Button
              text={"Randomize"}
              handler={() => {
                randomizeAndUpdate(
                  today,
                  allChores,
                  setAllChores,
                  setRandomized
                );
              }}
            />
          </>
        ) : (
          <p>Randomized 😊</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Randomize;
