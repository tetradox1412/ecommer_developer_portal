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
    : ID ':' idList ';'
    | ID ':' BOOLEAN_LITERAL ';'
    ;

idList
    : ID (',' ID)*
    ;

portalDecl
    : 'Portal' ID '{' portalItem* '}'
    ;

portalItem
    : ID ':' idList ';'
    | pageDecl
    ;

pageDecl
    : 'Page' ID '{' pageItem* '}'
    ;

pageItem
    : ID ':' STRING ';'
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
    : ID ':' authExpr ';'
    | ID ':' idList ';'
    | viewBlock
    | editBlock
    | actionsDecl
    ;

// ── Form ─────────────────────────────────────────────────────
formDecl
    : 'Form' ID? '{' formItem* '}'
    ;

formItem
    : ID ':' authExpr ';'
    | ID ':' idList ';'
    | ID ':' successAction ';'
    | 'Field' ID '{' ID ':' authExpr ';' '}'
    ;

// ── Detail ───────────────────────────────────────────────────
detailDecl
    : 'Detail' ID? '{' detailItem* '}'
    ;

detailItem
    : ID ':' authExpr ';'
    | ID ':' idList ';'
    | editBlock
    | actionsDecl
    ;

// ── MetricGrid ───────────────────────────────────────────────
metricGridDecl
    : 'MetricGrid' ID? '{' metricGridItem* '}'
    ;

metricGridItem
    : ID ':' authExprList ';'
    ;

// ── Kanban ───────────────────────────────────────────────────
kanbanDecl
    : 'Kanban' ID? '{' kanbanItem* '}'
    ;

kanbanItem
    : ID ':' authExpr ';'
    | ID ':' ID ';'
    | ID ':' idList ';'
    | viewBlock
    | actionsDecl
    ;

// ── Calendar ─────────────────────────────────────────────────
calendarDecl
    : 'Calendar' ID? '{' calendarItem* '}'
    ;

calendarItem
    : ID ':' authExpr ';'
    | ID ':' ID ';'
    | viewBlock
    | actionsDecl
    ;

// ── Shared UI Configurations ──────────────────────────────────
viewBlock
    : 'View' '{' viewItem* '}'
    ;

viewItem
    : ID ':' authExpr ';'
    | ID ':' idList ';'
    ;

editBlock
    : 'Edit' '{' editItem* '}'
    ;

editItem
    : ID ':' authExpr ';'
    | ID ':' idList ';'
    ;

actionsDecl
    : ID ':' actionItem (',' actionItem)* ';'
    ;

actionItem
    : authExpr STRING ('{' ID ':' successAction ';' '}')?
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
    : ID ('.' ID)+
    ;

// ─── Lexer Rules ──────────────────────────────────────────────

BOOLEAN_LITERAL : 'true' | 'false' ;
ID      : [a-zA-Z_][a-zA-Z0-9_]* ;
STRING  : '"' (~["\r\n])* '"' ;
WS      : [ \t\r\n]+ -> skip ;
COMMENT : '//' ~[\r\n]* -> skip ;
