import React from "react";
import { Link } from "react-router-dom";

// Defining styles
const styles = {
  // container: {
  //   position: "fixed",
  //   width: "100%",
  // },

  nav: {
    display: "flex",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    padding: "35.02px 91.67px 56.67px 91.67px",
  },

  Link: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Sulphur Point",
    fontSize: "35.02px",
  },



  decoration: {
    position: "relative",
    top: "-35px",
    backgroundColor: "white",
    borderRadius: "35.02px 35.02px 0px 0px",
    height: "35px",
    width: "100%",
  },
};

// Creating header component
function Header() {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
      <Link style={styles.Link} to="/day">
          Day
        </Link>
        <Link style={styles.Link} to="/week">
          Week
        </Link>
        <Link style={styles.Link} to="/randomize">
          Randomize
        </Link>

      </nav>
      <div style={styles.decoration}></div>
    </div>
  );
}

export default Header;
