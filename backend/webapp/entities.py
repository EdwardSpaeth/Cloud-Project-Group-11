from . import db
from sqlalchemy.sql import func

class Product(db.Model):
    __tablename__="products"
    __table_args__ = {"extend_existing": True}

    productID = db.Column("productid", db.Integer, primary_key=True, autoincrement=True) 
    productName = db.Column("productname", db.String(100), nullable=False)
    productPicture = db.Column("productpicture", db.String(1000))
    productCategory = db.Column("productcategory", db.String(100), nullable=False)
    productCurrency = db.Column("productcurrency", db.String(10), nullable=False)
    productPrice = db.Column("productprice", db.Numeric(7, 2), nullable=False)
    productBrand = db.Column("productbrand", db.String(100), nullable=False)
    productDescription = db.Column("productdescription", db.String(1000))
    productStock = db.Column("productStock", db.Integer, nullable=False)
    productSupplier = db.Column("productSupplier", db.String(128), nullable=False)

    def __init__(self, prodName: str, prodCategory: str, prodCurrency: str, prodPrice: float, prodBrand: str, prodStock: int, prodSupplier: str, prodDescription: str = None, prodPic: str = None):
        self.productName        = prodName
        self.productPicture     = prodPic
        self.productCategory    = prodCategory
        self.productCurrency    = prodCurrency

        if not isinstance(prodPrice, float):
            raise AttributeError('Product price must be a number (float)')
        
        if prodPrice < 0:
            raise ValueError('Price cannot be smaller than zero')
        
        self.productPrice       = prodPrice
        self.productBrand       = prodBrand

        if prodStock < 0:
            raise ValueError('Product stock cannot be smaller than zero')
        self.productStock = prodStock

        self.productSupplier = prodSupplier
        self.productDescription = prodDescription

    def __repr__(self):
        return f"<Product {self.productName}>"

class ProductColor(db.Model):
    __tablename__ = "productcolors"
    __table_args__ = {"extend_existing": True}

    productID = db.Column("productid", db.Integer, db.ForeignKey("products.productid"), primary_key=True)
    colorName = db.Column("colorname", db.String(50), primary_key=True, nullable=False)
    product = db.relationship("Product", backref="colors", foreign_keys=[productID])

    def __init__(self, prodID: int, colName: str, prod: Product):
        self.productID = prodID
        self.colorName = colName
        self.product   = prod

    def __repr__(self):
        return f"<ProductColor {self.colorName} for Product {self.productID}>"


class ProductMaterial(db.Model):
    __tablename__ = "productmaterials"
    __table_args__ = {"extend_existing": True}

    productID = db.Column("productid", db.Integer, db.ForeignKey("products.productid"), primary_key=True)
    materialName = db.Column("materialname", db.String(50), primary_key=True, nullable=False)
    product = db.relationship("Product", backref="materials", foreign_keys=[productID])

    def __init__(self, prodID: int, matName: str, prod: Product):
        self.productID    = prodID
        self.materialName = matName
        self.product      = prod

    def __repr__(self):
        return f"<ProductMaterial {self.materialName} for Product {self.productID}>"

class Customer(db.Model):
    __tablename__ = "customers"
    __table_args__ = {"extend_existing": True}
    customerID = db.Column("customerid", db.Integer, primary_key=True, autoincrement=True)
    customerFirstName = db.Column("customerfirstname", db.String(100), nullable=False)
    customerLastName = db.Column("customerlastname", db.String(100), nullable=False)
    customerAddress = db.Column("customeraddress", db.String(200), nullable=False)
    customerEmail = db.Column("customeremail", db.String(100), nullable=False)
    customerPhoneNumber = db.Column("customerphonenumber", db.String(25))
    def __repr__(self):
        return f"<Customer {self.customerFirstName} {self.customerLastName}>"

class Order(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"extend_existing": True}
    orderID = db.Column("orderid", db.Integer, primary_key=True, autoincrement=True)
    orderStatus = db.Column("orderstatus", db.String(100), nullable=False)
    orderPaymentMethod = db.Column("orderpaymentmethod", db.String(100), nullable=False)
    customerID = db.Column("customerid", db.Integer, db.ForeignKey("customers.customerid"), nullable=False)
    customer = db.relationship("Customer", backref="orders", foreign_keys=[customerID])
    def __repr__(self):
        return f"<Order {self.orderID} for Customer {self.customerID}>"
    
class OrderItem(db.Model):
    __tablename__ = "orderitems"
    __table_args__ = {"extend_existing": True}
    orderID = db.Column("orderid", db.Integer, db.ForeignKey("orders.orderid"), primary_key=True) 
    productID = db.Column("productid", db.Integer, db.ForeignKey("products.productid"), primary_key=True)
    quantity = db.Column("quantity", db.Integer)
    order = db.relationship("Order", backref="order_items", foreign_keys=[orderID])
    product = db.relationship("Product", backref="order_items", foreign_keys=[productID])

    def __repr__(self):
        return f"<OrderItem Order {self.orderID} Product {self.productID}>"
    
class Supplier(db.Model):
    __tablename__ = "suppliers"
    __table_args__ = {"extend_existing": True}
    supplierID = db.Column("supplierid", db.Integer, primary_key=True, autoincrement=True)
    supplierName = db.Column("suppliername", db.String(100), nullable=False)
    supplierAddress = db.Column("supplieraddress", db.String(200))
    def __repr__(self):
        return f"<Supplier {self.supplierName}>"
    
# class Inventory(db.Model):
#     __tablename__ = "inventory"
#     __table_args__ = {"extend_existing": True}

#     productID = db.Column("productid", db.Integer, db.ForeignKey("products.productid"), primary_key=True)
#     supplierID = db.Column("supplierid", db.Integer, db.ForeignKey("suppliers.supplierid"), nullable=False)
#     stock = db.Column("stock", db.Integer)
#     product = db.relationship("Product", backref="inventory", foreign_keys=[productID])
#     supplier = db.relationship("Supplier", backref="inventory", foreign_keys=[supplierID])

#     def __repr__(self):
#         return f"<Inventory Product {self.productID} Supplier {self.supplierID}>"

class Message(db.Model):
    __tablename__ = "MESSAGES"
    __table_args__ = {"extend_existing": True}

    messageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    messageName = db.Column(db.String(100), nullable=False)
    messageEmail = db.Column(db.String(100), nullable=False)
    messageSubject = db.Column(db.String(150), nullable=False)
    messageText = db.Column(db.String(2000), nullable=False)