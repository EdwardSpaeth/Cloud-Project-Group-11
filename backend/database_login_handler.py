import os
import urllib

def get_database_connection_string() -> str:
    driver_string = os.getenv("LOWTECHDATABASECONNECTIONSTRING")
    params = urllib.parse.quote_plus(driver_string)
    connection_string = 'mssql+pyodbc:///?odbc_connect={}'.format(params)
    return connection_string
