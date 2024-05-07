import React, { useState } from "react";
// browse steps or check fictional-online-store
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { getAllChores } from "../services/apiService";
import { useChoresContext } from "./context/choresContext";
import "./Components.css";

const styles = {
  div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: "5px",
    width: "56.66px",
    height: "56.66px",
    margin: "35.02px 92px 0px 92px",
  },
};

function Refresh({ setError, setLoading }) {
  const { setAllChores } = useChoresContext();
  const [spin, setSpin] = useState(false);

  function handleRefresh(setSpin, setAllChores, setError, setLoading) {
    setSpin(true);
    getAllChores(setAllChores, setError, setLoading);
    setTimeout(() => setSpin(false), 500); // Resetting after 0.5s
  }

  return (
    <div
      style={styles.div}
      onClick={() => {
        handleRefresh(setSpin, setAllChores, setError, setLoading);
      }}
    >
      <FontAwesomeIcon
        className={spin ? "refresh" : ""}
        icon={faRotateRight}
        size="2xl"
        style={{ color: "white" }}
      />
    </div>
  );
}

export default Refresh;
