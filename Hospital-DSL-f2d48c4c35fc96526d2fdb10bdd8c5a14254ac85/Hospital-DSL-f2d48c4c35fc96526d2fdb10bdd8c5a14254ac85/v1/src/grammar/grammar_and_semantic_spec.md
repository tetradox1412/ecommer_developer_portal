# Hospital-DSL V3 Grammar & Semantic Validation Specification
**Single Source of Truth & AST Validation Blueprint**

This document unifies the ANTLR4 parser grammar and the complete semantic validation requirements for the Hospital-DSL compiler compiler phase. It serves as the primary instructions and prompt for implementation of the Symbol Table builder, type checking pass, and AST auditing layers.

---

## Part 1: ANTLR4 Grammar (`HospitalDSL.g4`)

```antlr
grammar HospitalDSL;

// ─── Parser Rules ─────────────────────────────────────────────

hospital
    : 'Hospital' ID '{' hospitalBody '}' EOF
    ;

hospitalBody
    : (moduleDecl | foreignModuleDecl)* roleDecl* authDecl?
    ;

// ── Module ────────────────────────────────────────────────────

moduleDecl
    : 'Module' ID '{' moduleBody '}'
    ;

moduleBody
    : moduleItem*
    ;

moduleItem
    : 'Label:'  STRING ';'
    | 'Icon:'   STRING ';'
    | 'Color:'  ID     ';'
    | fieldsDecl
    | apisBlock
    ;

fieldsDecl
    : 'Fields' '{' (fieldDef | uniqueConstraint)+ '}'
    ;

fieldDef
    : ID ':' fieldType ('foreign' ID)? fieldConstraint* ';'
    ;

fieldType
    : ID ('[]')?
    ;

fieldConstraint
    : 'required'
    | 'optional'
    | 'unique'
    | 'label'   STRING
    | 'default' STRING
    | 'min'     INT
    | 'max'     INT
    | 'options' STRING (',' STRING)*
    ;

uniqueConstraint
    : 'unique' '[' ID (',' ID)* ']' ';'
    ;

// ── APIs block (inside Module or foreignModuleDecl) ───────────

apisBlock
    : 'APIs' '{' apiEndpoint+ '}'
    ;

apiEndpoint
    : apiVerb PATH '{' apiEndpointItem* '}'
    | 'Stats' PATH '{' statsEndpointItem* '}'
    ;

statsEndpointItem
    : 'name:'   ID ';'
    | 'roles:'  roleConfig (',' roleConfig)* ';'
    | ID ':' statsAggregation ';'
    ;

statsAggregation
    : ('count' | 'sum' | 'avg' | 'min' | 'max') ID ('.' ID)? statsModifier?
    ;

statsModifier
    : '(' statsModifierItem (',' statsModifierItem)* ')'
    ;

statsModifierItem
    : ID ':' STRING
    | ID ('>' | '<' | '>=' | '<=' | '==') INT
    | 'grouped' 'by' ID ('.' ID)*
    ;

apiEndpointItem
    : 'name:'   ID ';'
    | 'roles:'  roleConfig (',' roleConfig)* ';'
    | 'filter'  ID '=' authExpr ';'
    | 'set'     ID '=' setVal ';'
    | 'expand:' ID (',' ID)* ';'
    ;

roleConfig
    : ID
    | '{' ID (',' roleConfigItem)* '}'
    ;

roleConfigItem
    : 'filter' ID '=' authExpr
    | 'set'    ID '=' setVal
    ;

setVal
    : authExpr
    | STRING
    | INT
    | BOOLEAN_LITERAL
    | 'null'
    ;

authExpr
    : ID '.' ID
    ;

apiVerb
    : LIST | GET | CREATE | UPDATE | DELETE
    ;

// ── Foreign Module (M2M junction) ────────────────────────────

foreignModuleDecl
    : 'Module' ID 'foreign' '{' foreignModuleBody '}'
    ;

foreignModuleBody
    : foreignModuleItem+
    ;

foreignModuleItem
    : 'from:' ID ';'
    | 'to:'   ID ';'
    | 'via:'  ID (',' ID)* ';'
    | 'type:' ID ';'
    | apisBlock
    ;

// ── Role ──────────────────────────────────────────────────────

roleDecl
    : 'Role' ID '{' roleBody '}'
    ;

roleBody
    : roleItem*
    ;

roleItem
    : 'Me:' ID ';'
    ;

// ── Auth ──────────────────────────────────────────────────────

authDecl
    : 'Auth' '{' authBody '}'
    ;

authBody
    : authItem+
    ;

authItem
    : 'Type:'   ID     ';'
    | 'Expiry:' STRING ';'
    | 'Roles:'  ID (',' ID)* ';'
    ;

// ─── Lexer Rules ──────────────────────────────────────────────

// DSL Verb Keywords (matching guides)
LIST   : 'List'   ;
GET    : 'Get'    ;
CREATE : 'Create' ;
UPDATE : 'Update' ;
DELETE : 'Delete' ;

BOOLEAN_LITERAL : 'true' | 'false' ;

// PATH must be lexed before ID so /book, /:id etc. are captured correctly
PATH   : '/' [a-zA-Z0-9_/:.-]* ;

ID      : [a-zA-Z_][a-zA-Z0-9_]* ;
INT     : [0-9]+ ;
STRING  : '"' (~["\r\n])* '"' ;
WS      : [ \t\r\n]+ -> skip ;
COMMENT : '//' ~[\r\n]* -> skip ;
```

---

## Part 2: Semantic Validation Specification

### 1. Symbol Table Construction

Before executing semantic checks, the compiler must build a global **Symbol Table**. The table indexes all declared modules, roles, and endpoints.

#### 1.1 The Table Structure
The Symbol Table contains the following namespaces:
1. **Modules**: Map of `ModuleID -> ModuleSymbol`
   - Each `ModuleSymbol` contains:
     - `Fields`: Map of `FieldID -> FieldSymbol`
       - Each `FieldSymbol` contains: `Type` (Primitive or ModuleID), `IsArray` (Boolean), `Constraints` (List).
     - `APIs`: Map of `EndpointName -> EndpointSymbol`
       - Each `EndpointSymbol` contains: `Verb` (List/Get/Create/Update/Delete/Stats), `Path` (String), `Roles` (Set of RoleNames), `InlineConfigs` (Map of RoleName -> Config).
2. **Roles**: Map of `RoleID -> RoleSymbol`
   - Each `RoleSymbol` contains: `MeBinding` (ModuleID or null).
3. **Auth**: A single `AuthSymbol`
   - Contains: `Type` (JWT), `Expiry` (String), `Roles` (Set of RoleNames).

---

### 2. Compiler Checks: Detailed Reference

#### 2.1 Module & Field Declarations (Phase 1)
For every `Module ID { Fields { ... } }` in the AST, the analyzer must enforce the following rules:

1. **Primitive Type Validity**:
   - The type of a field must either be one of the built-in primitive keywords: `String`, `Text`, `Integer`, `Number`, `Boolean`, `Date`, `DateTime`, `Email`, `Phone`.
   - Or it must be a valid `ModuleID` present in the symbol table.
   - Any other string token used as a type (e.g. typos like `Stringg`) must emit a compile error:
     ```text
     Error: Field '<FieldID>' on Module '<ModuleID>' references unknown type '<Type>'.
     Did you mean '<SuggestedType>'?
     ```

2. **Array Constraints**:
   - The array suffix (`[]`) is **strictly forbidden on primitive types** (e.g. `emails: Email[]` is invalid in V1). It is exclusively used for declaring relationships to other modules (e.g. `departments: Department[]`).
   - If an array type is declared on a primitive, emit:
     ```text
     Error: Array types ('[]') are only supported on relationship fields.
     Field '<FieldID>' on Module '<ModuleID>' cannot be an array of primitive type '<Primitive>'.
     ```

3. **Composite Unique Key Constraints**:
   - For every `unique [field1, field2, ...];` declaration inside a `Fields` block:
     - Every listed field ID must actually exist as a declared field in the same Module.
     - The array of unique fields must contain at least 2 distinct fields.
     - If a referenced field does not exist, emit:
       ```text
       Error: Composite unique constraint in Module '<ModuleID>' references non-existent field '<FieldID>'.
       ```

4. **Field Constraint Validation**:
   - **`min` and `max` Constraints**:
     - Can *only* be declared on fields of type `Integer` or `Number`.
     - `min` must be less than or equal to `max`.
     - If declared on String/Boolean/etc, emit:
       ```text
       Error: Constraint '<min/max>' on Field '<FieldID>' is only allowed for Integer or Number fields.
       ```
   - **`options` Constraint**:
     - Can *only* be declared on fields of type `String`.
     - Must contain at least one option.
     - If declared on a non-string field, emit:
       ```text
       Error: Options constraint on Field '<FieldID>' is only allowed for String fields.
       ```
   - **`default` Constraint**:
     - The default string literal must be parsable into the field's declared type.
       - If `Boolean`, must be `"true"` or `"false"`.
       - If `Integer`, must be a valid whole number string.
       - If `Number`, must be a valid decimal number string.
       - If `Email`, must pass a standard email regex check.
       - If `options` are specified, the default value must be one of the listed options.

---

#### 2.2 Relationship Desugaring & Validation (Phase 2)

Relationships connect modules. The compiler handles relationships as follows:

1. **Desugaring Many-to-Many (`[]`)**:
   - When the compiler finds a field declared as `departments: Department[]` inside `Module Doctor`:
     - It must check if a corresponding reverse relationship is declared inside `Module Department` (e.g. `doctors: Doctor[]`).
     - If found, it automatically **desugars** the many-to-many relationship by generating an implicit junction Module:
       ```text
       Module DoctorToDepartment foreign {
         from: Doctor;
         to: Department;
         via: doctorId, departmentId;
         type: ManyToMany;
       }
       ```
     - It injects this junction module into the symbol table to prevent Prisma migration errors.

2. **Validation of Relationship Fields**:
   - Any field whose type is another `Module` is a relationship field.
   - The referenced module must exist.
   - The field cannot have a `default` value constraint.

---

#### 2.3 Auth & Role Declarations (Phase 3)

The semantic analyzer must verify the structural integrity of the application's authentication system.

1. **Singleton Auth Block**:
   - Exactly **one** `Auth { ... }` block must exist at the end of the schema.
   - If missing, emit: `Error: Missing required 'Auth' configuration block.`
   - If multiple exist, emit: `Error: Only one 'Auth' block is allowed per schema.`

2. **Auth Roles Alignment**:
   - The array of roles declared in `Auth { Roles: RoleA, RoleB, ... }` must perfectly match the list of top-level `Role` blocks.
   - If a role is declared as a top-level block `Role Nurse { ... }` but is missing from `Auth.Roles`, emit:
     ```text
     Error: Role 'Nurse' has a Role block but is not listed in the Auth Roles registry.
     ```
   - If a role is listed in `Auth.Roles` but has no top-level `Role` block, emit:
     ```text
     Error: Role 'Nurse' is registered in Auth but is missing its 'Role Nurse { ... }' identity block.
     ```

3. **Identity (`Me:`) Bindings**:
   - A `Role` block can declare at most one `Me:` binding (e.g., `Me: Patient;`).
   - The module target of `Me:` must reference a valid declared Module.
   - A module can only be bound to **at most one** role (e.g., `Patient` module cannot be bound to both `Patient` role and `Visitor` role).
   - If a role has no `Me:` binding (e.g., `Role Admin {}`), it is classified as a **System Account** (admin, operator) with no database user profile.

---

#### 2.4 API & Endpoint Verification (Phase 4)

Endpoints represent the gateways to data. This is where security is enforced.

1. **Verb and Path Consistency**:
   - **`Get` / `Update` / `Delete`** endpoints are operations on single records. Therefore, their path **must** contain a dynamic parameter named `:id` (e.g. `Get /:id`, `Update /status/:id`).
     - If `:id` is missing from the path of a singular verb, emit:
       ```text
       Error: Endpoint '<Verb> <Path>' is a singular record operation and must contain '/:id' in its path.
       ```
   - **`List` / `Create` / `Stats`** endpoints operate on lists or new entities. Their path **must NOT** contain `:id`.
     - If `:id` is present on a collection/action verb, emit:
       ```text
       Error: Endpoint '<Verb> <Path>' cannot contain an ':id' parameter. Use Get/Update/Delete instead.
       ```

2. **Role Verification**:
   - Every endpoint must declare its permitted roles via `roles: ...;`.
   - Every role listed must be defined in `Auth.Roles`.
   - If an unknown role is referenced, emit:
     ```text
     Error: Endpoint '<Verb> <Path>' references undeclared role '<RoleName>'.
     ```

3. **Airtight Inline Role Configuration (`filter` & `set`)**:
   - Developers configure inline scoping like `roles: {Patient, filter patient = auth.id}`. The analyzer must enforce:
     - **Role Type Validation**: The role (e.g., `Patient`) must have a valid `Me:` identity binding. A System Account role with no database record (like `Admin`) **cannot** have inline filters or sets (because there is no `auth.id` mapping to a module profile!).
       - If an Admin uses a filter, emit:
         ```text
         Error: System role 'Admin' has no identity module ('Me:') and cannot declare inline filters or sets.
         ```
     - **Field Name Validation**: The filter/set target (e.g., `patient` in `filter patient = auth.id`) must exist as a declared field on the **current Module**.
       - If it doesn't exist, emit:
         ```text
         Error: Inline config on endpoint '<Verb> <Path>' targets non-existent field '<FieldID>' on Module '<CurrentModule>'.
         ```
     - **Field Type Alignment**: The type of the target field must match the identity module of the role.
       - *Example:* If `Patient` has `Me: Patient`, then `filter patient = auth.id` is valid *only* if the field `patient` on the current module is of type `Patient`. If the field is type `Doctor`, emit:
         ```text
         Error: Type mismatch: inline config for Role 'Patient' targets field '<FieldID>' of type 'Doctor' instead of 'Patient'.
         ```
     - **Auth Expression Validation**: The right-hand side of the assignment must be `auth.id`. (In V1, only the direct record ID is supported).
     - **Verb-Scoping Rules**:
       - `filter` is **only** allowed on `List`, `Get`, `Update`, and `Delete` endpoints. If used on `Create`, emit:
         ```text
         Error: 'filter' constraint is not allowed on 'Create' endpoints. Did you mean 'set'?
         ```
       - `set` is **only** allowed on `Create` and `Update` endpoints. If used on `List`, `Get`, or `Delete`, emit:
         ```text
         Error: 'set' constraint is not allowed on '<Verb>' endpoints. Did you mean 'filter'?
         ```

4. **The `expand:` Block Validation**:
   - On `Get` endpoints, developers can declare `expand: relation1, relation2;`.
   - Each identifier in the list must represent a valid relationship field on the current Module (either a direct relation field, or a recognized reverse relation generated by another module's field).
   - If an identifier is not a valid relation, emit:
     ```text
     Error: expand block on '<Path>' references '<Identifier>' which is not a relationship field.
     ```

---

#### 2.5 Stats Aggregation Validation (Phase 5)

`Stats` endpoints compute metrics. Because metrics map to SQL aggregate calls, they are heavily validated.

1. **Endpoint Scoping**:
   - `Stats` endpoints must have a unique `name:` and standard `roles:` mapping.
   - They cannot contain an `:id` parameter in their path.

2. **JSON Key Uniqueness**:
   - Every line inside a `Stats` block declares a unique JSON response key (e.g. `totalDoctor: count Doctor;`).
   - No duplicate key names are allowed inside the same `Stats` block.
   - If duplicated, emit:
     ```text
     Error: Duplicate metric key '<KeyName>' in Stats endpoint '<Path>'.
     ```

3. **Function & Field Type Compatibility**:
   - **`count`**:
     - Syntax: `key: count ModuleName;`
     - Validates that `ModuleName` exists. Does not accept a dot-field.
   - **`sum`, `avg`, `min`, `max`**:
     - Syntax: `key: function ModuleName.fieldName;`
     - Validates that `ModuleName` exists, and that `fieldName` exists on that module.
     - For `sum` and `avg`, the field's type **must** be either `Integer` or `Number`. If not, emit:
       ```text
       Error: Function '<Function>' on '<Module>.<Field>' requires a numeric field (Integer or Number).
       ```

4. **Modifier Constraints**:
   - **Filter Modifier `(status: "Pending")`**:
     - The field (`status`) must exist on the target Module of the query.
     - The value (`"Pending"`) must match the field's type. If the field has `options`, the string value must be exactly one of the declared options.
   - **Grouped By Modifier `(grouped by field)`**:
     - The field must exist on the target Module.
     - The field must be either an enum (`options` declared) or a relationship field (points to another module). Standard unconstrained fields (like `Text` notes or `Phone` numbers) are rejected for groupings.
     - If invalid, emit:
       ```text
       Error: Cannot group by '<FieldID>'. Grouping is only allowed on relationship fields or option fields.
       ```
