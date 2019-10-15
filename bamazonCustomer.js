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
    const productArray = [];
    for (let index = 0; index < response.length; index++) {
      productArray.push(
        "Item number: " +
          response[index].item_id +
          " Item Name: " +
          response[index].product_name +
          " Item Price: " +
          response[index].price +
          " Qty: " +
          response[index].stock_quantity +
          `\n=========`
      );
    }

    console.log(productArray);
    // console.log(err);
    // console.log(response);
  });
  // response.forEach(function([index]) {
  //   productArray.push(response[i].item_id);
  // });
}

// function updateStock();
listProducts();
