const mysql = require("mysql");
const inquirer = require("inquirer");

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
// connection.connect(function(err) {
//   console.log("Connected as id: " + connection.threadId);
// });
function listProducts() {
  connection.query("SELECT * FROM products", function(err, response) {
    // const productArray = [];
    for (let index = 0; index < response.length; index++) {
      console.log(
        "Item number: " +
          response[index].item_id +
          " | Item Name: " +
          response[index].product_name +
          " | Item Price: " +
          response[index].price +
          " | Qty: " +
          response[index].stock_quantity
      );
    }
  });
}
function chooseToBuy() {
  listProducts();

  inquirer
    .prompt({
      name: "itemChoice",
      type: "number",
      message:
        "Please type the Item Number of the product you want to purchase."
    })
    .then(function(answer) {
      let match = false;
      for (let index = 0; index < response.length; index++) {
        if (response[index].item_id == answer.itemChoice) {
          match = true;
          const product = answer.itemChoice;
        }
      }
      inquirer
        .prompt({
          name: "itemStock",
          type: "number",
          message: "How many do you want to purchase?"
        })
        .then(function(answer) {
         
          connection.query("SELECT * FROM products", function(err, response) {

        });
    });
}
chooseToBuy();
// response.forEach(function([index]) {
//   productArray.push(response[i].item_id);
// });

// function updateStock();
