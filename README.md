# Cloud-Project-Group-11
Milestone 3 of the Cloud Project for the course "Cloud Computing" at Frankfurt University of Applied Sciences in Winter Semester 2024/25

## Project Structure
- <code>frontend</code>: Frontend project for the web shop.
- <code>backend</code>: Backend project for the web shop.
- <code>database</code>: Database project for the web shop.
- <code>documentation</code>: Project report or other documentation.

# Getting started with the backend
## Prerequisites
In order to run the server Python __3.9__ and newer must be installed. To install Python on your machine please refere to the official documentation on the [official website](https://www.python.org/downloads/).

Also you must have installed docker for your system. Please refere to the [official website](https://www.docker.com) of docker for doing that.

## Setting up the virtual environment
Now create a virtual environment where all the dependencies will be stored. 

> python3 -m venv venv (Linux/MacOS)<br/>
> py -m venv venv (Windows)

This will create a new directory in your with the name "venv". This directory will handle all the dependencies the backend will has and will have in the future.

As a next step we will start the virtual environment:

> . venv/bin/activate (Linux/MacOS)<br/>
> venv/bin/activate.bat (Windows)

As a last step, we will now install all the dependencies. Please make sure that you have the __requirement.txt__ file pulled:

> pip install -r requirement.txt (Linux/MacOS)

# Getting started with the frontend

## Prerequisites
Node.js must be installed. To install Node.js, please refer to the [official website](https://nodejs.org/).

## Setting up the frontend
Navigate to the frontend directory:

> cd frontend/webshop

Install the dependencies:

> npm install

## Running the development server
To start the development server:

> npm run dev

This will start the server at [http://localhost:3000](http://localhost:3000). The page will automatically reload when you make changes to the code.

## Building for production
To create a production build:

> npm run build

To start the production server:

> npm start