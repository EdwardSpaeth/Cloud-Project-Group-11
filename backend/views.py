# this file has all the endpoints

from . import app

app.get("/products/<int:prod_id>")
def serve_products(prod_id: int):

    # if all products are requested
    if prod_id == 0:
        pass

    # if a specific product is requested
    pass
