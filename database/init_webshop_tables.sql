-- SQL file to create Webshop tables.
-- Tables for product information, categories, prices, etc.
CREATE TABLE PRODUCTS (
    productID           SMALLINT NOT NULL,
    productName         VARCHAR(100)  NOT NULL,
    productPicture      VARCHAR(1000),
    productCategory     VARCHAR(100)  NOT NULL,
    productCurrency     VARCHAR(100)  NOT NULL,
    productPrice        DECIMAL(7, 2) NOT NULL,
    productBrand        VARCHAR(100)  NOT NULL,
    productDescription  VARCHAR(1000),
    productInfo         VARCHAR(1000),
    productMaterial     VARCHAR(500),
    PRIMARY KEY(productID)
);

CREATE TABLE PRODUCTCOLORS (
    productID       SMALLINT NOT NULL,
    colorName       VARCHAR(50) NOT NULL,
    PRIMARY KEY(productID, colorName),
    FOREIGN KEY(productID) REFERENCES PRODUCTS(productID)
);

-- Tables for order information, order status, payment methods, etc.
CREATE TABLE ORDERS (
    orderID             SMALLINT NOT NULL,
    orderStatus         VARCHAR(100)  NOT NULL,
    orderPaymentMethod  VARCHAR(100)  NOT NULL,
    customerID          SMALLINT NOT NULL,
    PRIMARY KEY(orderID),
    FOREIGN KEY(customerID) REFERENCES CUSTOMERS(customerID)
);

-- Customers
CREATE TABLE CUSTOMERS (
    customerID          SMALLINT NOT NULL,
    customerFirstName   VARCHAR(100) NOT NULL,
    customerLastName    VARCHAR(100) NOT NULL,
    customerAddress     VARCHAR(200) NOT NULL,
    customerEmail       VARCHAR(100) NOT NULL,
    customerPhoneNumber VARCHAR(25),
    PRIMARY KEY(customerID)
);

-- Table for contents of orders
CREATE TABLE ORDERITEMS (
    orderID     SMALLINT NOT NULL,
    productID   SMALLINT NOT NULL,
    quantity    SMALLINT,
    PRIMARY KEY(orderID, productID),
    FOREIGN KEY(orderID) REFERENCES ORDERS(orderID),
    FOREIGN KEY(productID) REFERENCES PRODUCTS(productID)
);

-- Tables for stock levels and supplier information.
CREATE TABLE INVENTORY (
    productID       SMALLINT NOT NULL,
    supplierID      SMALLINT NOT NULL,
    stock           SMALLINT,
    PRIMARY KEY(productID),
    FOREIGN KEY(supplierID) REFERENCES SUPPLIERS(supplierID)
);

CREATE TABLE SUPPLIERS (
    supplierID          SMALLINT NOT NULL,
    supplierName        VARCHAR(100)  NOT NULL,
    supplierAddress     VARCHAR(200),
    PRIMARY KEY(supplierID)
);


INSERT INTO PRODUCTS (productID, productName, productPicture, productCategory, productCurrency, productPrice, productBrand, productDescription, productInfo, productMaterial) 
VALUES
    (1, "Modern Sofa", "PICTURE_HERE", "sofas", "€", 999.99, "BRAND_HERE", "A sleek and luxurious sofa that seamlessly fits any contemporary living space. Its clean lines and plush cushions offer both style and comfort, making it perfect for family gatherings or relaxation.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (2, "Dining Table", "PICTURE_HERE", "tables", "€", 499.99, "BRAND_HERE", "A stylish and sturdy table designed for modern homes. Crafted from high-quality wood, it provides ample space for meals, game nights, and more.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (3, "Lounge Chair", "PICTURE_HERE", "chairs", "€", 299.99, "BRAND_HERE", "An inviting lounge chair with a curved backrest that supports your spine and cushions you in comfort. Ideal for cozy reading nooks or living rooms.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (4, "Minimalist Bed Frame", "PICTURE_HERE", "beds", "€", 799.99, "BRAND_HERE", "A sleek, low-profile bed frame that celebrates clean lines and open spaces. Crafted with robust materials for long-lasting support.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (5, "Ergonomic Office Chair", "PICTURE_HERE", "chairs", "€", 249.99, "BRAND_HERE", "Designed to keep you comfortable during long work sessions. Adjustable height, lumbar support, and padded armrests ensure proper posture.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (6, "Coffee Table", "PICTURE_HERE", "tables", "€", 199.99, "BRAND_HERE", "A functional centerpiece for your living room. Its smooth surface and compact shape provide the perfect spot for books, decor, and beverages.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (7, "Bookshelf", "PICTURE_HERE", "storage", "€", 349.99, "BRAND_HERE", "An elegant shelving unit that helps you organize books, decor, and more. Its clean design complements a variety of interior styles.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (8, "Floor Lamp", "PICTURE_HERE", "lighting", "€", 129.99, "BRAND_HERE", "A modern, slim-profile lamp that brightens any corner of your home. Features an adjustable neck so you can direct light where you need it.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (9, "Dresser", "PICTURE_HERE", "storage", "€", 599.99, "BRAND_HERE", "A spacious and sturdy dresser with ample drawers for organizing clothes and accessories. The timeless design pairs well with various bedroom decors.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE"),
    (10, "Accent Chair", "PICTURE_HERE", "chairs", "€", 279.99, "BRAND_HERE", "A chic and compact piece that adds a stylish flair to your living space. Its cushioned seat and supportive back make for a comfortable reading or conversation spot.", "PRODUCT_INFO_HERE", "PRODUCT_MATERIAL_HERE");

INSERT INTO PRODUCTCOLORS (productID, colorName)
VALUES
    (1, "Gray"),
    (2, "Ash Wood Color"),
    (3, "Beige"),
    (4, "Beige"),
    (4, "Black"),
    (5, "Beige"),
    (5, "Black"),
    (6, "Ash Wood Color"),
    (7, "Ash Wood Color"),
    (8, "Beige"),
    (8, "Bronze"),
    (9, "Ash Wood Color"),
    (10, "Green"),
    (10, "Orange");

INSERT INTO CUSTOMERS(customerID, customerFirstName, customerLastName, customerAddress, customerEmail, customerPhoneNumber)
VALUES
    (1, "Max", "Mustermann", "Nibelungenplatz 1 60318 Frankfurt am Main", "max.mustermann@fictionalstudent.de", "+49 313 41413401"),
    (2, "Joe", "Generic", "Genericstraße 5 60385 Frankfurt am Main", "joe.generic@fictional.de", "+49 612 34134141");

INSERT INTO ORDERS(orderID, orderStatus, orderPaymentMethod, customerID)
VALUES
    (1, "DELIVERED", "PayPal", 1),
    (2, "DELIVERY PENDING", "Bank Transfer", 2);

INSERT INTO ORDERITEMS(orderID, productID, quantity)
VALUES
    (1, 8, 2), -- Max Mustermann's order includes two floor lamps
    (1, 6, 1), -- Max Mustermann's order also includes a coffee table
    (2, 5, 1); -- Joe Generic ordered an ergonomic office chair

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



INSERT INTO SUPPLIERS(supplierID, supplierName, supplierAddress)
VALUES
    (1, "Büromöbel GmbH", "Bürostraße 1 23123 Bürostadt"),
    (2, "Esszimmerexperten GmbH", "Esszimmerstraße 5 23163 Esszimmerstadt"),
    (3, "Lampenexperten GmbH", "Lampenstraße 7 73167 Lampenstadt"),
    (4, "Sonstige Möbel GmbH", "Möbelstraße 23 34141 Möbelheim");
