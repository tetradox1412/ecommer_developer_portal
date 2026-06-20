#!/usr/bin/env bash

# Exit on error for initial setup commands
set -e

# Change to the project root directory
cd "$(dirname "$0")"

echo "======================================"
echo " Starting eCommerce Developer Portal "
echo "======================================"

echo "[1/3] Setting up PostgreSQL Database..."
# Create the database and user if they don't exist
psql -c "CREATE USER giolitlabs WITH PASSWORD 'giolit';" 2>/dev/null || true
psql -c "CREATE DATABASE devportal;" 2>/dev/null || true
psql -c "ALTER DATABASE devportal OWNER TO giolitlabs;" 2>/dev/null || true

echo "[2/3] Starting Backend (BFF)..."
cd devportal

# Start the backend in the background
./run-postgres.sh > ../bff.log 2>&1 &
BFF_PID=$!
echo "Backend is starting (PID: $BFF_PID). Logs: bff.log"

echo "[3/3] Starting Frontend..."
cd frontend
# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start the frontend in the background
npm run dev > ../../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend is starting (PID: $FRONTEND_PID). Logs: frontend.log"

echo "======================================"
echo " Services are starting up..."
echo " Backend will be available at http://localhost:8084 (API)"
echo " Frontend will be available at http://localhost:5173"
echo " Press Ctrl+C to stop all services."
echo "======================================"

# Trap EXIT to clean up background processes whenever the script stops
trap "echo -e '\nStopping services...'; kill $BFF_PID $FRONTEND_PID 2>/dev/null; exit 0" EXIT

# Wait for processes
wait $BFF_PID $FRONTEND_PID

