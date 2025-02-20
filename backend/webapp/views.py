# this file will have all the endpoints
import time
import json
import stripe
import os
import random

from . import app, request, db, jsonify
from .entities import (
    Product,
    ProductColor,
    ProductMaterial,
    Customer,
    Order,
    OrderItem,
    Supplier,
    Message,
)

@app.post("/products")
def add_prod_to_list():
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400
    
    # here we get the data from the frontend
    prod_to_add: str = request.get_json()
    prodSupplier: int = random.randint(1, 4)
    try:
        # first the product is inserted into the db
        prod: Product = Product(
            prod_to_add['name'], 
            prod_to_add['category'], 
            prod_to_add['currency'], 
            prod_to_add['price'], 
            prod_to_add['brand'],
            prod_to_add['stock'],
            prodSupplier,
            prod_to_add['description'],
            prod_to_add['pictureUrl']
        )
    except AttributeError as attrErr:
        return jsonify({"message": attrErr.args}), 400
    except ValueError as valErr:
        return jsonify({"message": valErr.args}), 400
    
    db.session.add(prod)
    db.session.flush()

    # then the colors of the products are saved
    colors = prod_to_add['colors']
    for col in colors:
        prodColor: ProductColor = ProductColor(prod.productID, col, prod)
        db.session.add(prodColor)

    # as a last step the materials of the products
    matierals = prod_to_add['materials']
    for mat in matierals:
        prodMaterial: ProductMaterial = ProductMaterial(prod.productID, mat, prod)
        db.session.add(prodMaterial)

    # commiting all the changes
    try:
        db.session.commit()
    except:
        return jsonify({"message": "Something went wront when adding the data into the database"}), 500

    return jsonify({"message": "Product added to list."}), 200

@app.put("/products/<int:prod_id>")
def update_product(prod_id: int):
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400
    
    product_to_update = request.get_json()

    if not isinstance(product_to_update['price'], float):
        return jsonify({"message": "Product price must be a number (float)"}), 400
    
    if product_to_update['price'] < 0:
        return jsonify({"message": "Price cannot be smaller than zero"}), 400

    # update the product itself
    prod = db.session.query(Product).filter_by(productID = prod_id).first()
    if prod == None:
        return jsonify({"message": "Product does not exist yet. Please create it as a new one."}), 500

    prod.productName = product_to_update['name']
    prod.productPicture = product_to_update['pictureUrl']
    prod.productCategory = product_to_update['category']
    prod.productCurrency = product_to_update['currency']
    prod.productPrice = product_to_update['price']
    prod.productBrand = product_to_update['brand']
    prod.productDescription = product_to_update['description']
    prod.productStock = product_to_update['stock']
    db.session.flush()

    # delete all rows with the given id
    ProductMaterial.query.filter(ProductMaterial.productID == prod_id).delete
    ProductColor.query.filter(ProductColor.productID == prod_id).delete
    db.session.flush()

    # and now update the data with the given id
    materials: list = product_to_update['materials']
    for mat in materials:
        prodMaterial: ProductMaterial = ProductMaterial(prod_id, mat, prod)
        db.session.add(prodMaterial)

    colors: list = product_to_update['colors']
    for col in colors:
        prodColor: ProductColor = ProductColor(prod_id, col, prod)
        db.session.add(prodColor)

    db.session.commit()

    return jsonify({"message": "Product updated."}), 200

@app.delete("/products")
def delete_products():
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400
    
    products_to_delete: list = request.get_json()['ids']

    for prod_id in products_to_delete:
        ProductMaterial.query.filter(ProductMaterial.productID == prod_id).delete()
        ProductColor.query.filter(ProductColor.productID == prod_id).delete()
        Product.query.filter(Product.productID == prod_id).delete()
        db.session.commit()
        
    return jsonify({"message": "Product(s) deleted from list."}), 200

@app.post("/customers")
def create_customer():
    customer = Customer(
        customerFirstName=request.form.get("customerFirstName"),
        customerLastName=request.form.get("customerLastName"),
        customerAddress=request.form.get("customerAddress"),
        customerEmail=request.form.get("customerEmail"),
        customerPhoneNumber=request.form.get("customerPhoneNumber"),
    )
    db.session.add(customer)
    db.session.commit()
    return "OK", 200

@app.get("/products/<int:id>")
def get_description(id: int):
    def get_product_info(product: Product) -> dict:
        colors = list(
            map(
                lambda m: m.colorName,
                ProductColor.query.filter(
                    ProductColor.productID == product.productID
                ).all(),
            )
        )
        materials = list(
            map(
                lambda m: m.materialName,
                ProductMaterial.query.filter(
                    ProductMaterial.productID == product.productID
                ).all(),
            )
        )

        product_info = {
            "name": product.productName,
            "category": product.productCategory,
            "price": str(product.productPrice),
            "currency": product.productCurrency,
            "description": product.productDescription,
            "brand": product.productBrand,
            "materials": materials,
            "colors": colors,
            "stock": product.productStock,
            "pictureUrl": product.productPicture,
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
        #Inventory.query.all(),
        Supplier.query.all()
    ]:
        print(x)
    return "Okay"

@app.route("/")
def serve_default():
    return "Connection Successful!", 200
    
@app.post("/messages")
def create_message():
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400

    data = request.get_json()

    message = Message(
        messageName=data.get("name"),
        messageEmail=data.get("email"),
        messageSubject=data.get("subject"),
        messageText=data.get("message"),
    )
    
    try:
        db.session.add(message)
        db.session.commit()
    except:
        return jsonify({"message": "Could not safe message. Please leave us a call or try later."}), 500

    return jsonify({"message": "Message successfully safed. We will contact you as soon as possible."}), 200

@app.get("/messages")
def get_messages():
    try:
        messages = Message.query.all()
    except:
        return jsonify({"message": "Could not load messages. Please contact IT department or try later."}), 500

    messages_list = [
        {
            "id": msg.messageID,
            "name": msg.messageName,
            "email": msg.messageEmail,
            "subject": msg.messageSubject,
            "message": msg.messageText,
        }
        for msg in messages
    ]

    return jsonify(messages_list), 200

@app.delete("/messages/<int:id>")
def delete_message(id: int):
    message = Message.query.get(id)
    if message is None:
        return jsonify({"message": "Message not found."}), 500

    db.session.delete(message)
    db.session.commit()

    return jsonify({"message": "Message deleted."}), 200

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
@app.post("/create-checkout-session")
def create_checkout_session():
    try:
        data = request.json
        origin = request.headers.get(
            "Origin",
            "https://frontendwebapplowtech-f7d2dbc2gxbrggd3.westeurope-01.azurewebsites.net/",
        )

        items = data.get("items", [])
        if not items:
            return jsonify({"error": "Cart is empty"}), 400

        line_items = [
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item.get("name"),
                        "description": item.get("description"),
                        "images": [item.get("imageUrl")],
                    },
                    "unit_amount": int(float(item.get("price")) * 100),
                },
                "quantity": item.get("quantity"),
            }
            for item in items
        ]

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=line_items,
            success_url=f"{origin}/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{origin}/cancel",
            metadata={"orderId": f"order_{int(time.time())}"},
            shipping_address_collection={"allowed_countries": ["US", "CA", "GB", "DE"]},
            billing_address_collection="required",
            phone_number_collection={"enabled": True},
        )

        return jsonify({"sessionId": session.id}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

