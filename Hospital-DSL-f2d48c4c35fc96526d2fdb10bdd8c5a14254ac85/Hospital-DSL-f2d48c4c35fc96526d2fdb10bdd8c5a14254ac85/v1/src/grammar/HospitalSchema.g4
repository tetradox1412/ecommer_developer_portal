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
    : ID ':' STRING ';'
    | ID ':' ID ';'
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
    : ID ':' ID ';'
    | ID ':' roleConfig (',' roleConfig)* ';'
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
    : ID ':' ID ';'
    | ID ':' roleConfig (',' roleConfig)* ';'
    | ID ID '=' setVal ';'
    | ID ':' ID (',' ID)* ';'
    ;

roleConfig
    : ID
    | '{' ID (',' roleConfigItem)* '}'
    ;

roleConfigItem
    : ID ID '=' authExpr
    | ID ID '=' setVal
    ;

setVal
    : authExpr
    | STRING
    | INT
    | BOOLEAN_LITERAL
    | 'null'
    ;

authExpr
    : ID ('.' ID)+
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
    : ID ':' ID ';'
    | ID ':' ID (',' ID)* ';'
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
    : ID ':' ID ';'
    ;

// ── Auth ──────────────────────────────────────────────────────

authDecl
    : 'Auth' '{' authBody '}'
    ;

authBody
    : authItem+
    ;

authItem
    : ID ':' ID ';'
    | ID ':' STRING ';'
    | ID ':' ID (',' ID)* ';'
    ;

// ─── Lexer Rules ──────────────────────────────────────────────

LIST   : 'List'   ;
GET    : 'Get'    ;
CREATE : 'Create' ;
UPDATE : 'Update' ;
DELETE : 'Delete' ;

BOOLEAN_LITERAL : 'true' | 'false' ;

PATH   : '/' [a-zA-Z0-9_/:.-]* ;

ID      : [a-zA-Z_][a-zA-Z0-9_]* ;
INT     : [0-9]+ ;
STRING  : '"' (~["\r\n])* '"' ;
WS      : [ \t\r\n]+ -> skip ;
COMMENT : '//' ~[\r\n]* -> skip ;
