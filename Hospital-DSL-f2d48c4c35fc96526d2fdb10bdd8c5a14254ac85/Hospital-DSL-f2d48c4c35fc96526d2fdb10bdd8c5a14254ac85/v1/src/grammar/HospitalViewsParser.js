// Generated from HospitalViews.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import HospitalViewsListener from './HospitalViewsListener.js';
import HospitalViewsVisitor from './HospitalViewsVisitor.js';

const serializedATN = [4,1,28,422,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,1,0,1,0,1,0,5,0,68,8,0,10,0,
12,0,71,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,2,1,2,1,2,5,2,82,8,2,10,2,12,2,85,
9,2,1,2,1,2,1,3,1,3,1,3,1,3,5,3,93,8,3,10,3,12,3,96,9,3,1,3,1,3,1,4,1,4,
1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,109,8,4,1,5,1,5,1,5,5,5,114,8,5,10,5,12,
5,117,9,5,1,6,1,6,1,6,1,6,5,6,123,8,6,10,6,12,6,126,9,6,1,6,1,6,1,7,1,7,
1,7,1,7,1,7,1,7,3,7,136,8,7,1,8,1,8,1,8,1,8,5,8,142,8,8,10,8,12,8,145,9,
8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,3,9,154,8,9,1,10,1,10,1,10,1,10,1,10,1,10,
3,10,162,8,10,1,11,1,11,3,11,166,8,11,1,11,1,11,5,11,170,8,11,10,11,12,11,
173,9,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,3,12,190,8,12,1,13,1,13,3,13,194,8,13,1,13,1,13,5,13,198,8,13,
10,13,12,13,201,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,
14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
1,14,3,14,229,8,14,1,15,1,15,3,15,233,8,15,1,15,1,15,5,15,237,8,15,10,15,
12,15,240,9,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
16,1,16,1,16,3,16,256,8,16,1,17,1,17,3,17,260,8,17,1,17,1,17,5,17,264,8,
17,10,17,12,17,267,9,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,19,3,19,
278,8,19,1,19,1,19,5,19,282,8,19,10,19,12,19,285,9,19,1,19,1,19,1,20,1,20,
1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,
20,305,8,20,1,21,1,21,3,21,309,8,21,1,21,1,21,5,21,313,8,21,10,21,12,21,
316,9,21,1,21,1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,
3,22,331,8,22,1,23,1,23,1,23,5,23,336,8,23,10,23,12,23,339,9,23,1,23,1,23,
1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,353,8,24,1,25,1,25,
1,25,5,25,358,8,25,10,25,12,25,361,9,25,1,25,1,25,1,26,1,26,1,26,1,26,1,
26,1,26,1,26,1,26,1,26,1,26,3,26,375,8,26,1,27,1,27,1,27,1,27,1,27,5,27,
382,8,27,10,27,12,27,385,9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,
28,1,28,1,28,3,28,398,8,28,1,29,1,29,1,29,1,29,1,29,3,29,405,8,29,1,30,1,
30,1,30,5,30,410,8,30,10,30,12,30,413,9,30,1,31,1,31,1,31,4,31,418,8,31,
11,31,12,31,419,1,31,0,0,32,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,0,0,442,0,64,1,0,0,0,2,74,1,
0,0,0,4,78,1,0,0,0,6,88,1,0,0,0,8,108,1,0,0,0,10,110,1,0,0,0,12,118,1,0,
0,0,14,135,1,0,0,0,16,137,1,0,0,0,18,153,1,0,0,0,20,161,1,0,0,0,22,163,1,
0,0,0,24,189,1,0,0,0,26,191,1,0,0,0,28,228,1,0,0,0,30,230,1,0,0,0,32,255,
1,0,0,0,34,257,1,0,0,0,36,270,1,0,0,0,38,275,1,0,0,0,40,304,1,0,0,0,42,306,
1,0,0,0,44,330,1,0,0,0,46,332,1,0,0,0,48,352,1,0,0,0,50,354,1,0,0,0,52,374,
1,0,0,0,54,376,1,0,0,0,56,388,1,0,0,0,58,404,1,0,0,0,60,406,1,0,0,0,62,414,
1,0,0,0,64,65,3,2,1,0,65,69,3,4,2,0,66,68,3,12,6,0,67,66,1,0,0,0,68,71,1,
0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,69,1,0,0,0,72,73,5,0,
0,1,73,1,1,0,0,0,74,75,5,1,0,0,75,76,5,26,0,0,76,77,5,2,0,0,77,3,1,0,0,0,
78,79,5,3,0,0,79,83,5,4,0,0,80,82,3,6,3,0,81,80,1,0,0,0,82,85,1,0,0,0,83,
81,1,0,0,0,83,84,1,0,0,0,84,86,1,0,0,0,85,83,1,0,0,0,86,87,5,5,0,0,87,5,
1,0,0,0,88,89,5,6,0,0,89,90,5,26,0,0,90,94,5,4,0,0,91,93,3,8,4,0,92,91,1,
0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,97,1,0,0,0,96,94,1,0,
0,0,97,98,5,5,0,0,98,7,1,0,0,0,99,100,5,25,0,0,100,101,5,7,0,0,101,102,3,
10,5,0,102,103,5,2,0,0,103,109,1,0,0,0,104,105,5,25,0,0,105,106,5,7,0,0,
106,107,5,24,0,0,107,109,5,2,0,0,108,99,1,0,0,0,108,104,1,0,0,0,109,9,1,
0,0,0,110,115,5,25,0,0,111,112,5,8,0,0,112,114,5,25,0,0,113,111,1,0,0,0,
114,117,1,0,0,0,115,113,1,0,0,0,115,116,1,0,0,0,116,11,1,0,0,0,117,115,1,
0,0,0,118,119,5,9,0,0,119,120,5,25,0,0,120,124,5,4,0,0,121,123,3,14,7,0,
122,121,1,0,0,0,123,126,1,0,0,0,124,122,1,0,0,0,124,125,1,0,0,0,125,127,
1,0,0,0,126,124,1,0,0,0,127,128,5,5,0,0,128,13,1,0,0,0,129,130,5,25,0,0,
130,131,5,7,0,0,131,132,3,10,5,0,132,133,5,2,0,0,133,136,1,0,0,0,134,136,
3,16,8,0,135,129,1,0,0,0,135,134,1,0,0,0,136,15,1,0,0,0,137,138,5,10,0,0,
138,139,5,25,0,0,139,143,5,4,0,0,140,142,3,18,9,0,141,140,1,0,0,0,142,145,
1,0,0,0,143,141,1,0,0,0,143,144,1,0,0,0,144,146,1,0,0,0,145,143,1,0,0,0,
146,147,5,5,0,0,147,17,1,0,0,0,148,149,5,25,0,0,149,150,5,7,0,0,150,151,
5,26,0,0,151,154,5,2,0,0,152,154,3,20,10,0,153,148,1,0,0,0,153,152,1,0,0,
0,154,19,1,0,0,0,155,162,3,22,11,0,156,162,3,26,13,0,157,162,3,30,15,0,158,
162,3,34,17,0,159,162,3,38,19,0,160,162,3,42,21,0,161,155,1,0,0,0,161,156,
1,0,0,0,161,157,1,0,0,0,161,158,1,0,0,0,161,159,1,0,0,0,161,160,1,0,0,0,
162,21,1,0,0,0,163,165,5,11,0,0,164,166,5,25,0,0,165,164,1,0,0,0,165,166,
1,0,0,0,166,167,1,0,0,0,167,171,5,4,0,0,168,170,3,24,12,0,169,168,1,0,0,
0,170,173,1,0,0,0,171,169,1,0,0,0,171,172,1,0,0,0,172,174,1,0,0,0,173,171,
1,0,0,0,174,175,5,5,0,0,175,23,1,0,0,0,176,177,5,25,0,0,177,178,5,7,0,0,
178,179,3,62,31,0,179,180,5,2,0,0,180,190,1,0,0,0,181,182,5,25,0,0,182,183,
5,7,0,0,183,184,3,10,5,0,184,185,5,2,0,0,185,190,1,0,0,0,186,190,3,46,23,
0,187,190,3,50,25,0,188,190,3,54,27,0,189,176,1,0,0,0,189,181,1,0,0,0,189,
186,1,0,0,0,189,187,1,0,0,0,189,188,1,0,0,0,190,25,1,0,0,0,191,193,5,12,
0,0,192,194,5,25,0,0,193,192,1,0,0,0,193,194,1,0,0,0,194,195,1,0,0,0,195,
199,5,4,0,0,196,198,3,28,14,0,197,196,1,0,0,0,198,201,1,0,0,0,199,197,1,
0,0,0,199,200,1,0,0,0,200,202,1,0,0,0,201,199,1,0,0,0,202,203,5,5,0,0,203,
27,1,0,0,0,204,205,5,25,0,0,205,206,5,7,0,0,206,207,3,62,31,0,207,208,5,
2,0,0,208,229,1,0,0,0,209,210,5,25,0,0,210,211,5,7,0,0,211,212,3,10,5,0,
212,213,5,2,0,0,213,229,1,0,0,0,214,215,5,25,0,0,215,216,5,7,0,0,216,217,
3,58,29,0,217,218,5,2,0,0,218,229,1,0,0,0,219,220,5,13,0,0,220,221,5,25,
0,0,221,222,5,4,0,0,222,223,5,25,0,0,223,224,5,7,0,0,224,225,3,62,31,0,225,
226,5,2,0,0,226,227,5,5,0,0,227,229,1,0,0,0,228,204,1,0,0,0,228,209,1,0,
0,0,228,214,1,0,0,0,228,219,1,0,0,0,229,29,1,0,0,0,230,232,5,14,0,0,231,
233,5,25,0,0,232,231,1,0,0,0,232,233,1,0,0,0,233,234,1,0,0,0,234,238,5,4,
0,0,235,237,3,32,16,0,236,235,1,0,0,0,237,240,1,0,0,0,238,236,1,0,0,0,238,
239,1,0,0,0,239,241,1,0,0,0,240,238,1,0,0,0,241,242,5,5,0,0,242,31,1,0,0,
0,243,244,5,25,0,0,244,245,5,7,0,0,245,246,3,62,31,0,246,247,5,2,0,0,247,
256,1,0,0,0,248,249,5,25,0,0,249,250,5,7,0,0,250,251,3,10,5,0,251,252,5,
2,0,0,252,256,1,0,0,0,253,256,3,50,25,0,254,256,3,54,27,0,255,243,1,0,0,
0,255,248,1,0,0,0,255,253,1,0,0,0,255,254,1,0,0,0,256,33,1,0,0,0,257,259,
5,15,0,0,258,260,5,25,0,0,259,258,1,0,0,0,259,260,1,0,0,0,260,261,1,0,0,
0,261,265,5,4,0,0,262,264,3,36,18,0,263,262,1,0,0,0,264,267,1,0,0,0,265,
263,1,0,0,0,265,266,1,0,0,0,266,268,1,0,0,0,267,265,1,0,0,0,268,269,5,5,
0,0,269,35,1,0,0,0,270,271,5,25,0,0,271,272,5,7,0,0,272,273,3,60,30,0,273,
274,5,2,0,0,274,37,1,0,0,0,275,277,5,16,0,0,276,278,5,25,0,0,277,276,1,0,
0,0,277,278,1,0,0,0,278,279,1,0,0,0,279,283,5,4,0,0,280,282,3,40,20,0,281,
280,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,284,286,1,0,
0,0,285,283,1,0,0,0,286,287,5,5,0,0,287,39,1,0,0,0,288,289,5,25,0,0,289,
290,5,7,0,0,290,291,3,62,31,0,291,292,5,2,0,0,292,305,1,0,0,0,293,294,5,
25,0,0,294,295,5,7,0,0,295,296,5,25,0,0,296,305,5,2,0,0,297,298,5,25,0,0,
298,299,5,7,0,0,299,300,3,10,5,0,300,301,5,2,0,0,301,305,1,0,0,0,302,305,
3,46,23,0,303,305,3,54,27,0,304,288,1,0,0,0,304,293,1,0,0,0,304,297,1,0,
0,0,304,302,1,0,0,0,304,303,1,0,0,0,305,41,1,0,0,0,306,308,5,17,0,0,307,
309,5,25,0,0,308,307,1,0,0,0,308,309,1,0,0,0,309,310,1,0,0,0,310,314,5,4,
0,0,311,313,3,44,22,0,312,311,1,0,0,0,313,316,1,0,0,0,314,312,1,0,0,0,314,
315,1,0,0,0,315,317,1,0,0,0,316,314,1,0,0,0,317,318,5,5,0,0,318,43,1,0,0,
0,319,320,5,25,0,0,320,321,5,7,0,0,321,322,3,62,31,0,322,323,5,2,0,0,323,
331,1,0,0,0,324,325,5,25,0,0,325,326,5,7,0,0,326,327,5,25,0,0,327,331,5,
2,0,0,328,331,3,46,23,0,329,331,3,54,27,0,330,319,1,0,0,0,330,324,1,0,0,
0,330,328,1,0,0,0,330,329,1,0,0,0,331,45,1,0,0,0,332,333,5,18,0,0,333,337,
5,4,0,0,334,336,3,48,24,0,335,334,1,0,0,0,336,339,1,0,0,0,337,335,1,0,0,
0,337,338,1,0,0,0,338,340,1,0,0,0,339,337,1,0,0,0,340,341,5,5,0,0,341,47,
1,0,0,0,342,343,5,25,0,0,343,344,5,7,0,0,344,345,3,62,31,0,345,346,5,2,0,
0,346,353,1,0,0,0,347,348,5,25,0,0,348,349,5,7,0,0,349,350,3,10,5,0,350,
351,5,2,0,0,351,353,1,0,0,0,352,342,1,0,0,0,352,347,1,0,0,0,353,49,1,0,0,
0,354,355,5,19,0,0,355,359,5,4,0,0,356,358,3,52,26,0,357,356,1,0,0,0,358,
361,1,0,0,0,359,357,1,0,0,0,359,360,1,0,0,0,360,362,1,0,0,0,361,359,1,0,
0,0,362,363,5,5,0,0,363,51,1,0,0,0,364,365,5,25,0,0,365,366,5,7,0,0,366,
367,3,62,31,0,367,368,5,2,0,0,368,375,1,0,0,0,369,370,5,25,0,0,370,371,5,
7,0,0,371,372,3,10,5,0,372,373,5,2,0,0,373,375,1,0,0,0,374,364,1,0,0,0,374,
369,1,0,0,0,375,53,1,0,0,0,376,377,5,25,0,0,377,378,5,7,0,0,378,383,3,56,
28,0,379,380,5,8,0,0,380,382,3,56,28,0,381,379,1,0,0,0,382,385,1,0,0,0,383,
381,1,0,0,0,383,384,1,0,0,0,384,386,1,0,0,0,385,383,1,0,0,0,386,387,5,2,
0,0,387,55,1,0,0,0,388,389,3,62,31,0,389,397,5,26,0,0,390,391,5,4,0,0,391,
392,5,25,0,0,392,393,5,7,0,0,393,394,3,58,29,0,394,395,5,2,0,0,395,396,5,
5,0,0,396,398,1,0,0,0,397,390,1,0,0,0,397,398,1,0,0,0,398,57,1,0,0,0,399,
405,5,20,0,0,400,401,5,21,0,0,401,405,5,26,0,0,402,403,5,22,0,0,403,405,
5,26,0,0,404,399,1,0,0,0,404,400,1,0,0,0,404,402,1,0,0,0,405,59,1,0,0,0,
406,411,3,62,31,0,407,408,5,8,0,0,408,410,3,62,31,0,409,407,1,0,0,0,410,
413,1,0,0,0,411,409,1,0,0,0,411,412,1,0,0,0,412,61,1,0,0,0,413,411,1,0,0,
0,414,417,5,25,0,0,415,416,5,23,0,0,416,418,5,25,0,0,417,415,1,0,0,0,418,
419,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,63,1,0,0,0,36,69,83,94,108,
115,124,135,143,153,161,165,171,189,193,199,228,232,238,255,259,265,277,
283,304,308,314,330,337,352,359,374,383,397,404,411,419];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class HospitalViewsParser extends antlr4.Parser {

    static grammarFileName = "HospitalViews.g4";
    static literalNames = [ null, "'import'", "';'", "'LoginGroups'", "'{'", 
                            "'}'", "'Group'", "':'", "','", "'Portal'", 
                            "'Page'", "'Table'", "'Form'", "'Field'", "'Detail'", 
                            "'MetricGrid'", "'Kanban'", "'Calendar'", "'View'", 
                            "'Edit'", "'refresh'", "'toast'", "'navigate'", 
                            "'.'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             "BOOLEAN_LITERAL", "ID", "STRING", "WS", "COMMENT" ];
    static ruleNames = [ "viewsFile", "importDecl", "loginGroupsDecl", "groupDecl", 
                         "groupItem", "idList", "portalDecl", "portalItem", 
                         "pageDecl", "pageItem", "containerDecl", "tableDecl", 
                         "tableItem", "formDecl", "formItem", "detailDecl", 
                         "detailItem", "metricGridDecl", "metricGridItem", 
                         "kanbanDecl", "kanbanItem", "calendarDecl", "calendarItem", 
                         "viewBlock", "viewItem", "editBlock", "editItem", 
                         "actionsDecl", "actionItem", "successAction", "authExprList", 
                         "authExpr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = HospitalViewsParser.ruleNames;
        this.literalNames = HospitalViewsParser.literalNames;
        this.symbolicNames = HospitalViewsParser.symbolicNames;
    }



	viewsFile() {
	    let localctx = new ViewsFileContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, HospitalViewsParser.RULE_viewsFile);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 64;
	        this.importDecl();
	        this.state = 65;
	        this.loginGroupsDecl();
	        this.state = 69;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===9) {
	            this.state = 66;
	            this.portalDecl();
	            this.state = 71;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 72;
	        this.match(HospitalViewsParser.EOF);
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



	importDecl() {
	    let localctx = new ImportDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, HospitalViewsParser.RULE_importDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 74;
	        this.match(HospitalViewsParser.T__0);
	        this.state = 75;
	        this.match(HospitalViewsParser.STRING);
	        this.state = 76;
	        this.match(HospitalViewsParser.T__1);
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



	loginGroupsDecl() {
	    let localctx = new LoginGroupsDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, HospitalViewsParser.RULE_loginGroupsDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 78;
	        this.match(HospitalViewsParser.T__2);
	        this.state = 79;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 83;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===6) {
	            this.state = 80;
	            this.groupDecl();
	            this.state = 85;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 86;
	        this.match(HospitalViewsParser.T__4);
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



	groupDecl() {
	    let localctx = new GroupDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, HospitalViewsParser.RULE_groupDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 88;
	        this.match(HospitalViewsParser.T__5);
	        this.state = 89;
	        this.match(HospitalViewsParser.STRING);
	        this.state = 90;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 94;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===25) {
	            this.state = 91;
	            this.groupItem();
	            this.state = 96;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 97;
	        this.match(HospitalViewsParser.T__4);
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



	groupItem() {
	    let localctx = new GroupItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, HospitalViewsParser.RULE_groupItem);
	    try {
	        this.state = 108;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 99;
	            this.match(HospitalViewsParser.ID);
	            this.state = 100;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 101;
	            this.idList();
	            this.state = 102;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 104;
	            this.match(HospitalViewsParser.ID);
	            this.state = 105;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 106;
	            this.match(HospitalViewsParser.BOOLEAN_LITERAL);
	            this.state = 107;
	            this.match(HospitalViewsParser.T__1);
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



	idList() {
	    let localctx = new IdListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, HospitalViewsParser.RULE_idList);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 110;
	        this.match(HospitalViewsParser.ID);
	        this.state = 115;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===8) {
	            this.state = 111;
	            this.match(HospitalViewsParser.T__7);
	            this.state = 112;
	            this.match(HospitalViewsParser.ID);
	            this.state = 117;
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



	portalDecl() {
	    let localctx = new PortalDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, HospitalViewsParser.RULE_portalDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 118;
	        this.match(HospitalViewsParser.T__8);
	        this.state = 119;
	        this.match(HospitalViewsParser.ID);
	        this.state = 120;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 124;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===10 || _la===25) {
	            this.state = 121;
	            this.portalItem();
	            this.state = 126;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 127;
	        this.match(HospitalViewsParser.T__4);
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



	portalItem() {
	    let localctx = new PortalItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, HospitalViewsParser.RULE_portalItem);
	    try {
	        this.state = 135;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 25:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 129;
	            this.match(HospitalViewsParser.ID);
	            this.state = 130;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 131;
	            this.idList();
	            this.state = 132;
	            this.match(HospitalViewsParser.T__1);
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 134;
	            this.pageDecl();
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



	pageDecl() {
	    let localctx = new PageDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, HospitalViewsParser.RULE_pageDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 137;
	        this.match(HospitalViewsParser.T__9);
	        this.state = 138;
	        this.match(HospitalViewsParser.ID);
	        this.state = 139;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 143;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 33806336) !== 0)) {
	            this.state = 140;
	            this.pageItem();
	            this.state = 145;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 146;
	        this.match(HospitalViewsParser.T__4);
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



	pageItem() {
	    let localctx = new PageItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, HospitalViewsParser.RULE_pageItem);
	    try {
	        this.state = 153;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 25:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 148;
	            this.match(HospitalViewsParser.ID);
	            this.state = 149;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 150;
	            this.match(HospitalViewsParser.STRING);
	            this.state = 151;
	            this.match(HospitalViewsParser.T__1);
	            break;
	        case 11:
	        case 12:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 152;
	            this.containerDecl();
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



	containerDecl() {
	    let localctx = new ContainerDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, HospitalViewsParser.RULE_containerDecl);
	    try {
	        this.state = 161;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 155;
	            this.tableDecl();
	            break;
	        case 12:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 156;
	            this.formDecl();
	            break;
	        case 14:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 157;
	            this.detailDecl();
	            break;
	        case 15:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 158;
	            this.metricGridDecl();
	            break;
	        case 16:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 159;
	            this.kanbanDecl();
	            break;
	        case 17:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 160;
	            this.calendarDecl();
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



	tableDecl() {
	    let localctx = new TableDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, HospitalViewsParser.RULE_tableDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 163;
	        this.match(HospitalViewsParser.T__10);
	        this.state = 165;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 164;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 167;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 171;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 34340864) !== 0)) {
	            this.state = 168;
	            this.tableItem();
	            this.state = 173;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 174;
	        this.match(HospitalViewsParser.T__4);
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



	tableItem() {
	    let localctx = new TableItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, HospitalViewsParser.RULE_tableItem);
	    try {
	        this.state = 189;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 176;
	            this.match(HospitalViewsParser.ID);
	            this.state = 177;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 178;
	            this.authExpr();
	            this.state = 179;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 181;
	            this.match(HospitalViewsParser.ID);
	            this.state = 182;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 183;
	            this.idList();
	            this.state = 184;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 186;
	            this.viewBlock();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 187;
	            this.editBlock();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 188;
	            this.actionsDecl();
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



	formDecl() {
	    let localctx = new FormDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, HospitalViewsParser.RULE_formDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
	        this.match(HospitalViewsParser.T__11);
	        this.state = 193;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 192;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 195;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 199;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===13 || _la===25) {
	            this.state = 196;
	            this.formItem();
	            this.state = 201;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 202;
	        this.match(HospitalViewsParser.T__4);
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



	formItem() {
	    let localctx = new FormItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, HospitalViewsParser.RULE_formItem);
	    try {
	        this.state = 228;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 204;
	            this.match(HospitalViewsParser.ID);
	            this.state = 205;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 206;
	            this.authExpr();
	            this.state = 207;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 209;
	            this.match(HospitalViewsParser.ID);
	            this.state = 210;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 211;
	            this.idList();
	            this.state = 212;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 214;
	            this.match(HospitalViewsParser.ID);
	            this.state = 215;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 216;
	            this.successAction();
	            this.state = 217;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 219;
	            this.match(HospitalViewsParser.T__12);
	            this.state = 220;
	            this.match(HospitalViewsParser.ID);
	            this.state = 221;
	            this.match(HospitalViewsParser.T__3);
	            this.state = 222;
	            this.match(HospitalViewsParser.ID);
	            this.state = 223;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 224;
	            this.authExpr();
	            this.state = 225;
	            this.match(HospitalViewsParser.T__1);
	            this.state = 226;
	            this.match(HospitalViewsParser.T__4);
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



	detailDecl() {
	    let localctx = new DetailDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, HospitalViewsParser.RULE_detailDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 230;
	        this.match(HospitalViewsParser.T__13);
	        this.state = 232;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 231;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 234;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 238;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===19 || _la===25) {
	            this.state = 235;
	            this.detailItem();
	            this.state = 240;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 241;
	        this.match(HospitalViewsParser.T__4);
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



	detailItem() {
	    let localctx = new DetailItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, HospitalViewsParser.RULE_detailItem);
	    try {
	        this.state = 255;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 243;
	            this.match(HospitalViewsParser.ID);
	            this.state = 244;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 245;
	            this.authExpr();
	            this.state = 246;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 248;
	            this.match(HospitalViewsParser.ID);
	            this.state = 249;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 250;
	            this.idList();
	            this.state = 251;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 253;
	            this.editBlock();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 254;
	            this.actionsDecl();
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



	metricGridDecl() {
	    let localctx = new MetricGridDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, HospitalViewsParser.RULE_metricGridDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 257;
	        this.match(HospitalViewsParser.T__14);
	        this.state = 259;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 258;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 261;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 265;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===25) {
	            this.state = 262;
	            this.metricGridItem();
	            this.state = 267;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 268;
	        this.match(HospitalViewsParser.T__4);
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



	metricGridItem() {
	    let localctx = new MetricGridItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, HospitalViewsParser.RULE_metricGridItem);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 270;
	        this.match(HospitalViewsParser.ID);
	        this.state = 271;
	        this.match(HospitalViewsParser.T__6);
	        this.state = 272;
	        this.authExprList();
	        this.state = 273;
	        this.match(HospitalViewsParser.T__1);
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



	kanbanDecl() {
	    let localctx = new KanbanDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, HospitalViewsParser.RULE_kanbanDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 275;
	        this.match(HospitalViewsParser.T__15);
	        this.state = 277;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 276;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 279;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 283;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===18 || _la===25) {
	            this.state = 280;
	            this.kanbanItem();
	            this.state = 285;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 286;
	        this.match(HospitalViewsParser.T__4);
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



	kanbanItem() {
	    let localctx = new KanbanItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, HospitalViewsParser.RULE_kanbanItem);
	    try {
	        this.state = 304;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 288;
	            this.match(HospitalViewsParser.ID);
	            this.state = 289;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 290;
	            this.authExpr();
	            this.state = 291;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 293;
	            this.match(HospitalViewsParser.ID);
	            this.state = 294;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 295;
	            this.match(HospitalViewsParser.ID);
	            this.state = 296;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 297;
	            this.match(HospitalViewsParser.ID);
	            this.state = 298;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 299;
	            this.idList();
	            this.state = 300;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 302;
	            this.viewBlock();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 303;
	            this.actionsDecl();
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



	calendarDecl() {
	    let localctx = new CalendarDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, HospitalViewsParser.RULE_calendarDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 306;
	        this.match(HospitalViewsParser.T__16);
	        this.state = 308;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===25) {
	            this.state = 307;
	            this.match(HospitalViewsParser.ID);
	        }

	        this.state = 310;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 314;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===18 || _la===25) {
	            this.state = 311;
	            this.calendarItem();
	            this.state = 316;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 317;
	        this.match(HospitalViewsParser.T__4);
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



	calendarItem() {
	    let localctx = new CalendarItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, HospitalViewsParser.RULE_calendarItem);
	    try {
	        this.state = 330;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,26,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 319;
	            this.match(HospitalViewsParser.ID);
	            this.state = 320;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 321;
	            this.authExpr();
	            this.state = 322;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 324;
	            this.match(HospitalViewsParser.ID);
	            this.state = 325;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 326;
	            this.match(HospitalViewsParser.ID);
	            this.state = 327;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 328;
	            this.viewBlock();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 329;
	            this.actionsDecl();
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



	viewBlock() {
	    let localctx = new ViewBlockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, HospitalViewsParser.RULE_viewBlock);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 332;
	        this.match(HospitalViewsParser.T__17);
	        this.state = 333;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 337;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===25) {
	            this.state = 334;
	            this.viewItem();
	            this.state = 339;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 340;
	        this.match(HospitalViewsParser.T__4);
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



	viewItem() {
	    let localctx = new ViewItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, HospitalViewsParser.RULE_viewItem);
	    try {
	        this.state = 352;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,28,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 342;
	            this.match(HospitalViewsParser.ID);
	            this.state = 343;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 344;
	            this.authExpr();
	            this.state = 345;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 347;
	            this.match(HospitalViewsParser.ID);
	            this.state = 348;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 349;
	            this.idList();
	            this.state = 350;
	            this.match(HospitalViewsParser.T__1);
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



	editBlock() {
	    let localctx = new EditBlockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, HospitalViewsParser.RULE_editBlock);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 354;
	        this.match(HospitalViewsParser.T__18);
	        this.state = 355;
	        this.match(HospitalViewsParser.T__3);
	        this.state = 359;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===25) {
	            this.state = 356;
	            this.editItem();
	            this.state = 361;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 362;
	        this.match(HospitalViewsParser.T__4);
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



	editItem() {
	    let localctx = new EditItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 52, HospitalViewsParser.RULE_editItem);
	    try {
	        this.state = 374;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 364;
	            this.match(HospitalViewsParser.ID);
	            this.state = 365;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 366;
	            this.authExpr();
	            this.state = 367;
	            this.match(HospitalViewsParser.T__1);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 369;
	            this.match(HospitalViewsParser.ID);
	            this.state = 370;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 371;
	            this.idList();
	            this.state = 372;
	            this.match(HospitalViewsParser.T__1);
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



	actionsDecl() {
	    let localctx = new ActionsDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, HospitalViewsParser.RULE_actionsDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 376;
	        this.match(HospitalViewsParser.ID);
	        this.state = 377;
	        this.match(HospitalViewsParser.T__6);
	        this.state = 378;
	        this.actionItem();
	        this.state = 383;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===8) {
	            this.state = 379;
	            this.match(HospitalViewsParser.T__7);
	            this.state = 380;
	            this.actionItem();
	            this.state = 385;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 386;
	        this.match(HospitalViewsParser.T__1);
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



	actionItem() {
	    let localctx = new ActionItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 56, HospitalViewsParser.RULE_actionItem);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 388;
	        this.authExpr();
	        this.state = 389;
	        this.match(HospitalViewsParser.STRING);
	        this.state = 397;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===4) {
	            this.state = 390;
	            this.match(HospitalViewsParser.T__3);
	            this.state = 391;
	            this.match(HospitalViewsParser.ID);
	            this.state = 392;
	            this.match(HospitalViewsParser.T__6);
	            this.state = 393;
	            this.successAction();
	            this.state = 394;
	            this.match(HospitalViewsParser.T__1);
	            this.state = 395;
	            this.match(HospitalViewsParser.T__4);
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



	successAction() {
	    let localctx = new SuccessActionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 58, HospitalViewsParser.RULE_successAction);
	    try {
	        this.state = 404;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 20:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 399;
	            this.match(HospitalViewsParser.T__19);
	            break;
	        case 21:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 400;
	            this.match(HospitalViewsParser.T__20);
	            this.state = 401;
	            this.match(HospitalViewsParser.STRING);
	            break;
	        case 22:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 402;
	            this.match(HospitalViewsParser.T__21);
	            this.state = 403;
	            this.match(HospitalViewsParser.STRING);
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



	authExprList() {
	    let localctx = new AuthExprListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 60, HospitalViewsParser.RULE_authExprList);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 406;
	        this.authExpr();
	        this.state = 411;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===8) {
	            this.state = 407;
	            this.match(HospitalViewsParser.T__7);
	            this.state = 408;
	            this.authExpr();
	            this.state = 413;
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



	authExpr() {
	    let localctx = new AuthExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 62, HospitalViewsParser.RULE_authExpr);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 414;
	        this.match(HospitalViewsParser.ID);
	        this.state = 417; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 415;
	            this.match(HospitalViewsParser.T__22);
	            this.state = 416;
	            this.match(HospitalViewsParser.ID);
	            this.state = 419; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===23);
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

HospitalViewsParser.EOF = antlr4.Token.EOF;
HospitalViewsParser.T__0 = 1;
HospitalViewsParser.T__1 = 2;
HospitalViewsParser.T__2 = 3;
HospitalViewsParser.T__3 = 4;
HospitalViewsParser.T__4 = 5;
HospitalViewsParser.T__5 = 6;
HospitalViewsParser.T__6 = 7;
HospitalViewsParser.T__7 = 8;
HospitalViewsParser.T__8 = 9;
HospitalViewsParser.T__9 = 10;
HospitalViewsParser.T__10 = 11;
HospitalViewsParser.T__11 = 12;
HospitalViewsParser.T__12 = 13;
HospitalViewsParser.T__13 = 14;
HospitalViewsParser.T__14 = 15;
HospitalViewsParser.T__15 = 16;
HospitalViewsParser.T__16 = 17;
HospitalViewsParser.T__17 = 18;
HospitalViewsParser.T__18 = 19;
HospitalViewsParser.T__19 = 20;
HospitalViewsParser.T__20 = 21;
HospitalViewsParser.T__21 = 22;
HospitalViewsParser.T__22 = 23;
HospitalViewsParser.BOOLEAN_LITERAL = 24;
HospitalViewsParser.ID = 25;
HospitalViewsParser.STRING = 26;
HospitalViewsParser.WS = 27;
HospitalViewsParser.COMMENT = 28;

HospitalViewsParser.RULE_viewsFile = 0;
HospitalViewsParser.RULE_importDecl = 1;
HospitalViewsParser.RULE_loginGroupsDecl = 2;
HospitalViewsParser.RULE_groupDecl = 3;
HospitalViewsParser.RULE_groupItem = 4;
HospitalViewsParser.RULE_idList = 5;
HospitalViewsParser.RULE_portalDecl = 6;
HospitalViewsParser.RULE_portalItem = 7;
HospitalViewsParser.RULE_pageDecl = 8;
HospitalViewsParser.RULE_pageItem = 9;
HospitalViewsParser.RULE_containerDecl = 10;
HospitalViewsParser.RULE_tableDecl = 11;
HospitalViewsParser.RULE_tableItem = 12;
HospitalViewsParser.RULE_formDecl = 13;
HospitalViewsParser.RULE_formItem = 14;
HospitalViewsParser.RULE_detailDecl = 15;
HospitalViewsParser.RULE_detailItem = 16;
HospitalViewsParser.RULE_metricGridDecl = 17;
HospitalViewsParser.RULE_metricGridItem = 18;
HospitalViewsParser.RULE_kanbanDecl = 19;
HospitalViewsParser.RULE_kanbanItem = 20;
HospitalViewsParser.RULE_calendarDecl = 21;
HospitalViewsParser.RULE_calendarItem = 22;
HospitalViewsParser.RULE_viewBlock = 23;
HospitalViewsParser.RULE_viewItem = 24;
HospitalViewsParser.RULE_editBlock = 25;
HospitalViewsParser.RULE_editItem = 26;
HospitalViewsParser.RULE_actionsDecl = 27;
HospitalViewsParser.RULE_actionItem = 28;
HospitalViewsParser.RULE_successAction = 29;
HospitalViewsParser.RULE_authExprList = 30;
HospitalViewsParser.RULE_authExpr = 31;

class ViewsFileContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_viewsFile;
    }

	importDecl() {
	    return this.getTypedRuleContext(ImportDeclContext,0);
	};

	loginGroupsDecl() {
	    return this.getTypedRuleContext(LoginGroupsDeclContext,0);
	};

	EOF() {
	    return this.getToken(HospitalViewsParser.EOF, 0);
	};

	portalDecl = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PortalDeclContext);
	    } else {
	        return this.getTypedRuleContext(PortalDeclContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterViewsFile(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitViewsFile(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitViewsFile(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ImportDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_importDecl;
    }

	STRING() {
	    return this.getToken(HospitalViewsParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterImportDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitImportDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitImportDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LoginGroupsDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_loginGroupsDecl;
    }

	groupDecl = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(GroupDeclContext);
	    } else {
	        return this.getTypedRuleContext(GroupDeclContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterLoginGroupsDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitLoginGroupsDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitLoginGroupsDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GroupDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_groupDecl;
    }

	STRING() {
	    return this.getToken(HospitalViewsParser.STRING, 0);
	};

	groupItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(GroupItemContext);
	    } else {
	        return this.getTypedRuleContext(GroupItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterGroupDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitGroupDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitGroupDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GroupItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_groupItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	BOOLEAN_LITERAL() {
	    return this.getToken(HospitalViewsParser.BOOLEAN_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterGroupItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitGroupItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitGroupItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IdListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_idList;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalViewsParser.ID);
	    } else {
	        return this.getToken(HospitalViewsParser.ID, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterIdList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitIdList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitIdList(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PortalDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_portalDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	portalItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PortalItemContext);
	    } else {
	        return this.getTypedRuleContext(PortalItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterPortalDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitPortalDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitPortalDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PortalItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_portalItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	pageDecl() {
	    return this.getTypedRuleContext(PageDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterPortalItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitPortalItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitPortalItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PageDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_pageDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	pageItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PageItemContext);
	    } else {
	        return this.getTypedRuleContext(PageItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterPageDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitPageDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitPageDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PageItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_pageItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	STRING() {
	    return this.getToken(HospitalViewsParser.STRING, 0);
	};

	containerDecl() {
	    return this.getTypedRuleContext(ContainerDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterPageItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitPageItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitPageItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ContainerDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_containerDecl;
    }

	tableDecl() {
	    return this.getTypedRuleContext(TableDeclContext,0);
	};

	formDecl() {
	    return this.getTypedRuleContext(FormDeclContext,0);
	};

	detailDecl() {
	    return this.getTypedRuleContext(DetailDeclContext,0);
	};

	metricGridDecl() {
	    return this.getTypedRuleContext(MetricGridDeclContext,0);
	};

	kanbanDecl() {
	    return this.getTypedRuleContext(KanbanDeclContext,0);
	};

	calendarDecl() {
	    return this.getTypedRuleContext(CalendarDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterContainerDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitContainerDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitContainerDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TableDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_tableDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	tableItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TableItemContext);
	    } else {
	        return this.getTypedRuleContext(TableItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterTableDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitTableDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitTableDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TableItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_tableItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	viewBlock() {
	    return this.getTypedRuleContext(ViewBlockContext,0);
	};

	editBlock() {
	    return this.getTypedRuleContext(EditBlockContext,0);
	};

	actionsDecl() {
	    return this.getTypedRuleContext(ActionsDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterTableItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitTableItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitTableItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FormDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_formDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	formItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FormItemContext);
	    } else {
	        return this.getTypedRuleContext(FormItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterFormDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitFormDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitFormDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FormItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_formItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalViewsParser.ID);
	    } else {
	        return this.getToken(HospitalViewsParser.ID, i);
	    }
	};


	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	successAction() {
	    return this.getTypedRuleContext(SuccessActionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterFormItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitFormItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitFormItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DetailDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_detailDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	detailItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DetailItemContext);
	    } else {
	        return this.getTypedRuleContext(DetailItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterDetailDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitDetailDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitDetailDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DetailItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_detailItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	editBlock() {
	    return this.getTypedRuleContext(EditBlockContext,0);
	};

	actionsDecl() {
	    return this.getTypedRuleContext(ActionsDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterDetailItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitDetailItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitDetailItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class MetricGridDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_metricGridDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	metricGridItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(MetricGridItemContext);
	    } else {
	        return this.getTypedRuleContext(MetricGridItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterMetricGridDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitMetricGridDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitMetricGridDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class MetricGridItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_metricGridItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	authExprList() {
	    return this.getTypedRuleContext(AuthExprListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterMetricGridItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitMetricGridItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitMetricGridItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class KanbanDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_kanbanDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	kanbanItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(KanbanItemContext);
	    } else {
	        return this.getTypedRuleContext(KanbanItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterKanbanDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitKanbanDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitKanbanDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class KanbanItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_kanbanItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalViewsParser.ID);
	    } else {
	        return this.getToken(HospitalViewsParser.ID, i);
	    }
	};


	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	viewBlock() {
	    return this.getTypedRuleContext(ViewBlockContext,0);
	};

	actionsDecl() {
	    return this.getTypedRuleContext(ActionsDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterKanbanItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitKanbanItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitKanbanItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CalendarDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_calendarDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	calendarItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CalendarItemContext);
	    } else {
	        return this.getTypedRuleContext(CalendarItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterCalendarDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitCalendarDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitCalendarDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CalendarItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_calendarItem;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalViewsParser.ID);
	    } else {
	        return this.getToken(HospitalViewsParser.ID, i);
	    }
	};


	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	viewBlock() {
	    return this.getTypedRuleContext(ViewBlockContext,0);
	};

	actionsDecl() {
	    return this.getTypedRuleContext(ActionsDeclContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterCalendarItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitCalendarItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitCalendarItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ViewBlockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_viewBlock;
    }

	viewItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ViewItemContext);
	    } else {
	        return this.getTypedRuleContext(ViewItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterViewBlock(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitViewBlock(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitViewBlock(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ViewItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_viewItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterViewItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitViewItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitViewItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class EditBlockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_editBlock;
    }

	editItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(EditItemContext);
	    } else {
	        return this.getTypedRuleContext(EditItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterEditBlock(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitEditBlock(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitEditBlock(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class EditItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_editItem;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	idList() {
	    return this.getTypedRuleContext(IdListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterEditItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitEditItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitEditItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ActionsDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_actionsDecl;
    }

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	actionItem = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ActionItemContext);
	    } else {
	        return this.getTypedRuleContext(ActionItemContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterActionsDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitActionsDecl(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitActionsDecl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ActionItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_actionItem;
    }

	authExpr() {
	    return this.getTypedRuleContext(AuthExprContext,0);
	};

	STRING() {
	    return this.getToken(HospitalViewsParser.STRING, 0);
	};

	ID() {
	    return this.getToken(HospitalViewsParser.ID, 0);
	};

	successAction() {
	    return this.getTypedRuleContext(SuccessActionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterActionItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitActionItem(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitActionItem(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SuccessActionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_successAction;
    }

	STRING() {
	    return this.getToken(HospitalViewsParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterSuccessAction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitSuccessAction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitSuccessAction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AuthExprListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = HospitalViewsParser.RULE_authExprList;
    }

	authExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AuthExprContext);
	    } else {
	        return this.getTypedRuleContext(AuthExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterAuthExprList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitAuthExprList(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitAuthExprList(this);
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
        this.ruleIndex = HospitalViewsParser.RULE_authExpr;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(HospitalViewsParser.ID);
	    } else {
	        return this.getToken(HospitalViewsParser.ID, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.enterAuthExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof HospitalViewsListener ) {
	        listener.exitAuthExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof HospitalViewsVisitor ) {
	        return visitor.visitAuthExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




HospitalViewsParser.ViewsFileContext = ViewsFileContext; 
HospitalViewsParser.ImportDeclContext = ImportDeclContext; 
HospitalViewsParser.LoginGroupsDeclContext = LoginGroupsDeclContext; 
HospitalViewsParser.GroupDeclContext = GroupDeclContext; 
HospitalViewsParser.GroupItemContext = GroupItemContext; 
HospitalViewsParser.IdListContext = IdListContext; 
HospitalViewsParser.PortalDeclContext = PortalDeclContext; 
HospitalViewsParser.PortalItemContext = PortalItemContext; 
HospitalViewsParser.PageDeclContext = PageDeclContext; 
HospitalViewsParser.PageItemContext = PageItemContext; 
HospitalViewsParser.ContainerDeclContext = ContainerDeclContext; 
HospitalViewsParser.TableDeclContext = TableDeclContext; 
HospitalViewsParser.TableItemContext = TableItemContext; 
HospitalViewsParser.FormDeclContext = FormDeclContext; 
HospitalViewsParser.FormItemContext = FormItemContext; 
HospitalViewsParser.DetailDeclContext = DetailDeclContext; 
HospitalViewsParser.DetailItemContext = DetailItemContext; 
HospitalViewsParser.MetricGridDeclContext = MetricGridDeclContext; 
HospitalViewsParser.MetricGridItemContext = MetricGridItemContext; 
HospitalViewsParser.KanbanDeclContext = KanbanDeclContext; 
HospitalViewsParser.KanbanItemContext = KanbanItemContext; 
HospitalViewsParser.CalendarDeclContext = CalendarDeclContext; 
HospitalViewsParser.CalendarItemContext = CalendarItemContext; 
HospitalViewsParser.ViewBlockContext = ViewBlockContext; 
HospitalViewsParser.ViewItemContext = ViewItemContext; 
HospitalViewsParser.EditBlockContext = EditBlockContext; 
HospitalViewsParser.EditItemContext = EditItemContext; 
HospitalViewsParser.ActionsDeclContext = ActionsDeclContext; 
HospitalViewsParser.ActionItemContext = ActionItemContext; 
HospitalViewsParser.SuccessActionContext = SuccessActionContext; 
HospitalViewsParser.AuthExprListContext = AuthExprListContext; 
HospitalViewsParser.AuthExprContext = AuthExprContext; 
