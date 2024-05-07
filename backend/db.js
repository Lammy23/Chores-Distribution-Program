// connect to the postgres database
// Steps:
// 1. npm install pg
// 2. the below

const { Client } = require("pg");
const { user, host, database, password, port } = require("./dbConfig");

const client = new Client({
  user,
  host,
  database,
  password,
  port,
});

client.connect();
module.exports = client;
