# DSL Syntax Guide

This guide documents the DSL as it is presented in the frontend codebase and UI surfaces. The app currently treats the DSL as a module declaration language with a module header, version metadata, route blocks, and inline statements such as `handler`, `role`, and `timeout`.

## What the DSL is for

The portal uses the DSL to define a module that can be:

- validated in the DSL Playground through `POST /bff/dsl/validate`
- dry-run in the sandbox through `POST /bff/dsl/sandbox/run`
- submitted alongside manifest XML from the Submission Portal

The editor starts with a minimal module scaffold:

```dsl
module example {
  version "1.0.0"
  // Write your DSL here
}
```

The Submission Portal also shows a more complete reference shape:

```dsl
module loyalty-points {
  version "1.0.0"

  // Register partner charge webhook
  route POST "/charge" {
    handler "stripe-charge"
    role "DEVELOPER_PARTNER"
    timeout 15s
  }
}
```

## Core structure

At a high level, the DSL follows this pattern:

```dsl
module <module-name> {
  version "<semver>"

  route <METHOD> "<path>" {
    handler "<handler-name>"
    role "<role-name>"
    timeout <duration>
  }
}
```

### Module declaration

- `module` begins the DSL document.
- `<module-name>` is the module identifier.
- The module body is wrapped in `{ ... }`.

Examples from the codebase use names like `example` and `loyalty-points`.

### Version declaration

- `version` appears inside the module block.
- The version value is a quoted string.
- The UI examples use semantic-version-like values such as `"1.0.0"`.

### Route block

The reference view in the Submission Portal shows `route` blocks as the main executable unit:

- `route` is followed by an HTTP method such as `POST`
- the path is a quoted string such as `"/charge"`
- the route body contains directive-style statements

### Route directives

The UI currently demonstrates these directives:

- `handler "<handler-name>"`
- `role "<role-name>"`
- `timeout <duration>`

The examples show:

- `handler "stripe-charge"`
- `role "DEVELOPER_PARTNER"`
- `timeout 15s`

## Syntax examples

### Minimal module

```dsl
module example {
  version "1.0.0"
}
```

### Module with a protected route

```dsl
module loyalty-points {
  version "1.0.0"

  route POST "/charge" {
    handler "stripe-charge"
    role "DEVELOPER_PARTNER"
    timeout 15s
  }
}
```

### Another route shape

The frontend does not currently show additional DSL keywords beyond the above, but the structure implies the same pattern can be repeated for more routes:

```dsl
module inventory-intelligence {
  version "1.9.5"

  route GET "/status" {
    handler "inventory-status"
    role "CUSTOMER"
    timeout 5s
  }
}
```

## Validation and execution behavior

The playground validates DSL text automatically after typing stops for about 500 ms.

- If validation returns errors, they are shown in the Validation tab.
- Clicking an error line in the UI jumps the Monaco editor to that line.
- Dry runs send the DSL to the sandbox together with manifest XML, using `<manifest/>` in the playground placeholder path.

The frontend currently consumes validation output as:

```ts
{ errors: Array<{ line: number; message: string }> }
```

and sandbox output as:

```ts
{ steps: Array<{ timestamp: string; description: string; status: string }> }
```

## Notes on current scope

- This document reflects the DSL syntax demonstrated in the current UI.
- If the backend compiler accepts additional keywords or blocks, they are not surfaced in the frontend reference panels yet, so they are intentionally omitted here.
- The frontend uses the phrase “route DSL” in some supporting copy, but the visible syntax examples are module-centric and route-oriented.
