from dotenv import load_dotenv
import os
import sys
from sqlalchemy import create_engine, text

# Load environment variables (including DB password) from the .env file located in "secrets" directory.
load_dotenv(os.path.abspath(os.path.dirname(__file__)) + os.sep + "secrets" + os.sep + ".env")

DB_HOST = os.getenv("LOWTECH_DB_HOST")
DB_PORT = os.getenv("LOWTECH_DB_PORT")
DB_NAME = os.getenv("LOWTECH_DB_NAME")
DB_USER = os.getenv("LOWTECH_DB_USER")
DB_PASSWORD = os.getenv("LOWTECH_DB_PASSWORD")

def test_connection():
    # Create a connection string for SQLAlchemy
    connection_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    # Create an SQLAlchemy engine
    engine = create_engine(connection_string)

    try:
        # Connect to the database
        with engine.connect() as connection:
            # Execute a test query
            result = connection.execute(text("SELECT 1;"))
            for row in result:
                print("Connection successful! Test query result:", row)

    except Exception as e:
        print("Error connecting to the database:", e)
        sys.exit(1)

if __name__ == "__main__":
    test_connection()
