-- SQL file to create Webshop tables.

-- Table containing Webshop products
CREATE TABLE PRODUCTS (
    productID           SERIAL,
    productName         VARCHAR(100)  NOT NULL,
    productPicture      VARCHAR(1000),
    productCategory     VARCHAR(100)  NOT NULL,
    productCurrency     VARCHAR(10)  NOT NULL,
    productPrice        DECIMAL(7, 2) NOT NULL,
    productBrand        VARCHAR(100)  NOT NULL,
    productDescription  VARCHAR(1000),
    productStock        INT NOT NULL,
    productSupplier     VARCHAR(128) NOT NULL
    PRIMARY KEY(productID)
);

-- Table containing colors of the products.
-- Inside its own table to avoid multi-valued cells (a.k.a color = 'red and green')
CREATE TABLE PRODUCTCOLORS (
    productID       INT NOT NULL,
    colorName       VARCHAR(50) NOT NULL,
    PRIMARY KEY(productID, colorName),
    FOREIGN KEY(productID) REFERENCES PRODUCTS(productID)
);

CREATE TABLE PRODUCTMATERIALS (
    productID       INT NOT NULL,
    materialName    VARCHAR(50) NOT NULL,
    PRIMARY KEY(productID, materialName),
    FOREIGN KEY(productID) REFERENCES PRODUCTS(productID)
);

-- Customer information
CREATE TABLE CUSTOMERS (
    customerID          SERIAL,
    customerFirstName   VARCHAR(100) NOT NULL,
    customerLastName    VARCHAR(100) NOT NULL,
    customerAddress     VARCHAR(200) NOT NULL,
    customerEmail       VARCHAR(100) NOT NULL,
    customerPhoneNumber VARCHAR(25),
    PRIMARY KEY(customerID)
);

-- Orders both pending and done
CREATE TABLE ORDERS (
    orderID             SERIAL,
    orderStatus         VARCHAR(100)  NOT NULL,
    orderPaymentMethod  VARCHAR(100)  NOT NULL,
    customerID          INT NOT NULL,
    PRIMARY KEY(orderID),
    FOREIGN KEY(customerID) REFERENCES CUSTOMERS(customerID)
);

-- Table of subitems of orders
-- E.g., given an order 'A', which buys 1x Product 'P1' and 2x Product 'P2',
-- The table would have these two entries: ('A', 'P1', 1), and ('A', 'P2', 2)
CREATE TABLE ORDERITEMS (
    orderID     INT NOT NULL,
    productID   INT NOT NULL,
    quantity    INT,
    PRIMARY KEY(orderID, productID),
    FOREIGN KEY(orderID) REFERENCES ORDERS(orderID),
    FOREIGN KEY(productID) REFERENCES PRODUCTS(productID)
);

-- Table of supplier information
CREATE TABLE SUPPLIERS (
    supplierID          SERIAL,
    supplierName        VARCHAR(100)  NOT NULL,
    supplierAddress     VARCHAR(200),
    PRIMARY KEY(supplierID)
);

-- Tables for stock levels
-- CREATE TABLE INVENTORY (
--     productID       INT NOT NULL,
--     supplierID      INT NOT NULL,
--     stock           INT,
--     PRIMARY KEY(productID),
--     FOREIGN KEY(productID) REFERENCES PRODUCTS(productID),
--     FOREIGN KEY(supplierID) REFERENCES SUPPLIERS(supplierID)
-- );

-- Create a new table for storing contact form messages
CREATE TABLE MESSAGES (
    messageID      SERIAL,
    messageName    VARCHAR(100)  NOT NULL,
    messageEmail   VARCHAR(100)  NOT NULL,
    messageSubject VARCHAR(150)  NOT NULL,
    messageText    VARCHAR(2000) NOT NULL
    PRIMARY KEY(messageID)
);

INSERT INTO PRODUCTS (productName, productPicture, productCategory, productCurrency, productPrice, productBrand, productDescription, productStock, productSupplier) 
VALUES
    (N'Modern Sofa', N'modern-sofa.webp', N'sofas', N'€', 999.99, N'Furniture LLC.', N'A sleek and luxurious sofa that seamlessly fits any contemporary living space. Its clean lines and plush cushions offer both style and comfort, making it perfect for family gatherings or relaxation.', 123, 1),
    (N'Dining Table', N'dining-table.webp', N'tables', N'€', 499.99, N'WoodArtisans LLC.', N'A stylish and sturdy table designed for modern homes. Crafted from high-quality wood, it provides ample space for meals, game nights, and more.', 25, 2),
    (N'Lounge Chair', N'lounge-chair.webp', N'chairs', N'€', 299.99, N'Furniture LLC.', N'An inviting lounge chair with a curved backrest that supports your spine and cushions you in comfort. Ideal for cozy reading nooks or living rooms.', 75, 3),
    (N'Minimalist Bed Frame', N'minimalist-bed-frame.webp', N'beds', N'€', 799.99, N'WoodArtisans LLC.', N'A sleek, low-profile bed frame that celebrates clean lines and open spaces. Crafted with robust materials for long-lasting support.', 31, 4),
    (N'Ergonomic Office Chair', N'ergonomic-office-chair.webp', N'chairs', N'€', 249.99, N'Furniture LLC.', N'Designed to keep you comfortable during long work sessions. Adjustable height, lumbar support, and padded armrests ensure proper posture.', 26, 1),
    (N'Coffee Table', N'coffee-table.webp', N'tables', N'€', 199.99, N'WoodArtisans LLC.', N'A functional centerpiece for your living room. Its smooth surface and compact shape provide the perfect spot for books, decor, and beverages.', 9, 2),
    (N'Bookshelf', N'bookshelf.webp', N'storage', N'€', 349.99, N'WoodArtisans LLC.', N'An elegant shelving unit that helps you organize books, decor, and more. Its clean design complements a variety of interior styles.', 41, 3),
    (N'Floor Lamp', N'floor-lamp.webp', N'lighting', N'€', 129.99, N'Furniture LLC.', N'A modern, slim-profile lamp that brightens any corner of your home. Features an adjustable neck so you can direct light where you need it.', 18, 4),
    (N'Dresser', N'dresser.webp', N'storage', N'€', 599.99, N'WoodArtisans LLC.', N'A spacious and sturdy dresser with ample drawers for organizing clothes and accessories. The timeless design pairs well with various bedroom decors.', 29, 1),
    (N'Accent Chair', N'accent-chair.webp', N'chairs', N'€', 279.99, N'Furniture LLC.', N'A chic and compact piece that adds a stylish flair to your living space. Its cushioned seat and supportive back make for a comfortable reading or conversation spot.', 86, 2);

INSERT INTO PRODUCTCOLORS (productID, colorName)
VALUES
    (1, 'Gray'),
    (2, 'Ash Wood Color'),
    (3, 'Beige'),
    (4, 'Beige'),
    (4, 'Black'),
    (5, 'Beige'),
    (5, 'Black'),
    (6, 'Ash Wood Color'),
    (7, 'Ash Wood Color'),
    (8, 'Beige'),
    (8, 'Bronze'),
    (9, 'Ash Wood Color'),
    (10, 'Green'),
    (10, 'Orange');

INSERT INTO PRODUCTMATERIALS (productID, materialName)
VALUES
    (1, 'Fabric'),
    (2, 'Wood'),
    (3, 'Leather'),
    (4, 'Wood'),
    (4, 'Aluminum'),
    (5, 'Fabric'),
    (6, 'Wood'),
    (7, 'Wood'),
    (8, 'Bronze'),
    (8, 'Fabric'),
    (9, 'Wood'),
    (10, 'Fabric');

INSERT INTO CUSTOMERS(customerFirstName, customerLastName, customerAddress, customerEmail, customerPhoneNumber)
VALUES
    ('Max', 'Mustermann', 'Nibelungenplatz 1 60318 Frankfurt am Main', 'max.mustermann@fictionalstudent.de', '+49 313 41413401'),
    ('Joe', 'Generic', 'Genericstraße 5 60385 Frankfurt am Main', 'joe.generic@fictional.de', '+49 612 34134141');

INSERT INTO ORDERS(orderStatus, orderPaymentMethod, customerID)
VALUES
    ('DELIVERED', 'PayPal', 1),
    ('DELIVERY PENDING', 'Bank Transfer', 2);

INSERT INTO ORDERITEMS(orderID, productID, quantity)
VALUES
    (1, 8, 2), -- Max Mustermann's order includes two floor lamps
    (1, 6, 1), -- Max Mustermann's order also includes a coffee table
    (2, 5, 1); -- Joe Generic ordered an ergonomic office chair

INSERT INTO SUPPLIERS(supplierName, supplierAddress)
VALUES
    ('Büromöbel GmbH', 'Bürostraße 1 23123 Bürostadt'),
    ('Esszimmerexperten GmbH', 'Esszimmerstraße 5 23163 Esszimmerstadt'),
    ('Lampenexperten GmbH', 'Lampenstraße 7 73167 Lampenstadt'),
    ('Sonstige Möbel GmbH', 'Möbelstraße 23 34141 Möbelheim');

INSERT INTO INVENTORY(productID, supplierID, stock)
VALUES
    (1, 4, 123),
    (2, 2, 25),
    (3, 4, 75),
    (4, 4, 31),
    (5, 1, 26),
    (6, 2, 9),
    (7, 4, 41),
    (8, 3, 18),
    (9, 4, 29),
    (10, 4, 86);
=======
-- INSERT INTO INVENTORY(productID, supplierID, stock)
-- VALUES
--     (1, 4, 123),
--     (2, 2, 25),
--     (3, 4, 75),
--     (4, 4, 31),
--     (5, 1, 26),
--     (6, 2, 9),
--     (7, 4, 41),
--     (8, 3, 18),
--     (9, 4, 29),
--     (10, 4, 86);
