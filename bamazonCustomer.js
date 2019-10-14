const mysql = reqiure("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({});
mysql.connect({
  host: process.env.host,
  port: process.env.port,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database
});
