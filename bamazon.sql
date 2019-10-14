
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INTEGER(5) NOT NULL
    AUTO_INCREMENT,
product_name VARCHAR
    (50) NOT NULL,
price FLOAT
    (10) NOT NULL,
stock_quantity INTEGER
    (4) NOT NULL,
PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("jPhone",
    889.95,50
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("Hamsung Tv",
    500.95,45
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("Waffle Maker",
    39.99,
    100
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("3-in-1 Printer",
    111.95,
    70
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("PlayStudio 4",
    999.99,
    850
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("yBox",
    893.95,
    100
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("Hairy Porter",
    40.95,
    150
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("16x20 Gold frame",
    65.99,1500
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("Watercolor Set",
    88.95,
    1000
    );
    INSERT INTO products
        (product_name,price, stock_quantity)
    VALUE
    ("Camel Statue",
    1029.99,
    9999
    );

    SELECT *
    FROM products;