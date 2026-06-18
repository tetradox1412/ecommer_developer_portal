# 05 — Field Types

## What is a Type?

Every field has a **type** that tells the system what kind of information
it holds. This affects:
- How the data is stored in the database
- What values are considered valid
- How the field looks in a generated form (text box, number input, date picker…)

---

## The Built-in Types

### `String`
**Use for:** Short text — names, codes, one-line descriptions.  
**Examples:** `"Dr. Meera Sharma"`, `"Cardiology"`, `"Mon-Fri"`

```
name:           String  required  label "Full Name";
specialization: String  required  label "Specialization";
```

---

### `Text`
**Use for:** Long, multi-line text — notes, descriptions, diagnosis details.  
**Examples:** A doctor's notes about a patient, a prescription's instructions.

```
diagnosis: Text  required  label "Diagnosis";
notes:     Text  optional  label "Additional Notes";
```

> **Tip:** Use `String` for short answers (one line), `Text` for paragraphs.

---

### `Integer`
**Use for:** Whole numbers — age, quantities, counts.  
**Examples:** `25`, `0`, `150`

```
age: Integer  required  label "Age"  min 0  max 150;
```

---

### `Number`
**Use for:** Numbers that can have decimals — measurements, scores, weights.  
**Examples:** `98.6` (temperature), `72.5` (weight in kg)

```
temperature: Number  optional  label "Temperature (°C)";
weight:      Number  optional  label "Weight (kg)";
```

---

### `Boolean`
**Use for:** True/False values — flags, toggles, yes/no fields.  
**Examples:** Is this doctor currently accepting patients? Yes or No.

```
available: Boolean  optional  label "Accepting Patients"  default "true";
```

---

### `Date`
**Use for:** A calendar date with no time component — birthdays, appointment dates, follow-up dates.  
**Examples:** `2024-03-15`

```
appointmentDate: Date  required  label "Date";
followUp:        Date  optional  label "Follow-up Date";
```

---

### `DateTime`
**Use for:** A precise moment in time — when something happened, timestamps.  
**Examples:** `2024-03-15 14:30:00`

```
admittedAt:     DateTime  optional  label "Admitted At";
dischargedAt:   DateTime  optional  label "Discharged At";
```

---

### `Email`
**Use for:** Email addresses. The system validates the format automatically.  
**Examples:** `meera@sunflower.com`

```
email: Email  optional  label "Email Address";
```

If someone tries to save `"not-an-email"`, the system rejects it automatically.
You don't have to write any validation code.

---

### `Phone`
**Use for:** Phone numbers. Stored as text (to preserve leading zeros and
country codes), with basic format validation.  
**Examples:** `+91 98765 43210`, `080-12345678`

```
phone: Phone  optional  label "Phone Number";
```

---

## Quick Reference Table

| Type | Best for | Example value |
|---|---|---|
| `String` | Short text, one line | `"Dr. Meera Sharma"` |
| `Text` | Long text, paragraphs | `"Patient reports chest pain since..."` |
| `Integer` | Whole numbers | `34` |
| `Number` | Decimal numbers | `98.6` |
| `Boolean` | Yes / No | `true` or `false` |
| `Date` | Calendar date | `2024-03-15` |
| `DateTime` | Date + time | `2024-03-15 09:30` |
| `Email` | Email address | `doctor@clinic.com` |
| `Phone` | Phone number | `+91 98765 43210` |

---

## A Common Mistake

```
age: String  required;   // ❌ Age stored as text — "twenty five" would be accepted
age: Integer required;   // ✅ Age stored as a number — "twenty five" rejected
```

Always pick the type that matches what the data actually *is*,
not just what it looks like.

---

## Module Names as Types

There is one more kind of type: **another Module's name**.  
This connects two modules together and is covered in the next file.

---

## Next

➡ [06 — Relationships](./06-relationships.md)
