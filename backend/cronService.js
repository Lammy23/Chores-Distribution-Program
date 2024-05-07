const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CHILDREN = ["Laolu", "Ola", "Ladi", "Layide"];

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

module.exports = {
  getTodayString,
  getTodayNum,
  getRandomSunday,
  getRandomMonday,
};
