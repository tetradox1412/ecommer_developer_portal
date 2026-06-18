// Generated from HospitalViews.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var HospitalViewsListener = require('./HospitalViewsListener').HospitalViewsListener;
var grammarFileName = "HospitalViews.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00030\u01a3\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004",
    "\u001f\t\u001f\u0004 \t \u0004!\t!\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0007\u0002F\n\u0002\f\u0002\u000e\u0002I\u000b\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0007\u0004T\n\u0004\f\u0004\u000e\u0004W\u000b\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0007\u0005_\n\u0005\f\u0005\u000e\u0005b\u000b\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005",
    "\u0006q\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007v\n\u0007",
    "\f\u0007\u000e\u0007y\u000b\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0007",
    "\b\u007f\n\b\f\b\u000e\b\u0082\u000b\b\u0003\b\u0003\b\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0005\t\u008b\n\t\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0007\n\u0091\n\n\f\n\u000e\n\u0094\u000b\n\u0003\n\u0003\n",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0005\u000b\u009f\n\u000b\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0005\f\u00a7\n\f\u0003\r\u0003\r\u0005\r\u00ab\n",
    "\r\u0003\r\u0003\r\u0007\r\u00af\n\r\f\r\u000e\r\u00b2\u000b\r\u0003",
    "\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0005\u000e\u00c1\n\u000e\u0003\u000f\u0003\u000f\u0005\u000f\u00c5",
    "\n\u000f\u0003\u000f\u0003\u000f\u0007\u000f\u00c9\n\u000f\f\u000f\u000e",
    "\u000f\u00cc\u000b\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u00e8\n",
    "\u0010\u0003\u0011\u0003\u0011\u0005\u0011\u00ec\n\u0011\u0003\u0011",
    "\u0003\u0011\u0007\u0011\u00f0\n\u0011\f\u0011\u000e\u0011\u00f3\u000b",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0005\u0012\u0101\n\u0012\u0003\u0013\u0003\u0013\u0005\u0013",
    "\u0105\n\u0013\u0003\u0013\u0003\u0013\u0007\u0013\u0109\n\u0013\f\u0013",
    "\u000e\u0013\u010c\u000b\u0013\u0003\u0013\u0003\u0013\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0005\u0015\u0116",
    "\n\u0015\u0003\u0015\u0003\u0015\u0007\u0015\u011a\n\u0015\f\u0015\u000e",
    "\u0015\u011d\u000b\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u0132\n\u0016\u0003",
    "\u0017\u0003\u0017\u0005\u0017\u0136\n\u0017\u0003\u0017\u0003\u0017",
    "\u0007\u0017\u013a\n\u0017\f\u0017\u000e\u0017\u013d\u000b\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003",
    "\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003",
    "\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0005",
    "\u0018\u0151\n\u0018\u0003\u0019\u0003\u0019\u0003\u0019\u0007\u0019",
    "\u0156\n\u0019\f\u0019\u000e\u0019\u0159\u000b\u0019\u0003\u0019\u0003",
    "\u0019\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003",
    "\u001a\u0003\u001a\u0003\u001a\u0005\u001a\u0165\n\u001a\u0003\u001b",
    "\u0003\u001b\u0003\u001b\u0007\u001b\u016a\n\u001b\f\u001b\u000e\u001b",
    "\u016d\u000b\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003",
    "\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0005",
    "\u001c\u0179\n\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d",
    "\u0007\u001d\u017f\n\u001d\f\u001d\u000e\u001d\u0182\u000b\u001d\u0003",
    "\u001d\u0003\u001d\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003",
    "\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0005\u001e\u018e\n\u001e",
    "\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0005\u001f",
    "\u0195\n\u001f\u0003 \u0003 \u0003 \u0007 \u019a\n \f \u000e \u019d",
    "\u000b \u0003!\u0003!\u0003!\u0003!\u0003!\u0002\u0002\"\u0002\u0004",
    "\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e ",
    "\"$&(*,.02468:<>@\u0002\u0002\u0002\u01bc\u0002B\u0003\u0002\u0002\u0002",
    "\u0004L\u0003\u0002\u0002\u0002\u0006P\u0003\u0002\u0002\u0002\bZ\u0003",
    "\u0002\u0002\u0002\np\u0003\u0002\u0002\u0002\fr\u0003\u0002\u0002\u0002",
    "\u000ez\u0003\u0002\u0002\u0002\u0010\u008a\u0003\u0002\u0002\u0002",
    "\u0012\u008c\u0003\u0002\u0002\u0002\u0014\u009e\u0003\u0002\u0002\u0002",
    "\u0016\u00a6\u0003\u0002\u0002\u0002\u0018\u00a8\u0003\u0002\u0002\u0002",
    "\u001a\u00c0\u0003\u0002\u0002\u0002\u001c\u00c2\u0003\u0002\u0002\u0002",
    "\u001e\u00e7\u0003\u0002\u0002\u0002 \u00e9\u0003\u0002\u0002\u0002",
    "\"\u0100\u0003\u0002\u0002\u0002$\u0102\u0003\u0002\u0002\u0002&\u010f",
    "\u0003\u0002\u0002\u0002(\u0113\u0003\u0002\u0002\u0002*\u0131\u0003",
    "\u0002\u0002\u0002,\u0133\u0003\u0002\u0002\u0002.\u0150\u0003\u0002",
    "\u0002\u00020\u0152\u0003\u0002\u0002\u00022\u0164\u0003\u0002\u0002",
    "\u00024\u0166\u0003\u0002\u0002\u00026\u0178\u0003\u0002\u0002\u0002",
    "8\u017a\u0003\u0002\u0002\u0002:\u0185\u0003\u0002\u0002\u0002<\u0194",
    "\u0003\u0002\u0002\u0002>\u0196\u0003\u0002\u0002\u0002@\u019e\u0003",
    "\u0002\u0002\u0002BC\u0005\u0004\u0003\u0002CG\u0005\u0006\u0004\u0002",
    "DF\u0005\u000e\b\u0002ED\u0003\u0002\u0002\u0002FI\u0003\u0002\u0002",
    "\u0002GE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HJ\u0003\u0002",
    "\u0002\u0002IG\u0003\u0002\u0002\u0002JK\u0007\u0002\u0002\u0003K\u0003",
    "\u0003\u0002\u0002\u0002LM\u0007\u0003\u0002\u0002MN\u0007.\u0002\u0002",
    "NO\u0007\u0004\u0002\u0002O\u0005\u0003\u0002\u0002\u0002PQ\u0007\u0005",
    "\u0002\u0002QU\u0007\u0006\u0002\u0002RT\u0005\b\u0005\u0002SR\u0003",
    "\u0002\u0002\u0002TW\u0003\u0002\u0002\u0002US\u0003\u0002\u0002\u0002",
    "UV\u0003\u0002\u0002\u0002VX\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002",
    "\u0002XY\u0007\u0007\u0002\u0002Y\u0007\u0003\u0002\u0002\u0002Z[\u0007",
    "\b\u0002\u0002[\\\u0007.\u0002\u0002\\`\u0007\u0006\u0002\u0002]_\u0005",
    "\n\u0006\u0002^]\u0003\u0002\u0002\u0002_b\u0003\u0002\u0002\u0002`",
    "^\u0003\u0002\u0002\u0002`a\u0003\u0002\u0002\u0002ac\u0003\u0002\u0002",
    "\u0002b`\u0003\u0002\u0002\u0002cd\u0007\u0007\u0002\u0002d\t\u0003",
    "\u0002\u0002\u0002ef\u0007\t\u0002\u0002fg\u0005\f\u0007\u0002gh\u0007",
    "\u0004\u0002\u0002hq\u0003\u0002\u0002\u0002ij\u0007\n\u0002\u0002j",
    "k\u0007,\u0002\u0002kq\u0007\u0004\u0002\u0002lm\u0007\u000b\u0002\u0002",
    "mn\u0005\f\u0007\u0002no\u0007\u0004\u0002\u0002oq\u0003\u0002\u0002",
    "\u0002pe\u0003\u0002\u0002\u0002pi\u0003\u0002\u0002\u0002pl\u0003\u0002",
    "\u0002\u0002q\u000b\u0003\u0002\u0002\u0002rw\u0007-\u0002\u0002st\u0007",
    "\f\u0002\u0002tv\u0007-\u0002\u0002us\u0003\u0002\u0002\u0002vy\u0003",
    "\u0002\u0002\u0002wu\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002",
    "x\r\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002z{\u0007\r\u0002",
    "\u0002{|\u0007-\u0002\u0002|\u0080\u0007\u0006\u0002\u0002}\u007f\u0005",
    "\u0010\t\u0002~}\u0003\u0002\u0002\u0002\u007f\u0082\u0003\u0002\u0002",
    "\u0002\u0080~\u0003\u0002\u0002\u0002\u0080\u0081\u0003\u0002\u0002",
    "\u0002\u0081\u0083\u0003\u0002\u0002\u0002\u0082\u0080\u0003\u0002\u0002",
    "\u0002\u0083\u0084\u0007\u0007\u0002\u0002\u0084\u000f\u0003\u0002\u0002",
    "\u0002\u0085\u0086\u0007\u000e\u0002\u0002\u0086\u0087\u0005\f\u0007",
    "\u0002\u0087\u0088\u0007\u0004\u0002\u0002\u0088\u008b\u0003\u0002\u0002",
    "\u0002\u0089\u008b\u0005\u0012\n\u0002\u008a\u0085\u0003\u0002\u0002",
    "\u0002\u008a\u0089\u0003\u0002\u0002\u0002\u008b\u0011\u0003\u0002\u0002",
    "\u0002\u008c\u008d\u0007\u000f\u0002\u0002\u008d\u008e\u0007-\u0002",
    "\u0002\u008e\u0092\u0007\u0006\u0002\u0002\u008f\u0091\u0005\u0014\u000b",
    "\u0002\u0090\u008f\u0003\u0002\u0002\u0002\u0091\u0094\u0003\u0002\u0002",
    "\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0092\u0093\u0003\u0002\u0002",
    "\u0002\u0093\u0095\u0003\u0002\u0002\u0002\u0094\u0092\u0003\u0002\u0002",
    "\u0002\u0095\u0096\u0007\u0007\u0002\u0002\u0096\u0013\u0003\u0002\u0002",
    "\u0002\u0097\u0098\u0007\u0010\u0002\u0002\u0098\u0099\u0007.\u0002",
    "\u0002\u0099\u009f\u0007\u0004\u0002\u0002\u009a\u009b\u0007\u0011\u0002",
    "\u0002\u009b\u009c\u0007.\u0002\u0002\u009c\u009f\u0007\u0004\u0002",
    "\u0002\u009d\u009f\u0005\u0016\f\u0002\u009e\u0097\u0003\u0002\u0002",
    "\u0002\u009e\u009a\u0003\u0002\u0002\u0002\u009e\u009d\u0003\u0002\u0002",
    "\u0002\u009f\u0015\u0003\u0002\u0002\u0002\u00a0\u00a7\u0005\u0018\r",
    "\u0002\u00a1\u00a7\u0005\u001c\u000f\u0002\u00a2\u00a7\u0005 \u0011",
    "\u0002\u00a3\u00a7\u0005$\u0013\u0002\u00a4\u00a7\u0005(\u0015\u0002",
    "\u00a5\u00a7\u0005,\u0017\u0002\u00a6\u00a0\u0003\u0002\u0002\u0002",
    "\u00a6\u00a1\u0003\u0002\u0002\u0002\u00a6\u00a2\u0003\u0002\u0002\u0002",
    "\u00a6\u00a3\u0003\u0002\u0002\u0002\u00a6\u00a4\u0003\u0002\u0002\u0002",
    "\u00a6\u00a5\u0003\u0002\u0002\u0002\u00a7\u0017\u0003\u0002\u0002\u0002",
    "\u00a8\u00aa\u0007\u0012\u0002\u0002\u00a9\u00ab\u0007-\u0002\u0002",
    "\u00aa\u00a9\u0003\u0002\u0002\u0002\u00aa\u00ab\u0003\u0002\u0002\u0002",
    "\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00b0\u0007\u0006\u0002\u0002",
    "\u00ad\u00af\u0005\u001a\u000e\u0002\u00ae\u00ad\u0003\u0002\u0002\u0002",
    "\u00af\u00b2\u0003\u0002\u0002\u0002\u00b0\u00ae\u0003\u0002\u0002\u0002",
    "\u00b0\u00b1\u0003\u0002\u0002\u0002\u00b1\u00b3\u0003\u0002\u0002\u0002",
    "\u00b2\u00b0\u0003\u0002\u0002\u0002\u00b3\u00b4\u0007\u0007\u0002\u0002",
    "\u00b4\u0019\u0003\u0002\u0002\u0002\u00b5\u00b6\u0007\u0013\u0002\u0002",
    "\u00b6\u00b7\u0005@!\u0002\u00b7\u00b8\u0007\u0004\u0002\u0002\u00b8",
    "\u00c1\u0003\u0002\u0002\u0002\u00b9\u00ba\u0007\u0014\u0002\u0002\u00ba",
    "\u00bb\u0005\f\u0007\u0002\u00bb\u00bc\u0007\u0004\u0002\u0002\u00bc",
    "\u00c1\u0003\u0002\u0002\u0002\u00bd\u00c1\u00050\u0019\u0002\u00be",
    "\u00c1\u00054\u001b\u0002\u00bf\u00c1\u00058\u001d\u0002\u00c0\u00b5",
    "\u0003\u0002\u0002\u0002\u00c0\u00b9\u0003\u0002\u0002\u0002\u00c0\u00bd",
    "\u0003\u0002\u0002\u0002\u00c0\u00be\u0003\u0002\u0002\u0002\u00c0\u00bf",
    "\u0003\u0002\u0002\u0002\u00c1\u001b\u0003\u0002\u0002\u0002\u00c2\u00c4",
    "\u0007\u0015\u0002\u0002\u00c3\u00c5\u0007-\u0002\u0002\u00c4\u00c3",
    "\u0003\u0002\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002\u00c5\u00c6",
    "\u0003\u0002\u0002\u0002\u00c6\u00ca\u0007\u0006\u0002\u0002\u00c7\u00c9",
    "\u0005\u001e\u0010\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c9\u00cc",
    "\u0003\u0002\u0002\u0002\u00ca\u00c8\u0003\u0002\u0002\u0002\u00ca\u00cb",
    "\u0003\u0002\u0002\u0002\u00cb\u00cd\u0003\u0002\u0002\u0002\u00cc\u00ca",
    "\u0003\u0002\u0002\u0002\u00cd\u00ce\u0007\u0007\u0002\u0002\u00ce\u001d",
    "\u0003\u0002\u0002\u0002\u00cf\u00d0\u0007\u0013\u0002\u0002\u00d0\u00d1",
    "\u0005@!\u0002\u00d1\u00d2\u0007\u0004\u0002\u0002\u00d2\u00e8\u0003",
    "\u0002\u0002\u0002\u00d3\u00d4\u0007\u0016\u0002\u0002\u00d4\u00d5\u0005",
    "@!\u0002\u00d5\u00d6\u0007\u0004\u0002\u0002\u00d6\u00e8\u0003\u0002",
    "\u0002\u0002\u00d7\u00d8\u0007\u0017\u0002\u0002\u00d8\u00d9\u0005\f",
    "\u0007\u0002\u00d9\u00da\u0007\u0004\u0002\u0002\u00da\u00e8\u0003\u0002",
    "\u0002\u0002\u00db\u00dc\u0007\u0018\u0002\u0002\u00dc\u00dd\u0005<",
    "\u001f\u0002\u00dd\u00de\u0007\u0004\u0002\u0002\u00de\u00e8\u0003\u0002",
    "\u0002\u0002\u00df\u00e0\u0007\u0019\u0002\u0002\u00e0\u00e1\u0007-",
    "\u0002\u0002\u00e1\u00e2\u0007\u0006\u0002\u0002\u00e2\u00e3\u0007\u0013",
    "\u0002\u0002\u00e3\u00e4\u0005@!\u0002\u00e4\u00e5\u0007\u0004\u0002",
    "\u0002\u00e5\u00e6\u0007\u0007\u0002\u0002\u00e6\u00e8\u0003\u0002\u0002",
    "\u0002\u00e7\u00cf\u0003\u0002\u0002\u0002\u00e7\u00d3\u0003\u0002\u0002",
    "\u0002\u00e7\u00d7\u0003\u0002\u0002\u0002\u00e7\u00db\u0003\u0002\u0002",
    "\u0002\u00e7\u00df\u0003\u0002\u0002\u0002\u00e8\u001f\u0003\u0002\u0002",
    "\u0002\u00e9\u00eb\u0007\u001a\u0002\u0002\u00ea\u00ec\u0007-\u0002",
    "\u0002\u00eb\u00ea\u0003\u0002\u0002\u0002\u00eb\u00ec\u0003\u0002\u0002",
    "\u0002\u00ec\u00ed\u0003\u0002\u0002\u0002\u00ed\u00f1\u0007\u0006\u0002",
    "\u0002\u00ee\u00f0\u0005\"\u0012\u0002\u00ef\u00ee\u0003\u0002\u0002",
    "\u0002\u00f0\u00f3\u0003\u0002\u0002\u0002\u00f1\u00ef\u0003\u0002\u0002",
    "\u0002\u00f1\u00f2\u0003\u0002\u0002\u0002\u00f2\u00f4\u0003\u0002\u0002",
    "\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002\u00f4\u00f5\u0007\u0007\u0002",
    "\u0002\u00f5!\u0003\u0002\u0002\u0002\u00f6\u00f7\u0007\u0013\u0002",
    "\u0002\u00f7\u00f8\u0005@!\u0002\u00f8\u00f9\u0007\u0004\u0002\u0002",
    "\u00f9\u0101\u0003\u0002\u0002\u0002\u00fa\u00fb\u0007\u0017\u0002\u0002",
    "\u00fb\u00fc\u0005\f\u0007\u0002\u00fc\u00fd\u0007\u0004\u0002\u0002",
    "\u00fd\u0101\u0003\u0002\u0002\u0002\u00fe\u0101\u00054\u001b\u0002",
    "\u00ff\u0101\u00058\u001d\u0002\u0100\u00f6\u0003\u0002\u0002\u0002",
    "\u0100\u00fa\u0003\u0002\u0002\u0002\u0100\u00fe\u0003\u0002\u0002\u0002",
    "\u0100\u00ff\u0003\u0002\u0002\u0002\u0101#\u0003\u0002\u0002\u0002",
    "\u0102\u0104\u0007\u001b\u0002\u0002\u0103\u0105\u0007-\u0002\u0002",
    "\u0104\u0103\u0003\u0002\u0002\u0002\u0104\u0105\u0003\u0002\u0002\u0002",
    "\u0105\u0106\u0003\u0002\u0002\u0002\u0106\u010a\u0007\u0006\u0002\u0002",
    "\u0107\u0109\u0005&\u0014\u0002\u0108\u0107\u0003\u0002\u0002\u0002",
    "\u0109\u010c\u0003\u0002\u0002\u0002\u010a\u0108\u0003\u0002\u0002\u0002",
    "\u010a\u010b\u0003\u0002\u0002\u0002\u010b\u010d\u0003\u0002\u0002\u0002",
    "\u010c\u010a\u0003\u0002\u0002\u0002\u010d\u010e\u0007\u0007\u0002\u0002",
    "\u010e%\u0003\u0002\u0002\u0002\u010f\u0110\u0007\u001c\u0002\u0002",
    "\u0110\u0111\u0005> \u0002\u0111\u0112\u0007\u0004\u0002\u0002\u0112",
    "\'\u0003\u0002\u0002\u0002\u0113\u0115\u0007\u001d\u0002\u0002\u0114",
    "\u0116\u0007-\u0002\u0002\u0115\u0114\u0003\u0002\u0002\u0002\u0115",
    "\u0116\u0003\u0002\u0002\u0002\u0116\u0117\u0003\u0002\u0002\u0002\u0117",
    "\u011b\u0007\u0006\u0002\u0002\u0118\u011a\u0005*\u0016\u0002\u0119",
    "\u0118\u0003\u0002\u0002\u0002\u011a\u011d\u0003\u0002\u0002\u0002\u011b",
    "\u0119\u0003\u0002\u0002\u0002\u011b\u011c\u0003\u0002\u0002\u0002\u011c",
    "\u011e\u0003\u0002\u0002\u0002\u011d\u011b\u0003\u0002\u0002\u0002\u011e",
    "\u011f\u0007\u0007\u0002\u0002\u011f)\u0003\u0002\u0002\u0002\u0120",
    "\u0121\u0007\u0013\u0002\u0002\u0121\u0122\u0005@!\u0002\u0122\u0123",
    "\u0007\u0004\u0002\u0002\u0123\u0132\u0003\u0002\u0002\u0002\u0124\u0125",
    "\u0007\u001e\u0002\u0002\u0125\u0126\u0007-\u0002\u0002\u0126\u0132",
    "\u0007\u0004\u0002\u0002\u0127\u0128\u0007\u001f\u0002\u0002\u0128\u0129",
    "\u0005@!\u0002\u0129\u012a\u0007\u0004\u0002\u0002\u012a\u0132\u0003",
    "\u0002\u0002\u0002\u012b\u012c\u0007 \u0002\u0002\u012c\u012d\u0005",
    "\f\u0007\u0002\u012d\u012e\u0007\u0004\u0002\u0002\u012e\u0132\u0003",
    "\u0002\u0002\u0002\u012f\u0132\u00050\u0019\u0002\u0130\u0132\u0005",
    "8\u001d\u0002\u0131\u0120\u0003\u0002\u0002\u0002\u0131\u0124\u0003",
    "\u0002\u0002\u0002\u0131\u0127\u0003\u0002\u0002\u0002\u0131\u012b\u0003",
    "\u0002\u0002\u0002\u0131\u012f\u0003\u0002\u0002\u0002\u0131\u0130\u0003",
    "\u0002\u0002\u0002\u0132+\u0003\u0002\u0002\u0002\u0133\u0135\u0007",
    "!\u0002\u0002\u0134\u0136\u0007-\u0002\u0002\u0135\u0134\u0003\u0002",
    "\u0002\u0002\u0135\u0136\u0003\u0002\u0002\u0002\u0136\u0137\u0003\u0002",
    "\u0002\u0002\u0137\u013b\u0007\u0006\u0002\u0002\u0138\u013a\u0005.",
    "\u0018\u0002\u0139\u0138\u0003\u0002\u0002\u0002\u013a\u013d\u0003\u0002",
    "\u0002\u0002\u013b\u0139\u0003\u0002\u0002\u0002\u013b\u013c\u0003\u0002",
    "\u0002\u0002\u013c\u013e\u0003\u0002\u0002\u0002\u013d\u013b\u0003\u0002",
    "\u0002\u0002\u013e\u013f\u0007\u0007\u0002\u0002\u013f-\u0003\u0002",
    "\u0002\u0002\u0140\u0141\u0007\u0013\u0002\u0002\u0141\u0142\u0005@",
    "!\u0002\u0142\u0143\u0007\u0004\u0002\u0002\u0143\u0151\u0003\u0002",
    "\u0002\u0002\u0144\u0145\u0007\"\u0002\u0002\u0145\u0146\u0007-\u0002",
    "\u0002\u0146\u0151\u0007\u0004\u0002\u0002\u0147\u0148\u0007\u001f\u0002",
    "\u0002\u0148\u0149\u0005@!\u0002\u0149\u014a\u0007\u0004\u0002\u0002",
    "\u014a\u0151\u0003\u0002\u0002\u0002\u014b\u014c\u0007#\u0002\u0002",
    "\u014c\u014d\u0007-\u0002\u0002\u014d\u0151\u0007\u0004\u0002\u0002",
    "\u014e\u0151\u00050\u0019\u0002\u014f\u0151\u00058\u001d\u0002\u0150",
    "\u0140\u0003\u0002\u0002\u0002\u0150\u0144\u0003\u0002\u0002\u0002\u0150",
    "\u0147\u0003\u0002\u0002\u0002\u0150\u014b\u0003\u0002\u0002\u0002\u0150",
    "\u014e\u0003\u0002\u0002\u0002\u0150\u014f\u0003\u0002\u0002\u0002\u0151",
    "/\u0003\u0002\u0002\u0002\u0152\u0153\u0007$\u0002\u0002\u0153\u0157",
    "\u0007\u0006\u0002\u0002\u0154\u0156\u00052\u001a\u0002\u0155\u0154",
    "\u0003\u0002\u0002\u0002\u0156\u0159\u0003\u0002\u0002\u0002\u0157\u0155",
    "\u0003\u0002\u0002\u0002\u0157\u0158\u0003\u0002\u0002\u0002\u0158\u015a",
    "\u0003\u0002\u0002\u0002\u0159\u0157\u0003\u0002\u0002\u0002\u015a\u015b",
    "\u0007\u0007\u0002\u0002\u015b1\u0003\u0002\u0002\u0002\u015c\u015d",
    "\u0007%\u0002\u0002\u015d\u015e\u0005@!\u0002\u015e\u015f\u0007\u0004",
    "\u0002\u0002\u015f\u0165\u0003\u0002\u0002\u0002\u0160\u0161\u0007\u0017",
    "\u0002\u0002\u0161\u0162\u0005\f\u0007\u0002\u0162\u0163\u0007\u0004",
    "\u0002\u0002\u0163\u0165\u0003\u0002\u0002\u0002\u0164\u015c\u0003\u0002",
    "\u0002\u0002\u0164\u0160\u0003\u0002\u0002\u0002\u01653\u0003\u0002",
    "\u0002\u0002\u0166\u0167\u0007&\u0002\u0002\u0167\u016b\u0007\u0006",
    "\u0002\u0002\u0168\u016a\u00056\u001c\u0002\u0169\u0168\u0003\u0002",
    "\u0002\u0002\u016a\u016d\u0003\u0002\u0002\u0002\u016b\u0169\u0003\u0002",
    "\u0002\u0002\u016b\u016c\u0003\u0002\u0002\u0002\u016c\u016e\u0003\u0002",
    "\u0002\u0002\u016d\u016b\u0003\u0002\u0002\u0002\u016e\u016f\u0007\u0007",
    "\u0002\u0002\u016f5\u0003\u0002\u0002\u0002\u0170\u0171\u0007\u0016",
    "\u0002\u0002\u0171\u0172\u0005@!\u0002\u0172\u0173\u0007\u0004\u0002",
    "\u0002\u0173\u0179\u0003\u0002\u0002\u0002\u0174\u0175\u0007\u0017\u0002",
    "\u0002\u0175\u0176\u0005\f\u0007\u0002\u0176\u0177\u0007\u0004\u0002",
    "\u0002\u0177\u0179\u0003\u0002\u0002\u0002\u0178\u0170\u0003\u0002\u0002",
    "\u0002\u0178\u0174\u0003\u0002\u0002\u0002\u01797\u0003\u0002\u0002",
    "\u0002\u017a\u017b\u0007\'\u0002\u0002\u017b\u0180\u0005:\u001e\u0002",
    "\u017c\u017d\u0007\f\u0002\u0002\u017d\u017f\u0005:\u001e\u0002\u017e",
    "\u017c\u0003\u0002\u0002\u0002\u017f\u0182\u0003\u0002\u0002\u0002\u0180",
    "\u017e\u0003\u0002\u0002\u0002\u0180\u0181\u0003\u0002\u0002\u0002\u0181",
    "\u0183\u0003\u0002\u0002\u0002\u0182\u0180\u0003\u0002\u0002\u0002\u0183",
    "\u0184\u0007\u0004\u0002\u0002\u01849\u0003\u0002\u0002\u0002\u0185",
    "\u0186\u0005@!\u0002\u0186\u018d\u0007.\u0002\u0002\u0187\u0188\u0007",
    "\u0006\u0002\u0002\u0188\u0189\u0007\u0018\u0002\u0002\u0189\u018a\u0005",
    "<\u001f\u0002\u018a\u018b\u0007\u0004\u0002\u0002\u018b\u018c\u0007",
    "\u0007\u0002\u0002\u018c\u018e\u0003\u0002\u0002\u0002\u018d\u0187\u0003",
    "\u0002\u0002\u0002\u018d\u018e\u0003\u0002\u0002\u0002\u018e;\u0003",
    "\u0002\u0002\u0002\u018f\u0195\u0007(\u0002\u0002\u0190\u0191\u0007",
    ")\u0002\u0002\u0191\u0195\u0007.\u0002\u0002\u0192\u0193\u0007*\u0002",
    "\u0002\u0193\u0195\u0007.\u0002\u0002\u0194\u018f\u0003\u0002\u0002",
    "\u0002\u0194\u0190\u0003\u0002\u0002\u0002\u0194\u0192\u0003\u0002\u0002",
    "\u0002\u0195=\u0003\u0002\u0002\u0002\u0196\u019b\u0005@!\u0002\u0197",
    "\u0198\u0007\f\u0002\u0002\u0198\u019a\u0005@!\u0002\u0199\u0197\u0003",
    "\u0002\u0002\u0002\u019a\u019d\u0003\u0002\u0002\u0002\u019b\u0199\u0003",
    "\u0002\u0002\u0002\u019b\u019c\u0003\u0002\u0002\u0002\u019c?\u0003",
    "\u0002\u0002\u0002\u019d\u019b\u0003\u0002\u0002\u0002\u019e\u019f\u0007",
    "-\u0002\u0002\u019f\u01a0\u0007+\u0002\u0002\u01a0\u01a1\u0007-\u0002",
    "\u0002\u01a1A\u0003\u0002\u0002\u0002%GU`pw\u0080\u008a\u0092\u009e",
    "\u00a6\u00aa\u00b0\u00c0\u00c4\u00ca\u00e7\u00eb\u00f1\u0100\u0104\u010a",
    "\u0115\u011b\u0131\u0135\u013b\u0150\u0157\u0164\u016b\u0178\u0180\u018d",
    "\u0194\u019b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'import'", "';'", "'LoginGroups'", "'{'", "'}'", 
                     "'Group'", "'roles:'", "'selfRegister:'", "'registerFields:'", 
                     "','", "'Portal'", "'for:'", "'Page'", "'Route:'", 
                     "'Title:'", "'Table'", "'from:'", "'columns:'", "'Form'", 
                     "'submit:'", "'fields:'", "'onSuccess:'", "'Field'", 
                     "'Detail'", "'MetricGrid'", "'show:'", "'Kanban'", 
                     "'groupBy:'", "'update:'", "'card:'", "'Calendar'", 
                     "'dateField:'", "'labelField:'", "'View'", "'get:'", 
                     "'Edit'", "'actions:'", "'refresh'", "'toast'", "'navigate'", 
                     "'.'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "BOOLEAN_LITERAL", 
                      "ID", "STRING", "WS", "COMMENT" ];

var ruleNames =  [ "viewsFile", "importDecl", "loginGroupsDecl", "groupDecl", 
                   "groupItem", "idList", "portalDecl", "portalItem", "pageDecl", 
                   "pageItem", "containerDecl", "tableDecl", "tableItem", 
                   "formDecl", "formItem", "detailDecl", "detailItem", "metricGridDecl", 
                   "metricGridItem", "kanbanDecl", "kanbanItem", "calendarDecl", 
                   "calendarItem", "viewBlock", "viewItem", "editBlock", 
                   "editItem", "actionsDecl", "actionItem", "successAction", 
                   "authExprList", "authExpr" ];

function HospitalViewsParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

HospitalViewsParser.prototype = Object.create(antlr4.Parser.prototype);
HospitalViewsParser.prototype.constructor = HospitalViewsParser;

Object.defineProperty(HospitalViewsParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

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
HospitalViewsParser.T__23 = 24;
HospitalViewsParser.T__24 = 25;
HospitalViewsParser.T__25 = 26;
HospitalViewsParser.T__26 = 27;
HospitalViewsParser.T__27 = 28;
HospitalViewsParser.T__28 = 29;
HospitalViewsParser.T__29 = 30;
HospitalViewsParser.T__30 = 31;
HospitalViewsParser.T__31 = 32;
HospitalViewsParser.T__32 = 33;
HospitalViewsParser.T__33 = 34;
HospitalViewsParser.T__34 = 35;
HospitalViewsParser.T__35 = 36;
HospitalViewsParser.T__36 = 37;
HospitalViewsParser.T__37 = 38;
HospitalViewsParser.T__38 = 39;
HospitalViewsParser.T__39 = 40;
HospitalViewsParser.T__40 = 41;
HospitalViewsParser.BOOLEAN_LITERAL = 42;
HospitalViewsParser.ID = 43;
HospitalViewsParser.STRING = 44;
HospitalViewsParser.WS = 45;
HospitalViewsParser.COMMENT = 46;

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

function ViewsFileContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_viewsFile;
    return this;
}

ViewsFileContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ViewsFileContext.prototype.constructor = ViewsFileContext;

ViewsFileContext.prototype.importDecl = function() {
    return this.getTypedRuleContext(ImportDeclContext,0);
};

ViewsFileContext.prototype.loginGroupsDecl = function() {
    return this.getTypedRuleContext(LoginGroupsDeclContext,0);
};

ViewsFileContext.prototype.EOF = function() {
    return this.getToken(HospitalViewsParser.EOF, 0);
};

ViewsFileContext.prototype.portalDecl = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PortalDeclContext);
    } else {
        return this.getTypedRuleContext(PortalDeclContext,i);
    }
};

ViewsFileContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterViewsFile(this);
	}
};

ViewsFileContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitViewsFile(this);
	}
};




HospitalViewsParser.ViewsFileContext = ViewsFileContext;

HospitalViewsParser.prototype.viewsFile = function() {

    var localctx = new ViewsFileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, HospitalViewsParser.RULE_viewsFile);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 64;
        this.importDecl();
        this.state = 65;
        this.loginGroupsDecl();
        this.state = 69;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__10) {
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
};

function ImportDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_importDecl;
    return this;
}

ImportDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImportDeclContext.prototype.constructor = ImportDeclContext;

ImportDeclContext.prototype.STRING = function() {
    return this.getToken(HospitalViewsParser.STRING, 0);
};

ImportDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterImportDecl(this);
	}
};

ImportDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitImportDecl(this);
	}
};




HospitalViewsParser.ImportDeclContext = ImportDeclContext;

HospitalViewsParser.prototype.importDecl = function() {

    var localctx = new ImportDeclContext(this, this._ctx, this.state);
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
};

function LoginGroupsDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_loginGroupsDecl;
    return this;
}

LoginGroupsDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoginGroupsDeclContext.prototype.constructor = LoginGroupsDeclContext;

LoginGroupsDeclContext.prototype.groupDecl = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(GroupDeclContext);
    } else {
        return this.getTypedRuleContext(GroupDeclContext,i);
    }
};

LoginGroupsDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterLoginGroupsDecl(this);
	}
};

LoginGroupsDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitLoginGroupsDecl(this);
	}
};




HospitalViewsParser.LoginGroupsDeclContext = LoginGroupsDeclContext;

HospitalViewsParser.prototype.loginGroupsDecl = function() {

    var localctx = new LoginGroupsDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, HospitalViewsParser.RULE_loginGroupsDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 78;
        this.match(HospitalViewsParser.T__2);
        this.state = 79;
        this.match(HospitalViewsParser.T__3);
        this.state = 83;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__5) {
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
};

function GroupDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_groupDecl;
    return this;
}

GroupDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GroupDeclContext.prototype.constructor = GroupDeclContext;

GroupDeclContext.prototype.STRING = function() {
    return this.getToken(HospitalViewsParser.STRING, 0);
};

GroupDeclContext.prototype.groupItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(GroupItemContext);
    } else {
        return this.getTypedRuleContext(GroupItemContext,i);
    }
};

GroupDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterGroupDecl(this);
	}
};

GroupDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitGroupDecl(this);
	}
};




HospitalViewsParser.GroupDeclContext = GroupDeclContext;

HospitalViewsParser.prototype.groupDecl = function() {

    var localctx = new GroupDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, HospitalViewsParser.RULE_groupDecl);
    var _la = 0; // Token type
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
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalViewsParser.T__6) | (1 << HospitalViewsParser.T__7) | (1 << HospitalViewsParser.T__8))) !== 0)) {
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
};

function GroupItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_groupItem;
    return this;
}

GroupItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GroupItemContext.prototype.constructor = GroupItemContext;

GroupItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

GroupItemContext.prototype.BOOLEAN_LITERAL = function() {
    return this.getToken(HospitalViewsParser.BOOLEAN_LITERAL, 0);
};

GroupItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterGroupItem(this);
	}
};

GroupItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitGroupItem(this);
	}
};




HospitalViewsParser.GroupItemContext = GroupItemContext;

HospitalViewsParser.prototype.groupItem = function() {

    var localctx = new GroupItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, HospitalViewsParser.RULE_groupItem);
    try {
        this.state = 110;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__6:
            this.enterOuterAlt(localctx, 1);
            this.state = 99;
            this.match(HospitalViewsParser.T__6);
            this.state = 100;
            this.idList();
            this.state = 101;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__7:
            this.enterOuterAlt(localctx, 2);
            this.state = 103;
            this.match(HospitalViewsParser.T__7);
            this.state = 104;
            this.match(HospitalViewsParser.BOOLEAN_LITERAL);
            this.state = 105;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__8:
            this.enterOuterAlt(localctx, 3);
            this.state = 106;
            this.match(HospitalViewsParser.T__8);
            this.state = 107;
            this.idList();
            this.state = 108;
            this.match(HospitalViewsParser.T__1);
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

function IdListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_idList;
    return this;
}

IdListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdListContext.prototype.constructor = IdListContext;

IdListContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalViewsParser.ID);
    } else {
        return this.getToken(HospitalViewsParser.ID, i);
    }
};


IdListContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterIdList(this);
	}
};

IdListContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitIdList(this);
	}
};




HospitalViewsParser.IdListContext = IdListContext;

HospitalViewsParser.prototype.idList = function() {

    var localctx = new IdListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, HospitalViewsParser.RULE_idList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 112;
        this.match(HospitalViewsParser.ID);
        this.state = 117;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__9) {
            this.state = 113;
            this.match(HospitalViewsParser.T__9);
            this.state = 114;
            this.match(HospitalViewsParser.ID);
            this.state = 119;
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

function PortalDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_portalDecl;
    return this;
}

PortalDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PortalDeclContext.prototype.constructor = PortalDeclContext;

PortalDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

PortalDeclContext.prototype.portalItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PortalItemContext);
    } else {
        return this.getTypedRuleContext(PortalItemContext,i);
    }
};

PortalDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterPortalDecl(this);
	}
};

PortalDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitPortalDecl(this);
	}
};




HospitalViewsParser.PortalDeclContext = PortalDeclContext;

HospitalViewsParser.prototype.portalDecl = function() {

    var localctx = new PortalDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, HospitalViewsParser.RULE_portalDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 120;
        this.match(HospitalViewsParser.T__10);
        this.state = 121;
        this.match(HospitalViewsParser.ID);
        this.state = 122;
        this.match(HospitalViewsParser.T__3);
        this.state = 126;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__11 || _la===HospitalViewsParser.T__12) {
            this.state = 123;
            this.portalItem();
            this.state = 128;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 129;
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
};

function PortalItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_portalItem;
    return this;
}

PortalItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PortalItemContext.prototype.constructor = PortalItemContext;

PortalItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

PortalItemContext.prototype.pageDecl = function() {
    return this.getTypedRuleContext(PageDeclContext,0);
};

PortalItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterPortalItem(this);
	}
};

PortalItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitPortalItem(this);
	}
};




HospitalViewsParser.PortalItemContext = PortalItemContext;

HospitalViewsParser.prototype.portalItem = function() {

    var localctx = new PortalItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, HospitalViewsParser.RULE_portalItem);
    try {
        this.state = 136;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__11:
            this.enterOuterAlt(localctx, 1);
            this.state = 131;
            this.match(HospitalViewsParser.T__11);
            this.state = 132;
            this.idList();
            this.state = 133;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__12:
            this.enterOuterAlt(localctx, 2);
            this.state = 135;
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
};

function PageDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_pageDecl;
    return this;
}

PageDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PageDeclContext.prototype.constructor = PageDeclContext;

PageDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

PageDeclContext.prototype.pageItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PageItemContext);
    } else {
        return this.getTypedRuleContext(PageItemContext,i);
    }
};

PageDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterPageDecl(this);
	}
};

PageDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitPageDecl(this);
	}
};




HospitalViewsParser.PageDeclContext = PageDeclContext;

HospitalViewsParser.prototype.pageDecl = function() {

    var localctx = new PageDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, HospitalViewsParser.RULE_pageDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 138;
        this.match(HospitalViewsParser.T__12);
        this.state = 139;
        this.match(HospitalViewsParser.ID);
        this.state = 140;
        this.match(HospitalViewsParser.T__3);
        this.state = 144;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalViewsParser.T__13) | (1 << HospitalViewsParser.T__14) | (1 << HospitalViewsParser.T__15) | (1 << HospitalViewsParser.T__18) | (1 << HospitalViewsParser.T__23) | (1 << HospitalViewsParser.T__24) | (1 << HospitalViewsParser.T__26) | (1 << HospitalViewsParser.T__30))) !== 0)) {
            this.state = 141;
            this.pageItem();
            this.state = 146;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 147;
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
};

function PageItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_pageItem;
    return this;
}

PageItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PageItemContext.prototype.constructor = PageItemContext;

PageItemContext.prototype.STRING = function() {
    return this.getToken(HospitalViewsParser.STRING, 0);
};

PageItemContext.prototype.containerDecl = function() {
    return this.getTypedRuleContext(ContainerDeclContext,0);
};

PageItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterPageItem(this);
	}
};

PageItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitPageItem(this);
	}
};




HospitalViewsParser.PageItemContext = PageItemContext;

HospitalViewsParser.prototype.pageItem = function() {

    var localctx = new PageItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, HospitalViewsParser.RULE_pageItem);
    try {
        this.state = 156;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__13:
            this.enterOuterAlt(localctx, 1);
            this.state = 149;
            this.match(HospitalViewsParser.T__13);
            this.state = 150;
            this.match(HospitalViewsParser.STRING);
            this.state = 151;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__14:
            this.enterOuterAlt(localctx, 2);
            this.state = 152;
            this.match(HospitalViewsParser.T__14);
            this.state = 153;
            this.match(HospitalViewsParser.STRING);
            this.state = 154;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__15:
        case HospitalViewsParser.T__18:
        case HospitalViewsParser.T__23:
        case HospitalViewsParser.T__24:
        case HospitalViewsParser.T__26:
        case HospitalViewsParser.T__30:
            this.enterOuterAlt(localctx, 3);
            this.state = 155;
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
};

function ContainerDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_containerDecl;
    return this;
}

ContainerDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ContainerDeclContext.prototype.constructor = ContainerDeclContext;

ContainerDeclContext.prototype.tableDecl = function() {
    return this.getTypedRuleContext(TableDeclContext,0);
};

ContainerDeclContext.prototype.formDecl = function() {
    return this.getTypedRuleContext(FormDeclContext,0);
};

ContainerDeclContext.prototype.detailDecl = function() {
    return this.getTypedRuleContext(DetailDeclContext,0);
};

ContainerDeclContext.prototype.metricGridDecl = function() {
    return this.getTypedRuleContext(MetricGridDeclContext,0);
};

ContainerDeclContext.prototype.kanbanDecl = function() {
    return this.getTypedRuleContext(KanbanDeclContext,0);
};

ContainerDeclContext.prototype.calendarDecl = function() {
    return this.getTypedRuleContext(CalendarDeclContext,0);
};

ContainerDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterContainerDecl(this);
	}
};

ContainerDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitContainerDecl(this);
	}
};




HospitalViewsParser.ContainerDeclContext = ContainerDeclContext;

HospitalViewsParser.prototype.containerDecl = function() {

    var localctx = new ContainerDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, HospitalViewsParser.RULE_containerDecl);
    try {
        this.state = 164;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__15:
            this.enterOuterAlt(localctx, 1);
            this.state = 158;
            this.tableDecl();
            break;
        case HospitalViewsParser.T__18:
            this.enterOuterAlt(localctx, 2);
            this.state = 159;
            this.formDecl();
            break;
        case HospitalViewsParser.T__23:
            this.enterOuterAlt(localctx, 3);
            this.state = 160;
            this.detailDecl();
            break;
        case HospitalViewsParser.T__24:
            this.enterOuterAlt(localctx, 4);
            this.state = 161;
            this.metricGridDecl();
            break;
        case HospitalViewsParser.T__26:
            this.enterOuterAlt(localctx, 5);
            this.state = 162;
            this.kanbanDecl();
            break;
        case HospitalViewsParser.T__30:
            this.enterOuterAlt(localctx, 6);
            this.state = 163;
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
};

function TableDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_tableDecl;
    return this;
}

TableDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TableDeclContext.prototype.constructor = TableDeclContext;

TableDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

TableDeclContext.prototype.tableItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TableItemContext);
    } else {
        return this.getTypedRuleContext(TableItemContext,i);
    }
};

TableDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterTableDecl(this);
	}
};

TableDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitTableDecl(this);
	}
};




HospitalViewsParser.TableDeclContext = TableDeclContext;

HospitalViewsParser.prototype.tableDecl = function() {

    var localctx = new TableDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, HospitalViewsParser.RULE_tableDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 166;
        this.match(HospitalViewsParser.T__15);
        this.state = 168;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 167;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 170;
        this.match(HospitalViewsParser.T__3);
        this.state = 174;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 17)) & ~0x1f) == 0 && ((1 << (_la - 17)) & ((1 << (HospitalViewsParser.T__16 - 17)) | (1 << (HospitalViewsParser.T__17 - 17)) | (1 << (HospitalViewsParser.T__33 - 17)) | (1 << (HospitalViewsParser.T__35 - 17)) | (1 << (HospitalViewsParser.T__36 - 17)))) !== 0)) {
            this.state = 171;
            this.tableItem();
            this.state = 176;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 177;
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
};

function TableItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_tableItem;
    return this;
}

TableItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TableItemContext.prototype.constructor = TableItemContext;

TableItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

TableItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

TableItemContext.prototype.viewBlock = function() {
    return this.getTypedRuleContext(ViewBlockContext,0);
};

TableItemContext.prototype.editBlock = function() {
    return this.getTypedRuleContext(EditBlockContext,0);
};

TableItemContext.prototype.actionsDecl = function() {
    return this.getTypedRuleContext(ActionsDeclContext,0);
};

TableItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterTableItem(this);
	}
};

TableItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitTableItem(this);
	}
};




HospitalViewsParser.TableItemContext = TableItemContext;

HospitalViewsParser.prototype.tableItem = function() {

    var localctx = new TableItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, HospitalViewsParser.RULE_tableItem);
    try {
        this.state = 190;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 179;
            this.match(HospitalViewsParser.T__16);
            this.state = 180;
            this.authExpr();
            this.state = 181;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__17:
            this.enterOuterAlt(localctx, 2);
            this.state = 183;
            this.match(HospitalViewsParser.T__17);
            this.state = 184;
            this.idList();
            this.state = 185;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__33:
            this.enterOuterAlt(localctx, 3);
            this.state = 187;
            this.viewBlock();
            break;
        case HospitalViewsParser.T__35:
            this.enterOuterAlt(localctx, 4);
            this.state = 188;
            this.editBlock();
            break;
        case HospitalViewsParser.T__36:
            this.enterOuterAlt(localctx, 5);
            this.state = 189;
            this.actionsDecl();
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

function FormDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_formDecl;
    return this;
}

FormDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormDeclContext.prototype.constructor = FormDeclContext;

FormDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

FormDeclContext.prototype.formItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FormItemContext);
    } else {
        return this.getTypedRuleContext(FormItemContext,i);
    }
};

FormDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterFormDecl(this);
	}
};

FormDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitFormDecl(this);
	}
};




HospitalViewsParser.FormDeclContext = FormDeclContext;

HospitalViewsParser.prototype.formDecl = function() {

    var localctx = new FormDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, HospitalViewsParser.RULE_formDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 192;
        this.match(HospitalViewsParser.T__18);
        this.state = 194;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 193;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 196;
        this.match(HospitalViewsParser.T__3);
        this.state = 200;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HospitalViewsParser.T__16) | (1 << HospitalViewsParser.T__19) | (1 << HospitalViewsParser.T__20) | (1 << HospitalViewsParser.T__21) | (1 << HospitalViewsParser.T__22))) !== 0)) {
            this.state = 197;
            this.formItem();
            this.state = 202;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 203;
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
};

function FormItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_formItem;
    return this;
}

FormItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormItemContext.prototype.constructor = FormItemContext;

FormItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

FormItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

FormItemContext.prototype.successAction = function() {
    return this.getTypedRuleContext(SuccessActionContext,0);
};

FormItemContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

FormItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterFormItem(this);
	}
};

FormItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitFormItem(this);
	}
};




HospitalViewsParser.FormItemContext = FormItemContext;

HospitalViewsParser.prototype.formItem = function() {

    var localctx = new FormItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, HospitalViewsParser.RULE_formItem);
    try {
        this.state = 229;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 205;
            this.match(HospitalViewsParser.T__16);
            this.state = 206;
            this.authExpr();
            this.state = 207;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__19:
            this.enterOuterAlt(localctx, 2);
            this.state = 209;
            this.match(HospitalViewsParser.T__19);
            this.state = 210;
            this.authExpr();
            this.state = 211;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__20:
            this.enterOuterAlt(localctx, 3);
            this.state = 213;
            this.match(HospitalViewsParser.T__20);
            this.state = 214;
            this.idList();
            this.state = 215;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__21:
            this.enterOuterAlt(localctx, 4);
            this.state = 217;
            this.match(HospitalViewsParser.T__21);
            this.state = 218;
            this.successAction();
            this.state = 219;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__22:
            this.enterOuterAlt(localctx, 5);
            this.state = 221;
            this.match(HospitalViewsParser.T__22);
            this.state = 222;
            this.match(HospitalViewsParser.ID);
            this.state = 223;
            this.match(HospitalViewsParser.T__3);
            this.state = 224;
            this.match(HospitalViewsParser.T__16);
            this.state = 225;
            this.authExpr();
            this.state = 226;
            this.match(HospitalViewsParser.T__1);
            this.state = 227;
            this.match(HospitalViewsParser.T__4);
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

function DetailDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_detailDecl;
    return this;
}

DetailDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DetailDeclContext.prototype.constructor = DetailDeclContext;

DetailDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

DetailDeclContext.prototype.detailItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DetailItemContext);
    } else {
        return this.getTypedRuleContext(DetailItemContext,i);
    }
};

DetailDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterDetailDecl(this);
	}
};

DetailDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitDetailDecl(this);
	}
};




HospitalViewsParser.DetailDeclContext = DetailDeclContext;

HospitalViewsParser.prototype.detailDecl = function() {

    var localctx = new DetailDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, HospitalViewsParser.RULE_detailDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 231;
        this.match(HospitalViewsParser.T__23);
        this.state = 233;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 232;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 235;
        this.match(HospitalViewsParser.T__3);
        this.state = 239;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 17)) & ~0x1f) == 0 && ((1 << (_la - 17)) & ((1 << (HospitalViewsParser.T__16 - 17)) | (1 << (HospitalViewsParser.T__20 - 17)) | (1 << (HospitalViewsParser.T__35 - 17)) | (1 << (HospitalViewsParser.T__36 - 17)))) !== 0)) {
            this.state = 236;
            this.detailItem();
            this.state = 241;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 242;
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
};

function DetailItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_detailItem;
    return this;
}

DetailItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DetailItemContext.prototype.constructor = DetailItemContext;

DetailItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

DetailItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

DetailItemContext.prototype.editBlock = function() {
    return this.getTypedRuleContext(EditBlockContext,0);
};

DetailItemContext.prototype.actionsDecl = function() {
    return this.getTypedRuleContext(ActionsDeclContext,0);
};

DetailItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterDetailItem(this);
	}
};

DetailItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitDetailItem(this);
	}
};




HospitalViewsParser.DetailItemContext = DetailItemContext;

HospitalViewsParser.prototype.detailItem = function() {

    var localctx = new DetailItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, HospitalViewsParser.RULE_detailItem);
    try {
        this.state = 254;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 244;
            this.match(HospitalViewsParser.T__16);
            this.state = 245;
            this.authExpr();
            this.state = 246;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__20:
            this.enterOuterAlt(localctx, 2);
            this.state = 248;
            this.match(HospitalViewsParser.T__20);
            this.state = 249;
            this.idList();
            this.state = 250;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__35:
            this.enterOuterAlt(localctx, 3);
            this.state = 252;
            this.editBlock();
            break;
        case HospitalViewsParser.T__36:
            this.enterOuterAlt(localctx, 4);
            this.state = 253;
            this.actionsDecl();
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

function MetricGridDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_metricGridDecl;
    return this;
}

MetricGridDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MetricGridDeclContext.prototype.constructor = MetricGridDeclContext;

MetricGridDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

MetricGridDeclContext.prototype.metricGridItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(MetricGridItemContext);
    } else {
        return this.getTypedRuleContext(MetricGridItemContext,i);
    }
};

MetricGridDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterMetricGridDecl(this);
	}
};

MetricGridDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitMetricGridDecl(this);
	}
};




HospitalViewsParser.MetricGridDeclContext = MetricGridDeclContext;

HospitalViewsParser.prototype.metricGridDecl = function() {

    var localctx = new MetricGridDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, HospitalViewsParser.RULE_metricGridDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 256;
        this.match(HospitalViewsParser.T__24);
        this.state = 258;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 257;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 260;
        this.match(HospitalViewsParser.T__3);
        this.state = 264;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__25) {
            this.state = 261;
            this.metricGridItem();
            this.state = 266;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 267;
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
};

function MetricGridItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_metricGridItem;
    return this;
}

MetricGridItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MetricGridItemContext.prototype.constructor = MetricGridItemContext;

MetricGridItemContext.prototype.authExprList = function() {
    return this.getTypedRuleContext(AuthExprListContext,0);
};

MetricGridItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterMetricGridItem(this);
	}
};

MetricGridItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitMetricGridItem(this);
	}
};




HospitalViewsParser.MetricGridItemContext = MetricGridItemContext;

HospitalViewsParser.prototype.metricGridItem = function() {

    var localctx = new MetricGridItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, HospitalViewsParser.RULE_metricGridItem);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 269;
        this.match(HospitalViewsParser.T__25);
        this.state = 270;
        this.authExprList();
        this.state = 271;
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
};

function KanbanDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_kanbanDecl;
    return this;
}

KanbanDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
KanbanDeclContext.prototype.constructor = KanbanDeclContext;

KanbanDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

KanbanDeclContext.prototype.kanbanItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(KanbanItemContext);
    } else {
        return this.getTypedRuleContext(KanbanItemContext,i);
    }
};

KanbanDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterKanbanDecl(this);
	}
};

KanbanDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitKanbanDecl(this);
	}
};




HospitalViewsParser.KanbanDeclContext = KanbanDeclContext;

HospitalViewsParser.prototype.kanbanDecl = function() {

    var localctx = new KanbanDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, HospitalViewsParser.RULE_kanbanDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 273;
        this.match(HospitalViewsParser.T__26);
        this.state = 275;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 274;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 277;
        this.match(HospitalViewsParser.T__3);
        this.state = 281;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 17)) & ~0x1f) == 0 && ((1 << (_la - 17)) & ((1 << (HospitalViewsParser.T__16 - 17)) | (1 << (HospitalViewsParser.T__27 - 17)) | (1 << (HospitalViewsParser.T__28 - 17)) | (1 << (HospitalViewsParser.T__29 - 17)) | (1 << (HospitalViewsParser.T__33 - 17)) | (1 << (HospitalViewsParser.T__36 - 17)))) !== 0)) {
            this.state = 278;
            this.kanbanItem();
            this.state = 283;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 284;
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
};

function KanbanItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_kanbanItem;
    return this;
}

KanbanItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
KanbanItemContext.prototype.constructor = KanbanItemContext;

KanbanItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

KanbanItemContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

KanbanItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

KanbanItemContext.prototype.viewBlock = function() {
    return this.getTypedRuleContext(ViewBlockContext,0);
};

KanbanItemContext.prototype.actionsDecl = function() {
    return this.getTypedRuleContext(ActionsDeclContext,0);
};

KanbanItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterKanbanItem(this);
	}
};

KanbanItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitKanbanItem(this);
	}
};




HospitalViewsParser.KanbanItemContext = KanbanItemContext;

HospitalViewsParser.prototype.kanbanItem = function() {

    var localctx = new KanbanItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, HospitalViewsParser.RULE_kanbanItem);
    try {
        this.state = 303;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 286;
            this.match(HospitalViewsParser.T__16);
            this.state = 287;
            this.authExpr();
            this.state = 288;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__27:
            this.enterOuterAlt(localctx, 2);
            this.state = 290;
            this.match(HospitalViewsParser.T__27);
            this.state = 291;
            this.match(HospitalViewsParser.ID);
            this.state = 292;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__28:
            this.enterOuterAlt(localctx, 3);
            this.state = 293;
            this.match(HospitalViewsParser.T__28);
            this.state = 294;
            this.authExpr();
            this.state = 295;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__29:
            this.enterOuterAlt(localctx, 4);
            this.state = 297;
            this.match(HospitalViewsParser.T__29);
            this.state = 298;
            this.idList();
            this.state = 299;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__33:
            this.enterOuterAlt(localctx, 5);
            this.state = 301;
            this.viewBlock();
            break;
        case HospitalViewsParser.T__36:
            this.enterOuterAlt(localctx, 6);
            this.state = 302;
            this.actionsDecl();
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

function CalendarDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_calendarDecl;
    return this;
}

CalendarDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CalendarDeclContext.prototype.constructor = CalendarDeclContext;

CalendarDeclContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

CalendarDeclContext.prototype.calendarItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CalendarItemContext);
    } else {
        return this.getTypedRuleContext(CalendarItemContext,i);
    }
};

CalendarDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterCalendarDecl(this);
	}
};

CalendarDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitCalendarDecl(this);
	}
};




HospitalViewsParser.CalendarDeclContext = CalendarDeclContext;

HospitalViewsParser.prototype.calendarDecl = function() {

    var localctx = new CalendarDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, HospitalViewsParser.RULE_calendarDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 305;
        this.match(HospitalViewsParser.T__30);
        this.state = 307;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.ID) {
            this.state = 306;
            this.match(HospitalViewsParser.ID);
        }

        this.state = 309;
        this.match(HospitalViewsParser.T__3);
        this.state = 313;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 17)) & ~0x1f) == 0 && ((1 << (_la - 17)) & ((1 << (HospitalViewsParser.T__16 - 17)) | (1 << (HospitalViewsParser.T__28 - 17)) | (1 << (HospitalViewsParser.T__31 - 17)) | (1 << (HospitalViewsParser.T__32 - 17)) | (1 << (HospitalViewsParser.T__33 - 17)) | (1 << (HospitalViewsParser.T__36 - 17)))) !== 0)) {
            this.state = 310;
            this.calendarItem();
            this.state = 315;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 316;
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
};

function CalendarItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_calendarItem;
    return this;
}

CalendarItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CalendarItemContext.prototype.constructor = CalendarItemContext;

CalendarItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

CalendarItemContext.prototype.ID = function() {
    return this.getToken(HospitalViewsParser.ID, 0);
};

CalendarItemContext.prototype.viewBlock = function() {
    return this.getTypedRuleContext(ViewBlockContext,0);
};

CalendarItemContext.prototype.actionsDecl = function() {
    return this.getTypedRuleContext(ActionsDeclContext,0);
};

CalendarItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterCalendarItem(this);
	}
};

CalendarItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitCalendarItem(this);
	}
};




HospitalViewsParser.CalendarItemContext = CalendarItemContext;

HospitalViewsParser.prototype.calendarItem = function() {

    var localctx = new CalendarItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, HospitalViewsParser.RULE_calendarItem);
    try {
        this.state = 334;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 318;
            this.match(HospitalViewsParser.T__16);
            this.state = 319;
            this.authExpr();
            this.state = 320;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__31:
            this.enterOuterAlt(localctx, 2);
            this.state = 322;
            this.match(HospitalViewsParser.T__31);
            this.state = 323;
            this.match(HospitalViewsParser.ID);
            this.state = 324;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__28:
            this.enterOuterAlt(localctx, 3);
            this.state = 325;
            this.match(HospitalViewsParser.T__28);
            this.state = 326;
            this.authExpr();
            this.state = 327;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__32:
            this.enterOuterAlt(localctx, 4);
            this.state = 329;
            this.match(HospitalViewsParser.T__32);
            this.state = 330;
            this.match(HospitalViewsParser.ID);
            this.state = 331;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__33:
            this.enterOuterAlt(localctx, 5);
            this.state = 332;
            this.viewBlock();
            break;
        case HospitalViewsParser.T__36:
            this.enterOuterAlt(localctx, 6);
            this.state = 333;
            this.actionsDecl();
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

function ViewBlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_viewBlock;
    return this;
}

ViewBlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ViewBlockContext.prototype.constructor = ViewBlockContext;

ViewBlockContext.prototype.viewItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ViewItemContext);
    } else {
        return this.getTypedRuleContext(ViewItemContext,i);
    }
};

ViewBlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterViewBlock(this);
	}
};

ViewBlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitViewBlock(this);
	}
};




HospitalViewsParser.ViewBlockContext = ViewBlockContext;

HospitalViewsParser.prototype.viewBlock = function() {

    var localctx = new ViewBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, HospitalViewsParser.RULE_viewBlock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 336;
        this.match(HospitalViewsParser.T__33);
        this.state = 337;
        this.match(HospitalViewsParser.T__3);
        this.state = 341;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__20 || _la===HospitalViewsParser.T__34) {
            this.state = 338;
            this.viewItem();
            this.state = 343;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 344;
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
};

function ViewItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_viewItem;
    return this;
}

ViewItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ViewItemContext.prototype.constructor = ViewItemContext;

ViewItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

ViewItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

ViewItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterViewItem(this);
	}
};

ViewItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitViewItem(this);
	}
};




HospitalViewsParser.ViewItemContext = ViewItemContext;

HospitalViewsParser.prototype.viewItem = function() {

    var localctx = new ViewItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, HospitalViewsParser.RULE_viewItem);
    try {
        this.state = 354;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__34:
            this.enterOuterAlt(localctx, 1);
            this.state = 346;
            this.match(HospitalViewsParser.T__34);
            this.state = 347;
            this.authExpr();
            this.state = 348;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__20:
            this.enterOuterAlt(localctx, 2);
            this.state = 350;
            this.match(HospitalViewsParser.T__20);
            this.state = 351;
            this.idList();
            this.state = 352;
            this.match(HospitalViewsParser.T__1);
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

function EditBlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_editBlock;
    return this;
}

EditBlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EditBlockContext.prototype.constructor = EditBlockContext;

EditBlockContext.prototype.editItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EditItemContext);
    } else {
        return this.getTypedRuleContext(EditItemContext,i);
    }
};

EditBlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterEditBlock(this);
	}
};

EditBlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitEditBlock(this);
	}
};




HospitalViewsParser.EditBlockContext = EditBlockContext;

HospitalViewsParser.prototype.editBlock = function() {

    var localctx = new EditBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, HospitalViewsParser.RULE_editBlock);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 356;
        this.match(HospitalViewsParser.T__35);
        this.state = 357;
        this.match(HospitalViewsParser.T__3);
        this.state = 361;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__19 || _la===HospitalViewsParser.T__20) {
            this.state = 358;
            this.editItem();
            this.state = 363;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 364;
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
};

function EditItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_editItem;
    return this;
}

EditItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EditItemContext.prototype.constructor = EditItemContext;

EditItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

EditItemContext.prototype.idList = function() {
    return this.getTypedRuleContext(IdListContext,0);
};

EditItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterEditItem(this);
	}
};

EditItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitEditItem(this);
	}
};




HospitalViewsParser.EditItemContext = EditItemContext;

HospitalViewsParser.prototype.editItem = function() {

    var localctx = new EditItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, HospitalViewsParser.RULE_editItem);
    try {
        this.state = 374;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__19:
            this.enterOuterAlt(localctx, 1);
            this.state = 366;
            this.match(HospitalViewsParser.T__19);
            this.state = 367;
            this.authExpr();
            this.state = 368;
            this.match(HospitalViewsParser.T__1);
            break;
        case HospitalViewsParser.T__20:
            this.enterOuterAlt(localctx, 2);
            this.state = 370;
            this.match(HospitalViewsParser.T__20);
            this.state = 371;
            this.idList();
            this.state = 372;
            this.match(HospitalViewsParser.T__1);
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

function ActionsDeclContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_actionsDecl;
    return this;
}

ActionsDeclContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionsDeclContext.prototype.constructor = ActionsDeclContext;

ActionsDeclContext.prototype.actionItem = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ActionItemContext);
    } else {
        return this.getTypedRuleContext(ActionItemContext,i);
    }
};

ActionsDeclContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterActionsDecl(this);
	}
};

ActionsDeclContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitActionsDecl(this);
	}
};




HospitalViewsParser.ActionsDeclContext = ActionsDeclContext;

HospitalViewsParser.prototype.actionsDecl = function() {

    var localctx = new ActionsDeclContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, HospitalViewsParser.RULE_actionsDecl);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 376;
        this.match(HospitalViewsParser.T__36);
        this.state = 377;
        this.actionItem();
        this.state = 382;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__9) {
            this.state = 378;
            this.match(HospitalViewsParser.T__9);
            this.state = 379;
            this.actionItem();
            this.state = 384;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 385;
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
};

function ActionItemContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_actionItem;
    return this;
}

ActionItemContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionItemContext.prototype.constructor = ActionItemContext;

ActionItemContext.prototype.authExpr = function() {
    return this.getTypedRuleContext(AuthExprContext,0);
};

ActionItemContext.prototype.STRING = function() {
    return this.getToken(HospitalViewsParser.STRING, 0);
};

ActionItemContext.prototype.successAction = function() {
    return this.getTypedRuleContext(SuccessActionContext,0);
};

ActionItemContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterActionItem(this);
	}
};

ActionItemContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitActionItem(this);
	}
};




HospitalViewsParser.ActionItemContext = ActionItemContext;

HospitalViewsParser.prototype.actionItem = function() {

    var localctx = new ActionItemContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, HospitalViewsParser.RULE_actionItem);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 387;
        this.authExpr();
        this.state = 388;
        this.match(HospitalViewsParser.STRING);
        this.state = 395;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HospitalViewsParser.T__3) {
            this.state = 389;
            this.match(HospitalViewsParser.T__3);
            this.state = 390;
            this.match(HospitalViewsParser.T__21);
            this.state = 391;
            this.successAction();
            this.state = 392;
            this.match(HospitalViewsParser.T__1);
            this.state = 393;
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
};

function SuccessActionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_successAction;
    return this;
}

SuccessActionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SuccessActionContext.prototype.constructor = SuccessActionContext;

SuccessActionContext.prototype.STRING = function() {
    return this.getToken(HospitalViewsParser.STRING, 0);
};

SuccessActionContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterSuccessAction(this);
	}
};

SuccessActionContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitSuccessAction(this);
	}
};




HospitalViewsParser.SuccessActionContext = SuccessActionContext;

HospitalViewsParser.prototype.successAction = function() {

    var localctx = new SuccessActionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, HospitalViewsParser.RULE_successAction);
    try {
        this.state = 402;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HospitalViewsParser.T__37:
            this.enterOuterAlt(localctx, 1);
            this.state = 397;
            this.match(HospitalViewsParser.T__37);
            break;
        case HospitalViewsParser.T__38:
            this.enterOuterAlt(localctx, 2);
            this.state = 398;
            this.match(HospitalViewsParser.T__38);
            this.state = 399;
            this.match(HospitalViewsParser.STRING);
            break;
        case HospitalViewsParser.T__39:
            this.enterOuterAlt(localctx, 3);
            this.state = 400;
            this.match(HospitalViewsParser.T__39);
            this.state = 401;
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
};

function AuthExprListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_authExprList;
    return this;
}

AuthExprListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthExprListContext.prototype.constructor = AuthExprListContext;

AuthExprListContext.prototype.authExpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AuthExprContext);
    } else {
        return this.getTypedRuleContext(AuthExprContext,i);
    }
};

AuthExprListContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterAuthExprList(this);
	}
};

AuthExprListContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitAuthExprList(this);
	}
};




HospitalViewsParser.AuthExprListContext = AuthExprListContext;

HospitalViewsParser.prototype.authExprList = function() {

    var localctx = new AuthExprListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, HospitalViewsParser.RULE_authExprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 404;
        this.authExpr();
        this.state = 409;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===HospitalViewsParser.T__9) {
            this.state = 405;
            this.match(HospitalViewsParser.T__9);
            this.state = 406;
            this.authExpr();
            this.state = 411;
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

function AuthExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HospitalViewsParser.RULE_authExpr;
    return this;
}

AuthExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AuthExprContext.prototype.constructor = AuthExprContext;

AuthExprContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HospitalViewsParser.ID);
    } else {
        return this.getToken(HospitalViewsParser.ID, i);
    }
};


AuthExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.enterAuthExpr(this);
	}
};

AuthExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof HospitalViewsListener ) {
        listener.exitAuthExpr(this);
	}
};




HospitalViewsParser.AuthExprContext = AuthExprContext;

HospitalViewsParser.prototype.authExpr = function() {

    var localctx = new AuthExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, HospitalViewsParser.RULE_authExpr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 412;
        this.match(HospitalViewsParser.ID);
        this.state = 413;
        this.match(HospitalViewsParser.T__40);
        this.state = 414;
        this.match(HospitalViewsParser.ID);
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


exports.HospitalViewsParser = HospitalViewsParser;
