# This script uses relative paths!!!

Write-Output ">>> Reading environment variables..."
# Get desired path of .env file.
$EnvFilePath = "$PSScriptRoot\secrets\.env"
# Check if .env file exists.
if(![System.IO.File]::Exists($EnvFilePath)){
    Write-Output ">>> The path $EnvFilePath does not exist."
    New-Item -Path "$PSScriptRoot" -Name "secrets" -ItemType "directory"
    New-Item -Path "$PSScriptRoot\secrets" -Name ".env" -ItemType "file" -Value "LOWTECH_DB_HOST=PUT_VALUE_HERE
LOWTECH_DB_PORT=PUT_VALUE_HERE
LOWTECH_DB_NAME=PUT_VALUE_HERE
LOWTECH_DB_USER=PUT_VALUE_HERE
LOWTECH_DB_PASSWORD=PUT_VALUE_HERE"
    Write-Output ">>> The .env file has been created for you. Please fill in the correct values. Then start the script again. Exiting..."
    exit
}

# Load environment variables from .env file
Get-Content $EnvFilePath | ForEach-Object {
    # Ignore empty lines and lines that are comments (starting with #)
    if ($_ -match "^\s*[^#\s].*=.*$") {
        # Split each line into key-value pairs separated by comma.
        $key, $value = $_ -split '=', 2
        # Add said key-value pairs as temporary environment variables (They only persist for this session).
        [System.Environment]::SetEnvironmentVariable($key.Trim(), $value.Trim(), [System.EnvironmentVariableTarget]::Process)
    }
}
if ($?) {
    Write-Host ">>> Successfully read environment variables!"
} else {
    Write-Host ">>> Failed to read environment variables! Exiting..."
    exit
}

Write-Output ">>> Building Docker image..."
# Build Docker Image
docker build -t lowtech-database-image ./
if ($?) {
    Write-Host ">>> Docker build was successful!"
} else {
    Write-Host ">>> Docker build has failed! Exiting..."
    exit
}

# Stop and remove existing container if one exists
Write-Output ">>> Stopping previous running Docker container..."
docker stop lowtech-database
if ($?) {
    Write-Host ">>> Stopped previous running Docker container!"
}

Write-Output ">>> Removing previous running Docker container..."
docker rm lowtech-database
if ($?) {
    Write-Host ">>> Removed previous running Docker container!"
}

# Start Docker Container
$portMapping = $Env:LOWTECH_DB_PORT + ":5432"
docker run -d -p $portMapping -e POSTGRES_PASSWORD=$Env:LOWTECH_DB_PASSWORD --name lowtech-database lowtech-database-image
if ($?) {
    Write-Host ">>> Successfully started Docker container!"
} else {
    Write-Host ">>> Running Docker container has failed! Exiting..."
    exit
}

Write-Output ">>> Waiting for 2 seconds to give the database time to start up."
Start-Sleep -Seconds 2.0

python.exe test_connection.py

# Check the exit code
if ($LASTEXITCODE -eq 0) {
    Write-Host ">>> Connection is working!"
} else {
    Write-Host ">>> There has been a problem with the connection!"
}
