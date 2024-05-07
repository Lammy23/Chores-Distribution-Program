import React from "react";
// $ npm install react-loader-spinner --save
import { Oval } from "react-loader-spinner";

const styles = {
  cardRectangle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "465px",
    margin: "91.67px",
    borderRadius: "35.02px",
    padding: "0px 91.67px 0px 91.67px",
    color: "white",
  },

  cardDay: {
    fontFamily: "Sulphur Point",
    fontSize: "56.66px",
    color: "white",
    margin: "21.64px 0px 21.64px 0px",
  },

  cardBody: {
    fontFamily: "Sulphur Point",
    fontSize: "21.64px",
    color: "white",
    margin: "13.37px 0px 13.37px 0px",
  },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
  },
  p: {
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
  },
};

function ChoreCard({ assignments, loading, error }) {
  // On start, the assignments are empty. The component will render the loading spinner
  if (loading || (assignments === undefined && !error)) {
    // If loading is true, the spinner will be displayed
    return (
      <div className="card-rectangle" style={styles.cardRectangle}>
        <p className="card-day" style={styles.cardDay}>
          Loading...
        </p>
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
      <div className="card-rectangle" style={styles.cardRectangle}>
        <p className="card-day" style={styles.cardDay}>
          {"Something went wrong."}
        </p>
        <p style={styles.p}>{error}</p>
      </div>
    );
  }
  const { day, washing, rinsing, sweepingAndMopping, cleaningCooker } =
    assignments;
  return (
    <div className="card-rectangle" style={styles.cardRectangle}>
      <p className="card-day" style={styles.cardDay}>
        {!error ? day : "Something went wrong."}
      </p>
      <div style={styles.horizontal}>
        <div style={styles.vertical}>
          <p style={styles.cardBody}>Sweeping and Mopping</p>
          <p style={styles.cardBody}>Cleaning Cooker</p>
          <p style={styles.cardBody}>Washing</p>
          <p style={styles.cardBody}>Rinsing</p>
        </div>
        <div style={styles.vertical}>
          <p style={styles.cardBody}>{sweepingAndMopping}</p>
          <p style={styles.cardBody}>{cleaningCooker}</p>
          <p style={styles.cardBody}>{washing}</p>
          <p style={styles.cardBody}>{rinsing}</p>
        </div>
      </div>
    </div>
  );
}

export default ChoreCard;