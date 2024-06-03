const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const PORT = require("./index.js").PORT;
const CHILDREN = ["Laolu", "Ola", "Ladi", "Layide"];

const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

function getTodayString() {
  // Function to get what day it is today
  return DAYS[getTodayNum() - 1];
}

function getTodayNum() {
  return new Date().getDay() + 1;
}

function getRandomSunday() {
  let children = CHILDREN.slice(0); // Use slice to prevent reference issues
  children.sort(() => Math.random() - 0.5);

  // Assigning chores
  const washing = children.pop();
  const rinsing = children.pop();
  const sweepingAndMopping = children.pop();
  const cleaningCooker = children.pop();

  const chores = {
    washing: washing,
    rinsing: rinsing,
    cleaningCooker: cleaningCooker,
    sweepingAndMopping: sweepingAndMopping,
  };
  return chores;
}

function getRandomMonday(sundayChores) {
  // Creating the lists of candidates
  var washingAndRinsingCandidates = [
    sundayChores.sweepingAndMopping,
    sundayChores.cleaningCooker,
  ];

  var sweepingAndCleaningCookerCandidates = [
    sundayChores.washing,
    sundayChores.rinsing,
  ];

  // Shuffling the candidates
  washingAndRinsingCandidates.sort(() => Math.random() - 0.5);
  sweepingAndCleaningCookerCandidates.sort(() => Math.random() - 0.5);

  // Assigning chores
  const washing = washingAndRinsingCandidates.pop();
  const rinsing = washingAndRinsingCandidates.pop();
  const sweepingAndMopping = sweepingAndCleaningCookerCandidates.pop();
  const cleaningCooker = sweepingAndCleaningCookerCandidates.pop();

  const chores = {
    washing: washing,
    rinsing: rinsing,
    cleaningCooker: cleaningCooker,
    sweepingAndMopping: sweepingAndMopping,
  };

  return chores;
}

const cleanup = function (PORT) {
  // Weekly Cleanup
  fetch(`${API_URL}:${PORT}/cleanup`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    // no body because not needed
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Cron Schedule Error:", error);
    });
};

const randomizeAnyway = function (PORT) {
  // Part 1. Get Today
  const todayObject = new Date();
  const today = todayObject.getDay() + 1;
  // Don't do anything if randomized status is already true for today
  fetch(`${API_URL}:${PORT}/randomized/${today}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.err) console.error(data.err);
      if (data.randomizeBool) return;
      if (today === 1) {
        // Sunday Randomize
        const chores = getRandomSunday();
        // Set chores for Sunday
        fetch(`${API_URL}:${PORT}/days/1`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chores),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.err) console.error(data.err);
            console.log(data.message);
          })
          .catch((error) => {
            console.error("Error updating chores for Sunday", error);
          });
      } else if (today === 2) {
        // Get Sunday Chores
        fetch(`${API_URL}:${PORT}/days/1`)
          .then((response) => response.json())
          .then((data) => {
            if (data.err) console.error(data.err);
            const sundayChores = data.chores;
            // Monday Randomize
            const chores = getRandomMonday(sundayChores);
            // Set chores for Monday
            fetch(`${API_URL}:${PORT}/days/2`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(chores),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.err) console.error(data.err);
                console.log(data.message);
              })
              .catch((error) => {
                console.error("Error updating chores for Monday", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching Sunday chores", error);
          });
      } else {
        throw "Fatal Error: Randomizing on wrong day";
      }
      fetch(`${API_URL}:${PORT}/randomized/${today}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ randomizeBool: true }),
      });
    })
    .catch((error) => {
      console.error("Error fetching randomized status for today", error);
    });
};

module.exports = {
  getTodayString,
  getTodayNum,
  getRandomSunday,
  getRandomMonday,
  cleanup,
  randomizeAnyway,
};
