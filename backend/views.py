# this file will have all the endpoints
from . import app
from . import db
from .entities import Product, ProductColor, ProductMaterial, Customer, Order, OrderItem, Supplier, Inventory
import json

@app.route("/products/<int:id>")
def get_description(id: int):
    if id == 0:
        products_info = []
        products = Product.query.all()
        for product in products:
            products_info.append({
                "name": product.productName,
                "category": product.productCategory,
                "price": str(product.productPrice),
                "currency": product.productCurrency,
                "description": product.productDescription
            })
        return json.dumps(products_info), 200
    else:
        product = Product.query.filter(Product.productID == 1).first()
        product_info = json.dumps({
            "name": product.productName,
            "category": product.productCategory,
            "price": str(product.productPrice),
            "currency": product.productCurrency,
            "description": product.productDescription
        })
        return product_info, 200

@app.route("/products/<int:id>")
def serve_home(id: int):
    for x in [
        Product.query.all(),
        ProductColor.query.all(),
        ProductMaterial.query.all(),
        Customer.query.all(),
        Order.query.all(),
        OrderItem.query.all(),
        Supplier.query.all(),
        Inventory.query.all()
    ]:
        print(x)
    return "Okay"
