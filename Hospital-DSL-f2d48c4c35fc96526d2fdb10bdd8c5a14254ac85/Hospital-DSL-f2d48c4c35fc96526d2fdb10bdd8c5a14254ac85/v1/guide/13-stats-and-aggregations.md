# 13 — Stats and Aggregations

## The Need for Metrics

Every hospital management system needs dashboards.
Admins need to know how many patients are registered, total revenue from invoices,
and how many appointments each doctor has completed.

In HospitalDSL, you declare what you want to measure inside a `Stats` block.
The compiler generates highly optimized, **parallel** database aggregation queries
— no records fetched into memory, no loops in Node.js.

---

## The `Stats` Block Syntax

Stats are declared inside a Module's `APIs` block, just like `Get` or `Create`. This means they automatically inherit all role-filtering and access control rules!

```text
Module Appointment {
  APIs {
    Stats /dashboard-stats {
      name:  dashboardStats;
      roles: Admin, {Doctor, filter doctor = auth.id};
      
      <jsonKey>: <function> <Module>(<modifiers>);
      <jsonKey>: <function> <Module>.<field>(<modifiers>);
    }
  }
}
```

---

## The Aggregation Functions

### `count` — Count records

```text
Stats /stats {
  name: adminStats;
  roles: Admin;
  
  totalDoctors:         count Doctor;
  pendingAppointments:  count Appointment(status: "Pending");
  completedAppointments: count Appointment(status: "Completed");
}
```

Each `count` line calls `COUNT(*)` in Postgres:

```javascript
const [totalDoctor, pendingAppointment, completedAppointment] =
  await Promise.all([
    prisma.doctor.count(),
    prisma.appointment.count({ where: { status: 'Pending' } }),
    prisma.appointment.count({ where: { status: 'Completed' } }),
  ]);
```

---

### `sum`, `avg`, `min`, `max` — Mathematical aggregations

For fields that store numbers (`Integer` or `Number`), you can calculate
mathematical aggregates. Specify the Module and the field using dot notation.

```text
Stats /finance {
  name: financeStats;
  roles: Admin;
  
  paidRevenue:   sum Invoice.amount(status: "Paid");
  avgDuration:   avg Appointment.duration;
  oldestPatient: max Patient.age;
  youngestPatient: min Patient.age;
}
```

These translate to Prisma's `.aggregate()` function:

```javascript
const result = await prisma.invoice.aggregate({
  _sum: { amount: true },
  where: { status: 'Paid' }
});
const paidInvoiceAmount = result._sum.amount;
```

The database does the arithmetic. Your Node.js server receives one number,
regardless of whether there are 100 or 10,000,000 invoices.

---

## Modifier Syntax Inside Stats

All Stats lines accept parentheses modifiers:

| Modifier | Example | SQL equivalent |
|---|---|---|
| Field equality | `status: "Paid"` | `WHERE status = 'Paid'` |
| Numeric comparison | `amount > 1000` | `WHERE amount > 1000` |
| Grouped aggregation | `grouped by doctor` | `GROUP BY doctor_id` |

---

## GROUP BY Aggregations

Sometimes you want to split a metric into categories — not "total appointments"
but "appointments per doctor".

```text
Stats /grouped {
  name: groupedStats;
  roles: Admin;
  
  appointmentsByDoctor: count Appointment(grouped by doctor);
  revenueByDepartment:  sum Invoice.amount(grouped by appointment.doctor.department);
}
```

### Single-hop grouping (Prisma handles it natively)

`count Appointment(grouped by doctor)` — `doctor` is a direct field on
`Appointment`, so Prisma's `groupBy` generates the SQL:

```javascript
const appointmentByDoctor = await prisma.appointment.groupBy({
  by: ['doctorId'],
  _count: { id: true }
});
```

Response:
```json
{
  "appointmentByDoctor": [
    { "doctorId": 7, "_count": { "id": 140 } },
    { "doctorId": 9, "_count": { "id": 85 } }
  ]
}
```

### Multi-hop grouping (Compiler emits raw SQL)

`sum Invoice.amount(grouped by appointment.doctor.department)` crosses 4 tables.
Prisma cannot handle this natively, so the compiler detects the multi-hop traversal
and generates a safe, parameterized raw SQL query:

```javascript
const sumInvoiceByDepartment = await prisma.$queryRaw`
  SELECT departments.name AS category, SUM(invoices.amount) AS _sum
  FROM invoices
  LEFT JOIN appointments ON invoices.appointment_id = appointments.id
  LEFT JOIN doctors      ON appointments.doctor_id  = doctors.id
  LEFT JOIN departments  ON doctors.department_id   = departments.id
  GROUP BY departments.name;
`;
```

You write `grouped by appointment.doctor.department`. The compiler writes the SQL.

---

## Why Stats Is Not Replaceable by Expand

`Stats` returns **scalar numbers**. `expand` returns **records**. These are different SQL operations:

- `expand` → `SELECT * FROM appointments WHERE ...` (rows of data)
- `Stats` → `SELECT COUNT(*) FROM appointments WHERE ...` (one integer)

If you used `expand` to count, you'd fetch every matching record into Node.js
memory and call `.length`. For a table with 1,000,000 rows, that is 30 seconds
of waiting. `Stats` uses database-level `COUNT`, which takes 2ms regardless of
table size.

---

## All Stats Run in Parallel

Every line in a `Stats` block is executed concurrently using `Promise.all`.
Ten metrics return as fast as one. The dashboard loads instantly.

---

## Compile-Time Validation

Every Stats line is validated at compile time:

- `count X` — `X` must be a declared Module
- `sum X.field` — `field` must be an `Integer` or `Number` type on Module `X`
- `X(status: "Pending")` — `status` must be a declared field; `"Pending"` must be in its `options` if declared
- `grouped by field` — `field` must be a declared field on Module `X`

---

## Full Example

```text
Module Appointment {
  APIs {
    Stats /admin/stats {
      name: adminStats;
      roles: Admin;
      
      totalDoctor:          count Doctor;
      totalPatient:         count Patient;
      totalAppointment:     count Appointment;
      pendingAppointment:   count Appointment(status: "Pending");
      completedAppointment: count Appointment(status: "Completed");
      appointmentByDoctor:  count Appointment(grouped by doctor);
      paidInvoiceAmount:    sum Invoice.amount(status: "Paid");
      avgAppointmentDuration: avg Appointment.duration;
    }
  }
}
```

Response:
```json
{
  "totalDoctor": 24,
  "totalPatient": 1842,
  "totalAppointment": 5201,
  "pendingAppointment": 38,
  "completedAppointment": 4950,
  "appointmentByDoctor": [
    { "doctorId": 7, "_count": { "id": 140 } }
  ],
  "paidInvoiceAmount": 1250000,
  "avgAppointmentDuration": 28.5
}
```

---

## Next

➡ [14 — Nested Joins and the Path Syntax](./14-nested-joins.md)
