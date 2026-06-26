# Backend BFF Architecture & API Reference Guide

This document describes the design, directory structures, REST endpoints, database schemas, and subprocess execution pipelines of the **Spring Boot Backend-For-Frontend (BFF)** service.

---

## 🏗️ System Design & Components

The BFF acts as an API gateway, security boundary, and compiler coordinator for the developer portal. It is built with **Spring Boot 3.x**, **Spring Security** (stateless JWT), and **Spring Data JPA** talking to a **PostgreSQL** database.

```
                  ┌──────────────────────────────────────────────┐
                  │                 REST CLIENTS                 │
                  │              (Vite Frontend SPA)             │
                  └──────────────────────┬───────────────────────┘
                                         │ HTTPS / SSE
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │                 REST CONTROL                 │
                  │   AuthController     • DeveloperController   │
                  │   DslController      • TicketController      │
                  │   StatusStreamCtrl   • WrapperModuleCtrl     │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │                SERVICE LAYER                 │
                  │   UserService        • SubmissionService     │
                  │   TicketService      • DslEngineService      │
                  └──────────┬───────────────────────┬───────────┘
                             │                       │
                             ▼                       ▼
                  ┌────────────────────┐   ┌────────────────────┐
                  │   REPOSITORIES     │   │   DSL COMPILER     │
                  │   (Spring Data)    │   │  (Node ANTLR CLI)  │
                  └──────────┬─────────┘   └────────────────────┘
                             │
                             ▼
                  ┌────────────────────┐
                  │     DATABASE       │
                  │    (PostgreSQL)    │
                  └────────────────────┘
```

---

## 📁 Directory Structure

The backend BFF codebase is organized into the following package structure inside `devportal/bff/src/main/java/com/devportal/bff/`:

```
devportal/bff/src/main/java/com/devportal/bff/
├── BffApplication.java              # Spring Boot application entry point
│
├── client/                          # Third-party & internal REST clients
│   ├── DslEngineClient.java         # Mocks compilation events & syntax validates DSL
│   ├── SaasControllerClient.java    # Checks developer licenses (Mocked in dev)
│   └── WrapperClient.java           # Connects to Wrapper SaaS to fetch available APIs
│
├── controller/                      # REST endpoints handlers
│   ├── AuthController.java          # Handles DB credentials & Google OAuth login
│   ├── DeveloperController.java      # Manages user profiles, credentials, logs, & submissions list
│   ├── DslController.java           # Triggers validations, project zip generations & sandbox dry-runs
│   ├── StatusStreamController.java  # Exposes Server-Sent Events (SSE) compile status streams
│   ├── TicketController.java        # Handles claims and listings of developer support tickets
│   └── WrapperModuleController.java # Aggregates API schemas for the API explorer
│
├── model/                           # Data Transfer Objects (DTOs) & Database Entities
│   ├── ApiEndpointDto.java          # Model representing endpoint definitions
│   ├── DslRequest.java              # Schema validation payload format (.schema & .views)
│   ├── ModuleApi.java               # Module metadata model containing endpoints
│   ├── SubmissionDto.java           # Format returned in submissions lists
│   ├── SubmissionEntity.java        # Represents database submissions log records
│   ├── SubmitDslRequest.java        # Form input schema for module submission
│   ├── TicketDto.java               # Unified format for claiming/reading tickets
│   ├── TicketEntity.java            # Represents database ticket records
│   ├── UserActivityEntity.java      # Represents DB logs for user actions
│   └── UserEntity.java              # Represents database registered users
│
├── repository/                      # Spring Data JPA Interfaces
│   ├── SubmissionRepository.java    # DB queries on submissions
│   ├── TicketRepository.java        # DB queries on tickets
│   ├── UserActivityRepository.java  # DB queries on user activities
│   └── UserRepository.java          # DB queries on user credentials
│
├── security/                        # Configuration & Filter Middleware
│   ├── SecurityConfig.java          # Security filter chain, CORS configuration & PasswordEncoder
│   ├── JwtAuthenticationFilter.java # Decodes JWT headers and populates context
│   ├── JwtUtil.java                 # Generates/authenticates stateless JWT claims
│   └── JwtUser.java                 # Model implementing principal wrapper
│
└── service/                         # Business logic components
    ├── DslEngineService.java        # Dispatches Node compiler process
    ├── SubmissionService.java       # Coordinates in-memory emitters & submissions
    ├── TicketService.java           # Claiming workflow logic
    └── UserService.java             # Authentications, password revisions & profile updates
```

---

## 🔌 REST API Endpoints

All application APIs are prefixed with `/bff`. Endpoints require JWT Bearer headers unless declared public.

### 1. Authentication (`/bff/auth`)

* **`POST /bff/auth/login`**
  * **Access**: Public (Anonymous)
  * **Request Body**:
    ```json
    {
      "email": "dev@devportal.com",
      "password": "password123"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "sub": "Gabriel J.",
        "email": "dev@devportal.com",
        "role": "DEVELOPER_PARTNER"
      }
    }
    ```

* **`POST /bff/auth/google-login`**
  * **Access**: Public (Anonymous)
  * **Request Body**:
    ```json
    {
      "email": "dev@devportal.com",
      "name": "Gabriel J.",
      "role": "DEVELOPER_PARTNER"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "sub": "Gabriel J.",
        "email": "dev@devportal.com",
        "role": "DEVELOPER_PARTNER"
      }
    }
    ```

### 2. Developer Operations (`/bff/developer`)

* **`GET /bff/developer/profile`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    {
      "id": "dev-001",
      "email": "dev@devportal.com",
      "name": "Gabriel J.",
      "role": "DEVELOPER_PARTNER",
      "googleLinked": false
    }
    ```

* **`PUT /bff/developer/profile`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "name": "Gabriel J.",
      "email": "dev@devportal.com"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```

* **`POST /bff/developer/change-password`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "oldPassword": "password123",
      "newPassword": "newPassword456"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "message": "Password changed successfully"
    }
    ```

* **`GET /bff/developer/activities`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    [
      {
        "id": "act-1",
        "userId": "dev-001",
        "activity": "Updated profile info",
        "timestamp": "2026-06-20T13:00:00Z"
      }
    ]
    ```

* **`GET /bff/developer/submissions`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    [
      {
        "id": "SUB-001",
        "moduleName": "loyalty-points",
        "version": "1.2.0",
        "status": "ACTIVE",
        "submittedAt": "2026-06-20T13:04:45Z",
        "errorMessage": null
      }
    ]
    ```

### 3. DSL Operations (`/bff/dsl`)

* **`POST /bff/dsl/submit`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "moduleName": "loyalty-points",
      "version": "1.2.0",
      "dslCode": "module loyalty-points { ... }",
      "manifestXml": "<manifest>...</manifest>"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "submissionId": "SUB-ae293b1d"
    }
    ```

* **`POST /bff/dsl/validate`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "dslCode": "module loyalty-points { ... }"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "errors": []
    }
    ```

* **`POST /bff/dsl/sandbox/run`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "dslCode": "module loyalty-points { ... }",
      "manifestXml": "<manifest>...</manifest>"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "runId": "run-1718899882200",
      "steps": [
        {
          "timestamp": "2026-06-20T13:04:45Z",
          "description": "Initializing sandbox environment",
          "status": "OK"
        }
      ]
    }
    ```

* **`POST /bff/dsl/generate`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "schemaContent": "schema { ... }",
      "viewsContent": "views { ... }"
    }
    ```
  * **Response (200 OK)**: Binary zip file stream attachment containing the generated full-stack project.

* **`POST /bff/dsl/validate-hospital`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Request Body**:
    ```json
    {
      "schemaContent": "schema { ... }",
      "viewsContent": "views { ... }"
    }
    ```
  * **Response (200 OK)**:
    ```json
    {
      "valid": true,
      "errors": [],
      "output": "ANTLR and semantic checker execution output logs..."
    }
    ```

### 4. Server-Sent Events Status Stream (`/bff/status`)

* **`GET /bff/status/stream?submissionId={id}`**
  * **Access**: Public (SSE connection)
  * **Response (text/event-stream)**: Emits real-time validation progression events:
    ```json
    {
      "submissionId": "SUB-1234",
      "status": "COMPILING",
      "message": "DSL compilation started",
      "timestamp": "2026-06-20T13:05:00Z"
    }
    ```

### 5. Support Tickets (`/bff/tickets`)

* **`GET /bff/tickets`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    [
      {
        "id": "TCK-001",
        "title": "Add bulk discount support",
        "description": "API needed for volume orders...",
        "requestedBy": "Acme Corp (anonymised)",
        "status": "OPEN",
        "postedAt": "2026-06-20T13:00:00Z",
        "claimedByDeveloperId": null,
        "claimedByMe": false
      }
    ]
    ```

* **`POST /bff/tickets/{ticketId}/claim`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    {
      "id": "TCK-001",
      "title": "Add bulk discount support",
      "status": "CLAIMED",
      "claimedByDeveloperId": "dev-001",
      "claimedByMe": true
    }
    ```

### 6. Modules API Integration Wrapper (`/bff/wrapper`)

* **`GET /bff/wrapper/modules/apis`**
  * **Access**: Requires role `DEVELOPER_PARTNER`
  * **Response (200 OK)**:
    ```json
    [
      {
        "moduleName": "loyalty-points",
        "version": "1.2.0",
        "endpoints": [
          {
            "path": "/api/loyalty/points/balance",
            "method": "GET",
            "description": "Get current loyalty points balance",
            "requiredRole": "ACTIVE_CUSTOMER",
            "requestSchema": null,
            "responseSchema": null,
            "exampleResponse": {
              "customerId": "C-1234",
              "balance": 250,
              "tier": "GOLD"
            }
          }
        ]
      }
    ]
    ```

---

## 🗄️ Database Tables (PostgreSQL)

Configured and initialized automatically from `devportal/bff/src/main/resources/schema.sql` if tables do not exist:

| Table | Columns | Constraints | Description |
|---|---|---|---|
| **`users`** | `id` VARCHAR(255)<br>`email` VARCHAR(255)<br>`password_hash` VARCHAR(255)<br>`name` VARCHAR(255)<br>`role` VARCHAR(50)<br>`google_id` VARCHAR(255)<br>`created_at` TIMESTAMP<br>`updated_at` TIMESTAMP | PRIMARY KEY (`id`)<br>UNIQUE (`email`)<br>UNIQUE (`google_id`) | Portal credential accounts |
| **`user_activities`** | `id` VARCHAR(255)<br>`user_id` VARCHAR(255)<br>`activity` VARCHAR(500)<br>`timestamp` TIMESTAMP | PRIMARY KEY (`id`) | Audit log database logging for account alterations |
| **`submissions`** | `id` VARCHAR(255)<br>`developer_id` VARCHAR(255)<br>`module_name` VARCHAR(255)<br>`version` VARCHAR(50)<br>`status` VARCHAR(50)<br>`dsl_code` TEXT<br>`manifest_xml` TEXT<br>`error_message` TEXT<br>`submitted_at` TIMESTAMP<br>`updated_at` TIMESTAMP | PRIMARY KEY (`id`) | Compilation tracking records database |
| **`tickets`** | `id` VARCHAR(255)<br>`title` VARCHAR(500)<br>`description` TEXT<br>`requested_by` VARCHAR(255)<br>`status` VARCHAR(50)<br>`claimed_by_developer_id` VARCHAR(255)<br>`posted_at` TIMESTAMP | PRIMARY KEY (`id`) | Support tickets pool for developer task matching |

---

## ⚙️ DSL Subprocess Compilation Workflow

The compile-engine coordinator is implemented in [DslEngineService.java](file:///Users/gabriel/Projects/ecommer_developer_portal/devportal/bff/src/main/java/com/devportal/bff/service/DslEngineService.java).

### Dynamic Folder Resolution
The compiler CLI program is not hardcoded to fixed static paths. On execution:
1. It queries `System.getProperty("user.dir")` to fetch the current runtime directory.
2. It looks for files under `./Hospital-DSL-.../v1/` dynamically.

### Interfacing Pipeline Steps
1. **Writing Temporary Context**:
   Spring Boot generates a temporary directory (e.g. `/tmp/dsl-val-XYZ/`) and stores the inputs in files named `project.schema` and `project.views`.
2. **Process Dispatch**:
   It dispatches a system process using `ProcessBuilder` executing:
   ```bash
   node cli.js validate /tmp/dsl-val-XYZ/project
   ```
3. **Capture Logs and Code**:
   It redirects the input, output, and error streams. If the exit code is `0`, validation passes and outputs are generated. If the exit code is non-zero, errors are parsed and structured syntax markers are returned back to the Monaco UI.
