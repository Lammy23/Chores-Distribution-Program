import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="white-background">
      <h1>Page Not Found</h1>
      <Link className="link" style={{color:"black"}} to={"/"}>Return Home</Link>
    </div>
  );
}

export default NotFound;
