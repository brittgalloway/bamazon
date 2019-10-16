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
      // validate: () => {
      //   if (NaN) {
      //     console.log("Please choose an item number");
      //   }
      //   chooseToBuy(response);
      // }
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
            .then(answer => {
              if (
                response[index].stock_quantity > 0 &&
                response[index].stock_quantity >= answer.itemStock
              ) {
                const price = response[index].price;
                const responseStock = response[index].stock_quantity;
                const answerStock = answer.itemStock;
                const item = response[index].product_name;
                const updatedStock = responseStock - answerStock;
                const id = response[index].item_id;

                console.log("Item: " + item + " | Price: " + price);
                console.log("Quantity: " + answerStock);
                console.log("Total: " + answerStock * price);
                inquirer
                  .prompt({
                    name: "confirm",
                    type: "confirm",
                    message: "Is this correct?",
                    default: true
                  })
                  .then(function(answer) {
                    if ((answer = false)) {
                      console.log("Sorry, please select again.");
                      listProducts();
                    } else {
                      console.log(
                        "You bought " + answerStock + " " + item + "."
                      );
                      console.log("There are " + responseStock + " remaining.");
                      connection.query(
                        "UPDATE products SET stock_quantity ='" +
                          updatedStock +
                          "' WHERE item_id=" +
                          id +
                          ";",
                        (err, response) => {
                          // listProducts();
                        }
                      );
                      inquirer
                        .prompt({
                          name: "continueOrNo",
                          type: "confirm",
                          message: "Do you need anything else?",
                          default: false
                        })
                        .then(function(answer) {
                          //not working
                          let answer = false;
                          if ((answer = true)) {
                            chooseToBuy(response);
                          }
                          //not working
                          if ((answer = false)) {
                            console.log("Thanks for shopping with us!");
                            answer.continueOrNo.end();
                          }
                        });
                    }
                  });
              } else {
                console.log("We can't sell that many");
                chooseToBuy(response);
              }
            });
        }
      }
    });
}
