import React from "react";

const styles = {
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Sulphur point",
    fontSize: "35.02px",
    borderRadius: "35.02px",
    width: "388.22px",
    height: "148.33px",
    margin: "91.67px",
  },
};

function Button({text, handler}) {
  return (
    <>
      <button style={styles.button} onClick={handler}>{text}</button>
    </>
  );
}

export default Button;