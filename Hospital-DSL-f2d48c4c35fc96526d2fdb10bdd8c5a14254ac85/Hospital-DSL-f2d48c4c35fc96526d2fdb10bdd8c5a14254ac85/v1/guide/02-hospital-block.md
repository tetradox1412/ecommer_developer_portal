# 02 — The Hospital Block

## The Container for Everything

The very first thing you write in any `.schema` file is the `Hospital` block.
It is the outer container — everything else goes inside it.

```
Hospital SunflowerClinic {

  // everything goes in here

}
```

---

## What the Name Means

The name you give the `Hospital` block (`SunflowerClinic` above) is the name
of your system. It appears in:

- The generated server's health-check response
- Log messages printed when the server starts
- The name of the generated project folder

Pick something short and descriptive with no spaces.
Use PascalCase (each word starts with a capital letter):

```
Hospital SunflowerClinic { }      ✅ Good
Hospital CityHospital { }         ✅ Good
Hospital sunflower clinic { }     ❌ Spaces are not allowed
Hospital my_hospital { }          ❌ Underscores look odd here
```

---

## What Goes Inside

The `Hospital` block contains four kinds of things, in any order:

```
Hospital SunflowerClinic {

  Module Doctor { ... }         // 1. Modules — your data entities
  Module Patient { ... }
  Module Appointment { ... }

  API PatientHistory { ... }    // 2. Standalone APIs (optional)

  Role Admin { }                // 3. Roles — the people using the system
  Role Doctor { Me: Doctor; }
  Role Patient { Me: Patient; }

  Auth {                        // 4. Auth — how login works
    Type:   JWT;
    Expiry: "7d";
    Roles:  Admin, Doctor, Patient;
  }

}
```

You will learn each of these in the following sections.

---

## Rules

- There must be exactly **one** `Hospital` block per `.schema` file.
- The name must start with a capital letter.
- Everything — modules, roles, auth — must be inside the curly braces `{ }`.
- The file must end after the closing `}`.

---

## A Minimal Valid Schema

The smallest possible `.schema` file that actually compiles:

```
Hospital MyClinic {

  Role Admin { }

  Auth {
    Type:   JWT;
    Expiry: "7d";
    Roles:  Admin;
  }

}
```

This produces a working login system with an Admin account
and no data modules at all — not very useful, but valid!

---

## Next

➡ [03 — Module](./03-module.md)
