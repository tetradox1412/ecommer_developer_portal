# 10 — Auth

## What is Auth?

**Auth** (short for Authentication) is the part of the system that handles
login and identity verification.

When someone opens the hospital app and types their username and password,
the `Auth` block defines how that process works.

---

## There is Exactly One Auth Block

Every schema file has exactly one `Auth` block, sitting at the same level
as your Modules and Roles:

```
Hospital SunflowerClinic {
  Module Doctor { ... }
  Module Patient { ... }

  Role Admin   { }
  Role Doctor  { Me: Doctor;  }
  Role Patient { Me: Patient; }

  Auth {
    Type:   JWT;
    Expiry: "7d";
    Roles:  Admin, Doctor, Patient;
  }
}
```

---

## The Three Items Inside Auth

### `Type: JWT;`

This tells the system which login technology to use.
Currently the only supported value is `JWT`.

**What is JWT?** JWT stands for JSON Web Token. When a user logs in
successfully, the server gives them a small digital "ticket" (the JWT).
Every time they make a request, they show that ticket. The server checks
the ticket is genuine and hasn't expired — no need to look up a database
session.

You don't need to understand the technical details of JWT to use it.
Just write `Type: JWT;` and the entire login system is generated for you.

---

### `Expiry: "7d";`

How long the login ticket (JWT) stays valid before the user has to log in again.

```
Expiry: "7d";    // 7 days
Expiry: "24h";   // 24 hours
Expiry: "30m";   // 30 minutes
```

Shorter expiry = more secure (an intercepted token expires quickly).  
Longer expiry = more convenient (users don't have to log in as often).

For a hospital app, `"7d"` (7 days) is a reasonable balance.

---

### `Roles: Admin, Doctor, Patient;`

The complete list of all roles that exist in your system.

```
Roles: Admin, Doctor, Patient;
```

Rules:
- Every role listed here must have a `Role` declaration somewhere in the schema
- Every `Role` declaration must appear in this list
- Every `roles:` item inside any `APIs` block must name one of these roles

This is how the compiler knows the full set of valid roles and can catch typos:

```
// In some APIs block:
List /all { roles: Nurse; }   // ❌ "Nurse" not in Auth.Roles
```

```
Error: Role 'Nurse' used in Appointment.APIs[List /all]
but 'Nurse' is not declared in Auth.Roles.
```

---

## What Gets Generated

From this single `Auth` block, the system generates a complete authentication
system with these endpoints:

| Endpoint | What it does |
|---|---|
| `POST /api/auth/register` | Create a new staff account (Admin-only) |
| `POST /api/auth/login` | Log in, receive a JWT token |
| `GET  /api/auth/me` | Get the logged-in user's info + profile data |
| `POST /api/auth/patient/register` | Patients can self-register |
| `POST /api/auth/patient/login` | Patients log in with their own endpoint |

> Roles with `Me:` bindings (Patient, Doctor) get their own separate register
> and login endpoints so end-users can create accounts without Admin help.
> Roles without `Me:` (Admin) must be created by another Admin.

---

## The Login Token (JWT Payload)

When a user logs in, the system gives them a token containing:

```
{
  "id":        "user-account-id",
  "role":      "Patient",
  "profileId": 42,       ← the ID of their record in the Patient table
  "exp":       ...       ← when the token expires
}
```

`profileId` is what `filter patient = auth.id` uses to filter data to only that user's records.
The frontend stores this token and sends it with every request.

---

## Full Auth Block Example

```
Auth {
  Type:   JWT;
  Expiry: "7d";
  Roles:  Admin, Doctor, Patient;
}
```

That is all you write. Everything else — the login endpoint, the token
generation, the middleware that checks the token on every request,
the forbidden response when the token is missing or expired — is
generated automatically.

---

## Next

➡ [11 — Standalone APIs](./11-standalone-apis.md)
