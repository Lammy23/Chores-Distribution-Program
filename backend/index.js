"use strict";
const express = require("express");
const PORT = 8000;
const cors = require("cors");

// Create the express app
const app = express();
// 1. npm install --save node-cron
const cron = require("node-cron");
const db = require("./dbService");
const cronJobs = require("./cronService");

// Middleware
app.use(express.json());
// 1. npm install cors
app.use(cors());

// Schedules
cron.schedule("0 0 * * 6", () => cronJobs.cleanup(PORT));
cron.schedule("0 0 * * 2,3,4,5", () => cronJobs.dailyAssign(PORT));
cron.schedule("59 23 * * 0,1", () => cronJobs.randomizeAnyway(PORT));

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
