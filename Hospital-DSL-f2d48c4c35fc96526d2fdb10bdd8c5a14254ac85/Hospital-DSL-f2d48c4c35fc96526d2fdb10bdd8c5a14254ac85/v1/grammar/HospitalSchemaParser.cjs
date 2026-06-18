// Generated from HospitalSchema.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4');
var HospitalSchemaListener = require('./HospitalSchemaListener').HospitalSchemaListener;
var grammarFileName = "HospitalSchema.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003E\u01a4\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004",
    "\u001f\t\u001f\u0004 \t \u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0007\u0003",
    "J\n\u0003\f\u0003\u000e\u0003M\u000b\u0003\u0003\u0003\u0007\u0003P",
    "\n\u0003\f\u0003\u000e\u0003S\u000b\u0003\u0003\u0003\u0005\u0003V\n",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0005\u0007\u0005_\n\u0005\f\u0005\u000e\u0005b\u000b\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "o\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0006\u0007",
    "u\n\u0007\r\u0007\u000e\u0007v\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0005\b\u0080\n\b\u0003\b\u0007\b\u0083\n",
    "\b\f\b\u000e\b\u0086\u000b\b\u0003\b\u0003\b\u0003\t\u0003\t\u0005\t",
    "\u008c\n\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0007\n\u009d",
    "\n\n\f\n\u000e\n\u00a0\u000b\n\u0005\n\u00a2\n\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0007\u000b\u00a9\n\u000b\f\u000b",
    "\u000e\u000b\u00ac\u000b\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0006\f\u00b4\n\f\r\f\u000e\f\u00b5\u0003\f\u0003",
    "\f\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u00be\n\r\f\r\u000e\r\u00c1",
    "\u000b\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u00c9",
    "\n\r\f\r\u000e\r\u00cc\u000b\r\u0003\r\u0005\r\u00cf\n\r\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0007\u000e\u00d8\n\u000e\f\u000e\u000e\u000e\u00db\u000b\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0005\u000e\u00e4\n\u000e\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0005\u000f\u00ea\n\u000f\u0003\u000f\u0005\u000f\u00ed",
    "\n\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010",
    "\u00f3\n\u0010\f\u0010\u000e\u0010\u00f6\u000b\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0007",
    "\u0011\u0105\n\u0011\f\u0011\u000e\u0011\u0108\u000b\u0011\u0005\u0011",
    "\u010a\n\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0007\u0012\u0113\n\u0012\f\u0012\u000e",
    "\u0012\u0116\u000b\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0007\u0012\u012a\n\u0012\f\u0012\u000e\u0012",
    "\u012d\u000b\u0012\u0003\u0012\u0005\u0012\u0130\n\u0012\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0007\u0013\u0137\n",
    "\u0013\f\u0013\u000e\u0013\u013a\u000b\u0013\u0003\u0013\u0005\u0013",
    "\u013d\n\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u0147\n\u0014",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015",
    "\u014e\n\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003",
    "\u0018\u0003\u0018\u0003\u0018\u0003\u0019\u0006\u0019\u015e\n\u0019",
    "\r\u0019\u000e\u0019\u015f\u0003\u001a\u0003\u001a\u0003\u001a\u0003",
    "\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003",
    "\u001a\u0007\u001a\u016c\n\u001a\f\u001a\u000e\u001a\u016f\u000b\u001a",
    "\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0005\u001a",
    "\u0176\n\u001a\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003",
    "\u001b\u0003\u001b\u0003\u001c\u0007\u001c\u017f\n\u001c\f\u001c\u000e",
    "\u001c\u0182\u000b\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d",
    "\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001f",
    "\u0006\u001f\u018e\n\u001f\r\u001f\u000e\u001f\u018f\u0003 \u0003 \u0003",
    " \u0003 \u0003 \u0003 \u0003 \u0003 \u0003 \u0003 \u0007 \u019c\n \f",
    " \u000e \u019f\u000b \u0003 \u0005 \u01a2\n \u0003 \u0002\u0002!\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"$&(*,.02468:<>\u0002\u0005\u0004\u0002\u0014\u0015\u001e \u0003\u0002",
    "$(\u0003\u0002:>\u0002\u01c0\u0002@\u0003\u0002\u0002\u0002\u0004K\u0003",
    "\u0002\u0002\u0002\u0006W\u0003\u0002\u0002\u0002\b`\u0003\u0002\u0002",
    "\u0002\nn\u0003\u0002\u0002\u0002\fp\u0003\u0002\u0002\u0002\u000ez",
    "\u0003\u0002\u0002\u0002\u0010\u0089\u0003\u0002\u0002\u0002\u0012\u00a1",
    "\u0003\u0002\u0002\u0002\u0014\u00a3\u0003\u0002\u0002\u0002\u0016\u00b0",
    "\u0003\u0002\u0002\u0002\u0018\u00ce\u0003\u0002\u0002\u0002\u001a\u00e3",
    "\u0003\u0002\u0002\u0002\u001c\u00e5\u0003\u0002\u0002\u0002\u001e\u00ee",
    "\u0003\u0002\u0002\u0002 \u0109\u0003\u0002\u0002\u0002\"\u012f\u0003",
    "\u0002\u0002\u0002$\u013c\u0003\u0002\u0002\u0002&\u0146\u0003\u0002",
    "\u0002\u0002(\u014d\u0003\u0002\u0002\u0002*\u014f\u0003\u0002\u0002",
    "\u0002,\u0153\u0003\u0002\u0002\u0002.\u0155\u0003\u0002\u0002\u0002",
    "0\u015d\u0003\u0002\u0002\u00022\u0175\u0003\u0002\u0002\u00024\u0177",
    "\u0003\u0002\u0002\u00026\u0180\u0003\u0002\u0002\u00028\u0183\u0003",
    "\u0002\u0002\u0002:\u0187\u0003\u0002\u0002\u0002<\u018d\u0003\u0002",
    "\u0002\u0002>\u01a1\u0003\u0002\u0002\u0002@A\u0007\u0003\u0002\u0002",
    "AB\u0007A\u0002\u0002BC\u0007\u0004\u0002\u0002CD\u0005\u0004\u0003",
    "\u0002DE\u0007\u0005\u0002\u0002EF\u0007\u0002\u0002\u0003F\u0003\u0003",
    "\u0002\u0002\u0002GJ\u0005\u0006\u0004\u0002HJ\u0005.\u0018\u0002IG",
    "\u0003\u0002\u0002\u0002IH\u0003\u0002\u0002\u0002JM\u0003\u0002\u0002",
    "\u0002KI\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002LQ\u0003\u0002",
    "\u0002\u0002MK\u0003\u0002\u0002\u0002NP\u00054\u001b\u0002ON\u0003",
    "\u0002\u0002\u0002PS\u0003\u0002\u0002\u0002QO\u0003\u0002\u0002\u0002",
    "QR\u0003\u0002\u0002\u0002RU\u0003\u0002\u0002\u0002SQ\u0003\u0002\u0002",
    "\u0002TV\u0005:\u001e\u0002UT\u0003\u0002\u0002\u0002UV\u0003\u0002",
    "\u0002\u0002V\u0005\u0003\u0002\u0002\u0002WX\u0007\u0006\u0002\u0002",
    "XY\u0007A\u0002\u0002YZ\u0007\u0004\u0002\u0002Z[\u0005\b\u0005\u0002",
    "[\\\u0007\u0005\u0002\u0002\\\u0007\u0003\u0002\u0002\u0002]_\u0005",
    "\n\u0006\u0002^]\u0003\u0002\u0002\u0002_b\u0003\u0002\u0002\u0002`",
    "^\u0003\u0002\u0002\u0002`a\u0003\u0002\u0002\u0002a\t\u0003\u0002\u0002",
    "\u0002b`\u0003\u0002\u0002\u0002cd\u0007\u0007\u0002\u0002de\u0007C",
    "\u0002\u0002eo\u0007\b\u0002\u0002fg\u0007\t\u0002\u0002gh\u0007C\u0002",
    "\u0002ho\u0007\b\u0002\u0002ij\u0007\n\u0002\u0002jk\u0007A\u0002\u0002",
    "ko\u0007\b\u0002\u0002lo\u0005\f\u0007\u0002mo\u0005\u0016\f\u0002n",
    "c\u0003\u0002\u0002\u0002nf\u0003\u0002\u0002\u0002ni\u0003\u0002\u0002",
    "\u0002nl\u0003\u0002\u0002\u0002nm\u0003\u0002\u0002\u0002o\u000b\u0003",
    "\u0002\u0002\u0002pq\u0007\u000b\u0002\u0002qt\u0007\u0004\u0002\u0002",
    "ru\u0005\u000e\b\u0002su\u0005\u0014\u000b\u0002tr\u0003\u0002\u0002",
    "\u0002ts\u0003\u0002\u0002\u0002uv\u0003\u0002\u0002\u0002vt\u0003\u0002",
    "\u0002\u0002vw\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002xy\u0007",
    "\u0005\u0002\u0002y\r\u0003\u0002\u0002\u0002z{\u0007A\u0002\u0002{",
    "|\u0007\f\u0002\u0002|\u007f\u0005\u0010\t\u0002}~\u0007\r\u0002\u0002",
    "~\u0080\u0007A\u0002\u0002\u007f}\u0003\u0002\u0002\u0002\u007f\u0080",
    "\u0003\u0002\u0002\u0002\u0080\u0084\u0003\u0002\u0002\u0002\u0081\u0083",
    "\u0005\u0012\n\u0002\u0082\u0081\u0003\u0002\u0002\u0002\u0083\u0086",
    "\u0003\u0002\u0002\u0002\u0084\u0082\u0003\u0002\u0002\u0002\u0084\u0085",
    "\u0003\u0002\u0002\u0002\u0085\u0087\u0003\u0002\u0002\u0002\u0086\u0084",
    "\u0003\u0002\u0002\u0002\u0087\u0088\u0007\b\u0002\u0002\u0088\u000f",
    "\u0003\u0002\u0002\u0002\u0089\u008b\u0007A\u0002\u0002\u008a\u008c",
    "\u0007\u000e\u0002\u0002\u008b\u008a\u0003\u0002\u0002\u0002\u008b\u008c",
    "\u0003\u0002\u0002\u0002\u008c\u0011\u0003\u0002\u0002\u0002\u008d\u00a2",
    "\u0007\u000f\u0002\u0002\u008e\u00a2\u0007\u0010\u0002\u0002\u008f\u00a2",
    "\u0007\u0011\u0002\u0002\u0090\u0091\u0007\u0012\u0002\u0002\u0091\u00a2",
    "\u0007C\u0002\u0002\u0092\u0093\u0007\u0013\u0002\u0002\u0093\u00a2",
    "\u0007C\u0002\u0002\u0094\u0095\u0007\u0014\u0002\u0002\u0095\u00a2",
    "\u0007B\u0002\u0002\u0096\u0097\u0007\u0015\u0002\u0002\u0097\u00a2",
    "\u0007B\u0002\u0002\u0098\u0099\u0007\u0016\u0002\u0002\u0099\u009e",
    "\u0007C\u0002\u0002\u009a\u009b\u0007\u0017\u0002\u0002\u009b\u009d",
    "\u0007C\u0002\u0002\u009c\u009a\u0003\u0002\u0002\u0002\u009d\u00a0",
    "\u0003\u0002\u0002\u0002\u009e\u009c\u0003\u0002\u0002\u0002\u009e\u009f",
    "\u0003\u0002\u0002\u0002\u009f\u00a2\u0003\u0002\u0002\u0002\u00a0\u009e",
    "\u0003\u0002\u0002\u0002\u00a1\u008d\u0003\u0002\u0002\u0002\u00a1\u008e",
    "\u0003\u0002\u0002\u0002\u00a1\u008f\u0003\u0002\u0002\u0002\u00a1\u0090",
    "\u0003\u0002\u0002\u0002\u00a1\u0092\u0003\u0002\u0002\u0002\u00a1\u0094",
    "\u0003\u0002\u0002\u0002\u00a1\u0096\u0003\u0002\u0002\u0002\u00a1\u0098",
    "\u0003\u0002\u0002\u0002\u00a2\u0013\u0003\u0002\u0002\u0002\u00a3\u00a4",
    "\u0007\u0011\u0002\u0002\u00a4\u00a5\u0007\u0018\u0002\u0002\u00a5\u00aa",
    "\u0007A\u0002\u0002\u00a6\u00a7\u0007\u0017\u0002\u0002\u00a7\u00a9",
    "\u0007A\u0002\u0002\u00a8\u00a6\u0003\u0002\u0002\u0002\u00a9\u00ac",
    "\u0003\u0002\u0002\u0002\u00aa\u00a8\u0003\u0002\u0002\u0002\u00aa\u00ab",
    "\u0003\u0002\u0002\u0002\u00ab\u00ad\u0003\u0002\u0002\u0002\u00ac\u00aa",
    "\u0003\u0002\u0002\u0002\u00ad\u00ae\u0007\u0019\u0002\u0002\u00ae\u00af",
    "\u0007\b\u0002\u0002\u00af\u0015\u0003\u0002\u0002\u0002\u00b0\u00b1",
    "\u0007\u001a\u0002\u0002\u00b1\u00b3\u0007\u0004\u0002\u0002\u00b2\u00b4",
    "\u0005\u0018\r\u0002\u00b3\u00b2\u0003\u0002\u0002\u0002\u00b4\u00b5",
    "\u0003\u0002\u0002\u0002\u00b5\u00b3\u0003\u0002\u0002\u0002\u00b5\u00b6",
    "\u0003\u0002\u0002\u0002\u00b6\u00b7\u0003\u0002\u0002\u0002\u00b7\u00b8",
    "\u0007\u0005\u0002\u0002\u00b8\u0017\u0003\u0002\u0002\u0002\u00b9\u00ba",
    "\u0005,\u0017\u0002\u00ba\u00bb\u0007@\u0002\u0002\u00bb\u00bf\u0007",
    "\u0004\u0002\u0002\u00bc\u00be\u0005\"\u0012\u0002\u00bd\u00bc\u0003",
    "\u0002\u0002\u0002\u00be\u00c1\u0003\u0002\u0002\u0002\u00bf\u00bd\u0003",
    "\u0002\u0002\u0002\u00bf\u00c0\u0003\u0002\u0002\u0002\u00c0\u00c2\u0003",
    "\u0002\u0002\u0002\u00c1\u00bf\u0003\u0002\u0002\u0002\u00c2\u00c3\u0007",
    "\u0005\u0002\u0002\u00c3\u00cf\u0003\u0002\u0002\u0002\u00c4\u00c5\u0007",
    "\u001b\u0002\u0002\u00c5\u00c6\u0007@\u0002\u0002\u00c6\u00ca\u0007",
    "\u0004\u0002\u0002\u00c7\u00c9\u0005\u001a\u000e\u0002\u00c8\u00c7\u0003",
    "\u0002\u0002\u0002\u00c9\u00cc\u0003\u0002\u0002\u0002\u00ca\u00c8\u0003",
    "\u0002\u0002\u0002\u00ca\u00cb\u0003\u0002\u0002\u0002\u00cb\u00cd\u0003",
    "\u0002\u0002\u0002\u00cc\u00ca\u0003\u0002\u0002\u0002\u00cd\u00cf\u0007",
    "\u0005\u0002\u0002\u00ce\u00b9\u0003\u0002\u0002\u0002\u00ce\u00c4\u0003",
    "\u0002\u0002\u0002\u00cf\u0019\u0003\u0002\u0002\u0002\u00d0\u00d1\u0007",
    "\u001c\u0002\u0002\u00d1\u00d2\u0007A\u0002\u0002\u00d2\u00e4\u0007",
    "\b\u0002\u0002\u00d3\u00d4\u0007\u001d\u0002\u0002\u00d4\u00d9\u0005",
    "$\u0013\u0002\u00d5\u00d6\u0007\u0017\u0002\u0002\u00d6\u00d8\u0005",
    "$\u0013\u0002\u00d7\u00d5\u0003\u0002\u0002\u0002\u00d8\u00db\u0003",
    "\u0002\u0002\u0002\u00d9\u00d7\u0003\u0002\u0002\u0002\u00d9\u00da\u0003",
    "\u0002\u0002\u0002\u00da\u00dc\u0003\u0002\u0002\u0002\u00db\u00d9\u0003",
    "\u0002\u0002\u0002\u00dc\u00dd\u0007\b\u0002\u0002\u00dd\u00e4\u0003",
    "\u0002\u0002\u0002\u00de\u00df\u0007A\u0002\u0002\u00df\u00e0\u0007",
    "\f\u0002\u0002\u00e0\u00e1\u0005\u001c\u000f\u0002\u00e1\u00e2\u0007",
    "\b\u0002\u0002\u00e2\u00e4\u0003\u0002\u0002\u0002\u00e3\u00d0\u0003",
    "\u0002\u0002\u0002\u00e3\u00d3\u0003\u0002\u0002\u0002\u00e3\u00de\u0003",
    "\u0002\u0002\u0002\u00e4\u001b\u0003\u0002\u0002\u0002\u00e5\u00e6\t",
    "\u0002\u0002\u0002\u00e6\u00e9\u0007A\u0002\u0002\u00e7\u00e8\u0007",
    "!\u0002\u0002\u00e8\u00ea\u0007A\u0002\u0002\u00e9\u00e7\u0003\u0002",
    "\u0002\u0002\u00e9\u00ea\u0003\u0002\u0002\u0002\u00ea\u00ec\u0003\u0002",
    "\u0002\u0002\u00eb\u00ed\u0005\u001e\u0010\u0002\u00ec\u00eb\u0003\u0002",
    "\u0002\u0002\u00ec\u00ed\u0003\u0002\u0002\u0002\u00ed\u001d\u0003\u0002",
    "\u0002\u0002\u00ee\u00ef\u0007\"\u0002\u0002\u00ef\u00f4\u0005 \u0011",
    "\u0002\u00f0\u00f1\u0007\u0017\u0002\u0002\u00f1\u00f3\u0005 \u0011",
    "\u0002\u00f2\u00f0\u0003\u0002\u0002\u0002\u00f3\u00f6\u0003\u0002\u0002",
    "\u0002\u00f4\u00f2\u0003\u0002\u0002\u0002\u00f4\u00f5\u0003\u0002\u0002",
    "\u0002\u00f5\u00f7\u0003\u0002\u0002\u0002\u00f6\u00f4\u0003\u0002\u0002",
    "\u0002\u00f7\u00f8\u0007#\u0002\u0002\u00f8\u001f\u0003\u0002\u0002",
    "\u0002\u00f9\u00fa\u0007A\u0002\u0002\u00fa\u00fb\u0007\f\u0002\u0002",
    "\u00fb\u010a\u0007C\u0002\u0002\u00fc\u00fd\u0007A\u0002\u0002\u00fd",
    "\u00fe\t\u0003\u0002\u0002\u00fe\u010a\u0007B\u0002\u0002\u00ff\u0100",
    "\u0007)\u0002\u0002\u0100\u0101\u0007*\u0002\u0002\u0101\u0106\u0007",
    "A\u0002\u0002\u0102\u0103\u0007!\u0002\u0002\u0103\u0105\u0007A\u0002",
    "\u0002\u0104\u0102\u0003\u0002\u0002\u0002\u0105\u0108\u0003\u0002\u0002",
    "\u0002\u0106\u0104\u0003\u0002\u0002\u0002\u0106\u0107\u0003\u0002\u0002",
    "\u0002\u0107\u010a\u0003\u0002\u0002\u0002\u0108\u0106\u0003\u0002\u0002",
    "\u0002\u0109\u00f9\u0003\u0002\u0002\u0002\u0109\u00fc\u0003\u0002\u0002",
    "\u0002\u0109\u00ff\u0003\u0002\u0002\u0002\u010a!\u0003\u0002\u0002",
    "\u0002\u010b\u010c\u0007\u001c\u0002\u0002\u010c\u010d\u0007A\u0002",
    "\u0002\u010d\u0130\u0007\b\u0002\u0002\u010e\u010f\u0007\u001d\u0002",
    "\u0002\u010f\u0114\u0005$\u0013\u0002\u0110\u0111\u0007\u0017\u0002",
    "\u0002\u0111\u0113\u0005$\u0013\u0002\u0112\u0110\u0003\u0002\u0002",
    "\u0002\u0113\u0116\u0003\u0002\u0002\u0002\u0114\u0112\u0003\u0002\u0002",
    "\u0002\u0114\u0115\u0003\u0002\u0002\u0002\u0115\u0117\u0003\u0002\u0002",
    "\u0002\u0116\u0114\u0003\u0002\u0002\u0002\u0117\u0118\u0007\b\u0002",
    "\u0002\u0118\u0130\u0003\u0002\u0002\u0002\u0119\u011a\u0007+\u0002",
    "\u0002\u011a\u011b\u0007A\u0002\u0002\u011b\u011c\u0007,\u0002\u0002",
    "\u011c\u011d\u0005*\u0016\u0002\u011d\u011e\u0007\b\u0002\u0002\u011e",
    "\u0130\u0003\u0002\u0002\u0002\u011f\u0120\u0007-\u0002\u0002\u0120",
    "\u0121\u0007A\u0002\u0002\u0121\u0122\u0007,\u0002\u0002\u0122\u0123",
    "\u0005(\u0015\u0002\u0123\u0124\u0007\b\u0002\u0002\u0124\u0130\u0003",
    "\u0002\u0002\u0002\u0125\u0126\u0007.\u0002\u0002\u0126\u012b\u0007",
    "A\u0002\u0002\u0127\u0128\u0007\u0017\u0002\u0002\u0128\u012a\u0007",
    "A\u0002\u0002\u0129\u0127\u0003\u0002\u0002\u0002\u012a\u012d\u0003",
    "\u0002\u0002\u0002\u012b\u0129\u0003\u0002\u0002\u0002\u012b\u012c\u0003",
    "\u0002\u0002\u0002\u012c\u012e\u0003\u0002\u0002\u0002\u012d\u012b\u0003",
    "\u0002\u0002\u0002\u012e\u0130\u0007\b\u0002\u0002\u012f\u010b\u0003",
    "\u0002\u0002\u0002\u012f\u010e\u0003\u0002\u0002\u0002\u012f\u0119\u0003",
    "\u0002\u0002\u0002\u012f\u011f\u0003\u0002\u0002\u0002\u012f\u0125\u0003",
    "\u0002\u0002\u0002\u0130#\u0003\u0002\u0002\u0002\u0131\u013d\u0007",
    "A\u0002\u0002\u0132\u0133\u0007\u0004\u0002\u0002\u0133\u0138\u0007",
    "A\u0002\u0002\u0134\u0135\u0007\u0017\u0002\u0002\u0135\u0137\u0005",
    "&\u0014\u0002\u0136\u0134\u0003\u0002\u0002\u0002\u0137\u013a\u0003",
    "\u0002\u0002\u0002\u0138\u0136\u0003\u0002\u0002\u0002\u0138\u0139\u0003",
    "\u0002\u0002\u0002\u0139\u013b\u0003\u0002\u0002\u0002\u013a\u0138\u0003",
    "\u0002\u0002\u0002\u013b\u013d\u0007\u0005\u0002\u0002\u013c\u0131\u0003",
    "\u0002\u0002\u0002\u013c\u0132\u0003\u0002\u0002\u0002\u013d%\u0003",
    "\u0002\u0002\u0002\u013e\u013f\u0007+\u0002\u0002\u013f\u0140\u0007",
    "A\u0002\u0002\u0140\u0141\u0007,\u0002\u0002\u0141\u0147\u0005*\u0016",
    "\u0002\u0142\u0143\u0007-\u0002\u0002\u0143\u0144\u0007A\u0002\u0002",
    "\u0144\u0145\u0007,\u0002\u0002\u0145\u0147\u0005(\u0015\u0002\u0146",
    "\u013e\u0003\u0002\u0002\u0002\u0146\u0142\u0003\u0002\u0002\u0002\u0147",
    "\'\u0003\u0002\u0002\u0002\u0148\u014e\u0005*\u0016\u0002\u0149\u014e",
    "\u0007C\u0002\u0002\u014a\u014e\u0007B\u0002\u0002\u014b\u014e\u0007",
    "?\u0002\u0002\u014c\u014e\u0007/\u0002\u0002\u014d\u0148\u0003\u0002",
    "\u0002\u0002\u014d\u0149\u0003\u0002\u0002\u0002\u014d\u014a\u0003\u0002",
    "\u0002\u0002\u014d\u014b\u0003\u0002\u0002\u0002\u014d\u014c\u0003\u0002",
    "\u0002\u0002\u014e)\u0003\u0002\u0002\u0002\u014f\u0150\u0007A\u0002",
    "\u0002\u0150\u0151\u0007!\u0002\u0002\u0151\u0152\u0007A\u0002\u0002",
    "\u0152+\u0003\u0002\u0002\u0002\u0153\u0154\t\u0004\u0002\u0002\u0154",
    "-\u0003\u0002\u0002\u0002\u0155\u0156\u0007\u0006\u0002\u0002\u0156",
    "\u0157\u0007A\u0002\u0002\u0157\u0158\u0007\r\u0002\u0002\u0158\u0159",
    "\u0007\u0004\u0002\u0002\u0159\u015a\u00050\u0019\u0002\u015a\u015b",
    "\u0007\u0005\u0002\u0002\u015b/\u0003\u0002\u0002\u0002\u015c\u015e",
    "\u00052\u001a\u0002\u015d\u015c\u0003\u0002\u0002\u0002\u015e\u015f",
    "\u0003\u0002\u0002\u0002\u015f\u015d\u0003\u0002\u0002\u0002\u015f\u0160",
    "\u0003\u0002\u0002\u0002\u01601\u0003\u0002\u0002\u0002\u0161\u0162",
    "\u00070\u0002\u0002\u0162\u0163\u0007A\u0002\u0002\u0163\u0176\u0007",
    "\b\u0002\u0002\u0164\u0165\u00071\u0002\u0002\u0165\u0166\u0007A\u0002",
    "\u0002\u0166\u0176\u0007\b\u0002\u0002\u0167\u0168\u00072\u0002\u0002",
    "\u0168\u016d\u0007A\u0002\u0002\u0169\u016a\u0007\u0017\u0002\u0002",
    "\u016a\u016c\u0007A\u0002\u0002\u016b\u0169\u0003\u0002\u0002\u0002",
    "\u016c\u016f\u0003\u0002\u0002\u0002\u016d\u016b\u0003\u0002\u0002\u0002",
    "\u016d\u016e\u0003\u0002\u0002\u0002\u016e\u0170\u0003\u0002\u0002\u0002",
    "\u016f\u016d\u0003\u0002\u0002\u0002\u0170\u0176\u0007\b\u0002\u0002",
    "\u0171\u0172\u00073\u0002\u0002\u0172\u0173\u0007A\u0002\u0002\u0173",
    "\u0176\u0007\b\u0002\u0002\u0174\u0176\u0005\u0016\f\u0002\u0175\u0161",
    "\u0003\u0002\u0002\u0002\u0175\u0164\u0003\u0002\u0002\u0002\u0175\u0167",
    "\u0003\u0002\u0002\u0002\u0175\u0171\u0003\u0002\u0002\u0002\u0175\u0174",
    "\u0003\u0002\u0002\u0002\u01763\u0003\u0002\u0002\u0002\u0177\u0178",
    "\u00074\u0002\u0002\u0178\u0179\u0007A\u0002\u0002\u0179\u017a\u0007",
    "\u0004\u0002\u0002\u017a\u017b\u00056\u001c\u0002\u017b\u017c\u0007",
    "\u0005\u0002\u0002\u017c5\u0003\u0002\u0002\u0002\u017d\u017f\u0005",
    "8\u001d\u0002\u017e\u017d\u0003\u0002\u0002\u0002\u017f\u0182\u0003",
    "\u0002\u0002\u0002\u0180\u017e\u0003\u0002\u0002\u0002\u0180\u0181\u0003",
    "\u0002\u0002\u0002\u01817\u0003\u0002\u0002\u0002\u0182\u0180\u0003",
    "\u0002\u0002\u0002\u0183\u0184\u00075\u0002\u0002\u0184\u0185\u0007",
    "A\u0002\u0002\u0185\u0186\u0007\b\u0002\u0002\u01869\u0003\u0002\u0002",
    "\u0002\u0187\u0188\u00076\u0002\u0002\u0188\u0189\u0007\u0004\u0002",
    "\u0002\u0189\u018a\u0005<\u001f\u0002\u018a\u018b\u0007\u0005\u0002",
    "\u0002\u018b;\u0003\u0002\u0002\u0002\u018c\u018e\u0005> \u0002\u018d",
    "\u018c\u0003\u0002\u0002\u0002\u018e\u018f\u0003\u0002\u0002\u0002\u018f",
    "\u018d\u0003\u0002\u0002\u0002\u018f\u0190\u0003\u0002\u0002\u0002\u0190",
    "=\u0003\u0002\u0002\u0002\u0191\u0192\u00077\u0002\u0002\u0192\u0193",
    "\u0007A\u0002\u0002\u0193\u01a2\u0007\b\u0002\u0002\u0194\u0195\u0007",
    "8\u0002\u0002\u0195\u0196\u0007C\u0002\u0002\u0196\u01a2\u0007\b\u0002",
    "\u0002\u0197\u0198\u00079\u0002\u0002\u0198\u019d\u0007A\u0002\u0002",
    "\u0199\u019a\u0007\u0017\u0002\u0002\u019a\u019c\u0007A\u0002\u0002",
    "\u019b\u0199\u0003\u0002\u0002\u0002\u019c\u019f\u0003\u0002\u0002\u0002",
    "\u019d\u019b\u0003\u0002\u0002\u0002\u019d\u019e\u0003\u0002\u0002\u0002",
    "\u019e\u01a0\u0003\u0002\u0002\u0002\u019f\u019d\u0003\u0002\u0002\u0002",
    "\u01a0\u01a2\u0007\b\u0002\u0002\u01a1\u0191\u0003\u0002\u0002\u0002",
    "\u01a1\u0194\u0003\u0002\u0002\u0002\u01a1\u0197\u0003\u0002\u0002\u0002",
    "\u01a2?\u0003\u0002\u0002\u0002)IKQU`ntv\u007f\u0084\u008b\u009e\u00a1",
    "\u00aa\u00b5\u00bf\u00ca\u00ce\u00d9\u00e3\u00e9\u00ec\u00f4\u0106\u0109",
    "\u0114\u012b\u012f\u0138\u013c\u0146\u014d\u015f\u016d\u0175\u0180\u018f",
    "\u019d\u01a1"].join("");


var atn = new antlr4.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'Hospital'", "'{'", "'}'", "'Module'", "'Label:'", 
                     "';'", "'Icon:'", "'Color:'", "'Fields'", "':'", "'foreign'", 
                     "'[]'", "'required'", "'optional'", "'unique'", "'label'", 
                     "'default'", "'min'", "'max'", "'options'", "','", 
                     "'['", "']'", "'APIs'", "'Stats'", "'name:'", "'roles:'", 
                     "'count'", "'sum'", "'avg'", "'.'", "'('", "')'", "'>'", 
                     "'<'", "'>='", "'<='", "'=='", "'grouped'", "'by'", 
                     "'filter'", "'='", "'set'", "'expand:'", "'null'", 
                     "'from:'", "'to:'", "'via:'", "'type:'", "'Role'", 
                     "'Me:'", "'Auth'", "'Type:'", "'Expiry:'", "'Roles:'", 
                     "'List'", "'Get'", "'Create'", "'Update'", "'Delete'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, "LIST", "GET", "CREATE", "UPDATE", "DELETE", 
                      "BOOLEAN_LITERAL", "PATH", "ID", "INT", "STRING", 
                      "WS", "COMMENT" ];

var ruleNames =  [ "hospital", "hospitalBody", "moduleDecl", "moduleBody", 
                   "moduleItem", "fieldsDecl", "fieldDef", "fieldType", 
                   "fieldConstraint", "uniqueConstraint", "apisBlock", "apiEndpoint", 
                   "statsEndpointItem", "statsAggregation", "statsModifier", 
                   "statsModifierItem", "apiEndpointItem", "roleConfig", 
                   "roleConfigItem", "setVal", "authExpr", "apiVerb", "foreignModuleDecl", 
                   "foreignModuleBody", "foreignModuleItem", "roleDecl", 
                   "roleBody", "roleItem", "authDecl", "authBody", "authItem" ];

function HospitalSchemaParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

HospitalSchemaParser.prototype = Object.create(antlr4.Parser.prototype);
HospitalSchemaParser.prototype.constructor = HospitalSchemaParser;

Object.defineProperty(HospitalSchemaParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

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
HospitalSchemaParser.T__39 = 40;
HospitalSchemaParser.T__40 = 41;
HospitalSchemaParser.T__41 = 42;
HospitalSchemaParser.T__42 = 43;
HospitalSchemaParser.T__43 = 44;
HospitalSchemaParser.T__44 = 45;
HospitalSchemaParser.T__45 = 46;
HospitalSchemaParser.T__46 = 47;
HospitalSchemaParser.T__47 = 48;
HospitalSchemaParser.T__48 = 49;
HospitalSchemaParser.T__49 = 50;
HospitalSchemaParser.T__50 = 51;
HospitalSchemaParser.T__51 = 52;
HospitalSchemaParser.T__52 = 53;
HospitalSchemaParser.T__53 = 54;
HospitalSchemaParser.T__54 = 55;
HospitalSchemaParser.LIST = 56;
HospitalSchemaParser.GET = 57;
HospitalSchemaParser.CREATE = 58;
HospitalSchemaParser.UPDATE = 59;
HospitalSchemaParser.DELETE = 60;
HospitalSchemaParser.BOOLEAN_LITERAL = 61;
HospitalSchemaParser.PATH = 62;
HospitalSchemaParser.ID = 63;
HospitalSchemaParser.INT = 64;
HospitalSchemaParser.STRING = 65;
HospitalSchemaParser.WS = 66;
HospitalSchemaParser.COMMENT = 67;

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

function HospitalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_hospital;
    return this;
}

HospitalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HospitalContext.prototype.constructor = HospitalContext;

HospitalContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

HospitalContext.prototype.hospitalBody = function() {
    return this.getTypedRuleContext(HospitalBodyContext,0);
};

HospitalContext.prototype.EOF = function() {
    return this.getToken(HospitalSchemaParser.EOF, 0);
};

HospitalContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterHospital(this);
	}
};

HospitalContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitHospital(this);
	}
};




HospitalSchemaParser.HospitalContext = HospitalContext;

HospitalSchemaParser.prototype.hospital = function() {

    var localctx = new HospitalContext(this, this._ctx, this.state);
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
};

function HospitalBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_hospitalBody;
    return this;
}

HospitalBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HospitalBodyContext.prototype.constructor = HospitalBodyContext;

HospitalBodyContext.prototype.moduleDecl = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ModuleDeclContext);
    } else {
        return this.getTypedRuleContext(ModuleDeclContext,i);
    }
};

HospitalBodyContext.prototype.foreignModuleDecl = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ForeignModuleDeclContext);
    } else {
        return this.getTypedRuleContext(ForeignModuleDeclContext,i);
    }
};

HospitalBodyContext.prototype.roleDecl = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RoleDeclContext);
    } else {
        return this.getTypedRuleContext(RoleDeclContext,i);
    }
};

HospitalBodyContext.prototype.authDecl = function() {
    return this.getTypedRuleContext(AuthDeclContext,0);
};

HospitalBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterHospitalBody(this);
	}
};

HospitalBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitHospitalBody(this);
	}
};




HospitalSchemaParser.HospitalBodyContext = HospitalBodyContext;

HospitalSchemaParser.prototype.hospitalBody = function() {

    var localctx = new HospitalBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, HospitalSchemaParser.RULE_hospitalBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 73;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalSchemaParser.T__3) {
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
        while(_la===HospitalSchemaParser.T__49) {
            this.state = 76;
            this.roleDecl();
            this.state = 81;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 83;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalSchemaParser.T__51) {
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
};

function ModuleDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_moduleDecl;
    return this;
}

ModuleDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleDeclContext.prototype.constructor = ModuleDeclContext;

ModuleDeclContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

ModuleDeclContext.prototype.moduleBody = function() {
    return this.getTypedRuleContext(ModuleBodyContext,0);
};

ModuleDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterModuleDecl(this);
	}
};

ModuleDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitModuleDecl(this);
	}
};




HospitalSchemaParser.ModuleDeclContext = ModuleDeclContext;

HospitalSchemaParser.prototype.moduleDecl = function() {

    var localctx = new ModuleDeclContext(this, this._ctx, this.state);
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
};

function ModuleBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_moduleBody;
    return this;
}

ModuleBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleBodyContext.prototype.constructor = ModuleBodyContext;

ModuleBodyContext.prototype.moduleItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ModuleItemContext);
    } else {
        return this.getTypedRuleContext(ModuleItemContext,i);
    }
};

ModuleBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterModuleBody(this);
	}
};

ModuleBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitModuleBody(this);
	}
};




HospitalSchemaParser.ModuleBodyContext = ModuleBodyContext;

HospitalSchemaParser.prototype.moduleBody = function() {

    var localctx = new ModuleBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, HospitalSchemaParser.RULE_moduleBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 94;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalSchemaParser.T__4) | (1 << HospitalSchemaParser.T__6) | (1 << HospitalSchemaParser.T__7) | (1 << HospitalSchemaParser.T__8) | (1 << HospitalSchemaParser.T__23))) !== 0)) {
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
};

function ModuleItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_moduleItem;
    return this;
}

ModuleItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleItemContext.prototype.constructor = ModuleItemContext;

ModuleItemContext.prototype.STRING = function() {
    return this.getToken(HospitalSchemaParser.STRING, 0);
};

ModuleItemContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

ModuleItemContext.prototype.fieldsDecl = function() {
    return this.getTypedRuleContext(FieldsDeclContext,0);
};

ModuleItemContext.prototype.apisBlock = function() {
    return this.getTypedRuleContext(ApisBlockContext,0);
};

ModuleItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterModuleItem(this);
	}
};

ModuleItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitModuleItem(this);
	}
};




HospitalSchemaParser.ModuleItemContext = ModuleItemContext;

HospitalSchemaParser.prototype.moduleItem = function() {

    var localctx = new ModuleItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, HospitalSchemaParser.RULE_moduleItem);
    try {
        this.state = 108;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__4:
            this.enterOuterAlt(localctx, 1);
            this.state = 97;
            this.match(HospitalSchemaParser.T__4);
            this.state = 98;
            this.match(HospitalSchemaParser.STRING);
            this.state = 99;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__6:
            this.enterOuterAlt(localctx, 2);
            this.state = 100;
            this.match(HospitalSchemaParser.T__6);
            this.state = 101;
            this.match(HospitalSchemaParser.STRING);
            this.state = 102;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__7:
            this.enterOuterAlt(localctx, 3);
            this.state = 103;
            this.match(HospitalSchemaParser.T__7);
            this.state = 104;
            this.match(HospitalSchemaParser.ID);
            this.state = 105;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__8:
            this.enterOuterAlt(localctx, 4);
            this.state = 106;
            this.fieldsDecl();
            break;
        case HospitalSchemaParser.T__23:
            this.enterOuterAlt(localctx, 5);
            this.state = 107;
            this.apisBlock();
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
};

function FieldsDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_fieldsDecl;
    return this;
}

FieldsDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldsDeclContext.prototype.constructor = FieldsDeclContext;

FieldsDeclContext.prototype.fieldDef = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldDefContext);
    } else {
        return this.getTypedRuleContext(FieldDefContext,i);
    }
};

FieldsDeclContext.prototype.uniqueConstraint = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(UniqueConstraintContext);
    } else {
        return this.getTypedRuleContext(UniqueConstraintContext,i);
    }
};

FieldsDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterFieldsDecl(this);
	}
};

FieldsDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitFieldsDecl(this);
	}
};




HospitalSchemaParser.FieldsDeclContext = FieldsDeclContext;

HospitalSchemaParser.prototype.fieldsDecl = function() {

    var localctx = new FieldsDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, HospitalSchemaParser.RULE_fieldsDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 110;
        this.match(HospitalSchemaParser.T__8);
        this.state = 111;
        this.match(HospitalSchemaParser.T__1);
        this.state = 114; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 114;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case HospitalSchemaParser.ID:
                this.state = 112;
                this.fieldDef();
                break;
            case HospitalSchemaParser.T__14:
                this.state = 113;
                this.uniqueConstraint();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 116; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===HospitalSchemaParser.T__14 || _la===HospitalSchemaParser.ID);
        this.state = 118;
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
};

function FieldDefContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_fieldDef;
    return this;
}

FieldDefContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldDefContext.prototype.constructor = FieldDefContext;

FieldDefContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


FieldDefContext.prototype.fieldType = function() {
    return this.getTypedRuleContext(FieldTypeContext,0);
};

FieldDefContext.prototype.fieldConstraint = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldConstraintContext);
    } else {
        return this.getTypedRuleContext(FieldConstraintContext,i);
    }
};

FieldDefContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterFieldDef(this);
	}
};

FieldDefContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitFieldDef(this);
	}
};




HospitalSchemaParser.FieldDefContext = FieldDefContext;

HospitalSchemaParser.prototype.fieldDef = function() {

    var localctx = new FieldDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, HospitalSchemaParser.RULE_fieldDef);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 120;
        this.match(HospitalSchemaParser.ID);
        this.state = 121;
        this.match(HospitalSchemaParser.T__9);
        this.state = 122;
        this.fieldType();
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalSchemaParser.T__10) {
            this.state = 123;
            this.match(HospitalSchemaParser.T__10);
            this.state = 124;
            this.match(HospitalSchemaParser.ID);
        }

        this.state = 130;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalSchemaParser.T__12) | (1 << HospitalSchemaParser.T__13) | (1 << HospitalSchemaParser.T__14) | (1 << HospitalSchemaParser.T__15) | (1 << HospitalSchemaParser.T__16) | (1 << HospitalSchemaParser.T__17) | (1 << HospitalSchemaParser.T__18) | (1 << HospitalSchemaParser.T__19))) !== 0)) {
            this.state = 127;
            this.fieldConstraint();
            this.state = 132;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 133;
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
};

function FieldTypeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_fieldType;
    return this;
}

FieldTypeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldTypeContext.prototype.constructor = FieldTypeContext;

FieldTypeContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

FieldTypeContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterFieldType(this);
	}
};

FieldTypeContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitFieldType(this);
	}
};




HospitalSchemaParser.FieldTypeContext = FieldTypeContext;

HospitalSchemaParser.prototype.fieldType = function() {

    var localctx = new FieldTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, HospitalSchemaParser.RULE_fieldType);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 135;
        this.match(HospitalSchemaParser.ID);
        this.state = 137;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalSchemaParser.T__11) {
            this.state = 136;
            this.match(HospitalSchemaParser.T__11);
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
};

function FieldConstraintContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_fieldConstraint;
    return this;
}

FieldConstraintContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldConstraintContext.prototype.constructor = FieldConstraintContext;

FieldConstraintContext.prototype.STRING = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.STRING);
    } else {
        return this.getToken(HospitalSchemaParser.STRING, i);
    }
};


FieldConstraintContext.prototype.INT = function() {
    return this.getToken(HospitalSchemaParser.INT, 0);
};

FieldConstraintContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterFieldConstraint(this);
	}
};

FieldConstraintContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitFieldConstraint(this);
	}
};




HospitalSchemaParser.FieldConstraintContext = FieldConstraintContext;

HospitalSchemaParser.prototype.fieldConstraint = function() {

    var localctx = new FieldConstraintContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, HospitalSchemaParser.RULE_fieldConstraint);
    var _la = 0; // Token type
    try {
        this.state = 159;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__12:
            this.enterOuterAlt(localctx, 1);
            this.state = 139;
            this.match(HospitalSchemaParser.T__12);
            break;
        case HospitalSchemaParser.T__13:
            this.enterOuterAlt(localctx, 2);
            this.state = 140;
            this.match(HospitalSchemaParser.T__13);
            break;
        case HospitalSchemaParser.T__14:
            this.enterOuterAlt(localctx, 3);
            this.state = 141;
            this.match(HospitalSchemaParser.T__14);
            break;
        case HospitalSchemaParser.T__15:
            this.enterOuterAlt(localctx, 4);
            this.state = 142;
            this.match(HospitalSchemaParser.T__15);
            this.state = 143;
            this.match(HospitalSchemaParser.STRING);
            break;
        case HospitalSchemaParser.T__16:
            this.enterOuterAlt(localctx, 5);
            this.state = 144;
            this.match(HospitalSchemaParser.T__16);
            this.state = 145;
            this.match(HospitalSchemaParser.STRING);
            break;
        case HospitalSchemaParser.T__17:
            this.enterOuterAlt(localctx, 6);
            this.state = 146;
            this.match(HospitalSchemaParser.T__17);
            this.state = 147;
            this.match(HospitalSchemaParser.INT);
            break;
        case HospitalSchemaParser.T__18:
            this.enterOuterAlt(localctx, 7);
            this.state = 148;
            this.match(HospitalSchemaParser.T__18);
            this.state = 149;
            this.match(HospitalSchemaParser.INT);
            break;
        case HospitalSchemaParser.T__19:
            this.enterOuterAlt(localctx, 8);
            this.state = 150;
            this.match(HospitalSchemaParser.T__19);
            this.state = 151;
            this.match(HospitalSchemaParser.STRING);
            this.state = 156;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 152;
                this.match(HospitalSchemaParser.T__20);
                this.state = 153;
                this.match(HospitalSchemaParser.STRING);
                this.state = 158;
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
};

function UniqueConstraintContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_uniqueConstraint;
    return this;
}

UniqueConstraintContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UniqueConstraintContext.prototype.constructor = UniqueConstraintContext;

UniqueConstraintContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


UniqueConstraintContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterUniqueConstraint(this);
	}
};

UniqueConstraintContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitUniqueConstraint(this);
	}
};




HospitalSchemaParser.UniqueConstraintContext = UniqueConstraintContext;

HospitalSchemaParser.prototype.uniqueConstraint = function() {

    var localctx = new UniqueConstraintContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, HospitalSchemaParser.RULE_uniqueConstraint);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 161;
        this.match(HospitalSchemaParser.T__14);
        this.state = 162;
        this.match(HospitalSchemaParser.T__21);
        this.state = 163;
        this.match(HospitalSchemaParser.ID);
        this.state = 168;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalSchemaParser.T__20) {
            this.state = 164;
            this.match(HospitalSchemaParser.T__20);
            this.state = 165;
            this.match(HospitalSchemaParser.ID);
            this.state = 170;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 171;
        this.match(HospitalSchemaParser.T__22);
        this.state = 172;
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
};

function ApisBlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_apisBlock;
    return this;
}

ApisBlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ApisBlockContext.prototype.constructor = ApisBlockContext;

ApisBlockContext.prototype.apiEndpoint = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ApiEndpointContext);
    } else {
        return this.getTypedRuleContext(ApiEndpointContext,i);
    }
};

ApisBlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterApisBlock(this);
	}
};

ApisBlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitApisBlock(this);
	}
};




HospitalSchemaParser.ApisBlockContext = ApisBlockContext;

HospitalSchemaParser.prototype.apisBlock = function() {

    var localctx = new ApisBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, HospitalSchemaParser.RULE_apisBlock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 174;
        this.match(HospitalSchemaParser.T__23);
        this.state = 175;
        this.match(HospitalSchemaParser.T__1);
        this.state = 177; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 176;
            this.apiEndpoint();
            this.state = 179; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===HospitalSchemaParser.T__24 || ((((_la - 56)) & ~0x1f) == 0 && ((1 << (_la - 56)) & ((1 << (HospitalSchemaParser.LIST - 56)) | (1 << (HospitalSchemaParser.GET - 56)) | (1 << (HospitalSchemaParser.CREATE - 56)) | (1 << (HospitalSchemaParser.UPDATE - 56)) | (1 << (HospitalSchemaParser.DELETE - 56)))) !== 0));
        this.state = 181;
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
};

function ApiEndpointContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_apiEndpoint;
    return this;
}

ApiEndpointContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ApiEndpointContext.prototype.constructor = ApiEndpointContext;

ApiEndpointContext.prototype.apiVerb = function() {
    return this.getTypedRuleContext(ApiVerbContext,0);
};

ApiEndpointContext.prototype.PATH = function() {
    return this.getToken(HospitalSchemaParser.PATH, 0);
};

ApiEndpointContext.prototype.apiEndpointItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ApiEndpointItemContext);
    } else {
        return this.getTypedRuleContext(ApiEndpointItemContext,i);
    }
};

ApiEndpointContext.prototype.statsEndpointItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatsEndpointItemContext);
    } else {
        return this.getTypedRuleContext(StatsEndpointItemContext,i);
    }
};

ApiEndpointContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterApiEndpoint(this);
	}
};

ApiEndpointContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitApiEndpoint(this);
	}
};




HospitalSchemaParser.ApiEndpointContext = ApiEndpointContext;

HospitalSchemaParser.prototype.apiEndpoint = function() {

    var localctx = new ApiEndpointContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, HospitalSchemaParser.RULE_apiEndpoint);
    var _la = 0; // Token type
    try {
        this.state = 204;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.LIST:
        case HospitalSchemaParser.GET:
        case HospitalSchemaParser.CREATE:
        case HospitalSchemaParser.UPDATE:
        case HospitalSchemaParser.DELETE:
            this.enterOuterAlt(localctx, 1);
            this.state = 183;
            this.apiVerb();
            this.state = 184;
            this.match(HospitalSchemaParser.PATH);
            this.state = 185;
            this.match(HospitalSchemaParser.T__1);
            this.state = 189;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(((((_la - 26)) & ~0x1f) == 0 && ((1 << (_la - 26)) & ((1 << (HospitalSchemaParser.T__25 - 26)) | (1 << (HospitalSchemaParser.T__26 - 26)) | (1 << (HospitalSchemaParser.T__40 - 26)) | (1 << (HospitalSchemaParser.T__42 - 26)) | (1 << (HospitalSchemaParser.T__43 - 26)))) !== 0)) {
                this.state = 186;
                this.apiEndpointItem();
                this.state = 191;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 192;
            this.match(HospitalSchemaParser.T__2);
            break;
        case HospitalSchemaParser.T__24:
            this.enterOuterAlt(localctx, 2);
            this.state = 194;
            this.match(HospitalSchemaParser.T__24);
            this.state = 195;
            this.match(HospitalSchemaParser.PATH);
            this.state = 196;
            this.match(HospitalSchemaParser.T__1);
            this.state = 200;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__25 || _la===HospitalSchemaParser.T__26 || _la===HospitalSchemaParser.ID) {
                this.state = 197;
                this.statsEndpointItem();
                this.state = 202;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 203;
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
};

function StatsEndpointItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_statsEndpointItem;
    return this;
}

StatsEndpointItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatsEndpointItemContext.prototype.constructor = StatsEndpointItemContext;

StatsEndpointItemContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

StatsEndpointItemContext.prototype.roleConfig = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RoleConfigContext);
    } else {
        return this.getTypedRuleContext(RoleConfigContext,i);
    }
};

StatsEndpointItemContext.prototype.statsAggregation = function() {
    return this.getTypedRuleContext(StatsAggregationContext,0);
};

StatsEndpointItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterStatsEndpointItem(this);
	}
};

StatsEndpointItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitStatsEndpointItem(this);
	}
};




HospitalSchemaParser.StatsEndpointItemContext = StatsEndpointItemContext;

HospitalSchemaParser.prototype.statsEndpointItem = function() {

    var localctx = new StatsEndpointItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, HospitalSchemaParser.RULE_statsEndpointItem);
    var _la = 0; // Token type
    try {
        this.state = 225;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__25:
            this.enterOuterAlt(localctx, 1);
            this.state = 206;
            this.match(HospitalSchemaParser.T__25);
            this.state = 207;
            this.match(HospitalSchemaParser.ID);
            this.state = 208;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__26:
            this.enterOuterAlt(localctx, 2);
            this.state = 209;
            this.match(HospitalSchemaParser.T__26);
            this.state = 210;
            this.roleConfig();
            this.state = 215;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 211;
                this.match(HospitalSchemaParser.T__20);
                this.state = 212;
                this.roleConfig();
                this.state = 217;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 218;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.ID:
            this.enterOuterAlt(localctx, 3);
            this.state = 220;
            this.match(HospitalSchemaParser.ID);
            this.state = 221;
            this.match(HospitalSchemaParser.T__9);
            this.state = 222;
            this.statsAggregation();
            this.state = 223;
            this.match(HospitalSchemaParser.T__5);
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
};

function StatsAggregationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_statsAggregation;
    return this;
}

StatsAggregationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatsAggregationContext.prototype.constructor = StatsAggregationContext;

StatsAggregationContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


StatsAggregationContext.prototype.statsModifier = function() {
    return this.getTypedRuleContext(StatsModifierContext,0);
};

StatsAggregationContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterStatsAggregation(this);
	}
};

StatsAggregationContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitStatsAggregation(this);
	}
};




HospitalSchemaParser.StatsAggregationContext = StatsAggregationContext;

HospitalSchemaParser.prototype.statsAggregation = function() {

    var localctx = new StatsAggregationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, HospitalSchemaParser.RULE_statsAggregation);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 227;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalSchemaParser.T__17) | (1 << HospitalSchemaParser.T__18) | (1 << HospitalSchemaParser.T__27) | (1 << HospitalSchemaParser.T__28) | (1 << HospitalSchemaParser.T__29))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 228;
        this.match(HospitalSchemaParser.ID);
        this.state = 231;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalSchemaParser.T__30) {
            this.state = 229;
            this.match(HospitalSchemaParser.T__30);
            this.state = 230;
            this.match(HospitalSchemaParser.ID);
        }

        this.state = 234;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalSchemaParser.T__31) {
            this.state = 233;
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
};

function StatsModifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_statsModifier;
    return this;
}

StatsModifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatsModifierContext.prototype.constructor = StatsModifierContext;

StatsModifierContext.prototype.statsModifierItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatsModifierItemContext);
    } else {
        return this.getTypedRuleContext(StatsModifierItemContext,i);
    }
};

StatsModifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterStatsModifier(this);
	}
};

StatsModifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitStatsModifier(this);
	}
};




HospitalSchemaParser.StatsModifierContext = StatsModifierContext;

HospitalSchemaParser.prototype.statsModifier = function() {

    var localctx = new StatsModifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, HospitalSchemaParser.RULE_statsModifier);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 236;
        this.match(HospitalSchemaParser.T__31);
        this.state = 237;
        this.statsModifierItem();
        this.state = 242;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalSchemaParser.T__20) {
            this.state = 238;
            this.match(HospitalSchemaParser.T__20);
            this.state = 239;
            this.statsModifierItem();
            this.state = 244;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 245;
        this.match(HospitalSchemaParser.T__32);
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
};

function StatsModifierItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_statsModifierItem;
    return this;
}

StatsModifierItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatsModifierItemContext.prototype.constructor = StatsModifierItemContext;

StatsModifierItemContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


StatsModifierItemContext.prototype.STRING = function() {
    return this.getToken(HospitalSchemaParser.STRING, 0);
};

StatsModifierItemContext.prototype.INT = function() {
    return this.getToken(HospitalSchemaParser.INT, 0);
};

StatsModifierItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterStatsModifierItem(this);
	}
};

StatsModifierItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitStatsModifierItem(this);
	}
};




HospitalSchemaParser.StatsModifierItemContext = StatsModifierItemContext;

HospitalSchemaParser.prototype.statsModifierItem = function() {

    var localctx = new StatsModifierItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, HospitalSchemaParser.RULE_statsModifierItem);
    var _la = 0; // Token type
    try {
        this.state = 263;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 247;
            this.match(HospitalSchemaParser.ID);
            this.state = 248;
            this.match(HospitalSchemaParser.T__9);
            this.state = 249;
            this.match(HospitalSchemaParser.STRING);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 250;
            this.match(HospitalSchemaParser.ID);
            this.state = 251;
            _la = this._input.LA(1);
            if(!(((((_la - 34)) & ~0x1f) == 0 && ((1 << (_la - 34)) & ((1 << (HospitalSchemaParser.T__33 - 34)) | (1 << (HospitalSchemaParser.T__34 - 34)) | (1 << (HospitalSchemaParser.T__35 - 34)) | (1 << (HospitalSchemaParser.T__36 - 34)) | (1 << (HospitalSchemaParser.T__37 - 34)))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 252;
            this.match(HospitalSchemaParser.INT);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 253;
            this.match(HospitalSchemaParser.T__38);
            this.state = 254;
            this.match(HospitalSchemaParser.T__39);
            this.state = 255;
            this.match(HospitalSchemaParser.ID);
            this.state = 260;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__30) {
                this.state = 256;
                this.match(HospitalSchemaParser.T__30);
                this.state = 257;
                this.match(HospitalSchemaParser.ID);
                this.state = 262;
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
};

function ApiEndpointItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_apiEndpointItem;
    return this;
}

ApiEndpointItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ApiEndpointItemContext.prototype.constructor = ApiEndpointItemContext;

ApiEndpointItemContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


ApiEndpointItemContext.prototype.roleConfig = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RoleConfigContext);
    } else {
        return this.getTypedRuleContext(RoleConfigContext,i);
    }
};

ApiEndpointItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

ApiEndpointItemContext.prototype.setVal = function() {
    return this.getTypedRuleContext(SetValContext,0);
};

ApiEndpointItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterApiEndpointItem(this);
	}
};

ApiEndpointItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitApiEndpointItem(this);
	}
};




HospitalSchemaParser.ApiEndpointItemContext = ApiEndpointItemContext;

HospitalSchemaParser.prototype.apiEndpointItem = function() {

    var localctx = new ApiEndpointItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, HospitalSchemaParser.RULE_apiEndpointItem);
    var _la = 0; // Token type
    try {
        this.state = 301;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__25:
            this.enterOuterAlt(localctx, 1);
            this.state = 265;
            this.match(HospitalSchemaParser.T__25);
            this.state = 266;
            this.match(HospitalSchemaParser.ID);
            this.state = 267;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__26:
            this.enterOuterAlt(localctx, 2);
            this.state = 268;
            this.match(HospitalSchemaParser.T__26);
            this.state = 269;
            this.roleConfig();
            this.state = 274;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 270;
                this.match(HospitalSchemaParser.T__20);
                this.state = 271;
                this.roleConfig();
                this.state = 276;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 277;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__40:
            this.enterOuterAlt(localctx, 3);
            this.state = 279;
            this.match(HospitalSchemaParser.T__40);
            this.state = 280;
            this.match(HospitalSchemaParser.ID);
            this.state = 281;
            this.match(HospitalSchemaParser.T__41);
            this.state = 282;
            this.authExpr();
            this.state = 283;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__42:
            this.enterOuterAlt(localctx, 4);
            this.state = 285;
            this.match(HospitalSchemaParser.T__42);
            this.state = 286;
            this.match(HospitalSchemaParser.ID);
            this.state = 287;
            this.match(HospitalSchemaParser.T__41);
            this.state = 288;
            this.setVal();
            this.state = 289;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__43:
            this.enterOuterAlt(localctx, 5);
            this.state = 291;
            this.match(HospitalSchemaParser.T__43);
            this.state = 292;
            this.match(HospitalSchemaParser.ID);
            this.state = 297;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 293;
                this.match(HospitalSchemaParser.T__20);
                this.state = 294;
                this.match(HospitalSchemaParser.ID);
                this.state = 299;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 300;
            this.match(HospitalSchemaParser.T__5);
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
};

function RoleConfigContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_roleConfig;
    return this;
}

RoleConfigContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RoleConfigContext.prototype.constructor = RoleConfigContext;

RoleConfigContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

RoleConfigContext.prototype.roleConfigItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RoleConfigItemContext);
    } else {
        return this.getTypedRuleContext(RoleConfigItemContext,i);
    }
};

RoleConfigContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterRoleConfig(this);
	}
};

RoleConfigContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitRoleConfig(this);
	}
};




HospitalSchemaParser.RoleConfigContext = RoleConfigContext;

HospitalSchemaParser.prototype.roleConfig = function() {

    var localctx = new RoleConfigContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, HospitalSchemaParser.RULE_roleConfig);
    var _la = 0; // Token type
    try {
        this.state = 314;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.ID:
            this.enterOuterAlt(localctx, 1);
            this.state = 303;
            this.match(HospitalSchemaParser.ID);
            break;
        case HospitalSchemaParser.T__1:
            this.enterOuterAlt(localctx, 2);
            this.state = 304;
            this.match(HospitalSchemaParser.T__1);
            this.state = 305;
            this.match(HospitalSchemaParser.ID);
            this.state = 310;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 306;
                this.match(HospitalSchemaParser.T__20);
                this.state = 307;
                this.roleConfigItem();
                this.state = 312;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 313;
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
};

function RoleConfigItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_roleConfigItem;
    return this;
}

RoleConfigItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RoleConfigItemContext.prototype.constructor = RoleConfigItemContext;

RoleConfigItemContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

RoleConfigItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

RoleConfigItemContext.prototype.setVal = function() {
    return this.getTypedRuleContext(SetValContext,0);
};

RoleConfigItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterRoleConfigItem(this);
	}
};

RoleConfigItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitRoleConfigItem(this);
	}
};




HospitalSchemaParser.RoleConfigItemContext = RoleConfigItemContext;

HospitalSchemaParser.prototype.roleConfigItem = function() {

    var localctx = new RoleConfigItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, HospitalSchemaParser.RULE_roleConfigItem);
    try {
        this.state = 324;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__40:
            this.enterOuterAlt(localctx, 1);
            this.state = 316;
            this.match(HospitalSchemaParser.T__40);
            this.state = 317;
            this.match(HospitalSchemaParser.ID);
            this.state = 318;
            this.match(HospitalSchemaParser.T__41);
            this.state = 319;
            this.authExpr();
            break;
        case HospitalSchemaParser.T__42:
            this.enterOuterAlt(localctx, 2);
            this.state = 320;
            this.match(HospitalSchemaParser.T__42);
            this.state = 321;
            this.match(HospitalSchemaParser.ID);
            this.state = 322;
            this.match(HospitalSchemaParser.T__41);
            this.state = 323;
            this.setVal();
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
};

function SetValContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_setVal;
    return this;
}

SetValContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SetValContext.prototype.constructor = SetValContext;

SetValContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

SetValContext.prototype.STRING = function() {
    return this.getToken(HospitalSchemaParser.STRING, 0);
};

SetValContext.prototype.INT = function() {
    return this.getToken(HospitalSchemaParser.INT, 0);
};

SetValContext.prototype.BOOLEAN_LITERAL = function() {
    return this.getToken(HospitalSchemaParser.BOOLEAN_LITERAL, 0);
};

SetValContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterSetVal(this);
	}
};

SetValContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitSetVal(this);
	}
};




HospitalSchemaParser.SetValContext = SetValContext;

HospitalSchemaParser.prototype.setVal = function() {

    var localctx = new SetValContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, HospitalSchemaParser.RULE_setVal);
    try {
        this.state = 331;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.ID:
            this.enterOuterAlt(localctx, 1);
            this.state = 326;
            this.authExpr();
            break;
        case HospitalSchemaParser.STRING:
            this.enterOuterAlt(localctx, 2);
            this.state = 327;
            this.match(HospitalSchemaParser.STRING);
            break;
        case HospitalSchemaParser.INT:
            this.enterOuterAlt(localctx, 3);
            this.state = 328;
            this.match(HospitalSchemaParser.INT);
            break;
        case HospitalSchemaParser.BOOLEAN_LITERAL:
            this.enterOuterAlt(localctx, 4);
            this.state = 329;
            this.match(HospitalSchemaParser.BOOLEAN_LITERAL);
            break;
        case HospitalSchemaParser.T__44:
            this.enterOuterAlt(localctx, 5);
            this.state = 330;
            this.match(HospitalSchemaParser.T__44);
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
};

function AuthExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_authExpr;
    return this;
}

AuthExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthExprContext.prototype.constructor = AuthExprContext;

AuthExprContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


AuthExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterAuthExpr(this);
	}
};

AuthExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitAuthExpr(this);
	}
};




HospitalSchemaParser.AuthExprContext = AuthExprContext;

HospitalSchemaParser.prototype.authExpr = function() {

    var localctx = new AuthExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, HospitalSchemaParser.RULE_authExpr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 333;
        this.match(HospitalSchemaParser.ID);
        this.state = 334;
        this.match(HospitalSchemaParser.T__30);
        this.state = 335;
        this.match(HospitalSchemaParser.ID);
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
};

function ApiVerbContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_apiVerb;
    return this;
}

ApiVerbContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ApiVerbContext.prototype.constructor = ApiVerbContext;

ApiVerbContext.prototype.LIST = function() {
    return this.getToken(HospitalSchemaParser.LIST, 0);
};

ApiVerbContext.prototype.GET = function() {
    return this.getToken(HospitalSchemaParser.GET, 0);
};

ApiVerbContext.prototype.CREATE = function() {
    return this.getToken(HospitalSchemaParser.CREATE, 0);
};

ApiVerbContext.prototype.UPDATE = function() {
    return this.getToken(HospitalSchemaParser.UPDATE, 0);
};

ApiVerbContext.prototype.DELETE = function() {
    return this.getToken(HospitalSchemaParser.DELETE, 0);
};

ApiVerbContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterApiVerb(this);
	}
};

ApiVerbContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitApiVerb(this);
	}
};




HospitalSchemaParser.ApiVerbContext = ApiVerbContext;

HospitalSchemaParser.prototype.apiVerb = function() {

    var localctx = new ApiVerbContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, HospitalSchemaParser.RULE_apiVerb);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 337;
        _la = this._input.LA(1);
        if(!(((((_la - 56)) & ~0x1f) == 0 && ((1 << (_la - 56)) & ((1 << (HospitalSchemaParser.LIST - 56)) | (1 << (HospitalSchemaParser.GET - 56)) | (1 << (HospitalSchemaParser.CREATE - 56)) | (1 << (HospitalSchemaParser.UPDATE - 56)) | (1 << (HospitalSchemaParser.DELETE - 56)))) !== 0))) {
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
};

function ForeignModuleDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleDecl;
    return this;
}

ForeignModuleDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ForeignModuleDeclContext.prototype.constructor = ForeignModuleDeclContext;

ForeignModuleDeclContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

ForeignModuleDeclContext.prototype.foreignModuleBody = function() {
    return this.getTypedRuleContext(ForeignModuleBodyContext,0);
};

ForeignModuleDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterForeignModuleDecl(this);
	}
};

ForeignModuleDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitForeignModuleDecl(this);
	}
};




HospitalSchemaParser.ForeignModuleDeclContext = ForeignModuleDeclContext;

HospitalSchemaParser.prototype.foreignModuleDecl = function() {

    var localctx = new ForeignModuleDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, HospitalSchemaParser.RULE_foreignModuleDecl);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 339;
        this.match(HospitalSchemaParser.T__3);
        this.state = 340;
        this.match(HospitalSchemaParser.ID);
        this.state = 341;
        this.match(HospitalSchemaParser.T__10);
        this.state = 342;
        this.match(HospitalSchemaParser.T__1);
        this.state = 343;
        this.foreignModuleBody();
        this.state = 344;
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
};

function ForeignModuleBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleBody;
    return this;
}

ForeignModuleBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ForeignModuleBodyContext.prototype.constructor = ForeignModuleBodyContext;

ForeignModuleBodyContext.prototype.foreignModuleItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ForeignModuleItemContext);
    } else {
        return this.getTypedRuleContext(ForeignModuleItemContext,i);
    }
};

ForeignModuleBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterForeignModuleBody(this);
	}
};

ForeignModuleBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitForeignModuleBody(this);
	}
};




HospitalSchemaParser.ForeignModuleBodyContext = ForeignModuleBodyContext;

HospitalSchemaParser.prototype.foreignModuleBody = function() {

    var localctx = new ForeignModuleBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, HospitalSchemaParser.RULE_foreignModuleBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 347; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 346;
            this.foreignModuleItem();
            this.state = 349; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(((((_la - 24)) & ~0x1f) == 0 && ((1 << (_la - 24)) & ((1 << (HospitalSchemaParser.T__23 - 24)) | (1 << (HospitalSchemaParser.T__45 - 24)) | (1 << (HospitalSchemaParser.T__46 - 24)) | (1 << (HospitalSchemaParser.T__47 - 24)) | (1 << (HospitalSchemaParser.T__48 - 24)))) !== 0));
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
};

function ForeignModuleItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_foreignModuleItem;
    return this;
}

ForeignModuleItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ForeignModuleItemContext.prototype.constructor = ForeignModuleItemContext;

ForeignModuleItemContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


ForeignModuleItemContext.prototype.apisBlock = function() {
    return this.getTypedRuleContext(ApisBlockContext,0);
};

ForeignModuleItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterForeignModuleItem(this);
	}
};

ForeignModuleItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitForeignModuleItem(this);
	}
};




HospitalSchemaParser.ForeignModuleItemContext = ForeignModuleItemContext;

HospitalSchemaParser.prototype.foreignModuleItem = function() {

    var localctx = new ForeignModuleItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, HospitalSchemaParser.RULE_foreignModuleItem);
    var _la = 0; // Token type
    try {
        this.state = 371;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__45:
            this.enterOuterAlt(localctx, 1);
            this.state = 351;
            this.match(HospitalSchemaParser.T__45);
            this.state = 352;
            this.match(HospitalSchemaParser.ID);
            this.state = 353;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__46:
            this.enterOuterAlt(localctx, 2);
            this.state = 354;
            this.match(HospitalSchemaParser.T__46);
            this.state = 355;
            this.match(HospitalSchemaParser.ID);
            this.state = 356;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__47:
            this.enterOuterAlt(localctx, 3);
            this.state = 357;
            this.match(HospitalSchemaParser.T__47);
            this.state = 358;
            this.match(HospitalSchemaParser.ID);
            this.state = 363;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 359;
                this.match(HospitalSchemaParser.T__20);
                this.state = 360;
                this.match(HospitalSchemaParser.ID);
                this.state = 365;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 366;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__48:
            this.enterOuterAlt(localctx, 4);
            this.state = 367;
            this.match(HospitalSchemaParser.T__48);
            this.state = 368;
            this.match(HospitalSchemaParser.ID);
            this.state = 369;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__23:
            this.enterOuterAlt(localctx, 5);
            this.state = 370;
            this.apisBlock();
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
};

function RoleDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_roleDecl;
    return this;
}

RoleDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RoleDeclContext.prototype.constructor = RoleDeclContext;

RoleDeclContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

RoleDeclContext.prototype.roleBody = function() {
    return this.getTypedRuleContext(RoleBodyContext,0);
};

RoleDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterRoleDecl(this);
	}
};

RoleDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitRoleDecl(this);
	}
};




HospitalSchemaParser.RoleDeclContext = RoleDeclContext;

HospitalSchemaParser.prototype.roleDecl = function() {

    var localctx = new RoleDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, HospitalSchemaParser.RULE_roleDecl);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 373;
        this.match(HospitalSchemaParser.T__49);
        this.state = 374;
        this.match(HospitalSchemaParser.ID);
        this.state = 375;
        this.match(HospitalSchemaParser.T__1);
        this.state = 376;
        this.roleBody();
        this.state = 377;
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
};

function RoleBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_roleBody;
    return this;
}

RoleBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RoleBodyContext.prototype.constructor = RoleBodyContext;

RoleBodyContext.prototype.roleItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RoleItemContext);
    } else {
        return this.getTypedRuleContext(RoleItemContext,i);
    }
};

RoleBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterRoleBody(this);
	}
};

RoleBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitRoleBody(this);
	}
};




HospitalSchemaParser.RoleBodyContext = RoleBodyContext;

HospitalSchemaParser.prototype.roleBody = function() {

    var localctx = new RoleBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, HospitalSchemaParser.RULE_roleBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 382;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalSchemaParser.T__50) {
            this.state = 379;
            this.roleItem();
            this.state = 384;
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
};

function RoleItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_roleItem;
    return this;
}

RoleItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RoleItemContext.prototype.constructor = RoleItemContext;

RoleItemContext.prototype.ID = function() {
    return this.getToken(HospitalSchemaParser.ID, 0);
};

RoleItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterRoleItem(this);
	}
};

RoleItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitRoleItem(this);
	}
};




HospitalSchemaParser.RoleItemContext = RoleItemContext;

HospitalSchemaParser.prototype.roleItem = function() {

    var localctx = new RoleItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, HospitalSchemaParser.RULE_roleItem);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 385;
        this.match(HospitalSchemaParser.T__50);
        this.state = 386;
        this.match(HospitalSchemaParser.ID);
        this.state = 387;
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
};

function AuthDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_authDecl;
    return this;
}

AuthDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthDeclContext.prototype.constructor = AuthDeclContext;

AuthDeclContext.prototype.authBody = function() {
    return this.getTypedRuleContext(AuthBodyContext,0);
};

AuthDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterAuthDecl(this);
	}
};

AuthDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitAuthDecl(this);
	}
};




HospitalSchemaParser.AuthDeclContext = AuthDeclContext;

HospitalSchemaParser.prototype.authDecl = function() {

    var localctx = new AuthDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, HospitalSchemaParser.RULE_authDecl);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 389;
        this.match(HospitalSchemaParser.T__51);
        this.state = 390;
        this.match(HospitalSchemaParser.T__1);
        this.state = 391;
        this.authBody();
        this.state = 392;
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
};

function AuthBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_authBody;
    return this;
}

AuthBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthBodyContext.prototype.constructor = AuthBodyContext;

AuthBodyContext.prototype.authItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AuthItemContext);
    } else {
        return this.getTypedRuleContext(AuthItemContext,i);
    }
};

AuthBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterAuthBody(this);
	}
};

AuthBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitAuthBody(this);
	}
};




HospitalSchemaParser.AuthBodyContext = AuthBodyContext;

HospitalSchemaParser.prototype.authBody = function() {

    var localctx = new AuthBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, HospitalSchemaParser.RULE_authBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 395; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 394;
            this.authItem();
            this.state = 397; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(((((_la - 53)) & ~0x1f) == 0 && ((1 << (_la - 53)) & ((1 << (HospitalSchemaParser.T__52 - 53)) | (1 << (HospitalSchemaParser.T__53 - 53)) | (1 << (HospitalSchemaParser.T__54 - 53)))) !== 0));
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
};

function AuthItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalSchemaParser.RULE_authItem;
    return this;
}

AuthItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthItemContext.prototype.constructor = AuthItemContext;

AuthItemContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalSchemaParser.ID);
    } else {
        return this.getToken(HospitalSchemaParser.ID, i);
    }
};


AuthItemContext.prototype.STRING = function() {
    return this.getToken(HospitalSchemaParser.STRING, 0);
};

AuthItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.enterAuthItem(this);
	}
};

AuthItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalSchemaListener ) {
        listener.exitAuthItem(this);
	}
};




HospitalSchemaParser.AuthItemContext = AuthItemContext;

HospitalSchemaParser.prototype.authItem = function() {

    var localctx = new AuthItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, HospitalSchemaParser.RULE_authItem);
    var _la = 0; // Token type
    try {
        this.state = 415;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalSchemaParser.T__52:
            this.enterOuterAlt(localctx, 1);
            this.state = 399;
            this.match(HospitalSchemaParser.T__52);
            this.state = 400;
            this.match(HospitalSchemaParser.ID);
            this.state = 401;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__53:
            this.enterOuterAlt(localctx, 2);
            this.state = 402;
            this.match(HospitalSchemaParser.T__53);
            this.state = 403;
            this.match(HospitalSchemaParser.STRING);
            this.state = 404;
            this.match(HospitalSchemaParser.T__5);
            break;
        case HospitalSchemaParser.T__54:
            this.enterOuterAlt(localctx, 3);
            this.state = 405;
            this.match(HospitalSchemaParser.T__54);
            this.state = 406;
            this.match(HospitalSchemaParser.ID);
            this.state = 411;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HospitalSchemaParser.T__20) {
                this.state = 407;
                this.match(HospitalSchemaParser.T__20);
                this.state = 408;
                this.match(HospitalSchemaParser.ID);
                this.state = 413;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 414;
            this.match(HospitalSchemaParser.T__5);
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
};


exports.HospitalSchemaParser = HospitalSchemaParser;
