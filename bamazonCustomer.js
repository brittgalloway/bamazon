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

function listProducts() {
  connection.query("SELECT * FROM products", function(err, response) {
    for (let index = 0; index < response.length; index++) {
      console.log(
        "Item number: " +
          response[index].item_id +
          " | Item Name: " +
          response[index].product_name +
          " | Item Price: " +
          response[index].price +
          " | Qty: " +
          response[index].stock_quantity +
          "\n========================================"
      );
    }
    chooseToBuy(response);
  });
}
listProducts();
function chooseToBuy(response) {
  inquirer
    .prompt({
      name: "itemChoice",
      type: "number",
      message:
        "Please type the Item Number of the product you want to purchase."
    })
    .then(function(answer) {
      for (let index = 0; index < response.length; index++) {
        let match = false;
        if (response[index].item_id == answer.itemChoice) {
          match = true;

          console.log(
            "You chose: " +
              response[index].product_name +
              "\n" +
              "Price: " +
              response[index].price +
              "\n" +
              "Stock: " +
              response[index].stock_quantity
          );

          inquirer
            .prompt({
              name: "itemStock",
              type: "number",
              message: "How many do you want to purchase?"
            })
            .then(function(answer) {
              if (
                response[index].stock_quantity > 0 &&
                response[index].stock_quantity >= answer.itemStock
              )
                connection.query(
                  "UPDATE products SET stock_quantity='" +
                    (response[index].stock_quantity - answer.itemStock) +
                    "' WHERE " +
                    response[index].product_name +
                    "'",
                  function(err, response2) {
                    console.log(response2.stock_quantity);
                  }
                );
            });
        }
      }
    });
}
