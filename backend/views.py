# this file will have all the endpoints

from . import app
import uuid

app.products("/products/<uuid:id>")
def serve_home(id: uuid):

    # if all products are requested
    if id == uuid.UUID(0):
        pass

    # if a specific product is requested
    pass