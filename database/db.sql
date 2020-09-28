CREATE DATABASE Delilah_Resto;

-- DATABASES
SHOW DATABASES;

-- Table Users
USE Delilah_Resto;
CREATE TABLE users(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number INT(16) NOT NULL,
    address VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    is_admin TINYINT(1)
);

-- Table Status
USE Delilah_Resto;
CREATE TABLE status(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    state VARCHAR(16) NOT NULL
);

USE Delilah_Resto;

INSERT INTO status (state)
VALUES('New');

INSERT INTO status (state)
VALUES('Confirmed');

INSERT INTO status (state)
VALUES('In Process');

INSERT INTO status (state)
VALUES('On the Go');

INSERT INTO status (state)
VALUES('Delivered');

-- Table Products
USE Delilah_Resto;
CREATE TABLE products(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price INT(11) NOT NULL,
    picture VARCHAR(100) NOT NULL,
    is_avaliable TINYINT(1)
);

-- Table Favorites
USE Delilah_Resto;
CREATE TABLE favorites(
    id INT(11) PRIMARY KEY  NOT NULL AUTO_INCREMENT,
    id_user INT(11),
    id_product INT(11),
    -- FOREIGN KEYS
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id),
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES products(id)
);

-- Table Payment Method
USE Delilah_Resto;
CREATE TABLE payment_method (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(50) NOT NULL
);

USE Delilah_Resto;
INSERT INTO payment_method (description) VALUES
('Efectivo'),
('Tarjeta de debito'),
('Tarjeta de credito');

-- Table orders
USE Delilah_Resto;
CREATE TABLE orders(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_product INT(11),
    id_user INT(11),
    id_state INT(11),
    id_payment_method INT(11) NOT NULL,
    order_date timestamp NOT NULL DEFAULT current_timestamp
);

-- FOREIGN KEYS TABLE ORDERS
USE Delilah_Resto;
ALTER TABLE orders
    ADD CONSTRAINT fk_pd FOREIGN KEY (id_product) REFERENCES products(id);

USE Delilah_Resto;
ALTER TABLE orders
    ADD CONSTRAINT fk_pm FOREIGN KEY (id_payment_method) REFERENCES payment_method(id);

USE Delilah_Resto;
ALTER TABLE orders
    ADD CONSTRAINT fk_us FOREIGN KEY (id_user) REFERENCES users(id);

USE Delilah_Resto;
ALTER TABLE orders
    ADD CONSTRAINT fk_st FOREIGN KEY (id_state) REFERENCES status(id);

-- Table Order details
USE Delilah_Resto;
CREATE TABLE order_details(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_order INT(11) NOT NULL,
    id_product INT(11) NOT NULL,
    amount INT(50) NOT NULL
);

-- FOREIGN KEYS
USE Delilah_Resto;
ALTER TABLE order_details
    ADD CONSTRAINT fk_order FOREIGN KEY (id_order) REFERENCES orders(id);

-- QUERYS
USE Delilah_Resto;
SELECT * FROM user;

USE Delilah_Resto;
SELECT * FROM products;