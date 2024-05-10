import React from "react";
// $ npm install react-loader-spinner --save
import { Oval } from "react-loader-spinner";
import "../App.css";

function ChoreCard({ assignments, loading, error }) {
  // On start, the assignments are empty. The component will render the loading spinner
  if (loading || (assignments === undefined && !error)) {
    // If loading is true, the spinner will be displayed
    return (
      <div className="card-rectangle" style={{ justifyContent: "center" }}>
        <Oval
          visible={true}
          height="80"
          width="80"
          color="white"
          secondaryColor="white"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="card-rectangle" style={{ justifyContent: "center" }}>
        <p>{error}</p>
      </div>
    );
  }
  const { day, washing, rinsing, sweepingAndMopping, cleaningCooker } =
    assignments;
  return (
    <div className="card-rectangle">
      <p className="big-text">{!error ? day : "Something went wrong."}</p>
      <div className="splitter">
        <div className="column-div">
          <p className="long-version">Sweeping and Mopping</p>{" "}
          <p className="short-version">S & M</p>
          <p className="long-version">Cleaning Cooker</p>{" "}
          <p className="short-version">Cooker</p>
          <p className="long-version">Washing</p>{" "}
          <p className="short-version">Wash</p>
          <p className="long-version">Rinsing</p>{" "}
          <p className="short-version">Rinse</p>
        </div>
        <div className="column-div">
          <p>{sweepingAndMopping}</p>
          <p>{cleaningCooker}</p>
          <p>{washing}</p>
          <p>{rinsing}</p>
        </div>
      </div>
    </div>
  );
}

export default ChoreCard;
