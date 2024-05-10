import React from "react";
import { Link } from "react-router-dom";

// Creating header component
function Header() {
  return (
    <div className="center-div">
    <header>
      <Link className="link" to="/day">
        Day
      </Link>
      <Link className="link" to="/week">
        Week
      </Link>
      <Link className="link" to="/randomize">
        Randomize
      </Link>
    </header>
    </div>

  );
}

export default Header;
