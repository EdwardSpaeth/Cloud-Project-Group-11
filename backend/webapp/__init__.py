# initializes all variables

from flask import Flask
from flask_cors import CORS
from .database_login_handler import get_database_connection_string
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(
    app, resources={r"/*": {"origins": "*"}}
)

app.config["SQLALCHEMY_DATABASE_URI"] = get_database_connection_string()
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_size": 5,
    "max_overflow": 10,
    "pool_recycle": 1800,
    "pool_pre_ping": True
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db: SQLAlchemy = SQLAlchemy(app)
with app.app_context():
    db.reflect()
    
from . import views
