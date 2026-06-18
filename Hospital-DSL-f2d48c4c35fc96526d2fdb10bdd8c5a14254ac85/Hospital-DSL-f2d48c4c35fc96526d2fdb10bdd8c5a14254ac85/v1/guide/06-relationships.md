# 06 — Relationships

## The Problem: Things Are Connected

In a hospital, nothing exists in isolation.

An **Appointment** belongs to a **Patient** and a **Doctor**.  
A **Prescription** was written by a **Doctor** for a **Patient**.  
A **Doctor** works in a **Department**.

If you just stored names as text, you'd lose the connection:

```
// If you stored names as plain text:
Module Appointment {
  Fields {
    patientName: String required;   // "Ravi Kumar"
    doctorName:  String required;   // "Dr. Meera"
  }
}
```

This is fragile. What if Dr. Meera changes her name?
You'd have to find every appointment and update it manually.
What if two doctors are named "Dr. Meera"? Which one do you mean?

The solution is to store a **reference** — a pointer to the actual Doctor record.

---

## How HospitalDSL Expresses Relationships

Instead of writing the type as `String`, you write the **Module name** as the type:

```
Module Appointment {
  Fields {
    patient: Patient  required  label "Patient";
    doctor:  Doctor   required  label "Doctor";
    date:    Date     required  label "Date";
  }
}
```

`patient: Patient` means: "this field holds a **reference** to a Patient record."

When you save an appointment, you provide the **ID number** of the patient
(e.g. patient ID `42`). The system stores that number and can always look up
the full patient details from it.

---

## What This Generates

Behind the scenes, `patient: Patient  required` creates:
- A column `patient_id` in the `appointments` table
- A **foreign key constraint** that ensures the patient ID you provide actually
  exists in the `patients` table (you can't link to a non-existent patient)
- A Prisma relation so you can fetch the full patient record alongside the appointment

You get all of that from four words: `patient: Patient  required`.

---

## Reading a Relationship Field

```
patient: Patient  required  label "Patient";
│        │         │         │
│        │         │         └─ label in the UI (shows a dropdown of patients)
│        │         └─ a patient must always be linked
│        └─ the type is "Patient" — another Module
└─ field name
```

The field name (`patient`) is what appears in the JSON response:

```json
{
  "id": 1,
  "patient": { "id": 42, "name": "Ravi Kumar", "age": 34 },
  "doctor":  { "id": 7,  "name": "Dr. Meera Sharma" },
  "date": "2024-03-15"
}
```

When you fetch an appointment, you get the full patient and doctor objects
embedded — not just their IDs.

---

## Many-to-Many Relationships

Sometimes one thing relates to *many* of another, and vice versa.

Example: A Doctor can work in **multiple Departments**.
And a Department can have **multiple Doctors**.

For this, add `[]` after the Module name:

```
Module Doctor {
  Fields {
    name:        String       required  label "Full Name";
    departments: Department[] optional  label "Departments";
  }
}
```

`Department[]` means "a list of Department records".

### What happens under the hood (Desugaring)

To keep your database safe from destructive migrations, the HospitalDSL compiler **does not use hidden tables**. 

When the compiler sees `departments: Department[]`, it automatically *desugars* it. Behind the scenes, it generates an explicit junction module named `DoctorToDepartment` with an auto-incrementing `id` and a strict unique constraint on `(doctorId, departmentId)`.

The `[]` syntax is just pure convenience sugar. Because the compiler converts it into an explicit table, the database schema remains uniform. If you ever decide you want to add extra fields to this relationship (like `joinedAt`), you can explicitly declare the `DoctorToDepartment` module later without breaking your database.

---

## One-to-Many vs Many-to-Many — Choosing the Right One

| Situation | How to declare |
|---|---|
| An appointment belongs to **one** patient | `patient: Patient required` |
| A doctor works in **one** main department | `department: Department optional` |
| A doctor works in **many** departments | `departments: Department[] optional` |
| A prescription is for **one** patient | `patient: Patient required` |

---

## Validation: Can I Reference a Module That Doesn't Exist?

No. If you write:

```
Module Appointment {
  Fields {
    patient: Patientt  required;   // typo!
  }
}
```

The compiler immediately catches this:

```
Error: Field 'patient' on Module Appointment references 'Patientt',
but no Module named 'Patientt' was declared in this schema.
Did you mean 'Patient'?
```

References are checked at compile time. Your file won't generate
anything until every reference is valid.

---

## A Full Example

```
Module Prescription {
  Fields {
    patient:     Patient  required  label "Patient";
    doctor:      Doctor   required  label "Prescribing Doctor";
    date:        Date     required  label "Date";
    diagnosis:   Text     required  label "Diagnosis";
    medications: Text     required  label "Medications";
    dosage:      Text     optional  label "Dosage Instructions";
    followUp:    Date     optional  label "Follow-up Date";
  }
}
```

Reading this out loud:
> "A prescription belongs to one Patient, was written by one Doctor,
> has a required date, required diagnosis and medications, and optional
> dosage instructions and follow-up date."

Clear, human-readable, and precise.

---

## Next

➡ [07 — APIs Block](./07-apis.md)
