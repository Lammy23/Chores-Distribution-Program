import {
  getRandomMonday,
  getRandomOtherDays,
  getRandomSunday,
} from "./helpers";

const API_URL = process.env.API_URL || "http://localhost:8000"; // TODO: Change this to the actual API URL
const WHATSAPP_BACKEND_URL = process.env.WHATSAPP_BACKEND_URL || "http://localhost:5000";

/**
 * Fetches all chores for the week
 *
 * @param {Function} setAllChores
 * @param {Function} setError
 * @param {Function} setLoading
 */
function getAllChores(setAllChores, setError, setLoading) {
  // callback function sets the state variable
  if (setLoading) {
    setLoading(true); // In case nothing needs to load
  }
  fetch(`${API_URL}/days`)
    .then((response) => response.json())
    .then((data) => {
      if (data.err) {
        if (setError) setError("Error: Could not load chores");
      }
      setAllChores(data.chores);
      //store in session storage
      sessionStorage.setItem("allChores", JSON.stringify(data.chores));
    })
    .catch((error) => {
      if (setError) setError("Error: Could not load weekly chores");
      setAllChores([]);
      // remove from session storage
      sessionStorage.removeItem("allChores");
      console.log(sessionStorage);
      console.error("Problem fetching chores for day", error);
    })
    .finally(() => {
      if (setLoading) {
        setLoading(false);
      }
    });
}

/**
 * Fetches the randomized status for the day
 *
 * @param {Number} dayID
 * @param {Function} setRandomized
 * @param {Function} setError
 */
function getRandomizedStatusForDay(dayID, setRandomized, setError) {
  fetch(`${API_URL}/randomized/${dayID}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.err) {
        if (setError) setError("Error: Could not load randomized status");
      } else {
        setRandomized(data.randomizeBool);
        // store in session storage
        sessionStorage.setItem(
          "randomized",
          JSON.stringify(data.randomizeBool)
        );
      }
    })
    .catch((error) => {
      setError("Error: Could not load randomized status");
      // clear session storage
      sessionStorage.removeItem("randomized");
      console.error("Problem fetching randomized status for day", error);
    });
}

/**
 * Updates the chores for the day
 *
 * @param {Number} dayID
 * @param {Object} chores
 * @param {Function} setAllChores
 */
function updateChoresForDay(dayID, chores, setAllChores) {
  // callback function sets the state variable
  fetch(`${API_URL}/days/${dayID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chores),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.err) console.error(data.err);
      else console.log(data.message);
      getAllChores(setAllChores); //  Update values
    })
    .finally(() => {
      console.log("updateChoresForDay operation complete!"); // DEBUG
    });
}

/**
 *
 * @param {Number} dayID
 * @param {*} allChores
 * @param {*} setAllChores
 * @param {*} setRandomized
 */
const randomizeAndUpdate = (dayID, allChores, setAllChores, setRandomized) => {
  fetch(`${API_URL}/days/${dayID}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.randomizeBool) {
        if (dayID === 2) { // TODO: Change this to 2
          const newAllChores = getRandomOtherDays(allChores[0], getRandomMonday(allChores[0]));
          newAllChores.forEach((chores, index) => {
            updateChoresForDay(index + 1, chores, setAllChores);
          });
        } else if (dayID === 1) {
          updateChoresForDay(dayID, getRandomSunday(), setAllChores);
        }
        fetch(`${API_URL}/randomized/${dayID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ randomizeBool: true }),
        });
      }
      setRandomized(true);
      sessionStorage.setItem("randomized", JSON.stringify(true));
    })
    .catch((error) => {
      console.err("Error:", error); // TODO: Fix this and other error messages. make them more meaningful
    });
};

const sendChoresToWhatsApp = (allChores) => {
  try {
    fetch(`${WHATSAPP_BACKEND_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allChores),
    });
  } catch (e) {
    console.error(e);
  }
};

export {
  getAllChores,
  updateChoresForDay,
  randomizeAndUpdate,
  getRandomizedStatusForDay,
  sendChoresToWhatsApp,
};
