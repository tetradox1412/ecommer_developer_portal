# 12 — Full Example: Sunflower Clinic

This is the complete `sunflower-clinic.schema` file.
Read through it and everything should make sense given what you've learned.
Each section has a short explanation.

---

## The Complete File

```
// Sunflower Clinic — HospitalDSL v3
Hospital SunflowerClinic {
```

> We name our hospital `SunflowerClinic`. Everything lives inside this block.

---

```
  // ── 1. Department ──────────────────────────────────────────
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

> **Department** is a simple lookup module. Anyone logged in can see the
> list of departments. Only Admin can add, change, or remove them.
> Departments have no relationships to other modules (other modules
> will reference Department, not the other way around).

---

```
  // ── 2. Doctor ──────────────────────────────────────────────
  Module Doctor {
    Label: "Doctors";
    Icon:  "stethoscope";
    Color: green;
    Fields {
      name:           String       required  label "Full Name";
      specialization: String       required  label "Specialization"
                                   options "Cardiology","Pediatrics",
                                           "Orthopedics","Neurology","General";
      departments:    Department[] optional  label "Departments";
      phone:          Phone        optional  label "Phone";
      email:          Email        optional  unique  label "Email";
      available:      Boolean      optional  label "Accepting Patients"
                                             default "true";
      workingDays:    String       optional  label "Working Days"
                                             default "Mon-Fri";
      startTime:      String       optional  label "Start Time"
                                             default "09:00";
      endTime:        String       optional  label "End Time"
                                             default "17:00";
    }
    APIs {
      List   /all        { name: all;       roles: Admin, Patient, Doctor; }
      List   /available  { name: available; roles: Patient;                }  // dropdown source for booking form
      Get    /:id        { name: get;       roles: Admin, Patient, Doctor; }
      Create /           { name: new;       roles: Admin; }
      Update /:id        { name: edit;      roles: Admin; }
      Delete /:id        { name: remove;    roles: Admin; }
      Get    /me         { name: me;        roles: {Doctor, filter doctor = auth.id}; }
      Update /me         { name: my;        roles: {Doctor, filter doctor = auth.id}; }
    }
  }
```

> **Doctor** has a many-to-many relationship with Department
> (`departments: Department[]`). A doctor can belong to several departments.
> Anyone logged in can view doctors (patients need to browse doctors to book).
> Only Admin can create, update, or delete doctor records.

---

```
  // ── 3. Patient ─────────────────────────────────────────────
  Module Patient {
    Label: "Patients";
    Icon:  "person";
    Color: blue;
    Fields {
      name:       String   required  label "Full Name";
      age:        Integer  required  label "Age"  min 0  max 150;
      gender:     String   optional  label "Gender"
                           options "Male","Female","Other";
      bloodType:  String   optional  label "Blood Type"
                           options "A+","A-","B+","B-","O+","O-","AB+","AB-";
      phone:      Phone    optional  label "Phone";
      email:      Email    optional  unique  label "Email";
      address:    Text     optional  label "Home Address";
      allergies:  Text     optional  label "Known Allergies";
      conditions: Text     optional  label "Existing Conditions";
    }
    APIs {
      List   /all  { name: all; roles: Admin; }
      Get    /:id  { name: get; roles: Admin, Doctor, Patient; }
      Create /     { name: new; roles: Admin; }
      Update /:id  { name: edit; roles: Admin; }
      Delete /:id  { name: del; roles: Admin; }
      Get    /me   { name: me; roles: {Patient, filter patient = auth.id}; }
      Update /me   { name: my; roles: {Patient, filter patient = auth.id}; }
      Get    /:id/history {
        name: history;
        roles: Doctor, Admin;
        expand: appointments, prescriptions, labReports;
      }
    }
  }
```

> **Patient** records are sensitive. Admin has full access. Doctors can
> view a specific patient (to read their details before consultation).
> A Patient can only see and edit their own profile. The `/me` endpoints 
> enforce this using the inline `filter patient = auth.id`.
> Notice that `PatientHistory` expands the response to include related modules.

---

```
  // ── 4. Appointment ─────────────────────────────────────────
  Module Appointment {
    Label: "Appointments";
    Icon:  "calendar";
    Color: purple;
    Fields {
      patient:  Patient  required  label "Patient";
      doctor:   Doctor   required  label "Doctor";
      date:     Date     required  label "Date";
      timeSlot: String   required  label "Time Slot";
      status:   String   optional  label "Status"
                         default "Pending"
                         options "Pending","Approved","Rejected",
                                 "Completed","Cancelled";
      reason:   Text     optional  label "Reason for Visit";
      notes:    Text     optional  label "Doctor Notes";
    }
    APIs {
      // Admin: see and manage everything
      List   /all        { name: all;       roles: Admin; }
      Get    /:id        { name: get;       roles: Admin, Doctor; }           // single record for View slide-over
      Update /:id        { name: edit;      roles: Admin; }
      Delete /:id        { name: del;       roles: Admin; }

      // Patient: book and manage own appointments
      Create /book       { name: book;      roles: {Patient, set patient = auth.id}; }
      List   /my         { name: my;        roles: {Patient, filter patient = auth.id}; }
      Get    /my/:id     { name: myGet;     roles: {Patient, filter patient = auth.id}; }
      Update /cancel/:id { name: cancel;    roles: {Patient, filter patient = auth.id}; }

      // Doctor: see own schedule, update appointment status
      List   /schedule   { name: schedule;  roles: {Doctor, filter doctor = auth.id}; }
      Get    /schedule/:id { name: schedGet; roles: {Doctor, filter doctor = auth.id}; }
      Update /approve/:id { name: approve;  roles: Doctor, Admin; }
      Update /reject/:id  { name: reject;   roles: Doctor, Admin; }

      // Dashboard Stats
      Stats /admin/stats {
        name: adminStats;
        roles: Admin;
        totalDoctor:          count Doctor;
        totalPatient:         count Patient;
        totalAppointment:     count Appointment;
        pendingAppointment:   count Appointment(status: "Pending");
        completedAppointment: count Appointment(status: "Completed");
        totalPrescription:    count Prescription;
        totalLabReport:       count LabReport;
      }
    }
  }
```

> **Appointment** links a Patient and a Doctor. Notice:
> - `Create /book` with `set patient = auth.id` for Patient → the `patient` field is
>   auto-filled from the logged-in patient's ID. They can't book "as" someone else.
> - `List /my` with `filter patient = auth.id` for Patient → only returns appointments
>   where `patient_id` matches the logged-in patient.
> - `List /schedule` with `filter doctor = auth.id` for Doctor → only returns appointments
>   where `doctor_id` matches the logged-in doctor.
> - `status` defaults to `"Pending"` via the field's `default` — no need to
>   set it in the API definition.

---

```
  // ── 5. Prescription ────────────────────────────────────────
  Module Prescription {
    Label: "Prescriptions";
    Icon:  "pill";
    Color: orange;
    Fields {
      patient:     Patient  required  label "Patient";
      doctor:      Doctor   required  label "Doctor";
      date:        Date     required  label "Date";
      diagnosis:   Text     required  label "Diagnosis";
      medications: Text     required  label "Medications";
      dosage:      Text     optional  label "Dosage Instructions";
      followUp:    Date     optional  label "Follow-up Date";
      notes:       Text     optional  label "Additional Notes";
    }
    APIs {
      List   /all    { name: all; roles: Admin; }
      Create /       { name: write; roles: {Doctor, set doctor = auth.id}; }
      Get    /:id    { name: get; roles: Admin, Doctor, Patient; }
      List   /my     { name: my; roles: {Patient, filter patient = auth.id}; }
      List   /doc    { name: doctor; roles: {Doctor, filter doctor = auth.id}; }
    }
  }
```

> **Prescription** is written by a Doctor for a Patient. The Doctor's
> `Create /write` with `set doctor = auth.id` auto-fills the `doctor` field —
> doctors can only write prescriptions attributed to themselves.

---

```
  // ── 6. LabReport ───────────────────────────────────────────
  Module LabReport {
    Label: "Lab Reports";
    Icon:  "flask";
    Color: red;
    Fields {
      patient:     Patient  required  label "Patient";
      doctor:      Doctor   required  label "Ordering Doctor";
      testName:    String   required  label "Test Name";
      testDate:    Date     required  label "Test Date";
      result:      Text     required  label "Result";
      normalRange: String   optional  label "Normal Range";
      status:      String   optional  label "Status"
                            default "Pending"
                            options "Pending","Ready","Reviewed";
      notes:       Text     optional  label "Notes";
    }
    APIs {
      List   /all    { name: all; roles: Admin; }
      Create /upload { name: upload; roles: {Doctor, set doctor = auth.id}; }
      List   /doctor { name: doctor; roles: {Doctor, filter doctor = auth.id}; }
      List   /my     { name: my; roles: {Patient, filter patient = auth.id}; }
    }
  }
```

---

```
  // ── Identity Bindings ───────────────────────────────────────
  Role Patient { Me: Patient; }
  Role Doctor  { Me: Doctor;  }
  Role Admin   {              }
```

> Patient and Doctor users each have a corresponding record in their
> module. Admin is a system account with no data entity.

---

```
  // ── Authentication ──────────────────────────────────────────
  Auth {
    Type:   JWT;
    Expiry: "7d";
    Roles:  Admin, Doctor, Patient;
  }

}
```

---

## What Gets Generated From This File

| Category | What's generated |
|---|---|
| **Database** | 6 tables (departments, doctors, patients, appointments, prescriptions, lab_reports) + 1 junction table (\_DoctorToDepartment) |
| **Auth endpoints** | Register, login, /me for all three roles |
| **Module endpoints** | 8 endpoints for Appointment alone; similar for others |
| **Stats endpoints** | `/admin/stats` inside Appointment module |
| **Expand endpoints** | `/patient/:id/history` inside Patient module |
| **Permissions** | Role checks on every endpoint, inline `filter` on all scoped endpoints |
| **Validation** | Required field enforcement, `options` enforcement, `min`/`max` checks |

---

## You're Done!

You now understand every construct in a HospitalDSL schema file.

To generate the backend from this file:

```bash
node cli.js validate sunflower-clinic.schema   # check for errors
node cli.js generate sunflower-clinic.schema   # build the backend
```

The generated backend will be in the `generated/` folder, ready to run.
