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
        "Please type the Item Number of the product you want to purchase. (0 to cancel)"
    })
    .then(function(answer) {
      if (answer.itemChoice == 0) {
        process.exit(0);
      }
      for (let index = 0; index < response.length; index++) {
        let match = false;
        if (response[index].item_id === answer.itemChoice) {
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
                connection.query(
                  "UPDATE products SET stock_quantity ='" +
                    updatedStock +
                    "' WHERE item_id=" +
                    id +
                    ";",
                  (err, response) => {}
                );
                inquirer
                  .prompt({
                    name: "confirm",
                    type: "confirm",
                    message: "Is this correct?",
                    default: true
                  })
                  .then(function(answer) {
                    if (answer.confirm == false) {
                      console.log("Our Mistake, please select again.");
                      chooseToBuy(response);
                    } else {
                      console.log(
                        "You bought " + answerStock + " " + item + "."
                      );
                      console.log("There are " + updatedStock + " remaining.");
                      inquirer
                        .prompt({
                          name: "continueOrNo",
                          type: "confirm",
                          message: "Do you need anything else?",
                          default: false
                        })
                        .then(function(answer3) {
                          if (answer3.continueOrNo == true) {
                            chooseToBuy(response);
                          }

                          if (answer3.continueOrNo == false) {
                            console.log("Thanks for shopping with us!");
                            process.exit(0);
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
        if (answer.itemChoice == NaN) {
          match = false;
          console.log("Sorry, please select again.");
          // inquirer
          //   .prompt({
          //     name: "wrongKey",
          //     type: "confirm",
          //     message: "Do you want to start again?",
          //     default: true
          //   })
          //   .then(function(answerWK) {
          //     if (answerWK == true) {
          //       listProducts();
          //     } else {
          //       console.log("Come again!");
          //       process.exit(0);
          //     }
          //   });
        }
      }
    });
}
