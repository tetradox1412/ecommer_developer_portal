# 15 — What the DSL Cannot Do

Every tool has a boundary. This file maps the exact boundary of HospitalDSL —
what it covers, what it partially covers, and what deliberately falls outside it.
Understanding this boundary prevents unpleasant surprises late in development.

---

## Coverage Summary

| Category | Coverage | Notes |
|---|---|---|
| Data modeling | ✅ Full | Modules, fields, M2M, FK |
| CRUD + validation | ✅ Full | required, options, min, max |
| Role-based access control | ✅ Full | roles:, scope: own |
| Authentication / login | ✅ Full | JWT, /me endpoint |
| Relational data fetching | ✅ Full | Path with modifiers |
| Dashboard analytics | ✅ Full | Stats block |
| File / image uploads | ❌ None | No File or Image field type |
| Notifications / events | ❌ None | No trigger system |
| State machine workflows | ⚠️ Partial | options + default, no transition rules |
| Doctor availability logic | ❌ None | Requires custom business logic |
| Full-text search | ❌ None | No search endpoint type |
| Audit logging | ❌ None | No compliance trail |
| Composite unique constraints | ❌ None | Only single-field `unique` |
| Cascading deletes | ❌ None | No `onDelete` declaration |
| Payment processing | ❌ None | No external API integration |
| Real-time / WebSocket | ❌ None | REST only |
| Field-level permissions | ❌ None | Role-level only |
| HAVING clauses | ❌ None | Stats cannot filter on aggregated result |
| NOT EXISTS queries | ❌ None | No absence-of-relation queries |

---

## Detailed Gap Analysis

### 1. File and Document Uploads

Medical imaging (X-rays, MRI scans), PDF lab reports, and prescription scans
require file storage. The DSL has no `File` or `Image` field type. Every field
type maps to a database column — files need object storage (S3, GCS).

**Workaround:** Add a `String` field to store the file URL. The upload logic
must be written manually in the generated backend using multer or similar.

```text
// What you can do today:
Module LabReport {
  Fields {
    reportUrl: String optional label "Report PDF URL";
  }
}
// The actual upload endpoint must be custom code.
```

---

### 2. Notifications and Events

When an appointment is approved, the patient should receive an SMS or email.
When a lab report is ready, the ordering doctor should be notified. The DSL
has no event/trigger system.

**Workaround:** Post-generate hook. After generating the backend, add an event
emitter in the route handlers. This is outside the DSL's scope by design —
notification providers (Twilio, SendGrid, FCM) vary by deployment.

**Planned future syntax:**
```text
Notify {
  OnCreate Appointment:            notify patient;
  OnUpdate Appointment(status: "Approved"): notify patient, doctor;
  OnUpdate LabReport(status: "Ready"):      notify doctor;
}
```

---

### 3. State Machine Workflows (Partial Support)

The DSL supports status fields with `options`:

```text
status: String optional default "Pending"
        options "Pending","Approved","Rejected","Completed","Cancelled";
```

But it does not enforce which transitions are valid. A patient could set
their appointment status directly to "Completed" through the API — which
should only be settable by a doctor.

**Workaround:** The generated update handler accepts any value from the
`options` list. Transition validation must be added manually.

**Planned future syntax:**
```text
Module Appointment {
  Workflow status {
    Pending  -> Approved(Doctor) | Rejected(Doctor) | Cancelled(Patient);
    Approved -> Completed(Doctor) | Cancelled(Patient, Admin);
  }
}
```

This would declare valid transitions and *which roles* are allowed to make
each transition — a significant safety improvement.

---

### 4. Doctor Availability and Scheduling Logic

The schema can store `workingDays`, `startTime`, `endTime` on a Doctor:

```text
workingDays: String optional default "Mon-Fri";
startTime:   String optional default "09:00";
endTime:     String optional default "17:00";
```

But the logic of "Is Dr. Meera available at 2pm on Tuesday, given her existing
appointments?" requires:
1. Reading the doctor's working hours
2. Querying existing appointments for conflicts
3. Returning available time slots

This is **business logic** — conditional computation based on runtime data.
Declarative DSLs cannot express arbitrary algorithms. This must be custom code.

---

### 5. Full-Text Search

Finding patients by name fragment, or searching prescriptions by diagnosis
keyword, requires `ILIKE` or `to_tsvector` in Postgres. The DSL's field
filters only support exact equality and numeric comparisons.

**Workaround:** Custom route in the generated backend.

**Planned future syntax:**
```text
APIs {
  Search /find { roles: Admin, Doctor; searchFields: name, diagnosis; }
}
```

---

### 6. Audit Logging

Healthcare regulations (HIPAA, DPDP Act in India) require an audit trail:
who accessed what data, when, and from where. The DSL generates no audit log.

**Workaround:** Add Prisma middleware manually after generation to intercept
all read/write operations and log them to a separate audit table.

**Planned future syntax:**
```text
Module Patient {
  Audit: true;   // Generates shadow audit_patients table for every read/write
}
```

---

### 7. Composite Unique Constraints

Two doctors cannot have the same appointment slot on the same day. This
requires a multi-column uniqueness constraint:

```sql
UNIQUE(doctor_id, date, time_slot)
```

The DSL only supports `unique` on individual fields:
```text
email: Email optional unique;   // single-column — OK
```

A composite constraint across `doctor`, `date`, `timeSlot` is not expressible.

**Planned future syntax:**
```text
Module Appointment {
  Unique: doctor, date, timeSlot;   // composite unique constraint
}
```

---

### 8. HAVING Clauses

The `Stats` block supports `total Appointment(grouped by doctor)`. But you
cannot filter the groups:

```sql
-- "Only show doctors with more than 50 appointments" — impossible today
HAVING COUNT(*) > 50
```

**Planned future syntax:**
```text
Stats {
  total Appointment(grouped by doctor, having count > 50);
}
```

---

### 9. Absence-of-Relation Queries

You cannot express: "find all doctors who have *no* appointments this week."

```sql
SELECT * FROM doctors
WHERE NOT EXISTS (
  SELECT 1 FROM appointments
  WHERE doctor_id = doctors.id AND date BETWEEN '...' AND '...'
);
```

The DSL can only assert the presence of related records, not their absence.

---

### 10. The Escape Hatch

For queries the DSL cannot express, the `RawQuery:` block allows writing
parameterized SQL directly, while keeping the auth middleware and role
checking generated:

```text
API DoctorWorkload {
  Url:   "/admin/doctor-workload";
  Roles: Admin;
  RawQuery: "
    SELECT d.name, COUNT(a.id) as appointmentCount
    FROM doctors d
    LEFT JOIN appointments a ON a.doctor_id = d.id
    GROUP BY d.id
    HAVING COUNT(a.id) > 10
    ORDER BY appointmentCount DESC;
  ";
}
```

The role check (`requireRole('Admin')`), the route registration, and the error
handling are still generated. Only the database query is custom SQL. This keeps
the 80% of standard operations in the DSL and gives a safe, explicit exit for
the remaining 20%.

> **Note:** `RawQuery:` is planned but not yet implemented. It is documented
> here as an escape hatch for the current DSL version's limitations.

---

## What This Means in Practice

For building the **Sunflower Clinic** example (or any standard HMS with
outpatient management, prescriptions, lab reports, and an admin dashboard),
the DSL covers 100% of the required functionality.

For a larger HMS with:
- Inpatient/ward management
- Insurance claim processing
- Radiology integration
- Complex billing with insurance deductions
- Real-time nurse call systems

The DSL covers the data modeling and standard API generation (~70-75%). The
remaining complexity requires custom code added on top of the generated backend.

This is the correct boundary for a domain-specific language. It eliminates the
repetitive, error-prone boilerplate (database tables, auth, CRUD, permissions)
and hands control back to the developer precisely at the point where the
problem becomes genuinely algorithmic.

---

## Next

➡ [Full Example](./12-full-example.md)
