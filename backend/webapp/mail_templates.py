EMAIL_TEMPLATE: str = """
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

RECEIPT_TEMPLATE: str = """
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
