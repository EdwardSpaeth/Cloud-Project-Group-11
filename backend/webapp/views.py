import time
import json
import stripe
import os
import random

from flask import request, jsonify, render_template_string
from weasyprint import HTML
from azure.communication.email import EmailClient
import base64

from . import app, db
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

# this is a fast email template i created for now HERE, i will maybe make it into a seperate file!
EMAIL_TEMPLATE = """
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px;
      background: #4CAF50;
      color: white;
      border-radius: 5px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase!</h1>
    </div>
    <div class="content">
      <p>Dear valued customer,</p>
      <p>Thank you for shopping with us. Your order has been successfully processed.</p>
      <p>We have attached your receipt to this email for your records.</p>
      <p>Order Total: {{ amount }} {{ currency }}</p>
      <p>If you have any questions about your order, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Your Company Team</p>
    </div>
  </div>
</body>
</html>
"""

RECEIPT_TEMPLATE = """
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .receipt {
      max-width: 800px;
      margin: auto;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #000;
    }
    .info-section {
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .order-items {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .order-items th, .order-items td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .order-items th {
      background-color: #f8f8f8;
    }
    .total-section {
      text-align: right;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 2px solid #000;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <h1>Your Company</h1>
      <h2>Payment Receipt</h2>
    </div>
    
    <div class="info-section">
      <p><strong>Date:</strong> {{ date }}</p>
      <p><strong>Receipt Number:</strong> {{ payment_intent_id }}</p>
      <p><strong>Payment Method:</strong> {{ payment_method }}</p>
    </div>

    <div class="info-section">
      <p><strong>Customer Email:</strong> {{ customer_email }}</p>
    </div>

    <table class="order-items">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {% for item in order_items %}
        <tr>
          <td>
            <strong>{{ item.name }}</strong>
            {% if item.description %}
            <br><small>{{ item.description }}</small>
            {% endif %}
          </td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unit_price }} {{ currency }}</td>
          <td>{{ (item.quantity * (item.unit_price | float)) | round(2) }} {{ currency }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>

    <div class="total-section">
      <h3>Total: {{ amount }} {{ currency }}</h3>
    </div>

    <div class="footer">
      <p>Thank you for your business!</p>
      <p>Your Company Name<br>
      Address Line 1<br>
      City, State, ZIP<br>
      Phone: (123) 456-7890<br>
      Email: support@yourcompany.com</p>
    </div>
  </div>
</body>
</html>
"""


@app.post("/products")
def add_prod_to_list():
    if not request.is_json:
        return jsonify({"message": "Data was not in json format."}), 400

    # here we get the data from the frontend
    prod_to_add: str = request.get_json()
    prodSupplier: int = random.randint(1, 4)
    try:
        # first the product is inserted into the db
        prod: Product = Product(
            prod_to_add["name"],
            prod_to_add["category"],
            prod_to_add["currency"],
            prod_to_add["price"],
            prod_to_add["brand"],
            prod_to_add["stock"],
            prodSupplier,
            prod_to_add["description"],
            prod_to_add["pictureUrl"],
        )
    except AttributeError as attrErr:
        return jsonify({"message": attrErr.args}), 400
    except ValueError as valErr:
        return jsonify({"message": valErr.args}), 400

    db.session.add(prod)
    db.session.flush()

    # then the colors of the products are saved
    colors = prod_to_add["colors"]
    for col in colors:
        prodColor: ProductColor = ProductColor(prod.productID, col, prod)
        db.session.add(prodColor)

    # as a last step the materials of the products
    matierals = prod_to_add["materials"]
    for mat in matierals:
        prodMaterial: ProductMaterial = ProductMaterial(prod.productID, mat, prod)
        db.session.add(prodMaterial)

    # commiting all the changes
    try:
        db.session.commit()
    except:
        return jsonify({"message": "Something went wrong when saving the product."}), 500

    return jsonify({"message": "Product added to list."}), 200


@app.put("/products/<int:prod_id>")
def update_product(prod_id: int):
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400

    product_to_update = request.get_json()

    if not isinstance(product_to_update["price"], float):
        return jsonify({"message": "Product price must be a number (float)"}), 400

    if product_to_update["price"] < 0:
        return jsonify({"message": "Price cannot be smaller than zero"}), 400

    # update the product itself
    prod = db.session.query(Product).filter_by(productID=prod_id).first()
    if prod == None:
        return (
            jsonify(
                {
                    "message": "Product does not exist yet. Please create it as a new one."
                }
            ),
            500,
        )

    prod.productName = product_to_update["name"]
    prod.productPicture = product_to_update["pictureUrl"]
    prod.productCategory = product_to_update["category"]
    prod.productCurrency = product_to_update["currency"]
    prod.productPrice = product_to_update["price"]
    prod.productBrand = product_to_update["brand"]
    prod.productDescription = product_to_update["description"]
    prod.productStock = product_to_update["stock"]
    db.session.flush()

    # delete all rows with the given id
    ProductMaterial.query.filter(ProductMaterial.productID == prod_id).delete
    ProductColor.query.filter(ProductColor.productID == prod_id).delete
    db.session.flush()

    # and now update the data with the given id
    materials: list = product_to_update["materials"]
    for mat in materials:
        prodMaterial: ProductMaterial = ProductMaterial(prod_id, mat, prod)
        db.session.add(prodMaterial)

    colors: list = product_to_update["colors"]
    for col in colors:
        prodColor: ProductColor = ProductColor(prod_id, col, prod)
        db.session.add(prodColor)

    db.session.commit()

    return jsonify({"message": "Product updated."}), 200


@app.delete("/products")
def delete_products():
    if not request.is_json:
        return jsonify({"message": "Data was not in json format"}), 400

    products_to_delete: list = request.get_json()["ids"]

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
            "id": product.productID,
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
        return jsonify({"message": "Could not safe message. Please leave us a call or try later."}),500,

    return jsonify({"message": "Message successfully safed. We will contact you as soon as possible."}),200,


@app.get("/messages")
def get_messages():
    try:
        messages = Message.query.all()
    except:
        return jsonify({"message": "Could not load messages. Please contact IT department or try later."}),500,

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


stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
AZURE_COMMUNICATION_SERVICE_CONNECTION_STRING = os.getenv(
    "AZURE_COMMUNICATION_SERVICE_CONNECTION_STRING"
)
SENDER_EMAIL = os.getenv("AZURE_COMMUNICATION_SERVICE_SENDER_EMAIL")


def generate_receipt_pdf(html_content):
    pdf = HTML(string=html_content).write_pdf()
    return pdf


@app.post("/create-checkout-session")
def create_checkout_session():
    try:
        data = request.json
        origin = request.headers.get(
            "Origin",
            "https://frontendwebapplowtech-f7d2dbc2gxbrggd3.westeurope-01.azurewebsites.net/",
        )
        items = data.get("items", [])
        customer_email = data.get("email")
        compact_items = data.get("metadata", {}).get("items", [])

        if not items or not customer_email:
            return jsonify({"error": "Cart is empty or email missing"}), 400

        line_items = []
        for item in items:
            price_in_cents = int(float(item.get("price")) * 100)
            quantity = item.get("quantity", 1)

            line_items.append(
                {
                    "price_data": {
                        "currency": "eur",
                        "product_data": {
                            "name": item.get("name"),
                            "images": (
                                [item.get("imageUrl")] if item.get("imageUrl") else []
                            ),
                        },
                        "unit_amount": price_in_cents,
                    },
                    "quantity": quantity,
                }
            )

        # Use compact metadata format
        metadata = {"items": json.dumps(compact_items)[:500], "email": customer_email}

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=line_items,
            success_url=f"{origin}/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{origin}/cancel",
            customer_email=customer_email,
            payment_intent_data={"receipt_email": customer_email, "metadata": metadata},
        )

        return jsonify({"sessionId": session.id}), 200

    except Exception as e:
        print("Error creating checkout session:", e)
        return jsonify({"error": str(e)}), 500


def send_receipt_via_azure(customer_email, subject, html_content, pdf_content):
    try:
        # Initialize the email client
        email_client = EmailClient.from_connection_string(
            AZURE_COMMUNICATION_SERVICE_CONNECTION_STRING
        )

        # Create the email message
        message = {
            "senderAddress": SENDER_EMAIL,
            "recipients": {"to": [{"address": customer_email}]},
            "content": {
                "subject": subject,
                "html": html_content,
            },
            "attachments": [
                {
                    "name": "receipt.pdf",
                    "contentType": "application/pdf",
                    "contentInBase64": base64.b64encode(pdf_content).decode("utf-8"),
                }
            ],
        }

        # Send the email
        poller = email_client.begin_send(message)
        result = poller.result()

        if result:
            print(f"Email sent successfully to: {customer_email}")
            return True
        else:
            print(f"Failed to send email to: {customer_email}")
            return False

    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False


@app.post("/webhook")
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_SECRET)
    except ValueError:
        return jsonify({"error": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({"error": "Invalid signature"}), 400

    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        amount = payment_intent["amount_received"] / 100
        currency = payment_intent["currency"].upper()
        customer_email = payment_intent.get("receipt_email", "no-email@provided.com")
        payment_method = payment_intent["payment_method_types"][0]
        date = time.strftime("%Y-%m-%d %H:%M:%S")
        payment_intent_id = payment_intent["id"]

        # Parse the simplified metadata
        metadata = payment_intent.get("metadata", {})
        order_items = []
        try:
            items_data = json.loads(metadata.get("items", "[]"))
            for item in items_data:
                order_items.append(
                    {
                        "name": item["n"],
                        "quantity": item["q"],
                        "unit_price": item["p"],
                        "description": "",
                    }
                )
        except Exception as e:
            print(f"Error parsing order details: {e}")
            # Fallback to basic order summary if detailed info is not available
            order_summary = metadata.get("order_summary", "")
            items = [item.strip() for item in order_summary.split(",")]
            for item in items:
                if "x" in item:
                    name, quantity = item.rsplit("x", 1)
                    order_items.append(
                        {
                            "name": name.strip(),
                            "quantity": int(quantity),
                            "unit_price": "0.00",
                            "description": "",
                        }
                    )

        # Generate the PDF receipt
        pdf_content = generate_receipt_pdf(
            render_template_string(
                RECEIPT_TEMPLATE,
                amount=f"{amount:.2f}",
                currency=currency,
                payment_method=payment_method,
                customer_email=customer_email,
                date=date,
                payment_intent_id=payment_intent_id,
                order_items=order_items,
            )
        )

        # Generate the email HTML
        email_html = render_template_string(
            EMAIL_TEMPLATE,
            amount=f"{amount:.2f}",
            currency=currency,
        )

        # Send the email with PDF attachment
        send_receipt_via_azure(
            customer_email=customer_email,
            subject="Thank you for your purchase!",
            html_content=email_html,
            pdf_content=pdf_content,
        )

    return jsonify({"status": "success"}), 200
