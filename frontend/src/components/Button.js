import React from "react";

function Button({text, handler}) {
  return (
    <>
      <button className="regular-button" onClick={handler}>{text}</button>
    </>
  );
}

export default Button;