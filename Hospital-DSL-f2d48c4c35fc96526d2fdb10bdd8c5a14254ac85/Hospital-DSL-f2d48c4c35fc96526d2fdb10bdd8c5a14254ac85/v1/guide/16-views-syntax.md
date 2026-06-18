# 16 — The Views File (Frontend Syntax)

The `.views` file is the frontend companion to the `.schema` file.
It describes the user interface — which portals exist, which roles use them,
what pages they contain, and which containers appear on each page.

The codegen reads both files together. Every reference in `.views` is
validated against the `.schema` Symbol Table at compile time.

---

## File Structure

```text
import "sunflower-clinic.schema";   // ← must be first line

LoginGroups { ... }                 // ← exactly one, defines auth UI
Portal PatientPortal { ... }        // ← one per role group
Portal DoctorPortal  { ... }
Portal AdminPortal   { ... }
```

---

## 1. The `import` Statement

```text
import "sunflower-clinic.schema";
```

Loads the schema's Symbol Table. Every Module name, field name, API
endpoint name, and Role name used anywhere in `.views` is validated against
this Symbol Table. A reference to a non-existent endpoint or field is a
compile error.

---

## 2. `LoginGroups` — The Auth UI

Defines how the login/signup page is structured. Every Role declared in
the backend schema must appear in exactly one Group.

### Syntax

```text
LoginGroups {

  Group "Patient" {
    roles:          Patient;
    selfRegister:   true;
    registerFields: name, age, gender, bloodType, phone, email, password;
  }

  Group "Staff" {
    roles:        Admin, Doctor, Nurse, Receptionist;
    selfRegister: false;
  }

}
```

### `roles:`

One or more Role names from the schema's `Role` declarations.
Each Role must appear in exactly one Group across the entire file.

```text
// Compile error — Doctor appears in two groups:
Group "Staff"   { roles: Admin, Doctor; ... }
Group "Doctors" { roles: Doctor; ... }
//                         ↑ Error: Role 'Doctor' assigned to multiple LoginGroups
```

```text
// Compile error — Receptionist is declared in schema but missing from all groups:
// Error: Role 'Receptionist' is not assigned to any LoginGroup
```

### `selfRegister:`

| Value | Effect |
|---|---|
| `true` | Public signup form is generated for this group |
| `false` | Login form only. Accounts created via Admin portal |

### `registerFields:`

Only valid when `selfRegister: true`. Lists the fields to show on the
signup form.

**Compiler resolution chain:**

```
Group "Patient" { roles: Patient; }
         ↓
schema: Role Patient { Me: Patient; }
         ↓
identity module = Patient
         ↓
Patient.Fields → required: { name, age }
         ↓
registerFields must contain { name, age }   ← hard constraint
registerFields may contain any optional field from Patient.Fields
registerFields may contain { email, password } as special auth keywords
```

**`password`** — reserved keyword. Never a Module field. Generates a
`password + confirm password` double-input. Stored as a bcrypt hash in
the auth credentials table, never in the Module record.

**`email`** — if it exists on the identity Module, populates both the
Module record and the auth credentials table. If it does not exist on the
Module, it is stored in auth credentials only.

### What the generated login page looks like

```
┌────────────────────────────────────────────────┐
│                                                │
│   [Patient]        [Staff]   ← one tab per Group
│   ────────────────────────                     │
│                                                │
│   Patient tab:                                 │
│   [Sign In]  [Sign Up]   ← sub-tabs (selfReg) │
│                                                │
│   Staff tab:                                   │
│   [Sign In only]                               │
│   Email ___________                            │
│   Password _________                           │
│   Role  [Admin ▾]  ← dropdown (multi-role group)
│   [Sign In]                                    │
└────────────────────────────────────────────────┘
```

---

## 3. `Portal` — The Role's Application

A Portal is the entire frontend application for a specific role or set of
roles. It always renders as a dashboard: fixed sidebar + topbar + main
content area. The sidebar is auto-generated from the Page declarations
inside the Portal.

### Syntax

```text
Portal PatientPortal {
  for: Patient;

  Page MyAppointments { ... }
  Page MyProfile      { ... }
}
```

### `for:`

One or more Role names. Each Role may appear in at most one Portal.

```text
// Compile error:
Portal AdminPortal  { for: Admin; ... }
Portal ManagePortal { for: Admin; ... }   // Admin already claimed
//                         ↑ Error: Role 'Admin' is assigned to multiple Portals
```

The compiler checks that the declared roles in `for:` are a subset of
the roles that appear in `LoginGroups`. A role cannot have a Portal
without also being in a LoginGroup.

### Portal → LoginGroup relationship

The `for:` roles determine which LoginGroup tab leads to this Portal after
a successful login. If `Group "Staff"` contains `Admin, Doctor, Nurse`, a
successful Staff login routes to `AdminPortal`, `DoctorPortal`, or
`NursePortal` based on the role in the JWT.

---

## 4. `Page` — A Route Inside a Portal

Each Page is one URL-addressable view within the Portal. Pages appear in
the sidebar in the order they are declared.

### Syntax

```text
Page Dashboard {
  Route: "/";
  Title: "Dashboard";         // optional — defaults to the Page name

  MetricGrid { ... }          // containers stack vertically, top to bottom
  Table RecentActivity { ... }
}
```

### Properties

| Property | Required | Description |
|---|---|---|
| `Route:` | ✅ | The URL path. Must start with `/`. |
| `Title:` | No | Display name in topbar. Defaults to the Page block name. |

Routes are scoped to the Portal. Two Portals can both have `Route: "/"`.
The generated router only activates the Portal matching the logged-in role.

---

## 5. Containers

Containers are the building blocks placed inside Pages. They stack
vertically. The container handles all visual concerns — padding, loading
states, empty states, error states, responsive layout.

---

### `Table`

Fetches a list of records from a `List` endpoint and displays them in a
paginated, sortable table.

```text
Table AppointmentList {
  from:    Appointment.schedule;   // List endpoint — populates the rows
  columns: date, patient, doctor, status;
  
  // Fix 1 & 3: View declares get: to fetch the full single record.
  // Fields in View can exceed columns: because get: fetches the complete object.
  View {
    get:    Appointment.get;        // Must be a Get endpoint on the same Module
    fields: doctor, date, status, reason, notes;
  }
  
  // Fix 2: Edit declares both which fields are editable and where to submit.
  Edit {
    submit: Appointment.setStatus;  // Must be an Update endpoint
    fields: date, reason;
  }
  
  // Data-mutating row actions with optional onSuccess lifecycle
  actions:
    Appointment.approve "Approve" { onSuccess: refresh; },
    Appointment.reject  "Reject"  { onSuccess: toast "Appointment rejected"; };
}
```

| Property | Required | Description |
|---|---|---|
| `from:` | ✅ | `Module.endpoint` — must be a `List` endpoint |
| `columns:` | ✅ | Fields shown as columns. Must exist on the Module. |
| `View.get:` | ✅ if `View` block present | `Module.endpoint` — must be a `Get` endpoint. Fetches the full record for the slide-over. |
| `View.fields:` | ✅ if `View` block present | Fields to display in the Detail slide-over. May include fields not in `columns:`. |
| `Edit.submit:` | ✅ if `Edit` block present | `Module.endpoint` — must be an `Update` endpoint. |
| `Edit.fields:` | ✅ if `Edit` block present | Fields editable in the Form slide-over. |
| `actions:` | No | Row-level buttons linked to APIs. Each action supports `onSuccess:`. |

**Compiler checks:**
- `View.get:` must be a `Get` endpoint on the same Module as `from:`
- `Edit.submit:` must be an `Update` endpoint on the same Module as `from:`
- Portal role must be in `roles:` of `get:`, `submit:`, and each action endpoint
- All fields in `View.fields:` and `Edit.fields:` must exist on the Module

---

### `Form`

Renders a create or update form and submits to a `Create` or `Update` endpoint.
Field types, labels, validation rules, and relationship dropdowns are
auto-generated from the schema's field definitions.

```text
Form BookAppointment {
  submit:    Appointment.book;
  fields:    doctor, date, timeSlot, reason;
  onSuccess: toast "Appointment booked!";
  
  Field doctor {
    from: Doctor.available;   // Must be a List endpoint accessible by this Portal's role
  }
}

// ── Standalone Update Form Constraint ──────────────────────────
// If a Form is placed standalone on a Page and acts as an Update, 
// it MUST declare a from: endpoint to fetch the initial data. 
// Both endpoints must use an auth-scoped filter (like filter patient = auth.id) 
// because there is no `:id` in the Page URL!
Form UpdateProfile {
  from:      Patient.me;     // Fetches current data
  submit:    Patient.my;     // Submits changes
  fields:    phone, address;
}
```

| Property | Required | Description |
|---|---|---|
| `from:` | ✅ for Updates | `Module.endpoint` — `Get` endpoint to fetch initial data for an Update form |
| `submit:` | ✅ | `Module.endpoint` — must be a `Create` or `Update` endpoint |
| `fields:` | ✅ | Fields to render. All `required` fields on the Module must appear. |
| `onSuccess:` | No | `navigate "/route"` or `toast "message"` |
| `Field <name>` | ✅ for relationship fields | Nested block to configure a specific field's data source or UI. |
| `Field.from:` | ✅ if field is a relationship | `Module.endpoint` — the `List` endpoint used to populate the dropdown. |

**Compiler checks:**
- `Appointment.book` must be a `Create` or `Update` endpoint
- Portal role must be in endpoint's `roles:`
- All `required` fields on the Module must appear in `fields:`
- Any relationship field in `fields:` **must** have a `Field` block with a `from:` declared — missing one is a compile error
- `Field.from:` endpoint must be accessible by the Portal's role
- Fields with `scope: own` are auto-filled from the JWT — they must NOT appear in `fields:`

---

### `Detail`

Fetches one record and displays it in a read-only label-value layout.

```text
Detail PatientProfile {
  // Fix 1: No magic 'Me'. Explicitly name the Get endpoint for the logged-in user's record.
  from:   Patient.me;          // Must be a Get endpoint with scope: own
  fields: name, age, bloodType, phone, email, allergies, conditions;
  
  // Fix 2: Edit block must declare where to submit the update.
  Edit {
    submit: Patient.my;        // Must be an Update endpoint with scope: own
    fields: phone, email, address;
  }
  
  // Data-mutating actions also get onSuccess:
  actions: Patient.deactivate "Close Account" { onSuccess: navigate "/"; };
}
```

| Property | Required | Description |
|---|---|---|
| `from:` | ✅ | `Module.endpoint` — must be a `Get` endpoint. Use a `scope: own` endpoint to bind the logged-in user's record. |
| `fields:` | ✅ | Fields to display. Must exist on the Module. |
| `Edit.submit:` | ✅ if `Edit` block present | `Module.endpoint` — must be an `Update` endpoint on the same Module. |
| `Edit.fields:` | ✅ if `Edit` block present | Fields editable in the Form slide-over. |
| `actions:` | No | Data-mutating buttons. Each supports `onSuccess:`. |

**Compiler checks:**
- `from:` endpoint must be a `Get` endpoint accessible by the Portal's role
- `Edit.submit:` must be an `Update` endpoint on the same Module as `from:`
- All fields in `fields:` and `Edit.fields:` must exist on the Module

---

### `MetricGrid`

Calls a Stats API and displays each metric as a card in a horizontal row.

### `MetricGrid`

Calls one or more Stats APIs and displays each metric as a card in a horizontal row.
You can pull metrics from completely different Stats blocks.

```text
MetricGrid AdminDashboard {
  show: 
    ClinicalStats.totalPatient,
    ClinicalStats.pendingAppointment,
    BillingStats.monthlyRevenue,
    BillingStats.overdueInvoices;
}
```

| Property | Required | Description |
|---|---|---|
| `show:` | ✅ | List of `StatsBlock.metric` paths to display as cards |

**Compiler checks:**
- Each item must be a valid Stats line declared inside that `StatsBlock`

---

### `Kanban`

Fetches a list of records and groups them into columns by a status field.
One column per value in the field's `options`. Action buttons on each card
call the Update endpoint with the corresponding status value.

```text
Kanban AppointmentBoard {
  from:    Appointment.schedule;
  groupBy: status;
  update:  Appointment.changeStatus;  // Called automatically when dragging a card
  card:    patient, date, reason;
  
  View { fields: patient, date, reason, notes; }
  actions: Appointment.approve "Approve", Appointment.cancel "Cancel";
}
```

| Property | Required | Description |
|---|---|---|
| `from:` | ✅ | `Module.endpoint` — must be a List endpoint |
| `groupBy:` | ✅ | A field with `options` declared on the Module |
| `update:` | ✅ | `Module.endpoint` — an Update endpoint called when a card is dragged between columns |
| `card:` | ✅ | Fields to show on each card |
| `View` | No | Configures the Detail slide-over when clicking a card |
| `actions:` | No | Action buttons on each card linked to specific APIs |

**Compiler checks:**
- `groupBy: status` — `status` must be a field with `options` on the Module
- Each action must correspond to an API endpoint on the Module that the Portal role can access

---

### `Calendar`

Fetches a list of records and plots them on a monthly calendar by a Date field.

```text
Calendar DoctorSchedule {
  from:       Appointment.schedule;
  dateField:  date;
  update:     Appointment.reschedule; // Called when an event is dragged to a new day
  labelField: patient;
  
  View { fields: patient, date, reason, status; }
  actions: Appointment.cancel "Cancel";
}
```

| Property | Required | Description |
|---|---|---|
| `from:` | ✅ | `Module.endpoint` — must be a List endpoint |
| `dateField:` | ✅ | A `Date` field on the Module |
| `update:` | No | An Update endpoint to call when dragging events |
| `labelField:` | ✅ | Field shown on each event chip |
| `View` | No | Configures the Detail slide-over when clicking an event |
| `actions:` | No | Action buttons on the event popover |

**Compiler checks:**
- `dateField: date` — `date` must be a `Date` type field on the Module
- `labelField: patient` — must be a field on the Module (relationship fields show their Summary)

---

## 6. The Action Vocabulary

### 1. Slide-over Configurations (`View` and `Edit` blocks)
These are nested blocks — not keywords. They configure what the slide-overs show and where they submit.

| Block | Required properties | What it does |
|---|---|---|
| `View { get: ...; fields: ...; }` | `get:` + `fields:` | Opens a read-only Detail slide-over using a `Get` endpoint |
| `Edit { submit: ...; fields: ...; }` | `submit:` + `fields:` | Opens a Form slide-over pre-filled with current data, submits to an `Update` endpoint |

### 2. Data Mutation Actions (`actions:`)
For actions that change data, you explicitly reference the backend API with a UI label and an optional `onSuccess` lifecycle.

```text
actions:
  Appointment.approve "Approve" { onSuccess: refresh; },
  Appointment.reject  "Reject"  { onSuccess: toast "Appointment rejected."; },
  Appointment.delete  "Delete"  { onSuccess: navigate "/"; };
```

| `onSuccess` value | Behaviour |
|---|---|
| `refresh` | Refetches the container's `from:` endpoint and re-renders |
| `toast "message"` | Shows a toast notification, no re-render |
| `navigate "/route"` | Navigates the user to the given page route |

---

## 7. Compiler Hard Constraints Summary

| Constraint | Error |
|---|---|
| Every Role in schema must appear in exactly one LoginGroup | `Role 'X' not in any LoginGroup` |
| Every Role in a LoginGroup must appear in exactly one Portal | `Role 'X' assigned to multiple Portals` |
| `registerFields` must contain all `required` fields of identity module | `Field 'age' is required but missing from registerFields` |
| `registerFields` fields must exist on the identity module | `Field 'diagnosis' does not exist on module 'Patient'` |
| `from:` endpoint must exist and be accessible by the Portal's role | `Role 'Patient' cannot access Appointment.all` |
| `columns:` and `fields:` must reference valid fields on the Module | `Field 'xyz' does not exist on module 'Appointment'` |
| `groupBy:` field must have `options` declared | `Field 'date' has no options — cannot be used as groupBy` |
| `dateField:` must be a `Date` type field | `Field 'status' is type String, not Date` |
| `View` block present but no `get:` declared | `View block requires a get: endpoint — add get: Module.endpointName` |
| `Edit` block present but no `submit:` declared | `Edit block requires a submit: endpoint — add submit: Module.endpointName` |
| `View.get:` must be a `Get` endpoint (not List, Create, etc.) | `Appointment.all is a List endpoint, not Get` |
| `Edit.submit:` must be an `Update` endpoint | `Appointment.book is a Create endpoint, not Update` |
| Relationship field in `Form.fields:` missing a `Field` block | `Field 'doctor' is a relationship — add Field doctor { from: Module.endpoint; }` |
| `Field.from:` endpoint must be a `List` endpoint | `Doctor.get is a Get endpoint, not List` |
| `View.get:` and `Edit.submit:` must be on the same Module as `from:` | `View.get: Prescription.get on Appointment table is a cross-module mismatch` |

---

## 8. A Complete Example

```text
import "sunflower-clinic.schema";

LoginGroups {
  Group "Patient" {
    roles:          Patient;
    selfRegister:   true;
    registerFields: name, age, gender, bloodType, phone, email, password;
  }
  Group "Staff" {
    roles:        Admin, Doctor, Nurse;
    selfRegister: false;
  }
}

// ── Patient Portal ───────────────────────────────────────
Portal PatientPortal {
  for: Patient;

  Page MyAppointments {
    Route: "/";
    Title: "My Appointments";

    Kanban {
      from:    Appointment.my;
      groupBy: status;
      card:    date, doctor, reason;
      View {
        get:    Appointment.myGet;      // scope: own Get for Patient
        fields: doctor, date, reason, notes, status;
      }
      actions: Appointment.cancel "Cancel" { onSuccess: refresh; };
    }

    Form {
      submit:    Appointment.book;
      fields:    doctor, date, timeSlot, reason;
      onSuccess: toast "Appointment booked!";
      Field doctor { from: Doctor.available; }  // only shows doctors accepting patients
    }
  }

  Page MyPrescriptions {
    Route: "/prescriptions";

    Table {
      from:    Prescription.my;
      columns: date, doctor, diagnosis, medications;
      View {
        get:    Prescription.get;
        fields: doctor, date, diagnosis, medications, dosage, followUp, notes;
      }
    }
  }

  Page MyProfile {
    Route: "/profile";

    Detail {
      from:   Patient.me;                  // Get endpoint with scope: own
      fields: name, age, gender, bloodType, phone, email, address;
      Edit {
        submit: Patient.my;                // Update endpoint with scope: own
        fields: phone, email, address;
      }
    }
  }
}

// ── Doctor Portal ────────────────────────────────────────
Portal DoctorPortal {
  for: Doctor;

  Page Schedule {
    Route: "/";
    Title: "My Schedule";

    Calendar {
      from:       Appointment.schedule;
      dateField:  date;
      labelField: patient;
      View {
        get:    Appointment.schedGet;   // scope: own Get for Doctor
        fields: patient, date, reason, status;
      }
      actions:
        Appointment.approve "Approve" { onSuccess: refresh; },
        Appointment.reject  "Reject"  { onSuccess: refresh; };
    }
  }

  Page Prescriptions {
    Route: "/prescriptions";

    Table {
      from:    Prescription.doctor;
      columns: date, patient, diagnosis;
      View {
        get:    Prescription.get;
        fields: patient, date, diagnosis, medications, dosage, followUp, notes;
      }
    }

    Form WritePrescription {
      submit:    Prescription.write;
      fields:    patient, date, diagnosis, medications, dosage, followUp;
      onSuccess: toast "Prescription saved";
      Field patient { from: Patient.all; }  // populates the patient dropdown
    }
  }

  Page MyProfile {
    Route: "/profile";
    Detail {
      from:   Doctor.me;
      fields: name, specialization, phone, email, workingDays;
      Edit {
        submit: Doctor.my;
        fields: phone, email, workingDays;
      }
    }
  }
}

// ── Admin Portal ─────────────────────────────────────────
Portal AdminPortal {
  for: Admin;

  Page Dashboard {
    Route: "/";

    MetricGrid {
      show: 
        AdminDashboard.totalDoctor, 
        AdminDashboard.totalPatient, 
        AdminDashboard.pendingAppointment, 
        AdminDashboard.completedAppointment;
    }

    Table RecentAppointments {
      from:    Appointment.all;
      columns: date, patient, doctor, status;
      View {
        get:    Appointment.get;
        fields: patient, doctor, date, status, reason;
      }
      actions:
        Appointment.approve "Approve" { onSuccess: refresh; },
        Appointment.reject  "Reject"  { onSuccess: refresh; };
    }
  }

  Page Doctors {
    Route: "/doctors";
    Table {
      from:    Doctor.all;
      columns: name, specialization, available;
      View {
        get:    Doctor.get;
        fields: name, specialization, phone, email, department;
      }
      Edit {
        submit: Doctor.edit;
        fields: specialization, available;
      }
      actions: Doctor.remove "Delete" { onSuccess: refresh; };
    }
  }

  Page Patients {
    Route: "/patients";
    Table {
      from:    Patient.all;
      columns: name, age, gender, phone;
      View {
        get:    Patient.get;
        fields: name, age, gender, phone, address, allergies, conditions;
      }
      Edit {
        submit: Patient.edit;
        fields: phone, address, allergies;
      }
    }
  }
}
```

---

## Next

➡ [15 — What the DSL Cannot Do](./15-dsl-limitations.md)
