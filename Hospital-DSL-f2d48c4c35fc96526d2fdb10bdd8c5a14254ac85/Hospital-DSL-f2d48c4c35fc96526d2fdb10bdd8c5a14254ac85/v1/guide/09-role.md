# 09 — Role

## What is a Role?

A **Role** is a category of user in your system.
Every person who logs in belongs to one role.

Common roles in a hospital:
- **Admin** — the hospital manager, has full access
- **Doctor** — a medical professional, sees their own patients
- **Patient** — an end user, books appointments and views their own data

---

## The Key Question a Role Answers

> "Who am I in this system's data?"

This is the central purpose of the `Role` block in HospitalDSL.

When someone logs in as a **Patient**, the system needs to know:
"Is there a Patient *record* in the database for this person?
Which one is it?"

The answer is in the `Me:` declaration.

---

## The `Me:` Declaration

```
Role Patient {
  Me: Patient;
}
```

`Me: Patient` means: "A user with role Patient has a corresponding record
in the `Patient` module. Their identity in the system IS a Patient record."

This declaration does two things:

### 1. Connects the user account to their data record

When a Patient logs in, their JWT (login token) contains their **Patient record ID**.
So whenever they make a request, the system knows:
"This is patient number 42. Show them only data belonging to patient 42."

### 2. Powers the `/me` endpoint

The system generates a `GET /api/auth/me` endpoint. When a Patient calls it:

```json
{
  "id": "user-account-id",
  "role": "Patient",
  "profile": {
    "id": 42,
    "name": "Ravi Kumar",
    "age": 34,
    "bloodType": "O+",
    ...
  }
}
```

The `profile` object is fetched from the `Patient` module using the
patient ID stored in the login token. This is the standard way the frontend
learns who the logged-in user is and what their details are.

---

## Roles Without `Me:`

An **Admin** is a system operator — they manage the system but they are not
a data entity that the system tracks. There is no "Admin record" in your
database.

```
Role Admin { }   // No Me — Admin is a system account
```

When an Admin calls `/api/auth/me`, they get back their login information
but no `profile` object — because there is no module record for them.

---

## The Full Role Picture

```
Role Patient { Me: Patient; }    // Patient IS a Patient record
Role Doctor  { Me: Doctor;  }    // Doctor IS a Doctor record
Role Admin   {              }    // Admin is a system account, no data entity
```

---

## What Role Does NOT Do

In HospitalDSL, `Role` does **not** define what actions each role is allowed
to take. That is the job of `roles:` inside the `APIs` block.

Think of it this way:
- `Role { Me: ... }` answers: **Who am I?** (identity)
- `roles: Admin, Doctor` in an endpoint answers: **Who can call this?** (permission)

These are deliberately separate. Your role defines your identity.
Your permissions are defined per-endpoint, not per-role.

---

## Why This Design Is Better

Older versions of HospitalDSL had the Role block declare UI features:

```
// OLD — wrong approach
Role Patient {
  Portal: BookAppointment, MyAppointments, MyPrescriptions;
}
```

This was wrong because:
1. "BookAppointment" is a UI concept, not an identity concept
2. The system had to *guess* what "BookAppointment" meant — there was no formal definition
3. Permissions were invisible — you had to read the generated code to understand who could access what

Now, the Role block is pure identity, and all permissions are explicit in the
`APIs` blocks — visible, checkable, and formally validated.

---

## Compile-Time Checks

The compiler enforces consistency between roles:

1. Every role named in `Auth { Roles: Admin, Doctor, Patient }` must have
   a `Role` declaration
2. Every `Role` declaration must be listed in `Auth { Roles: ... }`
3. The module named in `Me:` must exist in the schema
4. Every `roles:` in an `APIs` block must name a role from `Auth.Roles`

---

## Next

➡ [10 — Auth](./10-auth.md)
