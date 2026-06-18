grammar HospitalSchema;

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
