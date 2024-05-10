import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import ChoreCard from "../ChoreCard.js";
import { useChoresContext } from "../context/choresContext.js";
import { getAllChores } from "../../services/apiService.js";
// $ npm install react-loader-spinner --save
import { Oval } from "react-loader-spinner";
import { getTodayNum } from "../../services/helpers.js";
import Refresh from "../Refresh.js";
import Fetching from "../Fetching.js";
import Footer from "../Footer.js";

function Week() {
  const { allChores, setAllChores, today, setToday, time } = useChoresContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  // Change chores on day change
  useEffect(() => {
    if (today !== getTodayNum()) {
      setToday(getTodayNum());
      sessionStorage.setItem("today", JSON.stringify(getTodayNum()));
    }
    if (allChores.length === 0)
      getAllChores(setAllChores, setError, setLoading);

    if (time.getHours() === 0 && time.getMinutes() === 1) {
      setChecking(true);
      getAllChores(setAllChores, setError, setLoading);
      setTimeout(() => {
        setChecking(false);
      }, 3000);
    }
  }, [setToday, setAllChores, today, allChores.length, time]);
  if (checking) {
    return (
      <>
        <Header />
        <Fetching text="Fetching chores for the week" />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="main-div">
        <div className="row-div">
          <p>The chores for the week are</p>
          <Refresh setError={setError} setLoading={setLoading} />
        </div>

        {loading ? (
          <div style={{ justifySelf: "center" }}>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="black"
              secondaryColor="black"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : !error ? (
          allChores.map((chores) => (
            <ChoreCard key={chores.day} assignments={chores} />
          ))
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Week;
