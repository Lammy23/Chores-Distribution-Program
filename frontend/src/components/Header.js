import React from "react";
import { Link } from "react-router-dom";

// Creating header component
function Header() {
  return (
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
  );
}

export default Header;
