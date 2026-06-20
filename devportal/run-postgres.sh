#!/usr/bin/env bash

# Change to the directory where this script is located
cd "$(dirname "$0")"

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  # Export env variables, ignoring comments and empty lines
  export $(grep -v '^#' .env | xargs)
else
  echo "No .env file found. Using default environment variables."
fi

# Run Spring Boot BFF application with postgres profile
echo "Starting Spring Boot BFF with 'postgres' active profile..."
cd bff && mvn spring-boot:run -Dspring-boot.run.profiles=postgres
