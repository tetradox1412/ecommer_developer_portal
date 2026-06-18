grammar HospitalViews;

// ─── Parser Rules ─────────────────────────────────────────────

viewsFile
    : importDecl loginGroupsDecl portalDecl* EOF
    ;

importDecl
    : 'import' STRING ';'
    ;

loginGroupsDecl
    : 'LoginGroups' '{' groupDecl* '}'
    ;

groupDecl
    : 'Group' STRING '{' groupItem* '}'
    ;

groupItem
    : 'roles:' idList ';'
    | 'selfRegister:' BOOLEAN_LITERAL ';'
    | 'registerFields:' idList ';'
    ;

idList
    : ID (',' ID)*
    ;

portalDecl
    : 'Portal' ID '{' portalItem* '}'
    ;

portalItem
    : 'for:' idList ';'
    | pageDecl
    ;

pageDecl
    : 'Page' ID '{' pageItem* '}'
    ;

pageItem
    : 'Route:' STRING ';'
    | 'Title:' STRING ';'
    | containerDecl
    ;

containerDecl
    : tableDecl
    | formDecl
    | detailDecl
    | metricGridDecl
    | kanbanDecl
    | calendarDecl
    ;

// ── Table ────────────────────────────────────────────────────
tableDecl
    : 'Table' ID? '{' tableItem* '}'
    ;

tableItem
    : 'from:' authExpr ';'
    | 'columns:' idList ';'
    | viewBlock
    | editBlock
    | actionsDecl
    ;

// ── Form ─────────────────────────────────────────────────────
formDecl
    : 'Form' ID? '{' formItem* '}'
    ;

formItem
    : 'from:' authExpr ';'
    | 'submit:' authExpr ';'
    | 'fields:' idList ';'
    | 'onSuccess:' successAction ';'
    | 'Field' ID '{' 'from:' authExpr ';' '}'
    ;

// ── Detail ───────────────────────────────────────────────────
detailDecl
    : 'Detail' ID? '{' detailItem* '}'
    ;

detailItem
    : 'from:' authExpr ';'
    | 'fields:' idList ';'
    | editBlock
    | actionsDecl
    ;

// ── MetricGrid ───────────────────────────────────────────────
metricGridDecl
    : 'MetricGrid' ID? '{' metricGridItem* '}'
    ;

metricGridItem
    : 'show:' authExprList ';'
    ;

// ── Kanban ───────────────────────────────────────────────────
kanbanDecl
    : 'Kanban' ID? '{' kanbanItem* '}'
    ;

kanbanItem
    : 'from:' authExpr ';'
    | 'groupBy:' ID ';'
    | 'update:' authExpr ';'
    | 'card:' idList ';'
    | viewBlock
    | actionsDecl
    ;

// ── Calendar ─────────────────────────────────────────────────
calendarDecl
    : 'Calendar' ID? '{' calendarItem* '}'
    ;

calendarItem
    : 'from:' authExpr ';'
    | 'dateField:' ID ';'
    | 'update:' authExpr ';'
    | 'labelField:' ID ';'
    | viewBlock
    | actionsDecl
    ;

// ── Shared UI Configurations ──────────────────────────────────
viewBlock
    : 'View' '{' viewItem* '}'
    ;

viewItem
    : 'get:' authExpr ';'
    | 'fields:' idList ';'
    ;

editBlock
    : 'Edit' '{' editItem* '}'
    ;

editItem
    : 'submit:' authExpr ';'
    | 'fields:' idList ';'
    ;

actionsDecl
    : 'actions:' actionItem (',' actionItem)* ';'
    ;

actionItem
    : authExpr STRING ('{' 'onSuccess:' successAction ';' '}')?
    ;

successAction
    : 'refresh'
    | 'toast' STRING
    | 'navigate' STRING
    ;

authExprList
    : authExpr (',' authExpr)*
    ;

authExpr
    : ID '.' ID
    ;

// ─── Lexer Rules ──────────────────────────────────────────────

BOOLEAN_LITERAL : 'true' | 'false' ;
ID      : [a-zA-Z_][a-zA-Z0-9_]* ;
STRING  : '"' (~["\r\n])* '"' ;
WS      : [ \t\r\n]+ -> skip ;
COMMENT : '//' ~[\r\n]* -> skip ;
