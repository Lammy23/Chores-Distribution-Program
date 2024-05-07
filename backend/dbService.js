const client = require("./db");

const getAllChores = (_, res) => {
  try {
    choreQuery = "SELECT * FROM days ORDER BY day_id ASC"; // To ensure Sunday is first
    client.query(choreQuery, (err, data) => {
      if (err) throw err;
      var choreList = data.rows;
      choreList = choreList.map((chores) => {
        const { day, sweeping_and_mopping, cleaning_cooker, washing, rinsing } =
          chores;
        return {
          day: day,
          sweepingAndMopping: sweeping_and_mopping,
          cleaningCooker: cleaning_cooker,
          washing: washing,
          rinsing: rinsing,
        };
      });
      res.status(200).send({
        err: null,
        chores: choreList,
      });
    });
  } catch (e) {
    res.status(500).send({
      err: e.message,
      chores: null,
    });
  }
};

const getChoresForDay = (req, res) => {
  try {
    const { dayID } = req.params; // extracting the id
    const dayQuery = "SELECT * FROM days WHERE day_id = $1";
    client.query(dayQuery, [dayID], (err, data) => {
      if (err) throw err;
      const { day, sweeping_and_mopping, cleaning_cooker, washing, rinsing } =
        data.rows[0];
      res.status(200).send({
        err: null,
        chores: {
          day: day,
          sweepingAndMopping: sweeping_and_mopping,
          cleaningCooker: cleaning_cooker,
          washing: washing,
          rinsing: rinsing,
        },
      });
    });
  } catch (e) {
    res.status(500).json({
      err: e.message,
      chores: null,
    });
  }
};

const getRandomizedStatusForDay = (req, res) => {
  try {
    const { dayID } = req.params;
    const randomizeQuery = "SELECT randomized FROM days WHERE day_id = $1";
    client.query(randomizeQuery, [dayID], (err, data) => {
      if (err) throw err;
      res.status(200).send({
        err: null,
        randomizeBool: data.rows[0].randomized,
      });
    });
  } catch (e) {
    res.status(500).send({
      err: e.message,
      randomizeBool: null,
    });
  }
};

const updateChoresForDay = (req, res) => {
  try {
    const { dayID } = req.params;
    const { sweepingAndMopping, cleaningCooker, washing, rinsing } = req.body;
    dayQuery =
      "UPDATE days SET sweeping_and_mopping = $1, cleaning_cooker = $2, washing = $3, rinsing = $4 WHERE day_id = $5";
    client.query(
      dayQuery,
      [sweepingAndMopping, cleaningCooker, washing, rinsing, dayID],
      (err, data) => {
        if (err) throw err;
        res.status(201).send({
          err: null,
          message: "Update chores",
        });
      }
    );
  } catch (e) {
    res.status(500).send({
      err: e.message,
      message: "Failed to update chores",
    });
  }
};

const weeklyCleanup = (_, res) => {
  try {
    // Set all chores to unassigned and randomized to false
    const unassignQuery =
      "UPDATE days SET sweeping_and_mopping = 'unassigned', cleaning_cooker = 'unassigned', washing = 'unassigned', rinsing = 'unassigned'";
    const randomizeQuery = "UPDATE days SET randomized = false";

    client.query(`${unassignQuery};${randomizeQuery}`, (err, data) => {
      if (err) throw err;
      res.status(201).send({
        err: null,
        message: "Cleanup Complete",
      });
    });
  } catch (e) {
    res.status(500).send({
      err: e.message,
      message: "Failed to perform weekly cleanup",
    });
  }
};

const setRandomizedForDay = (req, res) => {
  try {
    const { dayID } = req.params;
    const { randomizeBool } = req.body;
    const randomizeQuery = "UPDATE days SET randomized = $1 WHERE day_id = $2";
    client.query(randomizeQuery, [randomizeBool, dayID], (err, data) => {
      if (err) throw err;
      res.status(201).send({
        err: null,
        message: "Randomized status updated",
      });
    });
  } catch (e) {
    res.status(500).send({
      err: e.message,
      message: "Failed to update randomized status",
    });
  }
};

module.exports = {
  getAllChores,
  getChoresForDay,
  updateChoresForDay,
  weeklyCleanup,
  setRandomizedForDay,
  getRandomizedStatusForDay,
};
