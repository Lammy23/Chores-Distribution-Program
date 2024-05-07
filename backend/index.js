"use strict";
const express = require("express");
const PORT = 8000;
const cors = require("cors");

// Create the express app
const app = express();
// 1. npm install --save node-cron
const cron = require("node-cron");
const db = require("./dbService");
const { getRandomSunday, getRandomMonday } = require("./cronService");

// Middleware
app.use(express.json());
// 1. npm install cors
app.use(cors());

// Schedules
cron.schedule("0 0 * * 6", () => {
  // Weekly Cleanup
  fetch(`http://localhost:${PORT}/cleanup`, {
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
});

// TODO: mirror cron schedules in frontend so that app also gets the update at those times
cron.schedule("0 0 * * 2,3,4,5", () => {
  // Tuesday - Friday Assignments
  // Part 0 Get today's number
  const todayObject = new Date();
  today = todayObject.getDay() + 1;

  // Part 1. Fetch chores from two days ago
  fetch(`http://localhost:${PORT}/days/${today - 2}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.err) console.error(data.err);
      const { sweepingAndMopping, cleaningCooker, washing, rinsing } =
        data.chores;
      const newChores = {
        sweepingAndMopping: cleaningCooker,
        cleaningCooker: sweepingAndMopping,
        washing: rinsing,
        rinsing: washing,
      };
      // Part 2. Update the database
      fetch(`http://localhost:${PORT}/days/${today}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChores),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.err) console.error(data.err);
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error updating chores for day", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching chores for day", error);
    });
});

// TODO: cron job to randomize anyway if user fails to open app
cron.schedule("59 12 * * 0,1", () => {
  // Part 1. Get Today
  const todayObject = new Date();
  const today = todayObject.getDay() + 1;
  // Don't do anything if randomized status is already true for today
  fetch(`http://localhost:${PORT}/randomized/${today}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.err) console.error(data.err);
      if (data.randomizeBool) return;
      if (today === 1) {
        // Sunday Randomize
        const chores = getRandomSunday();
        // Set chores for Sunday
        fetch(`http://localhost:${PORT}/days/1`, {
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
        fetch(`http://localhost:${PORT}/days/1`)
          .then((response) => response.json())
          .then((data) => {
            if (data.err) console.error(data.err);
            const sundayChores = data.chores;
            // Monday Randomize
            const chores = getRandomMonday(sundayChores);
            // Set chores for Monday
            fetch(`http://localhost:${PORT}/days/2`, {
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
      fetch(`http://localhost:${PORT}/randomized/${today}`, {
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
});

// Routes
app.get("/days", db.getAllChores);
app.get("/days/:dayID", db.getChoresForDay);
app.get("/randomized/:dayID", db.getRandomizedStatusForDay);
app.patch("/days/:dayID", db.updateChoresForDay);
app.patch("/cleanup", db.weeklyCleanup);
app.patch("/randomized/:dayID", db.setRandomizedForDay);

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log(`API started at http://localhost:${PORT}`);
});
