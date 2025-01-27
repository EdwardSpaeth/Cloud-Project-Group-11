from dotenv import load_dotenv
import os

def get_database_connection_string() -> str:
    # Load environment variables (including DB password) from the .env file located in "secrets" directory.
    load_dotenv(os.path.abspath(os.path.dirname(__file__)) + os.sep + ".." + os.sep + "secrets" + os.sep + ".env")

    DB_HOST = os.getenv("LOWTECH_DB_HOST")
    DB_PORT = os.getenv("LOWTECH_DB_PORT")
    DB_NAME = os.getenv("LOWTECH_DB_NAME")
    DB_USER = os.getenv("LOWTECH_DB_USER")
    DB_PASSWORD = os.getenv("LOWTECH_DB_PASSWORD")

    # Create a connection string for SQLAlchemy
    connection_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    return connection_string
