# 11 — Expand and Stats (Cross-Module Data)

## What Are They?

The `APIs` block inside a Module covers endpoints that operate on
**one module at a time** — create a patient, list appointments, etc.

But some endpoints need data from multiple modules:

- **Patient History**: fetch a patient record *plus* their appointments, prescriptions, and lab reports in one response
- **Admin Dashboard**: return total counts of doctors, patients, pending appointments, etc.

Both of these are declared **inside a Module's `APIs` block** using
the `expand:` keyword and the `Stats` endpoint type.

---

## 1. The `expand:` Keyword

### The Idea

When a doctor opens a patient's file, they need the patient's details, recent
appointments, and prescriptions — all in one request. Instead of making 3
separate API calls from the frontend, the backend provides one endpoint
that fetches exactly the right data tree.

### Syntax

Add `expand:` to any `Get` endpoint inside a Module's `APIs` block:

```text
Module Patient {
  APIs {
    Get /:id/history {
      name: history;
      roles: Doctor, Admin;
      expand: appointments, prescriptions, labReports;
    }
  }
}
```

### How `expand:` Works

The compiler looks at the modules listed in `expand:` and finds the
relationship back to the current module:

1. `appointments` → the `Appointment` module has a `patient: Patient` field → include all appointments for this patient
2. `prescriptions` → the `Prescription` module has a `patient: Patient` field → include all prescriptions
3. `labReports` → the `LabReport` module has a `patient: Patient` field → include all lab reports

### How It Translates to Code

The compiler builds a nested Prisma `include` query:

```javascript
// Generated handler for GET /api/patient/:id/history
const data = await prisma.patient.findUnique({
  where: { id: Number(req.params.id) },
  include: {
    appointments: true,
    prescriptions: true,
    labReports: true,
  }
});

if (!data) return res.status(404).json({ error: 'Patient not found' });
res.json(data);
```

This is a single optimized database operation — not multiple round-trips.

### Security

`roles:` on an `expand:` endpoint works identically to any other endpoint —
the compiler wraps the handler with `requireRole(...)` middleware.

---

## 2. The `Stats` Endpoint

### The Idea

An admin dashboard needs numbers — total doctors, total patients, pending
appointments. Each number is a database-level aggregation (`COUNT`, `SUM`, `AVG`).
The `Stats` endpoint declares what to measure; the compiler generates
efficient parallel database queries.

### Syntax

```text
Module Appointment {
  APIs {
    Stats /admin/stats {
      name: adminStats;
      roles: Admin;
      
      totalDoctor:          count Doctor;
      pendingAppointment:   count Appointment(status: "Pending");
      paidInvoiceAmount:    sum Invoice.amount(status: "Paid");
    }
  }
}
```

Each line inside the `Stats` block follows the pattern:

```
<jsonKey>: <function> <Module>(modifiers);
<jsonKey>: <function> <Module>.<field>(modifiers);
```

### The Aggregation Functions

| Function | What it does | Requires `.field`? |
|---|---|---|
| `count` | Count matching records | No |
| `sum` | Add up a numeric field | Yes |
| `avg` | Average of a numeric field | Yes |
| `min` | Smallest value of a field | Yes |
| `max` | Largest value of a field | Yes |

### The Response

Because every metric has an explicit `jsonKey:`, the response is completely predictable:

```json
{
  "totalDoctor": 24,
  "pendingAppointment": 38,
  "paidInvoiceAmount": 1250000
}
```

### Scoped Stats

Stats endpoints support the same inline role configuration as any other endpoint.
This lets different roles see different numbers from the same Stats block:

```text
Stats /my-stats {
  name: myStats;
  roles: 
    Admin, 
    {Doctor, filter doctor = auth.id};
  
  totalAppointments:   count Appointment;
  pendingAppointments: count Appointment(status: "Pending");
}
```

- **Admin** sees hospital-wide totals (all 4,000 appointments)
- **Doctor** sees only their own totals (their 12 appointments)

The `filter` is applied to every `count`/`sum`/`avg` query in the block.

---

## Why Both Live Inside Modules

In earlier versions of HospitalDSL, these were declared as top-level
`API` blocks outside of any Module. We removed that because:

1. **Consistency** — every endpoint now lives inside a Module's `APIs` block
2. **Inline role filters** — by being inside the standard API system, they inherit all the `{Role, filter ...}` syntax for free
3. **Schema ordering** — the file follows a strict `Modules → Roles → Auth` order with no exceptions

---

## Next

➡ [13 — Stats and Aggregations (Deep Dive)](./13-stats-and-aggregations.md)
