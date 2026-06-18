# 07 — The APIs Block

## What is an API?

An **API** (Application Programming Interface) is a way for software to talk
to your system over the internet.

When a patient opens the hospital app and clicks "Book Appointment",
the app sends a message to the server saying "create a new appointment."
That message is an API call.

The **APIs block** in your Module declaration tells the system:
- What actions are allowed on this module
- Who is allowed to perform each action

---

## The Analogy: The Reception Desk Rules

Imagine a hospital reception desk. There is a sign on the wall:

> - **Anyone** can view the list of doctors ✅  
> - **Only staff** can add a new doctor ✅  
> - **Patients** can book appointments for themselves ✅  
> - **Patients cannot** view other patients' records ❌  

The `APIs` block is that sign — it defines the rules for accessing your data.

---

## Basic Syntax

```
APIs {
  List   /all       { name: all; roles: Admin; }
  Create /          { name: new; roles: Admin; }
  Update /:id       { name: edit; roles: Admin; }
  Delete /:id       { name: remove; roles: Admin; }
}
```

Each line inside `APIs { }` is one **endpoint** (one rule).

---

## The Four Verbs

Instead of technical HTTP method names (GET, POST, PUT, DELETE),
HospitalDSL uses plain English verbs:

| Verb | What it does | HTTP Method | Real-world action |
|---|---|---|---|
| `List` | Fetch multiple records | GET | "Show me all appointments" |
| `Get` | Fetch one specific record | GET | "Show me appointment number 42" |
| `Create` | Save a new record | POST | "Book a new appointment" |
| `Update` | Change an existing record | PATCH | "Change appointment status to Approved" |
| `Delete` | Remove a record permanently | DELETE | "Delete this patient record" |

---

## Names and Paths

After the verb, you write a **path** (the URL suffix for this endpoint). Inside the block, you can provide a **name** (used to reference the API from the frontend).

```
List   /all        { name: all }       →  GET  /api/appointments/all
List   /my         { name: my }        →  GET  /api/appointments/my
List   /schedule   { name: schedule }  →  GET  /api/appointments/schedule
Create /book       { name: book }      →  POST /api/appointments/book
Update /status/:id { name: setStatus } →  PUT  /api/appointments/status/42
Delete /:id        { name: remove }    →  DELETE /api/appointments/42
```

`:id` is a placeholder in the path — it means "the ID of the specific record".
So `/status/:id` means "update the status of appointment number [id]".

---

## `roles:` — Who Is Allowed

Inside each endpoint's `{ }`, you declare which roles can call it:

```
List all { roles: Admin; }
// Only Admin can fetch all appointments

List my  { roles: Patient, Doctor; }
// Both Patient and Doctor can call this — but what they see may differ
```

Separate multiple roles with commas.

If someone with the wrong role calls an endpoint, they receive an
**automatic 403 Forbidden** response. You don't write that check —
it's generated for you.

---

## A Complete APIs Block Example

```
Module Appointment {
  Fields { ... }

  APIs {
    // ── Admin: full visibility ──────────────────────────
    List   /all        { name: all; roles: Admin; }
    Update /:id        { name: edit; roles: Admin; }
    Delete /:id        { name: remove; roles: Admin; }

    // ── Patient: can book and see own appointments ──────
    Create /book       { name: book; roles: {Patient, set patient = auth.id}; }
    List   /my         { name: my; roles: {Patient, filter patient = auth.id}; }
    Update /cancel/:id { name: cancel; roles: {Patient, filter patient = auth.id}; }

    // ── Doctor: can see their schedule ─────────────────
    List   /schedule   { name: schedule; roles: {Doctor, filter doctor = auth.id}; }
    Update /status/:id { name: approve; roles: {Doctor, filter doctor = auth.id}; }
  }
}
```

This generates **8 real API endpoints**, each with role-based access control.
No code required.

---

## What Happens If There Is No APIs Block?

If you declare a Module but omit the `APIs` block, the module still exists
as a database table — but there are **zero endpoints** for it.
It is unreachable from the outside. This is useful for modules that are only
used as reference data (e.g. a `BloodType` lookup table).

---

## One Rule Per Line, One Endpoint

Every line in the `APIs` block generates exactly one endpoint.
There is a one-to-one relationship: one DSL line = one route handler
in the generated code.

---

## What You've Seen So Far Is Not the Full Picture

The `APIs` block has one more powerful feature: **inline role configuration**.
This is covered in detail in the next section because it's important enough
to deserve its own explanation.

---

## Next

➡ [08 — scope: own](./08-scope-own.md)
