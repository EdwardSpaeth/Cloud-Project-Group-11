FROM ubuntu:latest

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN apt-get install -y python3.12-venv
RUN apt-get install -y libodbc2
RUN apt-get install -y unixodbc 
RUN apt-get install -y curl
# For convenience replace sh with bash (so that e.g., the "source" command works properly)
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

##### Installing the Microsoft ODBC Driver for SQL Server (Required to connect to Azure Database)
# Download the package to configure the Microsoft repo
RUN curl -sSL -O https://packages.microsoft.com/config/ubuntu/$(grep VERSION_ID /etc/os-release | cut -d '"' -f 2)/packages-microsoft-prod.deb
# Install the package
RUN dpkg -i packages-microsoft-prod.deb
# Delete the file
RUN rm packages-microsoft-prod.deb

# Install the driver
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql18
# optional: for bcp and sqlcmd
RUN ACCEPT_EULA=Y apt-get install -y mssql-tools18
RUN echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
RUN source ~/.bashrc
# optional: for unixODBC development headers
RUN apt-get install -y unixodbc-dev

#########################################################

# Enable venv
RUN python3 -m venv /opt/venv
WORKDIR /usr/src/app
COPY . .
ENV PATH="/opt/venv/bin:$PATH"
RUN python3 -m pip install -r requirements.txt

CMD [ "gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "webapp:app" ]

EXPOSE 8080
