# this file will have all the endpoints
from . import app
from . import db
from .entities import Product, ProductColor, ProductMaterial, Customer, Order, OrderItem, Supplier, Inventory

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
