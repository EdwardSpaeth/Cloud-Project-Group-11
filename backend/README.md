# Backend
The backend is hosted on Azure.
Below are commands required to run the backend locally instead.

## Prerequisites
You only require Docker to run the backend. Install Docker and Docker CLI in order to run docker commands in the command line.
Depending on how you install Docker on Linux, you may have to run the commands as superuser.

## Setting up the Backend
Navigate to the backend directory:
> cd backend

Build Docker image:
> docker build --rm -t lowtech-backend-image ./

(OPTIONAL) If you have already built the backend before, stop and remove the running containers:
> docker stop lowtech-backend
> docker rm lowtech-backend

Run the backend container:
> docker run -p 5636:8080 -e LOWTECHDATABASECONNECTIONSTRING=Driver=<DATABASE_CONNECTION_STRING> -e LOWTECHBLOBIMAGESTORAGEPREFIX=<BLOB_STORAGE_URL_PREFIX> -e LOWTECHBLOBIMAGESTORAGESUFFIX=<BLOB_STORAGE_URL_SUFFIX> --name lowtech-backend lowtech-backend-image

Note that _DATABASE_CONNECTION_STRING_, _BLOB_STORAGE_URL_PREFIX_, and _BLOB_STORAGE_URL_SUFFIX_ are values, which are passed to the container as environment variables. These values are required for e.g., database access. Said values are not publicly accessible.

## Update Backend on Azure
First you have to login into our Azure Container Registry:
> docker login lowtechcontainerregistry.azurecr.io

Navigate to the backend directory:
> cd backend

(OPTIONAL) Rebuild the Docker image if you have not yet done so:
> docker build --rm -t lowtech-backend-image ./;

Tag the local image, so that it is associated with the remote image on the container registry:
> docker tag lowtech-backend-image lowtechcontainerregistry.azurecr.io/lowtech-backend-image

Push the image to Azure:
> docker push lowtechcontainerregistry.azurecr.io/lowtech-backend-image
