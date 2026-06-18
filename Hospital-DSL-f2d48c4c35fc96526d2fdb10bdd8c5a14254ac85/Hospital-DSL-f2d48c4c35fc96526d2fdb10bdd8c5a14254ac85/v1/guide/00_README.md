# HospitalDSL — Beginner's Guide

Welcome! This guide teaches you HospitalDSL from scratch.
No programming knowledge required. No database experience required.
Just follow the files in order.

---

## What You'll Learn

HospitalDSL is a simple language you write in a plain text file.
Once written, a tool reads your file and automatically builds a complete
hospital management system — database, login system, and API — for you.

Think of it like filling out a very smart form.
You describe *what* your hospital needs. The tool figures out *how* to build it.

---

## Reading Order

| File | Topic | What it answers |
|---|---|---|
| [01 — What is a .schema file?](./01-what-is-a-schema-file.md) | The big picture | What does my file actually do? |
| [02 — The Hospital block](./02-hospital-block.md) | The wrapper | How do I start writing? |
| [03 — Module](./03-module.md) | Tables | How do I describe a "thing" in my hospital? |
| [04 — Fields](./04-fields.md) | Columns | What information does each thing hold? |
| [05 — Field Types](./05-field-types.md) | Data types | What kind of information is it? |
| [06 — Relationships](./06-relationships.md) | Connections | How do things relate to each other? |
| [07 — APIs block](./07-apis.md) | Endpoints | Who is allowed to do what? |
| [08 — scope: own](./08-scope-own.md) | Ownership | How do I make sure users only see their own data? |
| [09 — Role](./09-role.md) | Identity | What *is* a logged-in user in my system? |
| [10 — Auth](./10-auth.md) | Login | How does login work? |
| [11 — Standalone APIs](./11-standalone-apis.md) | Root+Path and Stats | Dashboard and history endpoints |
| [12 — Full Example](./12-full-example.md) | Everything together | The complete Sunflower Clinic |
| [13 — Stats and Aggregations](./13-stats-and-aggregations.md) | Analytics | Counting, summing, and grouping |
| [14 — Nested Joins and Path](./14-nested-joins.md) | Deep traversal | Fetching deep data trees safely |
| [15 — What the DSL Cannot Do](./15-dsl-limitations.md) | Honest limits | Where to use custom code instead |
| [16 — Views File Syntax](./16-views-syntax.md) | Frontend DSL | LoginGroups, Portals, Pages, Containers |

---

## The Golden Rule

> **You describe what you want. HospitalDSL figures out how to build it.**

You will never write SQL. You will never write a database migration.
You will never write a login system. You will never write a permissions check.
You just describe your hospital in plain language, and it all gets generated for you.

---

## Key Syntax Decisions (v3)

These are the finalized syntax choices for the current version of HospitalDSL:

### Standalone APIs use `Root` + `Path` (not `Expand`)
```text
API PatientHistory {
  Url:    "/patient/:id";
  Roles:  Doctor, Admin;
  Root:   Patient;
  Path:
    Patient's Appointment(limit: 10, orderBy: date desc),
    Patient's Appointment(limit: 10, orderBy: date desc)'s Doctor,
    Patient's Prescription(limit: 20, orderBy: date desc);
}
```

### Path modifiers use unified parentheses syntax
```text
// Filtering, limiting, and ordering — all in parentheses at the path step
Patient's Appointment(status: "Completed", limit: 5, orderBy: date desc)
```

### Stats uses the same parentheses syntax
```text
Stats {
  total Appointment(status: "Pending");
  sum   Invoice.amount(status: "Paid");
  total Appointment(grouped by doctor);
}
```

---

## A Quick Taste

Here is a tiny but complete example:

```text
Hospital MyClinic {

  Module Patient {
    Fields {
      name: String  required  label "Full Name";
      age:  Integer required  label "Age";
    }
    APIs {
      List /all { roles: Admin; }
    }
  }

  Role Admin { }

  Auth {
    Type:   JWT;
    Expiry: "7d";
    Roles:  Admin;
  }

}
```

That is enough for the tool to generate:
- A `patients` database table with `name` and `age` columns
- A login system with JWT tokens
- An endpoint that lets an Admin fetch all patients
- Input validation ensuring `name` and `age` are always provided

Ready? Start with [01 — What is a .schema file?](./01-what-is-a-schema-file.md)
