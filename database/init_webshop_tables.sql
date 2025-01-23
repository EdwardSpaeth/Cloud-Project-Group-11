-- SQL file to create Webshop tables.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Product {
    prodID          VARCHAR(512),
    prodName        VARCHAR(100)  NOT NULL,
    prodPicture     VARCHAR(),
    prodCategory    VARCHAR(100)  NOT NULL,
    prodCurrency    VARCHAR(100)  NOT NULL,
    prodPrice       DECIMAL(7, 2) NOT NULL,
    prodBrand       VARCHAR(100)  NOT NULL,
    prodDescription VARCHAR(1000),
    prodInfo        VARCHAR(1000),
    prodMaterial    VARCHAR(500),
    prodColor       VARCHAR(50)   NOT NULL,
    PRIMARY KEY ('prodID')
}

INSERT INTO Product (prodID, prodName, prodCategory, prodCurrency, prodPrice, prodBrand, prodDescription, prodInfo, prodMaterial, prodColor)
VALUES 
('', 'Modern Sofa', 'Home & Garden', 'Dollar', 999.99, 'Lowtech Hifi', '', '', '', 'Grey'),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', ''),
('', '', '', '', '', '', '', '', '', '')