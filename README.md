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

## Setting up the virtual environment
Now create a virtual environment where all the dependencies will be stored. 

> 'python3 -m venv venv' (Linus/MacOS)
> 'py -m venv venv' (Windows)

This will create a new directory in your with the name "venv". This directory will handle all the dependencies the backend will has and will have in the future.

As a next step we will start the virtual environment:

> '. venv/bin/activate' (Linux/MacOS)
> 'venv/bin/activate.bat' (Windows)

As a last step, we will now install all the dependencies. Please make sure that you have the __requirement.txt__ file pulled:

> python3 install -r requirement.txt (Linux/MacOS)

To run the server, use the following command:

> flask run

This will start the server at 127.0.0.1:5000/index. If you are actively developing the server you have the possibility to use 

> flask run --debug.

Now you don't have to stop the server when making changes to the server. Just safe the changes and refresh your browser. Flask will handle everything else.