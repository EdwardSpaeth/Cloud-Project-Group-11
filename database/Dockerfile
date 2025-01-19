# Use the official PostgreSQL docker image as the base (see https://hub.docker.com/_/postgres)
FROM postgres:latest

# Setting environment variables for PostgreSQL user and database name.
# Password is not set here in order to not leak the password.
ENV POSTGRES_USER=lowtechuser
ENV POSTGRES_DB=lowtechwebshop

# Copies the SQL script to the docker-entrypoint-initdb.d directory
# This makes it so that the script is automatically executed when initializing the PostgreSQL container.
COPY init_webshop_tables.sql /docker-entrypoint-initdb.d/

# Default port for PostgreSQL is 5432. 
# But the host port of the container will be different to not interfere with any local postgres installations.
EXPOSE 5432

# Run postgres on default PostgreSQL port.
CMD ["postgres", "-c", "port=5432"]
