// Generated from HospitalSchema.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import HospitalSchemaListener from './HospitalSchemaListener.js';
import HospitalSchemaVisitor from './HospitalSchemaVisitor.js';

const serializedATN = [4,1,51,419,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,5,
1,72,8,1,10,1,12,1,75,9,1,1,1,5,1,78,8,1,10,1,12,1,81,9,1,1,1,3,1,84,8,1,
1,2,1,2,1,2,1,2,1,2,1,2,1,3,5,3,93,8,3,10,3,12,3,96,9,3,1,4,1,4,1,4,1,4,
1,4,1,4,1,4,1,4,1,4,1,4,3,4,108,8,4,1,5,1,5,1,5,1,5,4,5,114,8,5,11,5,12,
5,115,1,5,1,5,1,6,1,6,1,6,1,6,1,6,3,6,125,8,6,1,6,5,6,128,8,6,10,6,12,6,
131,9,6,1,6,1,6,1,7,1,7,3,7,137,8,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,
1,8,1,8,1,8,1,8,1,8,1,8,5,8,154,8,8,10,8,12,8,157,9,8,3,8,159,8,8,1,9,1,
9,1,9,1,9,1,9,5,9,166,8,9,10,9,12,9,169,9,9,1,9,1,9,1,9,1,10,1,10,1,10,4,
10,177,8,10,11,10,12,10,178,1,10,1,10,1,11,1,11,1,11,1,11,5,11,187,8,11,
10,11,12,11,190,9,11,1,11,1,11,1,11,1,11,1,11,1,11,5,11,198,8,11,10,11,12,
11,201,9,11,1,11,3,11,204,8,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
12,5,12,215,8,12,10,12,12,12,218,9,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
3,12,227,8,12,1,13,1,13,1,13,1,13,3,13,233,8,13,1,13,3,13,236,8,13,1,14,
1,14,1,14,1,14,5,14,242,8,14,10,14,12,14,245,9,14,1,14,1,14,1,15,1,15,1,
15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,260,8,15,10,15,12,15,263,
9,15,3,15,265,8,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,5,16,276,
8,16,10,16,12,16,279,9,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
16,1,16,1,16,1,16,5,16,294,8,16,10,16,12,16,297,9,16,1,16,3,16,300,8,16,
1,17,1,17,1,17,1,17,1,17,5,17,307,8,17,10,17,12,17,310,9,17,1,17,3,17,313,
8,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,323,8,18,1,19,1,19,1,19,
1,19,1,19,3,19,330,8,19,1,20,1,20,1,20,4,20,335,8,20,11,20,12,20,336,1,21,
1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,23,4,23,349,8,23,11,23,12,23,350,
1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,362,8,24,10,24,12,24,365,
9,24,1,24,1,24,3,24,369,8,24,1,25,1,25,1,25,1,25,1,25,1,25,1,26,5,26,378,
8,26,10,26,12,26,381,9,26,1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,
28,1,29,4,29,394,8,29,11,29,12,29,395,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
1,30,1,30,1,30,1,30,1,30,1,30,5,30,411,8,30,10,30,12,30,414,9,30,1,30,3,
30,417,8,30,1,30,0,0,31,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
36,38,40,42,44,46,48,50,52,54,56,58,60,0,3,2,0,15,16,23,25,1,0,29,33,1,0,
40,44,444,0,62,1,0,0,0,2,73,1,0,0,0,4,85,1,0,0,0,6,94,1,0,0,0,8,107,1,0,
0,0,10,109,1,0,0,0,12,119,1,0,0,0,14,134,1,0,0,0,16,158,1,0,0,0,18,160,1,
0,0,0,20,173,1,0,0,0,22,203,1,0,0,0,24,226,1,0,0,0,26,228,1,0,0,0,28,237,
1,0,0,0,30,264,1,0,0,0,32,299,1,0,0,0,34,312,1,0,0,0,36,322,1,0,0,0,38,329,
1,0,0,0,40,331,1,0,0,0,42,338,1,0,0,0,44,340,1,0,0,0,46,348,1,0,0,0,48,368,
1,0,0,0,50,370,1,0,0,0,52,379,1,0,0,0,54,382,1,0,0,0,56,387,1,0,0,0,58,393,
1,0,0,0,60,416,1,0,0,0,62,63,5,1,0,0,63,64,5,47,0,0,64,65,5,2,0,0,65,66,
3,2,1,0,66,67,5,3,0,0,67,68,5,0,0,1,68,1,1,0,0,0,69,72,3,4,2,0,70,72,3,44,
22,0,71,69,1,0,0,0,71,70,1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,
0,74,79,1,0,0,0,75,73,1,0,0,0,76,78,3,50,25,0,77,76,1,0,0,0,78,81,1,0,0,
0,79,77,1,0,0,0,79,80,1,0,0,0,80,83,1,0,0,0,81,79,1,0,0,0,82,84,3,56,28,
0,83,82,1,0,0,0,83,84,1,0,0,0,84,3,1,0,0,0,85,86,5,4,0,0,86,87,5,47,0,0,
87,88,5,2,0,0,88,89,3,6,3,0,89,90,5,3,0,0,90,5,1,0,0,0,91,93,3,8,4,0,92,
91,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,7,1,0,0,0,96,94,
1,0,0,0,97,98,5,47,0,0,98,99,5,5,0,0,99,100,5,49,0,0,100,108,5,6,0,0,101,
102,5,47,0,0,102,103,5,5,0,0,103,104,5,47,0,0,104,108,5,6,0,0,105,108,3,
10,5,0,106,108,3,20,10,0,107,97,1,0,0,0,107,101,1,0,0,0,107,105,1,0,0,0,
107,106,1,0,0,0,108,9,1,0,0,0,109,110,5,7,0,0,110,113,5,2,0,0,111,114,3,
12,6,0,112,114,3,18,9,0,113,111,1,0,0,0,113,112,1,0,0,0,114,115,1,0,0,0,
115,113,1,0,0,0,115,116,1,0,0,0,116,117,1,0,0,0,117,118,5,3,0,0,118,11,1,
0,0,0,119,120,5,47,0,0,120,121,5,5,0,0,121,124,3,14,7,0,122,123,5,8,0,0,
123,125,5,47,0,0,124,122,1,0,0,0,124,125,1,0,0,0,125,129,1,0,0,0,126,128,
3,16,8,0,127,126,1,0,0,0,128,131,1,0,0,0,129,127,1,0,0,0,129,130,1,0,0,0,
130,132,1,0,0,0,131,129,1,0,0,0,132,133,5,6,0,0,133,13,1,0,0,0,134,136,5,
47,0,0,135,137,5,9,0,0,136,135,1,0,0,0,136,137,1,0,0,0,137,15,1,0,0,0,138,
159,5,10,0,0,139,159,5,11,0,0,140,159,5,12,0,0,141,142,5,13,0,0,142,159,
5,49,0,0,143,144,5,14,0,0,144,159,5,49,0,0,145,146,5,15,0,0,146,159,5,48,
0,0,147,148,5,16,0,0,148,159,5,48,0,0,149,150,5,17,0,0,150,155,5,49,0,0,
151,152,5,18,0,0,152,154,5,49,0,0,153,151,1,0,0,0,154,157,1,0,0,0,155,153,
1,0,0,0,155,156,1,0,0,0,156,159,1,0,0,0,157,155,1,0,0,0,158,138,1,0,0,0,
158,139,1,0,0,0,158,140,1,0,0,0,158,141,1,0,0,0,158,143,1,0,0,0,158,145,
1,0,0,0,158,147,1,0,0,0,158,149,1,0,0,0,159,17,1,0,0,0,160,161,5,12,0,0,
161,162,5,19,0,0,162,167,5,47,0,0,163,164,5,18,0,0,164,166,5,47,0,0,165,
163,1,0,0,0,166,169,1,0,0,0,167,165,1,0,0,0,167,168,1,0,0,0,168,170,1,0,
0,0,169,167,1,0,0,0,170,171,5,20,0,0,171,172,5,6,0,0,172,19,1,0,0,0,173,
174,5,21,0,0,174,176,5,2,0,0,175,177,3,22,11,0,176,175,1,0,0,0,177,178,1,
0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,180,1,0,0,0,180,181,5,3,0,0,181,
21,1,0,0,0,182,183,3,42,21,0,183,184,5,46,0,0,184,188,5,2,0,0,185,187,3,
32,16,0,186,185,1,0,0,0,187,190,1,0,0,0,188,186,1,0,0,0,188,189,1,0,0,0,
189,191,1,0,0,0,190,188,1,0,0,0,191,192,5,3,0,0,192,204,1,0,0,0,193,194,
5,22,0,0,194,195,5,46,0,0,195,199,5,2,0,0,196,198,3,24,12,0,197,196,1,0,
0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,1,0,0,0,200,202,1,0,0,0,201,
199,1,0,0,0,202,204,5,3,0,0,203,182,1,0,0,0,203,193,1,0,0,0,204,23,1,0,0,
0,205,206,5,47,0,0,206,207,5,5,0,0,207,208,5,47,0,0,208,227,5,6,0,0,209,
210,5,47,0,0,210,211,5,5,0,0,211,216,3,34,17,0,212,213,5,18,0,0,213,215,
3,34,17,0,214,212,1,0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,
0,217,219,1,0,0,0,218,216,1,0,0,0,219,220,5,6,0,0,220,227,1,0,0,0,221,222,
5,47,0,0,222,223,5,5,0,0,223,224,3,26,13,0,224,225,5,6,0,0,225,227,1,0,0,
0,226,205,1,0,0,0,226,209,1,0,0,0,226,221,1,0,0,0,227,25,1,0,0,0,228,229,
7,0,0,0,229,232,5,47,0,0,230,231,5,26,0,0,231,233,5,47,0,0,232,230,1,0,0,
0,232,233,1,0,0,0,233,235,1,0,0,0,234,236,3,28,14,0,235,234,1,0,0,0,235,
236,1,0,0,0,236,27,1,0,0,0,237,238,5,27,0,0,238,243,3,30,15,0,239,240,5,
18,0,0,240,242,3,30,15,0,241,239,1,0,0,0,242,245,1,0,0,0,243,241,1,0,0,0,
243,244,1,0,0,0,244,246,1,0,0,0,245,243,1,0,0,0,246,247,5,28,0,0,247,29,
1,0,0,0,248,249,5,47,0,0,249,250,5,5,0,0,250,265,5,49,0,0,251,252,5,47,0,
0,252,253,7,1,0,0,253,265,5,48,0,0,254,255,5,34,0,0,255,256,5,35,0,0,256,
261,5,47,0,0,257,258,5,26,0,0,258,260,5,47,0,0,259,257,1,0,0,0,260,263,1,
0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,265,1,0,0,0,263,261,1,0,0,0,264,
248,1,0,0,0,264,251,1,0,0,0,264,254,1,0,0,0,265,31,1,0,0,0,266,267,5,47,
0,0,267,268,5,5,0,0,268,269,5,47,0,0,269,300,5,6,0,0,270,271,5,47,0,0,271,
272,5,5,0,0,272,277,3,34,17,0,273,274,5,18,0,0,274,276,3,34,17,0,275,273,
1,0,0,0,276,279,1,0,0,0,277,275,1,0,0,0,277,278,1,0,0,0,278,280,1,0,0,0,
279,277,1,0,0,0,280,281,5,6,0,0,281,300,1,0,0,0,282,283,5,47,0,0,283,284,
5,47,0,0,284,285,5,36,0,0,285,286,3,38,19,0,286,287,5,6,0,0,287,300,1,0,
0,0,288,289,5,47,0,0,289,290,5,5,0,0,290,295,5,47,0,0,291,292,5,18,0,0,292,
294,5,47,0,0,293,291,1,0,0,0,294,297,1,0,0,0,295,293,1,0,0,0,295,296,1,0,
0,0,296,298,1,0,0,0,297,295,1,0,0,0,298,300,5,6,0,0,299,266,1,0,0,0,299,
270,1,0,0,0,299,282,1,0,0,0,299,288,1,0,0,0,300,33,1,0,0,0,301,313,5,47,
0,0,302,303,5,2,0,0,303,308,5,47,0,0,304,305,5,18,0,0,305,307,3,36,18,0,
306,304,1,0,0,0,307,310,1,0,0,0,308,306,1,0,0,0,308,309,1,0,0,0,309,311,
1,0,0,0,310,308,1,0,0,0,311,313,5,3,0,0,312,301,1,0,0,0,312,302,1,0,0,0,
313,35,1,0,0,0,314,315,5,47,0,0,315,316,5,47,0,0,316,317,5,36,0,0,317,323,
3,40,20,0,318,319,5,47,0,0,319,320,5,47,0,0,320,321,5,36,0,0,321,323,3,38,
19,0,322,314,1,0,0,0,322,318,1,0,0,0,323,37,1,0,0,0,324,330,3,40,20,0,325,
330,5,49,0,0,326,330,5,48,0,0,327,330,5,45,0,0,328,330,5,37,0,0,329,324,
1,0,0,0,329,325,1,0,0,0,329,326,1,0,0,0,329,327,1,0,0,0,329,328,1,0,0,0,
330,39,1,0,0,0,331,334,5,47,0,0,332,333,5,26,0,0,333,335,5,47,0,0,334,332,
1,0,0,0,335,336,1,0,0,0,336,334,1,0,0,0,336,337,1,0,0,0,337,41,1,0,0,0,338,
339,7,2,0,0,339,43,1,0,0,0,340,341,5,4,0,0,341,342,5,47,0,0,342,343,5,8,
0,0,343,344,5,2,0,0,344,345,3,46,23,0,345,346,5,3,0,0,346,45,1,0,0,0,347,
349,3,48,24,0,348,347,1,0,0,0,349,350,1,0,0,0,350,348,1,0,0,0,350,351,1,
0,0,0,351,47,1,0,0,0,352,353,5,47,0,0,353,354,5,5,0,0,354,355,5,47,0,0,355,
369,5,6,0,0,356,357,5,47,0,0,357,358,5,5,0,0,358,363,5,47,0,0,359,360,5,
18,0,0,360,362,5,47,0,0,361,359,1,0,0,0,362,365,1,0,0,0,363,361,1,0,0,0,
363,364,1,0,0,0,364,366,1,0,0,0,365,363,1,0,0,0,366,369,5,6,0,0,367,369,
3,20,10,0,368,352,1,0,0,0,368,356,1,0,0,0,368,367,1,0,0,0,369,49,1,0,0,0,
370,371,5,38,0,0,371,372,5,47,0,0,372,373,5,2,0,0,373,374,3,52,26,0,374,
375,5,3,0,0,375,51,1,0,0,0,376,378,3,54,27,0,377,376,1,0,0,0,378,381,1,0,
0,0,379,377,1,0,0,0,379,380,1,0,0,0,380,53,1,0,0,0,381,379,1,0,0,0,382,383,
5,47,0,0,383,384,5,5,0,0,384,385,5,47,0,0,385,386,5,6,0,0,386,55,1,0,0,0,
387,388,5,39,0,0,388,389,5,2,0,0,389,390,3,58,29,0,390,391,5,3,0,0,391,57,
1,0,0,0,392,394,3,60,30,0,393,392,1,0,0,0,394,395,1,0,0,0,395,393,1,0,0,
0,395,396,1,0,0,0,396,59,1,0,0,0,397,398,5,47,0,0,398,399,5,5,0,0,399,400,
5,47,0,0,400,417,5,6,0,0,401,402,5,47,0,0,402,403,5,5,0,0,403,404,5,49,0,
0,404,417,5,6,0,0,405,406,5,47,0,0,406,407,5,5,0,0,407,412,5,47,0,0,408,
409,5,18,0,0,409,411,5,47,0,0,410,408,1,0,0,0,411,414,1,0,0,0,412,410,1,
0,0,0,412,413,1,0,0,0,413,415,1,0,0,0,414,412,1,0,0,0,415,417,5,6,0,0,416,
397,1,0,0,0,416,401,1,0,0,0,416,405,1,0,0,0,417,61,1,0,0,0,40,71,73,79,83,
94,107,113,115,124,129,136,155,158,167,178,188,199,203,216,226,232,235,243,
261,264,277,295,299,308,312,322,329,336,350,363,368,379,395,412,416];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class HospitalSchemaParser extends antlr4.Parser {

    static grammarFileName = "HospitalSchema.g4";
    static literalNames = [ null, "'Hospital'", "'{'", "'}'", "'Module'", 
                            "':'", "';'", "'Fields'", "'foreign'", "'[]'", 
                            "'required'", "'optional'", "'unique'", "'label'", 
                            "'default'", "'min'", "'max'", "'options'", 
                            "','", "'['", "']'", "'APIs'", "'Stats'", "'count'", 
                            "'sum'", "'avg'", "'.'", "'('", "')'", "'>'", 
                            "'<'", "'>='", "'<='", "'=='", "'grouped'", 
                            "'by'", "'='", "'null'", "'Role'", "'Auth'", 
                            "'List'", "'Get'", "'Create'", "'Update'", "'Delete'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             "LIST", "GET", "CREATE", "UPDATE", "DELETE", 
                             "BOOLEAN_LITERAL", "PATH", "ID", "INT", "STRING", 
                             "WS", "COMMENT" ];
    static ruleNames = [ "hospital", "hospitalBody", "moduleDecl", "moduleBody", 
                         "moduleItem", "fieldsDecl", "fieldDef", "fieldType", 
                         "fieldConstraint", "uniqueConstraint", "apisBlock", 
                         "apiEndpoint", "statsEndpointItem", "statsAggregation", 
                         "statsModifier", "statsModifierItem", "apiEndpointItem", 
                         "roleConfig", "roleConfigItem", "setVal", "authExpr", 
                         "apiVerb", "foreignModuleDecl", "foreignModuleBody", 
                         "foreignModuleItem", "roleDecl", "roleBody", "roleItem", 
                         "authDecl", "authBody", "authItem" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = HospitalSchemaParser.ruleNames;
        this.literalNames = HospitalSchemaParser.literalNames;
        this.symbolicNames = HospitalSchemaParser.symbolicNames;
    }



	hospital() {
	    let localctx = new HospitalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, HospitalSchemaParser.RULE_hospital);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        this.match(HospitalSchemaParser.T__0);
	        this.state = 63;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 64;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 65;
	        this.hospitalBody();
	        this.state = 66;
	        this.match(HospitalSchemaParser.T__2);
	        this.state = 67;
	        this.match(HospitalSchemaParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	hospitalBody() {
	    let localctx = new HospitalBodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, HospitalSchemaParser.RULE_hospitalBody);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 73;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===4) {
	            this.state = 71;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	            switch(la_) {
	            case 1:
	                this.state = 69;
	                this.moduleDecl();
	                break;

	            case 2:
	                this.state = 70;
	                this.foreignModuleDecl();
	                break;

	            }
	            this.state = 75;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 79;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===38) {
	            this.state = 76;
	            this.roleDecl();
	            this.state = 81;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 83;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===39) {
	            this.state = 82;
	            this.authDecl();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	moduleDecl() {
	    let localctx = new ModuleDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, HospitalSchemaParser.RULE_moduleDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 85;
	        this.match(HospitalSchemaParser.T__3);
	        this.state = 86;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 87;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 88;
	        this.moduleBody();
	        this.state = 89;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	moduleBody() {
	    let localctx = new ModuleBodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, HospitalSchemaParser.RULE_moduleBody);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 94;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===7 || _la===21 || _la===47) {
	            this.state = 91;
	            this.moduleItem();
	            this.state = 96;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	moduleItem() {
	    let localctx = new ModuleItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, HospitalSchemaParser.RULE_moduleItem);
	    try {
	        this.state = 107;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 97;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 98;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 99;
	            this.match(HospitalSchemaParser.STRING);
	            this.state = 100;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 101;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 102;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 103;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 104;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 105;
	            this.fieldsDecl();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 106;
	            this.apisBlock();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldsDecl() {
	    let localctx = new FieldsDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, HospitalSchemaParser.RULE_fieldsDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 109;
	        this.match(HospitalSchemaParser.T__6);
	        this.state = 110;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 113; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 113;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 47:
	                this.state = 111;
	                this.fieldDef();
	                break;
	            case 12:
	                this.state = 112;
	                this.uniqueConstraint();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 115; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===12 || _la===47);
	        this.state = 117;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldDef() {
	    let localctx = new FieldDefContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, HospitalSchemaParser.RULE_fieldDef);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 119;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 120;
	        this.match(HospitalSchemaParser.T__4);
	        this.state = 121;
	        this.fieldType();
	        this.state = 124;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===8) {
	            this.state = 122;
	            this.match(HospitalSchemaParser.T__7);
	            this.state = 123;
	            this.match(HospitalSchemaParser.ID);
	        }

	        this.state = 129;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 261120) !== 0)) {
	            this.state = 126;
	            this.fieldConstraint();
	            this.state = 131;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 132;
	        this.match(HospitalSchemaParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldType() {
	    let localctx = new FieldTypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, HospitalSchemaParser.RULE_fieldType);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 134;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 136;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===9) {
	            this.state = 135;
	            this.match(HospitalSchemaParser.T__8);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldConstraint() {
	    let localctx = new FieldConstraintContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, HospitalSchemaParser.RULE_fieldConstraint);
	    var _la = 0;
	    try {
	        this.state = 158;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 138;
	            this.match(HospitalSchemaParser.T__9);
	            break;
	        case 11:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 139;
	            this.match(HospitalSchemaParser.T__10);
	            break;
	        case 12:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 140;
	            this.match(HospitalSchemaParser.T__11);
	            break;
	        case 13:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 141;
	            this.match(HospitalSchemaParser.T__12);
	            this.state = 142;
	            this.match(HospitalSchemaParser.STRING);
	            break;
	        case 14:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 143;
	            this.match(HospitalSchemaParser.T__13);
	            this.state = 144;
	            this.match(HospitalSchemaParser.STRING);
	            break;
	        case 15:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 145;
	            this.match(HospitalSchemaParser.T__14);
	            this.state = 146;
	            this.match(HospitalSchemaParser.INT);
	            break;
	        case 16:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 147;
	            this.match(HospitalSchemaParser.T__15);
	            this.state = 148;
	            this.match(HospitalSchemaParser.INT);
	            break;
	        case 17:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 149;
	            this.match(HospitalSchemaParser.T__16);
	            this.state = 150;
	            this.match(HospitalSchemaParser.STRING);
	            this.state = 155;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 151;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 152;
	                this.match(HospitalSchemaParser.STRING);
	                this.state = 157;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	uniqueConstraint() {
	    let localctx = new UniqueConstraintContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, HospitalSchemaParser.RULE_uniqueConstraint);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 160;
	        this.match(HospitalSchemaParser.T__11);
	        this.state = 161;
	        this.match(HospitalSchemaParser.T__18);
	        this.state = 162;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 167;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===18) {
	            this.state = 163;
	            this.match(HospitalSchemaParser.T__17);
	            this.state = 164;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 169;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 170;
	        this.match(HospitalSchemaParser.T__19);
	        this.state = 171;
	        this.match(HospitalSchemaParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	apisBlock() {
	    let localctx = new ApisBlockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, HospitalSchemaParser.RULE_apisBlock);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 173;
	        this.match(HospitalSchemaParser.T__20);
	        this.state = 174;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 176; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 175;
	            this.apiEndpoint();
	            this.state = 178; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(((((_la - 22)) & ~0x1f) === 0 && ((1 << (_la - 22)) & 8126465) !== 0));
	        this.state = 180;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	apiEndpoint() {
	    let localctx = new ApiEndpointContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, HospitalSchemaParser.RULE_apiEndpoint);
	    var _la = 0;
	    try {
	        this.state = 203;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 40:
	        case 41:
	        case 42:
	        case 43:
	        case 44:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 182;
	            this.apiVerb();
	            this.state = 183;
	            this.match(HospitalSchemaParser.PATH);
	            this.state = 184;
	            this.match(HospitalSchemaParser.T__1);
	            this.state = 188;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===47) {
	                this.state = 185;
	                this.apiEndpointItem();
	                this.state = 190;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 191;
	            this.match(HospitalSchemaParser.T__2);
	            break;
	        case 22:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 193;
	            this.match(HospitalSchemaParser.T__21);
	            this.state = 194;
	            this.match(HospitalSchemaParser.PATH);
	            this.state = 195;
	            this.match(HospitalSchemaParser.T__1);
	            this.state = 199;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===47) {
	                this.state = 196;
	                this.statsEndpointItem();
	                this.state = 201;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 202;
	            this.match(HospitalSchemaParser.T__2);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statsEndpointItem() {
	    let localctx = new StatsEndpointItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, HospitalSchemaParser.RULE_statsEndpointItem);
	    var _la = 0;
	    try {
	        this.state = 226;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 205;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 206;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 207;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 208;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 209;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 210;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 211;
	            this.roleConfig();
	            this.state = 216;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 212;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 213;
	                this.roleConfig();
	                this.state = 218;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 219;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 221;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 222;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 223;
	            this.statsAggregation();
	            this.state = 224;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statsAggregation() {
	    let localctx = new StatsAggregationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, HospitalSchemaParser.RULE_statsAggregation);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 228;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 58818560) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 229;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 232;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===26) {
	            this.state = 230;
	            this.match(HospitalSchemaParser.T__25);
	            this.state = 231;
	            this.match(HospitalSchemaParser.ID);
	        }

	        this.state = 235;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===27) {
	            this.state = 234;
	            this.statsModifier();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statsModifier() {
	    let localctx = new StatsModifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, HospitalSchemaParser.RULE_statsModifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 237;
	        this.match(HospitalSchemaParser.T__26);
	        this.state = 238;
	        this.statsModifierItem();
	        this.state = 243;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===18) {
	            this.state = 239;
	            this.match(HospitalSchemaParser.T__17);
	            this.state = 240;
	            this.statsModifierItem();
	            this.state = 245;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 246;
	        this.match(HospitalSchemaParser.T__27);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statsModifierItem() {
	    let localctx = new StatsModifierItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, HospitalSchemaParser.RULE_statsModifierItem);
	    var _la = 0;
	    try {
	        this.state = 264;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 248;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 249;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 250;
	            this.match(HospitalSchemaParser.STRING);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 251;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 252;
	            _la = this._input.LA(1);
	            if(!(((((_la - 29)) & ~0x1f) === 0 && ((1 << (_la - 29)) & 31) !== 0))) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 253;
	            this.match(HospitalSchemaParser.INT);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 254;
	            this.match(HospitalSchemaParser.T__33);
	            this.state = 255;
	            this.match(HospitalSchemaParser.T__34);
	            this.state = 256;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 261;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===26) {
	                this.state = 257;
	                this.match(HospitalSchemaParser.T__25);
	                this.state = 258;
	                this.match(HospitalSchemaParser.ID);
	                this.state = 263;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	apiEndpointItem() {
	    let localctx = new ApiEndpointItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, HospitalSchemaParser.RULE_apiEndpointItem);
	    var _la = 0;
	    try {
	        this.state = 299;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 266;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 267;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 268;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 269;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 270;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 271;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 272;
	            this.roleConfig();
	            this.state = 277;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 273;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 274;
	                this.roleConfig();
	                this.state = 279;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 280;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 282;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 283;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 284;
	            this.match(HospitalSchemaParser.T__35);
	            this.state = 285;
	            this.setVal();
	            this.state = 286;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 288;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 289;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 290;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 295;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 291;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 292;
	                this.match(HospitalSchemaParser.ID);
	                this.state = 297;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 298;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	roleConfig() {
	    let localctx = new RoleConfigContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, HospitalSchemaParser.RULE_roleConfig);
	    var _la = 0;
	    try {
	        this.state = 312;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 47:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 301;
	            this.match(HospitalSchemaParser.ID);
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 302;
	            this.match(HospitalSchemaParser.T__1);
	            this.state = 303;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 308;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 304;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 305;
	                this.roleConfigItem();
	                this.state = 310;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 311;
	            this.match(HospitalSchemaParser.T__2);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	roleConfigItem() {
	    let localctx = new RoleConfigItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, HospitalSchemaParser.RULE_roleConfigItem);
	    try {
	        this.state = 322;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 314;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 315;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 316;
	            this.match(HospitalSchemaParser.T__35);
	            this.state = 317;
	            this.authExpr();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 318;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 319;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 320;
	            this.match(HospitalSchemaParser.T__35);
	            this.state = 321;
	            this.setVal();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	setVal() {
	    let localctx = new SetValContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, HospitalSchemaParser.RULE_setVal);
	    try {
	        this.state = 329;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 47:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 324;
	            this.authExpr();
	            break;
	        case 49:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 325;
	            this.match(HospitalSchemaParser.STRING);
	            break;
	        case 48:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 326;
	            this.match(HospitalSchemaParser.INT);
	            break;
	        case 45:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 327;
	            this.match(HospitalSchemaParser.BOOLEAN_LITERAL);
	            break;
	        case 37:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 328;
	            this.match(HospitalSchemaParser.T__36);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	authExpr() {
	    let localctx = new AuthExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, HospitalSchemaParser.RULE_authExpr);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 331;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 334; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 332;
	            this.match(HospitalSchemaParser.T__25);
	            this.state = 333;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 336; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===26);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	apiVerb() {
	    let localctx = new ApiVerbContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, HospitalSchemaParser.RULE_apiVerb);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 338;
	        _la = this._input.LA(1);
	        if(!(((((_la - 40)) & ~0x1f) === 0 && ((1 << (_la - 40)) & 31) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	foreignModuleDecl() {
	    let localctx = new ForeignModuleDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, HospitalSchemaParser.RULE_foreignModuleDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 340;
	        this.match(HospitalSchemaParser.T__3);
	        this.state = 341;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 342;
	        this.match(HospitalSchemaParser.T__7);
	        this.state = 343;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 344;
	        this.foreignModuleBody();
	        this.state = 345;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	foreignModuleBody() {
	    let localctx = new ForeignModuleBodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, HospitalSchemaParser.RULE_foreignModuleBody);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 348; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 347;
	            this.foreignModuleItem();
	            this.state = 350; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===21 || _la===47);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	foreignModuleItem() {
	    let localctx = new ForeignModuleItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, HospitalSchemaParser.RULE_foreignModuleItem);
	    var _la = 0;
	    try {
	        this.state = 368;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,35,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 352;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 353;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 354;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 355;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 356;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 357;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 358;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 363;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 359;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 360;
	                this.match(HospitalSchemaParser.ID);
	                this.state = 365;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 366;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 367;
	            this.apisBlock();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	roleDecl() {
	    let localctx = new RoleDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, HospitalSchemaParser.RULE_roleDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 370;
	        this.match(HospitalSchemaParser.T__37);
	        this.state = 371;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 372;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 373;
	        this.roleBody();
	        this.state = 374;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	roleBody() {
	    let localctx = new RoleBodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 52, HospitalSchemaParser.RULE_roleBody);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 379;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===47) {
	            this.state = 376;
	            this.roleItem();
	            this.state = 381;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	roleItem() {
	    let localctx = new RoleItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, HospitalSchemaParser.RULE_roleItem);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 382;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 383;
	        this.match(HospitalSchemaParser.T__4);
	        this.state = 384;
	        this.match(HospitalSchemaParser.ID);
	        this.state = 385;
	        this.match(HospitalSchemaParser.T__5);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	authDecl() {
	    let localctx = new AuthDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 56, HospitalSchemaParser.RULE_authDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 387;
	        this.match(HospitalSchemaParser.T__38);
	        this.state = 388;
	        this.match(HospitalSchemaParser.T__1);
	        this.state = 389;
	        this.authBody();
	        this.state = 390;
	        this.match(HospitalSchemaParser.T__2);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	authBody() {
	    let localctx = new AuthBodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 58, HospitalSchemaParser.RULE_authBody);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 393; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 392;
	            this.authItem();
	            this.state = 395; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===47);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	authItem() {
	    let localctx = new AuthItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 60, HospitalSchemaParser.RULE_authItem);
	    var _la = 0;
	    try {
	        this.state = 416;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,39,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 397;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 398;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 399;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 400;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 401;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 402;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 403;
	            this.match(HospitalSchemaParser.STRING);
	            this.state = 404;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 405;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 406;
	            this.match(HospitalSchemaParser.T__4);
	            this.state = 407;
	            this.match(HospitalSchemaParser.ID);
	            this.state = 412;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===18) {
	                this.state = 408;
	                this.match(HospitalSchemaParser.T__17);
	                this.state = 409;
	                this.match(HospitalSchemaParser.ID);
	                this.state = 414;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 415;
	            this.match(HospitalSchemaParser.T__5);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

HospitalSchemaParser.EOF = antlr4.Token.EOF;
HospitalSchemaParser.T__0 = 1;
HospitalSchemaParser.T__1 = 2;
HospitalSchemaParser.T__2 = 3;
HospitalSchemaParser.T__3 = 4;
HospitalSchemaParser.T__4 = 5;
HospitalSchemaParser.T__5 = 6;
HospitalSchemaParser.T__6 = 7;
HospitalSchemaParser.T__7 = 8;
HospitalSchemaParser.T__8 = 9;
HospitalSchemaParser.T__9 = 10;
HospitalSchemaParser.T__10 = 11;
HospitalSchemaParser.T__11 = 12;
HospitalSchemaParser.T__12 = 13;
HospitalSchemaParser.T__13 = 14;
HospitalSchemaParser.T__14 = 15;
HospitalSchemaParser.T__15 = 16;
HospitalSchemaParser.T__16 = 17;
HospitalSchemaParser.T__17 = 18;
HospitalSchemaParser.T__18 = 19;
HospitalSchemaParser.T__19 = 20;
HospitalSchemaParser.T__20 = 21;
HospitalSchemaParser.T__21 = 22;
HospitalSchemaParser.T__22 = 23;
HospitalSchemaParser.T__23 = 24;
HospitalSchemaParser.T__24 = 25;
HospitalSchemaParser.T__25 = 26;
HospitalSchemaParser.T__26 = 27;
HospitalSchemaParser.T__27 = 28;
HospitalSchemaParser.T__28 = 29;
HospitalSchemaParser.T__29 = 30;
HospitalSchemaParser.T__30 = 31;
HospitalSchemaParser.T__31 = 32;
HospitalSchemaParser.T__32 = 33;
HospitalSchemaParser.T__33 = 34;
HospitalSchemaParser.T__34 = 35;
HospitalSchemaParser.T__35 = 36;
HospitalSchemaParser.T__36 = 37;
HospitalSchemaParser.T__37 = 38;
HospitalSchemaParser.T__38 = 39;
HospitalSchemaParser.LIST = 40;
HospitalSchemaParser.GET = 41;
HospitalSchemaParser.CREATE = 42;
HospitalSchemaParser.UPDATE = 43;
HospitalSchemaParser.DELETE = 44;
HospitalSchemaParser.BOOLEAN_LITERAL = 45;
HospitalSchemaParser.PATH = 46;
HospitalSchemaParser.ID = 47;
HospitalSchemaParser.INT = 48;
HospitalSchemaParser.STRING = 49;
HospitalSchemaParser.WS = 50;
HospitalSchemaParser.COMMENT = 51;

HospitalSchemaParser.RULE_hospital = 0;
HospitalSchemaParser.RULE_hospitalBody = 1;
HospitalSchemaParser.RULE_moduleDecl = 2;
HospitalSchemaParser.RULE_moduleBody = 3;
HospitalSchemaParser.RULE_moduleItem = 4;
HospitalSchemaParser.RULE_fieldsDecl = 5;
HospitalSchemaParser.RULE_fieldDef = 6;
HospitalSchemaParser.RULE_fieldType = 7;
HospitalSchemaParser.RULE_fieldConstraint = 8;
HospitalSchemaParser.RULE_uniqueConstraint = 9;
HospitalSchemaParser.RULE_apisBlock = 10;
HospitalSchemaParser.RULE_apiEndpoint = 11;
HospitalSchemaParser.RULE_statsEndpointItem = 12;
HospitalSchemaParser.RULE_statsAggregation = 13;
HospitalSchemaParser.RULE_statsModifier = 14;
HospitalSchemaParser.RULE_statsModifierItem = 15;
HospitalSchemaParser.RULE_apiEndpointItem = 16;
HospitalSchemaParser.RULE_roleConfig = 17;
HospitalSchemaParser.RULE_roleConfigItem = 18;
HospitalSchemaParser.RULE_setVal = 19;
HospitalSchemaParser.RULE_authExpr = 20;
HospitalSchemaParser.RULE_apiVerb = 21;
HospitalSchemaParser.RULE_foreignModuleDecl = 22;
HospitalSchemaParser.RULE_foreignModuleBody = 23;
HospitalSchemaParser.RULE_foreignModuleItem = 24;
HospitalSchemaParser.RULE_roleDecl = 25;
HospitalSchemaParser.RULE_roleBody = 26;
HospitalSchemaParser.RULE_roleItem = 27;
HospitalSchemaParser.RULE_authDecl = 28;
HospitalSchemaParser.RULE_authBody = 29;
HospitalSchemaParser.RULE_authItem = 30;

class HospitalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_hospital;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	hospitalBody() {
	    return this.getTypedRuleContext(HospitalBodyContext,0);
	};

	EOF() {
	    return this.getToken(HospitalSchemaParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterHospital(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitHospital(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitHospital(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class HospitalBodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_hospitalBody;
    }

	moduleDecl = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ModuleDeclContext);
	    } else {
	        return this.getTypedRuleContext(ModuleDeclContext,i);
	    }
	};

	foreignModuleDecl = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ForeignModuleDeclContext);
	    } else {
	        return this.getTypedRuleContext(ForeignModuleDeclContext,i);
	    }
	};

	roleDecl = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RoleDeclContext);
	    } else {
	        return this.getTypedRuleContext(RoleDeclContext,i);
	    }
	};

	authDecl() {
	    return this.getTypedRuleContext(AuthDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterHospitalBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitHospitalBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitHospitalBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ModuleDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_moduleDecl;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	moduleBody() {
	    return this.getTypedRuleContext(ModuleBodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterModuleDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitModuleDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitModuleDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ModuleBodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_moduleBody;
    }

	moduleItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ModuleItemContext);
	    } else {
	        return this.getTypedRuleContext(ModuleItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterModuleBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitModuleBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitModuleBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ModuleItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_moduleItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	STRING() {
	    return this.getToken(HospitalSchemaParser.STRING, 0);
	};

	fieldsDecl() {
	    return this.getTypedRuleContext(FieldsDeclContext,0);
	};

	apisBlock() {
	    return this.getTypedRuleContext(ApisBlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterModuleItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitModuleItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitModuleItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldsDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_fieldsDecl;
    }

	fieldDef = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldDefContext);
	    } else {
	        return this.getTypedRuleContext(FieldDefContext,i);
	    }
	};

	uniqueConstraint = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(UniqueConstraintContext);
	    } else {
	        return this.getTypedRuleContext(UniqueConstraintContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterFieldsDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitFieldsDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitFieldsDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldDefContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_fieldDef;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	fieldType() {
	    return this.getTypedRuleContext(FieldTypeContext,0);
	};

	fieldConstraint = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldConstraintContext);
	    } else {
	        return this.getTypedRuleContext(FieldConstraintContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterFieldDef(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitFieldDef(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitFieldDef(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_fieldType;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterFieldType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitFieldType(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitFieldType(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldConstraintContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_fieldConstraint;
    }

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.STRING);
	    } else {
	        return this.getToken(HospitalSchemaParser.STRING, i);
	    }
	};


	INT() {
	    return this.getToken(HospitalSchemaParser.INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterFieldConstraint(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitFieldConstraint(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitFieldConstraint(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class UniqueConstraintContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_uniqueConstraint;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterUniqueConstraint(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitUniqueConstraint(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitUniqueConstraint(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ApisBlockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_apisBlock;
    }

	apiEndpoint = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ApiEndpointContext);
	    } else {
	        return this.getTypedRuleContext(ApiEndpointContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterApisBlock(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitApisBlock(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitApisBlock(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ApiEndpointContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_apiEndpoint;
    }

	apiVerb() {
	    return this.getTypedRuleContext(ApiVerbContext,0);
	};

	PATH() {
	    return this.getToken(HospitalSchemaParser.PATH, 0);
	};

	apiEndpointItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ApiEndpointItemContext);
	    } else {
	        return this.getTypedRuleContext(ApiEndpointItemContext,i);
	    }
	};

	statsEndpointItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatsEndpointItemContext);
	    } else {
	        return this.getTypedRuleContext(StatsEndpointItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterApiEndpoint(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitApiEndpoint(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitApiEndpoint(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatsEndpointItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_statsEndpointItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	roleConfig = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RoleConfigContext);
	    } else {
	        return this.getTypedRuleContext(RoleConfigContext,i);
	    }
	};

	statsAggregation() {
	    return this.getTypedRuleContext(StatsAggregationContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterStatsEndpointItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitStatsEndpointItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitStatsEndpointItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatsAggregationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_statsAggregation;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	statsModifier() {
	    return this.getTypedRuleContext(StatsModifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterStatsAggregation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitStatsAggregation(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitStatsAggregation(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatsModifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_statsModifier;
    }

	statsModifierItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatsModifierItemContext);
	    } else {
	        return this.getTypedRuleContext(StatsModifierItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterStatsModifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitStatsModifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitStatsModifier(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatsModifierItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_statsModifierItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	STRING() {
	    return this.getToken(HospitalSchemaParser.STRING, 0);
	};

	INT() {
	    return this.getToken(HospitalSchemaParser.INT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterStatsModifierItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitStatsModifierItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitStatsModifierItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ApiEndpointItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_apiEndpointItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	roleConfig = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RoleConfigContext);
	    } else {
	        return this.getTypedRuleContext(RoleConfigContext,i);
	    }
	};

	setVal() {
	    return this.getTypedRuleContext(SetValContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterApiEndpointItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitApiEndpointItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitApiEndpointItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RoleConfigContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_roleConfig;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	roleConfigItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RoleConfigItemContext);
	    } else {
	        return this.getTypedRuleContext(RoleConfigItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterRoleConfig(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitRoleConfig(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitRoleConfig(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RoleConfigItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_roleConfigItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	setVal() {
	    return this.getTypedRuleContext(SetValContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterRoleConfigItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitRoleConfigItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitRoleConfigItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SetValContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_setVal;
    }

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	STRING() {
	    return this.getToken(HospitalSchemaParser.STRING, 0);
	};

	INT() {
	    return this.getToken(HospitalSchemaParser.INT, 0);
	};

	BOOLEAN_LITERAL() {
	    return this.getToken(HospitalSchemaParser.BOOLEAN_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterSetVal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitSetVal(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitSetVal(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AuthExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_authExpr;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterAuthExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitAuthExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitAuthExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ApiVerbContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_apiVerb;
    }

	LIST() {
	    return this.getToken(HospitalSchemaParser.LIST, 0);
	};

	GET() {
	    return this.getToken(HospitalSchemaParser.GET, 0);
	};

	CREATE() {
	    return this.getToken(HospitalSchemaParser.CREATE, 0);
	};

	UPDATE() {
	    return this.getToken(HospitalSchemaParser.UPDATE, 0);
	};

	DELETE() {
	    return this.getToken(HospitalSchemaParser.DELETE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterApiVerb(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitApiVerb(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitApiVerb(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ForeignModuleDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleDecl;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	foreignModuleBody() {
	    return this.getTypedRuleContext(ForeignModuleBodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterForeignModuleDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitForeignModuleDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitForeignModuleDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ForeignModuleBodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleBody;
    }

	foreignModuleItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ForeignModuleItemContext);
	    } else {
	        return this.getTypedRuleContext(ForeignModuleItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterForeignModuleBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitForeignModuleBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitForeignModuleBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ForeignModuleItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	apisBlock() {
	    return this.getTypedRuleContext(ApisBlockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterForeignModuleItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitForeignModuleItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitForeignModuleItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RoleDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_roleDecl;
    }

	ID() {
	    return this.getToken(HospitalSchemaParser.ID, 0);
	};

	roleBody() {
	    return this.getTypedRuleContext(RoleBodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterRoleDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitRoleDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitRoleDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RoleBodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_roleBody;
    }

	roleItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RoleItemContext);
	    } else {
	        return this.getTypedRuleContext(RoleItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterRoleBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitRoleBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitRoleBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RoleItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_roleItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterRoleItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitRoleItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitRoleItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AuthDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_authDecl;
    }

	authBody() {
	    return this.getTypedRuleContext(AuthBodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterAuthDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitAuthDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitAuthDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AuthBodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_authBody;
    }

	authItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AuthItemContext);
	    } else {
	        return this.getTypedRuleContext(AuthItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterAuthBody(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitAuthBody(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitAuthBody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AuthItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalSchemaParser.RULE_authItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalSchemaParser.ID);
	    } else {
	        return this.getToken(HospitalSchemaParser.ID, i);
	    }
	};


	STRING() {
	    return this.getToken(HospitalSchemaParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.enterAuthItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalSchemaListener ) {
	        listener.exitAuthItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalSchemaVisitor ) {
	        return visitor.visitAuthItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




HospitalSchemaParser.HospitalContext = HospitalContext; 
HospitalSchemaParser.HospitalBodyContext = HospitalBodyContext; 
HospitalSchemaParser.ModuleDeclContext = ModuleDeclContext; 
HospitalSchemaParser.ModuleBodyContext = ModuleBodyContext; 
HospitalSchemaParser.ModuleItemContext = ModuleItemContext; 
HospitalSchemaParser.FieldsDeclContext = FieldsDeclContext; 
HospitalSchemaParser.FieldDefContext = FieldDefContext; 
HospitalSchemaParser.FieldTypeContext = FieldTypeContext; 
HospitalSchemaParser.FieldConstraintContext = FieldConstraintContext; 
HospitalSchemaParser.UniqueConstraintContext = UniqueConstraintContext; 
HospitalSchemaParser.ApisBlockContext = ApisBlockContext; 
HospitalSchemaParser.ApiEndpointContext = ApiEndpointContext; 
HospitalSchemaParser.StatsEndpointItemContext = StatsEndpointItemContext; 
HospitalSchemaParser.StatsAggregationContext = StatsAggregationContext; 
HospitalSchemaParser.StatsModifierContext = StatsModifierContext; 
HospitalSchemaParser.StatsModifierItemContext = StatsModifierItemContext; 
HospitalSchemaParser.ApiEndpointItemContext = ApiEndpointItemContext; 
HospitalSchemaParser.RoleConfigContext = RoleConfigContext; 
HospitalSchemaParser.RoleConfigItemContext = RoleConfigItemContext; 
HospitalSchemaParser.SetValContext = SetValContext; 
HospitalSchemaParser.AuthExprContext = AuthExprContext; 
HospitalSchemaParser.ApiVerbContext = ApiVerbContext; 
HospitalSchemaParser.ForeignModuleDeclContext = ForeignModuleDeclContext; 
HospitalSchemaParser.ForeignModuleBodyContext = ForeignModuleBodyContext; 
HospitalSchemaParser.ForeignModuleItemContext = ForeignModuleItemContext; 
HospitalSchemaParser.RoleDeclContext = RoleDeclContext; 
HospitalSchemaParser.RoleBodyContext = RoleBodyContext; 
HospitalSchemaParser.RoleItemContext = RoleItemContext; 
HospitalSchemaParser.AuthDeclContext = AuthDeclContext; 
HospitalSchemaParser.AuthBodyContext = AuthBodyContext; 
HospitalSchemaParser.AuthItemContext = AuthItemContext; 
