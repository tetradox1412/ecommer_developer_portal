# 14 — The Path Syntax (Nested Joins)

## The Problem

The `APIs` block inside a Module handles standard data fetching well. But
what about an endpoint that needs to return a patient record *together with*
their recent appointments and prescriptions, and the doctor attached to each?

That is a **nested join** — a query that traverses multiple related tables and
returns a tree of nested objects. HospitalDSL expresses these using the `Path`
keyword.

---

## The Core Concept: Possessive Chain

A Path is a chain of Module names joined by `'s`:

```
Patient's Prescription's Doctor's Department
```

Each `'s` is one traversal step through the schema's relationship graph. You
read it exactly as English: "The Patient's Prescriptions, the Prescriptions'
Doctor, the Doctor's Department."

---

## Two Directions of Traversal

The `'s` operator resolves in two directions. The compiler checks the Symbol
Table to figure out which direction each step goes.

### Forward Traversal — following a field on the current module

```
Prescription's Doctor
```

The compiler checks: does `Prescription` have a field of type `Doctor`?
→ Yes. `doctor: Doctor required`.
→ This is a forward FK. Prisma key: `doctor`.

### Reverse Traversal — following records that point TO the current module

```
Patient's Prescription
```

The compiler checks: does `Patient` have a field of type `Prescription`?
→ No.
Then checks: does any module have a field of type `Patient`?
→ Yes. `Prescription.patient: Patient required`.
→ This is a reverse relation. Prisma key: `prescriptions` (auto-pluralized).

**You never have to specify which direction.** The compiler resolves it
automatically from the schema's field declarations.

---

## Path Modifiers

Each step in a Path chain can have modifiers in parentheses to control what
gets fetched at that step:

```
Patient's Appointment(status: "Completed", limit: 10, orderBy: date desc)
```

| Modifier | Example | Prisma equivalent |
|---|---|---|
| Field equality | `status: "Completed"` | `where: { status: 'Completed' }` |
| Numeric comparison | `age > 18` | `where: { age: { gt: 18 } }` |
| `limit: N` | `limit: 10` | `take: 10` |
| `orderBy: field dir` | `orderBy: date desc` | `orderBy: { date: 'desc' }` |
| `offset: N` | `offset: 20` | `skip: 20` |

All modifiers are compile-time validated — the compiler checks that the field
exists on the module and that string values match the field's declared `options`.

---

## Path Applied to a Step That Continues

Modifiers apply only to that step. The chain continues past the parentheses:

```text
Patient's Appointment(status: "Completed", limit: 5)'s Doctor
```

Meaning: fetch the 5 most recent completed appointments, and for each,
also embed the doctor object. The `(status: ..., limit: 5)` applies to
`Appointment` only. Doctor has no modifier.

---

## The Full API Syntax

```text
API <Name> {
  Url:    "<url-path>";
  Roles:  <Role> (, <Role>)*;
  Root:   <Module>;
  Path:
    <PathExpr>,
    <PathExpr>;
}
```

Where `<PathExpr>` is: `<Module>(<modifiers>?)'s <Module>(<modifiers>?)'s ...`

---

## Example: Patient History

```text
API PatientHistory {
  Url:    "/patient/:id";
  Roles:  Doctor, Admin;
  Root:   Patient;

  Path:
    Patient's Appointment(limit: 10, orderBy: date desc),
    Patient's Appointment(limit: 10, orderBy: date desc)'s Doctor,
    Patient's Prescription(limit: 20, orderBy: date desc),
    Patient's Prescription(limit: 20, orderBy: date desc)'s Doctor,
    Patient's LabReport(limit: 10, status: "Reviewed");
}
```

### How the Compiler Merges Paths

Multiple paths that share a common prefix are merged into one nested include
tree. The compiler builds this tree from the path list:

```
Patient
├── appointments (limit 10, newest first)
│   └── doctor
├── prescriptions (limit 20, newest first)
│   └── doctor
└── labReports (limit 10, reviewed only)
```

Which generates a single Prisma call:

```javascript
// Generated handler for GET /api/patient/:id
const data = await prisma.patient.findUnique({
  where: { id: Number(req.params.id) },
  include: {
    appointments: {
      take:    10,
      orderBy: { date: 'desc' },
      include: { doctor: true }
    },
    prescriptions: {
      take:    20,
      orderBy: { date: 'desc' },
      include: { doctor: true }
    },
    labReports: {
      take:  10,
      where: { status: 'Reviewed' }
    }
  }
});

if (!data) return res.status(404).json({ error: 'Patient not found' });
res.json(data);
```

### JSON Response

```json
{
  "id": 42,
  "name": "Ravi Kumar",
  "age": 34,
  "appointments": [
    {
      "id": 5,
      "date": "2024-04-01",
      "status": "Completed",
      "doctor": { "id": 7, "name": "Dr. Meera Sharma", "specialization": "Cardiology" }
    }
  ],
  "prescriptions": [
    {
      "id": 3,
      "diagnosis": "Hypertension",
      "medications": "Amlodipine 5mg",
      "doctor": { "id": 7, "name": "Dr. Meera Sharma" }
    }
  ],
  "labReports": [
    { "id": 2, "testName": "Lipid Panel", "status": "Reviewed" }
  ]
}
```

---

## Path Inside Module APIs

`Path` also works inside a Module's `APIs` block to control what gets included
in a `List` or `Get` response:

```text
Module Appointment {
  APIs {
    List /schedule {
      roles: Doctor;
      scope: own;
      Path:
        Appointment's Patient,
        Appointment's Doctor;
    }
  }
}
```

This gives the doctor a schedule where each appointment already has the patient
name and doctor details embedded — in a single database query.

---

## Path in Stats (Multi-Table GROUP BY)

The same possessive dot-notation works for cross-table grouping in Stats:

```text
Stats {
  total Appointment(grouped by appointment.doctor.department);
}
```

For multi-hop traversals crossing 3+ tables, the compiler automatically drops
to a raw SQL query using Prisma's `$queryRaw`:

```javascript
const result = await prisma.$queryRaw`
  SELECT departments.name AS category, COUNT(appointments.id) AS _count
  FROM appointments
  LEFT JOIN doctors     ON appointments.doctor_id = doctors.id
  LEFT JOIN departments ON doctors.department_id  = departments.id
  GROUP BY departments.name;
`;
```

---

## Why Path Replaces Expand

The previous `Expand` keyword automatically fetched every module that
referenced the Root. While convenient, it had serious problems:

- **Over-fetching:** Adding a new module (e.g., `BillingInvoice`) silently
  added it to every Expand endpoint — potentially returning megabytes of data.
- **No filtering:** All related records were returned unconditionally.
  A patient with 10,000 appointments returned 10,000 records every time.
- **No control:** The developer had no say in depth, ordering, or limits.

`Path` requires you to explicitly declare what you want. This means:
- Zero hidden overhead from new modules
- Each step can be limited, filtered, and ordered
- The data tree is precisely defined in the schema

---

## Compile-Time Validation

Every `'s` step is validated:

```
Patient's Dentist's Department
         ↑
Error: No module named 'Dentist'. Did you mean 'Doctor'?
```

```
Patient's Appointment's Department
                        ↑
Error: No valid traversal from Appointment to Department.
Appointment has no field of type Department,
and Department has no field of type Appointment.
```

```
Patient's Prescription's Patient
                         ↑
Error: Circular traversal detected. Patient is already the Root.
```

Broken joins are compile errors, not runtime crashes.

---

## Next

➡ [15 — What the DSL Cannot Do](./15-dsl-limitations.md)
