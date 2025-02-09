# this file will have all the endpoints
from . import app, request
from . import db
from .entities import Product, ProductColor, ProductMaterial, Customer, Order, OrderItem, Supplier, Inventory
import json

@app.post("/customers")
def create_customer():
    customer = Customer(
        customerFirstName = request.form.get("customerFirstName"),
        customerLastName = request.form.get("customerLastName"),
        customerAddress = request.form.get("customerAddress"),
        customerEmail = request.form.get("customerEmail"),
        customerPhoneNumber = request.form.get("customerPhoneNumber")
    )
    db.session.add(customer)
    db.session.commit()
    return "OK", 200

@app.get("/products/<int:id>")
def get_description(id: int):
    def get_product_info(product: Product) -> dict:
        colors = list(map(lambda m: m.colorName, ProductColor.query.filter(ProductColor.productID == product.productID).all()))
        materials = list(map(lambda m: m.materialName, ProductMaterial.query.filter(ProductMaterial.productID == product.productID).all()))
        stock = Inventory.query.filter(Inventory.productID == product.productID).first().stock
        product_info = {
            "name": product.productName,
            "category": product.productCategory,
            "price": str(product.productPrice),
            "currency": product.productCurrency,
            "description": product.productDescription,
            "brand": product.productBrand,
            "materials": materials,
            "colors": colors,
            "stock": stock,
            "pictureUrl": product.productPicture
        }
        return product_info

    # Retrieve all products
    if id == 0:
        product_infos = []
        products = Product.query.all()
        for product in products:
            product_infos.append(get_product_info(product))
        return json.dumps(product_infos), 200
    else:
        product = Product.query.filter(Product.productID == id).first()

        product_info = get_product_info(product)
        return json.dumps(product_info), 200

@app.route("/dbtest")
def serve_home():
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

@app.route("/")
def serve_default():
    return "Connection Successful!", 200