# PostgreSQL Database Setup Guide

This guide explains how to connect the Spring Boot BFF (Backend-for-Frontend) service to your already installed local or remote PostgreSQL database instead of using the in-memory H2 database.

## Prerequisites

1. **PostgreSQL Installed**: Make sure PostgreSQL is installed and running.
2. **Database Created**: Create a new database named `devportal` (or another name of your choice). You can create it using `psql` or PGAdmin:
   ```sql
   CREATE DATABASE devportal;
   ```

## Configuration

We have pre-configured a Spring active profile named `postgres` in [application-postgres.yml](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/resources/application-postgres.yml).

### Method 1: Environment File (`.env`) & Startup Script (Recommended)

We created a [.env.example](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/.env.example) template and a local [.env](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/.env) configuration file in the `devportal` folder.

You can configure your local database parameters directly inside [.env](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/.env):

```env
# Database configuration for PostgreSQL active profile
DB_HOST=localhost
DB_PORT=5432
DB_NAME=devportal
DB_USER=postgres
DB_PASS=my_secure_password
```

*(Note: `.env` is already configured in the root [.gitignore](file:///Users/gabriel/Projects/ecommer_developer_portal/.gitignore) to protect your local database passwords from being pushed to Git).*

To start the Spring Boot BFF with these environment parameters automatically loaded, simply run the [run-postgres.sh](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/run-postgres.sh) script:

```bash
./run-postgres.sh
```

### Method 2: Manual command-line execution (Alternative)

If you prefer to run manual Maven commands, set the variables in your shell before launching:

```bash
DB_HOST=localhost DB_PORT=5432 DB_NAME=devportal DB_USER=myuser DB_PASS=mypassword \
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### Method 2: Direct Configuration File Edit

If you prefer, you can directly edit [application.yml](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/resources/application.yml) or update the default values in [application-postgres.yml](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/resources/application-postgres.yml):

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devportal
    driver-class-name: org.postgresql.Driver
    username: my_db_username
    password: my_db_password
```

## Schema Initialization

On startup, the Spring Boot service automatically detects the database connection and runs the schema initialization script located at [schema.sql](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/resources/schema.sql). This will:

1. Create the `users`, `user_activities`, `submissions`, and `tickets` tables if they do not exist.
2. Seed default developer and admin accounts using BCrypt password hashing:
   * **Default Developer**: `dev@devportal.com` / `password123`
   * **Default Admin Account**: `admin` / `admin`

   > [!WARNING]
   > **Security Risk**: Make sure to update or delete these default accounts (especially the `admin`/`admin` account) in your production database or environment settings before deployment!

3. Seed default mock tickets and submissions.

## Verify the Connection

1. Start the backend service with the active postgres profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=postgres
   ```
2. Log in through the Developer Console screen using the seeded email/password.
3. Check the `user_activities` and `users` tables in your PostgreSQL database; you should see the newly inserted rows and user session activity logs recorded in real-time!
