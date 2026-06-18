# 08 — Inline Role Configuration

## The Problem It Solves

Imagine a patient named Ravi logs into the hospital app and calls:

```
GET /api/appointments/my
```

Without any extra rules, the system might return **all** appointments —
Ravi's and everyone else's. That would be a serious privacy violation.

You want the system to automatically ensure that Ravi only ever sees
**his own** appointments. And Dr. Meera should only see **her own** schedule.

That is exactly what **inline role configuration** does.

---

## The Analogy: A Locker Room

Each patient has their own locker. When they open the locker room door,
they only see **their own locker** — not everyone else's.

Inline role configuration is the rule that says "show this person only their own locker."

---

## Syntax

Wrap the role name in `{}` and add a `filter` or `set` command:

```text
// For reading data (List / Get):
List /my { roles: {Patient, filter patient = auth.id}; }

// For writing data (Create):
Create /book { roles: {Patient, set patient = auth.id}; }
```

---

## How It Works — Step by Step

### On a `List` or `Get` endpoint (filter):

```text
List /my { roles: {Patient, filter patient = auth.id}; }
```

1. The system looks at the **logged-in user's JWT** token
2. It reads `role: "Patient"` and `id: 42` from the JWT
3. It sees the `filter patient = auth.id` rule
4. It automatically adds a database filter: `WHERE patient_id = 42`
5. The user only receives their own appointments

### On a `Create` endpoint (set):

```text
Create /book { roles: {Patient, set patient = auth.id}; }
```

1. The system reads `id: 42` from the JWT
2. It sees the `set patient = auth.id` rule
3. It **forces** the `patient` field to `42`, regardless of what the frontend sends
4. Even if a hacker sends `patient: 99` in the request body, the backend overwrites it with `42`

### On an `Update` or `Delete` endpoint (filter):

```text
Update /cancel/:id { roles: {Patient, filter patient = auth.id}; }
```

1. The system first queries the database for the record with the given `:id`
2. It checks: does `patient_id` on this record equal `42` (the JWT user)?
3. If no → `404 Not Found` (the system doesn't even reveal the record exists)
4. If yes → proceeds with the update

---

## A Side-by-Side Comparison

```text
// WITHOUT inline filter — dangerous!
List /my { roles: Patient; }
// Any logged-in Patient could call this and see ALL appointments

// WITH inline filter — safe
List /my { roles: {Patient, filter patient = auth.id}; }
// Each Patient only sees their own appointments
```

---

## Works for Doctors Too

The inline syntax lets you explicitly name which field to filter on:

```text
Module Appointment {
  Fields {
    patient: Patient  required;
    doctor:  Doctor   required;
    ...
  }
  APIs {
    List /my       { roles: {Patient, filter patient = auth.id}; }
    List /schedule { roles: {Doctor,  filter doctor  = auth.id}; }
  }
}
```

There is no magic or guessing. You explicitly tell the compiler:
- For Patient endpoints, filter on the `patient` field
- For Doctor endpoints, filter on the `doctor` field

---

## Unified Endpoints

You can securely combine multiple roles into a single endpoint:

```text
Get /:id {
  name: get;
  roles: 
    Admin, 
    {Patient, filter patient = auth.id}, 
    {Doctor,  filter doctor  = auth.id};
}
```

In one declaration, you've defined:
1. **Admin** can fetch any record (no filter)
2. **Patient** can only fetch it if `patient_id` matches their JWT
3. **Doctor** can only fetch it if `doctor_id` matches their JWT

This eliminates the need to write three separate `Get` endpoints.

---

## `filter` vs `set` — When to Use Which

| Keyword | Used on | What it does |
|---|---|---|
| `filter` | `List`, `Get`, `Update`, `Delete` | Adds a `WHERE` clause to restrict which records the user can see or touch |
| `set` | `Create`, `Update` | Forces a field's value to the JWT user's ID, ignoring the request body |

**Rule of thumb:**
- Reading data? Use `filter` (restrict what they see)
- Writing data? Use `set` (force who owns it)

---

## Handling Ambiguity

If a module has **two** fields of the same type (e.g. `leadSurgeon: Doctor` and
`assistingSurgeon: Doctor`), the inline syntax handles it naturally:

```text
Create /book {
  roles: {Doctor, set leadSurgeon = auth.id};
}
```

You explicitly name the target field. No ambiguity, no guessing.

---

## Defaults Are Still Handled by the Field

```
status: String  optional  default "Pending"  options "Pending","Approved",...;
// The default "Pending" is set by the database — no need to mention it in APIs
```

---

## Next

➡ [09 — Role](./09-role.md)
