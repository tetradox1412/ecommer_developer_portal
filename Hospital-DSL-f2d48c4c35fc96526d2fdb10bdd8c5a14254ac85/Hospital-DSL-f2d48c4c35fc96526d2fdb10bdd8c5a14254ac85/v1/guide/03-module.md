# 03 — Module

## What is a Module?

A **Module** describes one kind of "thing" your hospital needs to track.

Examples of things a hospital tracks:
- Doctors
- Patients
- Appointments
- Prescriptions
- Lab Reports
- Departments

Each of these becomes one Module. Each Module becomes one table in the database.

---

## The Analogy: A Filing Cabinet Drawer

Think of your hospital's database as a filing cabinet.  
Each **drawer** in the cabinet holds one type of record.

One drawer holds all the patient files.  
Another drawer holds all the doctor files.  
Another holds all the appointment slips.

Each **Module** is one of those drawers.

---

## Basic Syntax

```
Module Doctor {
  Label: "Doctors";
  Icon:  "stethoscope";
  Color: green;

  Fields {
    // what information does a Doctor have?
  }

  APIs {
    // who can do what with Doctors?
  }
}
```

---

## The Three Metadata Lines

Every module can have three optional description lines at the top:

### `Label`
The human-friendly name shown in the UI (the generated frontend).

```
Label: "Doctors";
```

If you skip this, the system uses the module name (`Doctor`) as the label.

### `Icon`
A short word or emoji used as the icon in the generated interface.

```
Icon: "stethoscope";
```

### `Color`
The colour used for this module's cards, badges, and highlights in the UI.

```
Color: green;
```

Available colours: `blue`, `green`, `red`, `orange`, `purple`, `teal`, `gray`

> **Note:** Label, Icon, and Color are purely for display. They have zero
> effect on the database or the API. If you only care about the backend,
> you can skip all three.

---

## What the Module Name Becomes

The name you give a module drives several things automatically:

| Module name | Database table | API base path |
|---|---|---|
| `Doctor` | `doctors` | `/api/doctors` |
| `Patient` | `patients` | `/api/patients` |
| `LabReport` | `lab_reports` | `/api/labreports` |
| `Appointment` | `appointments` | `/api/appointments` |

The tool handles the pluralisation and the lowercase conversion for you.

---

## Every Module Gets These for Free

You never declare these — they are always generated automatically:

| Column | What it is |
|---|---|
| `id` | A unique number identifying each record (auto-increments) |
| `createdAt` | The date and time the record was created |
| `updatedAt` | The date and time the record was last changed |

So your `Doctor` table will always have `id`, `createdAt`, `updatedAt` plus
whatever fields you declare in the `Fields` block.

---

## A Complete Module Example

```
Module Department {
  Label: "Departments";
  Icon:  "building";
  Color: teal;

  Fields {
    name:        String  required  label "Department Name";
    description: Text    optional  label "Description";
  }

  APIs {
    List   /all  { roles: Admin, Doctor, Patient; }
    Create /     { roles: Admin; }
    Update /:id  { roles: Admin; }
    Delete /:id  { roles: Admin; }
  }
}
```

This single block generates:
- A `departments` table with `id`, `name`, `description`, `createdAt`, `updatedAt`
- A `GET /api/departments/all` endpoint (anyone logged in can call it)
- A `POST /api/departments` endpoint (only Admin can call it)
- A `PUT /api/departments/:id` endpoint (only Admin can call it)
- A `DELETE /api/departments/:id` endpoint (only Admin can call it)
- Validation that `name` is always provided

---

## Next

➡ [04 — Fields](./04-fields.md)
