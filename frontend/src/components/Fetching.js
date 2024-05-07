import React from "react";
import { LineWave } from "react-loader-spinner";

const styles = {
  p: {
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
    margin: "35.02px 92px 0px 92px",
  },
};

function Fetching({text}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <LineWave color="black" height={"100"} width={"100"} />
      <p style={styles.p}>{text}</p>
      <LineWave color="black" height={"100"} width={"100"} />
    </div>
  );
}

export default Fetching;