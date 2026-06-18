# 01 — What is a .schema File?

## The Idea in One Sentence

A `.schema` file is a description of your hospital written in plain language
that a tool can read and turn into a working software system.

---

## An Analogy: The Architect's Blueprint

Imagine you want to build a house.  
You don't pick up a hammer and start nailing boards together.  
You first draw a **blueprint** — a precise description of what the house
should look like: how many rooms, where the doors go, how wide the corridors are.

Then you hand the blueprint to a builder.  
The builder reads it and constructs the actual house.

A `.schema` file is your **blueprint**.  
HospitalDSL is the **builder**.

You describe your hospital: what data it stores, who can access it,
what actions people can take. The tool reads your file and builds the
database, the login system, and the API automatically.

---

## What Exactly Gets Built?

When you run the tool against your `.schema` file, it generates:

| What gets built | What it does |
|---|---|
| **Database tables** | Where your data lives (patients, doctors, appointments…) |
| **Login endpoints** | `/api/auth/login`, `/api/auth/register` |
| **Data endpoints** | `/api/patients`, `/api/appointments/book`, … |
| **Permission checks** | Only the right roles can call the right endpoints |
| **Input validation** | Required fields are enforced before saving |

You don't write any of that. It is all generated from your `.schema` file.

---

## What a .schema File Looks Like

A `.schema` file is just a plain text file with a `.schema` extension.
You can open and edit it in any text editor (VS Code, Notepad, anything).

The structure always follows the same pattern:

```
Hospital <ClinicName> {

  Module <Thing1> { ... }
  Module <Thing2> { ... }

  Role <RoleName> { ... }
  Role <RoleName> { ... }

  Auth { ... }

}
```

Everything lives inside the `Hospital { }` block.
We will learn what each of these pieces means in the coming sections.

---

## The Two Files

HospitalDSL uses two separate files:

| File | What it describes |
|---|---|
| `clinic.schema` | The **backend**: data, APIs, login, permissions |
| `clinic.views` | The **frontend**: what the screens look like, forms, navigation |

This guide covers only the **`.schema` file**.  
The `.views` file is covered in a separate guide.

---

## Next

➡ [02 — The Hospital Block](./02-hospital-block.md)
