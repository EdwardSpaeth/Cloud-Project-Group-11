import os
import base64
import requests

# TODO For uploading pictures.
blob_storage_prefix = os.getenv("LOWTECHBLOBIMAGESTORAGEPREFIX")
blob_storage_suffix = os.getenv("LOWTECHBLOBIMAGESTORAGESUFFIX")
def get_image(image_file_name: str) -> str | None:
    if blob_storage_prefix is None or blob_storage_suffix is None:
        return None
    #response = requests.post(blob_storage_prefix + image_file_name + blob_storage_suffix)
    #try:
    #    print(blob_storage_prefix + image_file_name + blob_storage_suffix)
    #    image_response = base64.encodebytes(response.content).decode('utf-8')
    #    print("Image length:", len(image_response))
    #    print("Image length:", len(image_response), file=sys.stderr)
    #    return base64.encodebytes(response.content).decode('utf-8')
    #except:
    #    return None