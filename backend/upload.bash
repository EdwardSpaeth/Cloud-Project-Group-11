#!/bin/bash

VERSION=v81
docker buildx create --use # Ensure Buildx is enabled
docker buildx build --platform linux/amd64 -t lowtechcontainerregistry.azurecr.io/lowtechbackendcontainer:$VERSION --push .

az containerapp update \
    --name lowtechbackendcontainer \
    --resource-group LowTech \
    --image lowtechcontainerregistry.azurecr.io/lowtechbackendcontainer:$VERSION
