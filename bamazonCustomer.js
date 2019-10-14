const mysql = require("mysql");
const inquirer = require("inquirer");

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database
});
connection.connect(function(err) {
  console.log("Connected as id: " + connection.threadId);
});
