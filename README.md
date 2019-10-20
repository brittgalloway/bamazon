# Bamazon

A CLI to browse and shop online for items.

## Technology

MySQL
Node.js
npm Inquirer

## How it Works

First, a database was created in MySQL via the MySQL Workbench.
The database holds a table that stores an item's:
item id
product name
price to buy
stock quantity

10 items were then added to the table.

Then, via node.js, the user is shown a table of products this the previously noted columns.
User is prompted to choose an item id for a product, then the quantity they want to buy.
If the quantity is in stock, they are allowed to check and finalize the purchase or continue shopping.
If the quantity is too high (Wanting to buy 10 but only 8 in stock) they are told there aren't enough and to pick something else.

If the user chooses to keep shopping they are brought back to the beginning and is asked to pick an item number.

If the user doesn't want to continue they can press 0 to exit when the item id is requested.

The app only takes numbers and boolean responses.

## How to Use

As the user you will be shown Item Number, Item Name, Item Price, and Item Qty for each item.

You will be prompted for an Item Number (it only takes numbers).
-If a number (or anykey) is entered that is not an item number it will tell you there is an error and allow you choose another item number.

Next you will be shown the item name, price, and quantity and asked how many you want to buy (only takes numbers)

If you request too many, you will be told there enough and prompted to select an item number again.

If your request is within range then you will be shown the Item name, price, quantity requested, and total price of sale.

Then you will be asked to confirm the order (boolean response). 
If the order is good/correct the you will be asked if you need anything else. 
If not then you will be taken back to choose an Item number.

Once your order is correct, you will be asked if you need anything else (boolean response). 
If yes, then you will be asked for an Item number. 
If not, the app thanks you for shopping and exits out.

## The App in Action

https://drive.google.com/file/d/1z0YCkOS_oLXV0WTntqc0MiGinz2JuuuO/view
