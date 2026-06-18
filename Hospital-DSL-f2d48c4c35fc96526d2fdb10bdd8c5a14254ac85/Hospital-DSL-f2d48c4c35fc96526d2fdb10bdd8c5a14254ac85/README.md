# Hospital DSL - Running the Example

This guide explains how to take the `sunflower-clinic` example, compile it using the Hospital DSL compiler, and run the generated code as a fully functional full-stack application (Spring Boot backend + React/Vite frontend).

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v16+)
- **Java 17+**
- **Maven**
- **PostgreSQL**

---

## 1. Generate the Code

First, use the CLI tool to parse the DSL (`.schema` and `.views`) and generate the frontend and backend codebase:

```bash
node cli.js generate examples/sunflower-clinic
```

This command will output the generated full-stack code into the `generated/` directory.

---

## 2. Setup the Database

The generated backend is configured to use PostgreSQL. You need to create a local database for the application to connect to.

1. Ensure PostgreSQL is running on your machine.
2. Create a new database named `sunflowerClinic`:

```bash
createdb sunflowerClinic -U postgres
```

> **Note:** By default, the application connects as user `postgres` with password `postgres`. If your local PostgreSQL setup uses different credentials, update them in `generated/backend/src/main/resources/application.properties`.

---

## 3. Run the Backend (Spring Boot)

1. Navigate to the generated backend directory:
```bash
cd generated/backend
```

2. Clean and build the project using Maven:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`. Hibernate will automatically create the necessary database tables based on the generated entities.

---

## 4. Run the Frontend (React + Vite)

Open a new terminal window to keep the backend running.

1. Navigate to the generated frontend directory:
```bash
cd generated/frontend
```

2. Install the necessary dependencies:
```bash
npm install
```

3. Start the Vite development server:
```bash
npm run dev
```

The frontend application will start and should be accessible at `http://localhost:5173`. 

---

## 5. Seed the Database (Optional)

If you want to populate your database with initial data (like roles and test users), you can run the provided `seed.sql` script against your PostgreSQL database:

```bash
psql -U postgres -d sunflowerClinic -f ../../seed.sql
```
*(On Windows Command Prompt, use backslashes: `psql -U postgres -d sunflowerClinic -f ..\..\seed.sql`)*

*(Run this from the `generated/backend` directory, or provide the absolute path to `seed.sql`).*

---

## Windows Compatibility Notes

All the commands listed above are fully applicable to **Windows** environments (Command Prompt, PowerShell, or Git Bash), with a few minor considerations:
- **Paths**: While Git Bash and PowerShell handle forward slashes (`/`), if you are using the standard Windows Command Prompt (`cmd.exe`), you may need to use backslashes (`\`) for file paths (e.g., `cd generated\backend` or `..\..\seed.sql`).
- **PostgreSQL Tools**: Ensure that the PostgreSQL `bin` directory (e.g., `C:\Program Files\PostgreSQL\15\bin`) is added to your system's `PATH` environment variable so that commands like `createdb` and `psql` are recognized.

---

## Summary

You now have the fully functional generated platform running locally!

- **Backend API:** `http://localhost:8080`
- **Frontend UI:** `http://localhost:5173`
- **Database:** `jdbc:postgresql://localhost:5432/sunflowerClinic`
