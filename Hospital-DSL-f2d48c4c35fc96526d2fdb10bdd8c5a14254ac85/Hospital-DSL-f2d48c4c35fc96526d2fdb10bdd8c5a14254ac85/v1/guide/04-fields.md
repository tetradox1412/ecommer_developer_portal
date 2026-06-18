# 04 — Fields

## What are Fields?

**Fields** are the individual pieces of information a Module stores.

If a Module is a filing cabinet drawer (full of patient files),
then **Fields** are the blanks on each patient file form:
- Full Name
- Age
- Blood Type
- Phone Number
- etc.

---

## The Fields Block

Inside every Module, you write a `Fields { }` block containing
all the information that module needs to store:

```
Module Patient {
  Fields {
    name:      String   required  label "Full Name";
    age:       Integer  required  label "Age"  min 0  max 150;
    bloodType: String   optional  label "Blood Type"
                        options "A+","A-","B+","B-","O+","O-","AB+","AB-";
    phone:     Phone    optional  label "Phone Number";
    address:   Text     optional  label "Home Address";
  }
}
```

---

## Anatomy of One Field Line

Every field line follows this pattern:

```
<name>: <Type>  <required or optional>  <extra constraints>;
```

Let's break down one example:

```
age: Integer  required  label "Age"  min 0  max 150;
│    │         │         │            │       │
│    │         │         │            │       └─ maximum value allowed
│    │         │         │            └─ minimum value allowed
│    │         │         └─ label shown in the UI
│    │         └─ this field must always be provided
│    └─ the type of data (a whole number)
└─ the field name (used in code and the database column)
```

Every field line **must end with a semicolon** `;`

---

## Field Names

Field names:
- Start with a **lowercase** letter
- Use camelCase for multiple words (e.g. `bloodType`, `workingDays`)
- Have no spaces or special characters

```
name:        ✅ good
bloodType:   ✅ good
phone:       ✅ good
Blood Type:  ❌ spaces not allowed
blood_type:  ❌ use camelCase, not underscores
```

---

## `required` vs `optional`

Every field must be marked as either `required` or `optional`.

| Keyword | Meaning |
|---|---|
| `required` | This field must always have a value. You cannot save a record without it. |
| `optional` | This field can be left blank. The database will store `null` if not provided. |

```
name: String  required;   // Must always have a name — you can't save without it
phone: Phone  optional;   // Phone number can be left blank — that's fine
```

---

## Extra Constraints

After `required` or `optional`, you can add extra rules:

### `label "..."`
The friendly name shown in forms and tables in the generated frontend.
Has no effect on the database — purely for display.

```
name: String  required  label "Full Name";
```

### `default "..."`
The value the field gets if you don't provide one when saving.

```
status: String  optional  default "Pending";
// If you don't provide status when booking, it becomes "Pending" automatically
```

### `min N` and `max N`
For number fields: the lowest and highest values allowed.
For text fields: the minimum and maximum character length.

```
age: Integer  required  min 0  max 150;
// Age must be between 0 and 150
```

### `options "a", "b", "c"`
Restricts the field to only certain allowed values.
Trying to save any other value will be rejected.

```
gender: String  optional  options "Male","Female","Other";
bloodType: String  optional  options "A+","A-","B+","B-","O+","O-","AB+","AB-";
```

### `unique`
No two records can have the same value for this field.

```
email: Email  required  unique;
// Two doctors cannot have the same email address
```

### Composite Unique Constraints
Sometimes you need a combination of fields to be unique together. For example, a patient should only be able to book one appointment per day.

You can declare a composite unique constraint at the bottom of your `Fields` block using `unique [field1, field2]`:

```text
Module Appointment {
  Fields {
    patient: Patient required;
    date:    Date    required;
    
    unique [patient, date];
  }
}
```
This tells the database that no two records can have the exact same combination of `patient` and `date`.

---

## The Order of Constraints

The recommended order is:

```
fieldName: Type  required/optional  unique  label "..."  default "..."  min N  max N  options "...";
```

You don't have to include all of them — only the ones you need.

---

## What About `id`, `createdAt`, `updatedAt`?

You **never** declare these. They are added automatically to every module.
Your `Fields` block only contains the domain-specific information.

---

## A Realistic Example

```
Module Doctor {
  Fields {
    name:           String   required  label "Full Name";
    specialization: String   required  label "Specialization"
                             options "Cardiology","Pediatrics","Orthopedics","General";
    phone:          Phone    optional  label "Phone";
    email:          Email    optional  unique  label "Email";
    available:      Boolean  optional  label "Accepting Patients"  default "true";
    workingDays:    String   optional  label "Working Days"  default "Mon-Fri";
    startTime:      String   optional  label "Start Time"   default "09:00";
    endTime:        String   optional  label "End Time"     default "17:00";
  }
}
```

Reading this out loud: "A Doctor has a required Full Name, a required
Specialization (which must be one of those four options), an optional phone,
an optional unique email, and so on."

---

## Next

➡ [05 — Field Types](./05-field-types.md)
