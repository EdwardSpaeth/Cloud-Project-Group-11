# Database Setup

## Quickstart
If you are using Windows, you can use the PowerShell script `database/start_database.ps1`.
This script builds, runs and tests the database. If any errors occur, the script will output it.

## Environment Variables
In order to run the database, you have to have some environment variables configured.
Please create a `secrets` directory inside the on the repository top level (i.e., "alongside" database, backend, frontend). In this directory create a file called `.env`.
The full path should be `secrets/.env`.
Then put in the environment variables seen below. Replace the *** placeholders with the actual values, which are not allowed to be on GitHub.

The .env file in the `secrets` directory stores environment variables used to work with the database. 
The file contains:
    - **non-sensitive** information (DB user, port, etc.)
    - **sensitive** information (DB password).

`secrets/.env`:
```ini
LOWTECH_DB_HOST=localhost
LOWTECH_DB_PORT=4687
LOWTECH_DB_NAME=***
LOWTECH_DB_USER=***
LOWTECH_DB_PASSWORD=***
```
**Please note**: This file is not allowed to be on GitHub in order to not leak the sensitive information. Especially the database password. But the Host address (IP address) should also be kept hidden (except for when locahost is used). 


## Starting the Database

Navigate to the `database` directory.

Build docker image.
```sh
docker build -t lowtech-database-image ./
```

Run docker container
Replace `***` with the database password.
```sh
docker run -d -p 4687:5432 -e POSTGRES_PASSWORD=*** --name lowtech-database lowtech-database-image
```

## Confirming Connection
Now you can just execute `database/test_connection.py`.
Please note, that you need a `secrets/.env` file, which you will **not** get from the Repo.
If you have the `.env` at the correct place, the Python script should output something similar to this:
```
Connection successful! Test query result: (1,)
```
