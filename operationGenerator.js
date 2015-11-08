// Based on https://github.com/SitePen/dts-generator
/// <reference path="./node_modules/typescript/lib/typescript.d.ts"/>
/// <reference path="./typings/tsd.d.ts"/>
var fs = require('fs');
var mkdirp = require('mkdirp');
var os = require('os');
var pathUtil = require('path');
var Promise = require('bluebird');
var ts = require('typescript');
var lodash_1 = require('lodash');
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["Unknown"] = 0] = "Unknown";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 1] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 2] = "SingleLineCommentTrivia";
    SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 3] = "MultiLineCommentTrivia";
    SyntaxKind[SyntaxKind["NewLineTrivia"] = 4] = "NewLineTrivia";
    SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 5] = "WhitespaceTrivia";
    SyntaxKind[SyntaxKind["ShebangTrivia"] = 6] = "ShebangTrivia";
    SyntaxKind[SyntaxKind["ConflictMarkerTrivia"] = 7] = "ConflictMarkerTrivia";
    SyntaxKind[SyntaxKind["NumericLiteral"] = 8] = "NumericLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 9] = "StringLiteral";
    SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 10] = "RegularExpressionLiteral";
    SyntaxKind[SyntaxKind["NoSubstitutionTemplateLiteral"] = 11] = "NoSubstitutionTemplateLiteral";
    SyntaxKind[SyntaxKind["TemplateHead"] = 12] = "TemplateHead";
    SyntaxKind[SyntaxKind["TemplateMiddle"] = 13] = "TemplateMiddle";
    SyntaxKind[SyntaxKind["TemplateTail"] = 14] = "TemplateTail";
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 15] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 16] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 17] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 18] = "CloseParenToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 19] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 20] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["DotToken"] = 21] = "DotToken";
    SyntaxKind[SyntaxKind["DotDotDotToken"] = 22] = "DotDotDotToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 23] = "SemicolonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 24] = "CommaToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 25] = "LessThanToken";
    SyntaxKind[SyntaxKind["LessThanSlashToken"] = 26] = "LessThanSlashToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 27] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 28] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 29] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 30] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 31] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 32] = "EqualsEqualsEqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 33] = "ExclamationEqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 34] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 35] = "PlusToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 36] = "MinusToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 37] = "AsteriskToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 38] = "SlashToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 39] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusPlusToken"] = 40] = "PlusPlusToken";
    SyntaxKind[SyntaxKind["MinusMinusToken"] = 41] = "MinusMinusToken";
    SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 42] = "LessThanLessThanToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 43] = "GreaterThanGreaterThanToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 44] = "GreaterThanGreaterThanGreaterThanToken";
    SyntaxKind[SyntaxKind["AmpersandToken"] = 45] = "AmpersandToken";
    SyntaxKind[SyntaxKind["BarToken"] = 46] = "BarToken";
    SyntaxKind[SyntaxKind["CaretToken"] = 47] = "CaretToken";
    SyntaxKind[SyntaxKind["ExclamationToken"] = 48] = "ExclamationToken";
    SyntaxKind[SyntaxKind["TildeToken"] = 49] = "TildeToken";
    SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 50] = "AmpersandAmpersandToken";
    SyntaxKind[SyntaxKind["BarBarToken"] = 51] = "BarBarToken";
    SyntaxKind[SyntaxKind["QuestionToken"] = 52] = "QuestionToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 53] = "ColonToken";
    SyntaxKind[SyntaxKind["AtToken"] = 54] = "AtToken";
    SyntaxKind[SyntaxKind["EqualsToken"] = 55] = "EqualsToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 56] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 57] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 58] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 59] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 60] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 61] = "LessThanLessThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 62] = "GreaterThanGreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 63] = "GreaterThanGreaterThanGreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 64] = "AmpersandEqualsToken";
    SyntaxKind[SyntaxKind["BarEqualsToken"] = 65] = "BarEqualsToken";
    SyntaxKind[SyntaxKind["CaretEqualsToken"] = 66] = "CaretEqualsToken";
    SyntaxKind[SyntaxKind["Identifier"] = 67] = "Identifier";
    SyntaxKind[SyntaxKind["BreakKeyword"] = 68] = "BreakKeyword";
    SyntaxKind[SyntaxKind["CaseKeyword"] = 69] = "CaseKeyword";
    SyntaxKind[SyntaxKind["CatchKeyword"] = 70] = "CatchKeyword";
    SyntaxKind[SyntaxKind["ClassKeyword"] = 71] = "ClassKeyword";
    SyntaxKind[SyntaxKind["ConstKeyword"] = 72] = "ConstKeyword";
    SyntaxKind[SyntaxKind["ContinueKeyword"] = 73] = "ContinueKeyword";
    SyntaxKind[SyntaxKind["DebuggerKeyword"] = 74] = "DebuggerKeyword";
    SyntaxKind[SyntaxKind["DefaultKeyword"] = 75] = "DefaultKeyword";
    SyntaxKind[SyntaxKind["DeleteKeyword"] = 76] = "DeleteKeyword";
    SyntaxKind[SyntaxKind["DoKeyword"] = 77] = "DoKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 78] = "ElseKeyword";
    SyntaxKind[SyntaxKind["EnumKeyword"] = 79] = "EnumKeyword";
    SyntaxKind[SyntaxKind["ExportKeyword"] = 80] = "ExportKeyword";
    SyntaxKind[SyntaxKind["ExtendsKeyword"] = 81] = "ExtendsKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 82] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FinallyKeyword"] = 83] = "FinallyKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 84] = "ForKeyword";
    SyntaxKind[SyntaxKind["FunctionKeyword"] = 85] = "FunctionKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 86] = "IfKeyword";
    SyntaxKind[SyntaxKind["ImportKeyword"] = 87] = "ImportKeyword";
    SyntaxKind[SyntaxKind["InKeyword"] = 88] = "InKeyword";
    SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 89] = "InstanceOfKeyword";
    SyntaxKind[SyntaxKind["NewKeyword"] = 90] = "NewKeyword";
    SyntaxKind[SyntaxKind["NullKeyword"] = 91] = "NullKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 92] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["SuperKeyword"] = 93] = "SuperKeyword";
    SyntaxKind[SyntaxKind["SwitchKeyword"] = 94] = "SwitchKeyword";
    SyntaxKind[SyntaxKind["ThisKeyword"] = 95] = "ThisKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 96] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 97] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TryKeyword"] = 98] = "TryKeyword";
    SyntaxKind[SyntaxKind["TypeOfKeyword"] = 99] = "TypeOfKeyword";
    SyntaxKind[SyntaxKind["VarKeyword"] = 100] = "VarKeyword";
    SyntaxKind[SyntaxKind["VoidKeyword"] = 101] = "VoidKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 102] = "WhileKeyword";
    SyntaxKind[SyntaxKind["WithKeyword"] = 103] = "WithKeyword";
    SyntaxKind[SyntaxKind["ImplementsKeyword"] = 104] = "ImplementsKeyword";
    SyntaxKind[SyntaxKind["InterfaceKeyword"] = 105] = "InterfaceKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 106] = "LetKeyword";
    SyntaxKind[SyntaxKind["PackageKeyword"] = 107] = "PackageKeyword";
    SyntaxKind[SyntaxKind["PrivateKeyword"] = 108] = "PrivateKeyword";
    SyntaxKind[SyntaxKind["ProtectedKeyword"] = 109] = "ProtectedKeyword";
    SyntaxKind[SyntaxKind["PublicKeyword"] = 110] = "PublicKeyword";
    SyntaxKind[SyntaxKind["StaticKeyword"] = 111] = "StaticKeyword";
    SyntaxKind[SyntaxKind["YieldKeyword"] = 112] = "YieldKeyword";
    SyntaxKind[SyntaxKind["AbstractKeyword"] = 113] = "AbstractKeyword";
    SyntaxKind[SyntaxKind["AsKeyword"] = 114] = "AsKeyword";
    SyntaxKind[SyntaxKind["AnyKeyword"] = 115] = "AnyKeyword";
    SyntaxKind[SyntaxKind["AsyncKeyword"] = 116] = "AsyncKeyword";
    SyntaxKind[SyntaxKind["AwaitKeyword"] = 117] = "AwaitKeyword";
    SyntaxKind[SyntaxKind["BooleanKeyword"] = 118] = "BooleanKeyword";
    SyntaxKind[SyntaxKind["ConstructorKeyword"] = 119] = "ConstructorKeyword";
    SyntaxKind[SyntaxKind["DeclareKeyword"] = 120] = "DeclareKeyword";
    SyntaxKind[SyntaxKind["GetKeyword"] = 121] = "GetKeyword";
    SyntaxKind[SyntaxKind["IsKeyword"] = 122] = "IsKeyword";
    SyntaxKind[SyntaxKind["ModuleKeyword"] = 123] = "ModuleKeyword";
    SyntaxKind[SyntaxKind["NamespaceKeyword"] = 124] = "NamespaceKeyword";
    SyntaxKind[SyntaxKind["RequireKeyword"] = 125] = "RequireKeyword";
    SyntaxKind[SyntaxKind["NumberKeyword"] = 126] = "NumberKeyword";
    SyntaxKind[SyntaxKind["SetKeyword"] = 127] = "SetKeyword";
    SyntaxKind[SyntaxKind["StringKeyword"] = 128] = "StringKeyword";
    SyntaxKind[SyntaxKind["SymbolKeyword"] = 129] = "SymbolKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 130] = "TypeKeyword";
    SyntaxKind[SyntaxKind["FromKeyword"] = 131] = "FromKeyword";
    SyntaxKind[SyntaxKind["OfKeyword"] = 132] = "OfKeyword";
    SyntaxKind[SyntaxKind["QualifiedName"] = 133] = "QualifiedName";
    SyntaxKind[SyntaxKind["ComputedPropertyName"] = 134] = "ComputedPropertyName";
    SyntaxKind[SyntaxKind["TypeParameter"] = 135] = "TypeParameter";
    SyntaxKind[SyntaxKind["Parameter"] = 136] = "Parameter";
    SyntaxKind[SyntaxKind["Decorator"] = 137] = "Decorator";
    SyntaxKind[SyntaxKind["PropertySignature"] = 138] = "PropertySignature";
    SyntaxKind[SyntaxKind["PropertyDeclaration"] = 139] = "PropertyDeclaration";
    SyntaxKind[SyntaxKind["MethodSignature"] = 140] = "MethodSignature";
    SyntaxKind[SyntaxKind["MethodDeclaration"] = 141] = "MethodDeclaration";
    SyntaxKind[SyntaxKind["Constructor"] = 142] = "Constructor";
    SyntaxKind[SyntaxKind["GetAccessor"] = 143] = "GetAccessor";
    SyntaxKind[SyntaxKind["SetAccessor"] = 144] = "SetAccessor";
    SyntaxKind[SyntaxKind["CallSignature"] = 145] = "CallSignature";
    SyntaxKind[SyntaxKind["ConstructSignature"] = 146] = "ConstructSignature";
    SyntaxKind[SyntaxKind["IndexSignature"] = 147] = "IndexSignature";
    SyntaxKind[SyntaxKind["TypePredicate"] = 148] = "TypePredicate";
    SyntaxKind[SyntaxKind["TypeReference"] = 149] = "TypeReference";
    SyntaxKind[SyntaxKind["FunctionType"] = 150] = "FunctionType";
    SyntaxKind[SyntaxKind["ConstructorType"] = 151] = "ConstructorType";
    SyntaxKind[SyntaxKind["TypeQuery"] = 152] = "TypeQuery";
    SyntaxKind[SyntaxKind["TypeLiteral"] = 153] = "TypeLiteral";
    SyntaxKind[SyntaxKind["ArrayType"] = 154] = "ArrayType";
    SyntaxKind[SyntaxKind["TupleType"] = 155] = "TupleType";
    SyntaxKind[SyntaxKind["UnionType"] = 156] = "UnionType";
    SyntaxKind[SyntaxKind["IntersectionType"] = 157] = "IntersectionType";
    SyntaxKind[SyntaxKind["ParenthesizedType"] = 158] = "ParenthesizedType";
    SyntaxKind[SyntaxKind["ObjectBindingPattern"] = 159] = "ObjectBindingPattern";
    SyntaxKind[SyntaxKind["ArrayBindingPattern"] = 160] = "ArrayBindingPattern";
    SyntaxKind[SyntaxKind["BindingElement"] = 161] = "BindingElement";
    SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 162] = "ArrayLiteralExpression";
    SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 163] = "ObjectLiteralExpression";
    SyntaxKind[SyntaxKind["PropertyAccessExpression"] = 164] = "PropertyAccessExpression";
    SyntaxKind[SyntaxKind["ElementAccessExpression"] = 165] = "ElementAccessExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 166] = "CallExpression";
    SyntaxKind[SyntaxKind["NewExpression"] = 167] = "NewExpression";
    SyntaxKind[SyntaxKind["TaggedTemplateExpression"] = 168] = "TaggedTemplateExpression";
    SyntaxKind[SyntaxKind["TypeAssertionExpression"] = 169] = "TypeAssertionExpression";
    SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 170] = "ParenthesizedExpression";
    SyntaxKind[SyntaxKind["FunctionExpression"] = 171] = "FunctionExpression";
    SyntaxKind[SyntaxKind["ArrowFunction"] = 172] = "ArrowFunction";
    SyntaxKind[SyntaxKind["DeleteExpression"] = 173] = "DeleteExpression";
    SyntaxKind[SyntaxKind["TypeOfExpression"] = 174] = "TypeOfExpression";
    SyntaxKind[SyntaxKind["VoidExpression"] = 175] = "VoidExpression";
    SyntaxKind[SyntaxKind["AwaitExpression"] = 176] = "AwaitExpression";
    SyntaxKind[SyntaxKind["PrefixUnaryExpression"] = 177] = "PrefixUnaryExpression";
    SyntaxKind[SyntaxKind["PostfixUnaryExpression"] = 178] = "PostfixUnaryExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 179] = "BinaryExpression";
    SyntaxKind[SyntaxKind["ConditionalExpression"] = 180] = "ConditionalExpression";
    SyntaxKind[SyntaxKind["TemplateExpression"] = 181] = "TemplateExpression";
    SyntaxKind[SyntaxKind["YieldExpression"] = 182] = "YieldExpression";
    SyntaxKind[SyntaxKind["SpreadElementExpression"] = 183] = "SpreadElementExpression";
    SyntaxKind[SyntaxKind["ClassExpression"] = 184] = "ClassExpression";
    SyntaxKind[SyntaxKind["OmittedExpression"] = 185] = "OmittedExpression";
    SyntaxKind[SyntaxKind["ExpressionWithTypeArguments"] = 186] = "ExpressionWithTypeArguments";
    SyntaxKind[SyntaxKind["AsExpression"] = 187] = "AsExpression";
    SyntaxKind[SyntaxKind["TemplateSpan"] = 188] = "TemplateSpan";
    SyntaxKind[SyntaxKind["SemicolonClassElement"] = 189] = "SemicolonClassElement";
    SyntaxKind[SyntaxKind["Block"] = 190] = "Block";
    SyntaxKind[SyntaxKind["VariableStatement"] = 191] = "VariableStatement";
    SyntaxKind[SyntaxKind["EmptyStatement"] = 192] = "EmptyStatement";
    SyntaxKind[SyntaxKind["ExpressionStatement"] = 193] = "ExpressionStatement";
    SyntaxKind[SyntaxKind["IfStatement"] = 194] = "IfStatement";
    SyntaxKind[SyntaxKind["DoStatement"] = 195] = "DoStatement";
    SyntaxKind[SyntaxKind["WhileStatement"] = 196] = "WhileStatement";
    SyntaxKind[SyntaxKind["ForStatement"] = 197] = "ForStatement";
    SyntaxKind[SyntaxKind["ForInStatement"] = 198] = "ForInStatement";
    SyntaxKind[SyntaxKind["ForOfStatement"] = 199] = "ForOfStatement";
    SyntaxKind[SyntaxKind["ContinueStatement"] = 200] = "ContinueStatement";
    SyntaxKind[SyntaxKind["BreakStatement"] = 201] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 202] = "ReturnStatement";
    SyntaxKind[SyntaxKind["WithStatement"] = 203] = "WithStatement";
    SyntaxKind[SyntaxKind["SwitchStatement"] = 204] = "SwitchStatement";
    SyntaxKind[SyntaxKind["LabeledStatement"] = 205] = "LabeledStatement";
    SyntaxKind[SyntaxKind["ThrowStatement"] = 206] = "ThrowStatement";
    SyntaxKind[SyntaxKind["TryStatement"] = 207] = "TryStatement";
    SyntaxKind[SyntaxKind["DebuggerStatement"] = 208] = "DebuggerStatement";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 209] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["VariableDeclarationList"] = 210] = "VariableDeclarationList";
    SyntaxKind[SyntaxKind["FunctionDeclaration"] = 211] = "FunctionDeclaration";
    SyntaxKind[SyntaxKind["ClassDeclaration"] = 212] = "ClassDeclaration";
    SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 213] = "InterfaceDeclaration";
    SyntaxKind[SyntaxKind["TypeAliasDeclaration"] = 214] = "TypeAliasDeclaration";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 215] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["ModuleDeclaration"] = 216] = "ModuleDeclaration";
    SyntaxKind[SyntaxKind["ModuleBlock"] = 217] = "ModuleBlock";
    SyntaxKind[SyntaxKind["CaseBlock"] = 218] = "CaseBlock";
    SyntaxKind[SyntaxKind["ImportEqualsDeclaration"] = 219] = "ImportEqualsDeclaration";
    SyntaxKind[SyntaxKind["ImportDeclaration"] = 220] = "ImportDeclaration";
    SyntaxKind[SyntaxKind["ImportClause"] = 221] = "ImportClause";
    SyntaxKind[SyntaxKind["NamespaceImport"] = 222] = "NamespaceImport";
    SyntaxKind[SyntaxKind["NamedImports"] = 223] = "NamedImports";
    SyntaxKind[SyntaxKind["ImportSpecifier"] = 224] = "ImportSpecifier";
    SyntaxKind[SyntaxKind["ExportAssignment"] = 225] = "ExportAssignment";
    SyntaxKind[SyntaxKind["ExportDeclaration"] = 226] = "ExportDeclaration";
    SyntaxKind[SyntaxKind["NamedExports"] = 227] = "NamedExports";
    SyntaxKind[SyntaxKind["ExportSpecifier"] = 228] = "ExportSpecifier";
    SyntaxKind[SyntaxKind["MissingDeclaration"] = 229] = "MissingDeclaration";
    SyntaxKind[SyntaxKind["ExternalModuleReference"] = 230] = "ExternalModuleReference";
    SyntaxKind[SyntaxKind["JsxElement"] = 231] = "JsxElement";
    SyntaxKind[SyntaxKind["JsxSelfClosingElement"] = 232] = "JsxSelfClosingElement";
    SyntaxKind[SyntaxKind["JsxOpeningElement"] = 233] = "JsxOpeningElement";
    SyntaxKind[SyntaxKind["JsxText"] = 234] = "JsxText";
    SyntaxKind[SyntaxKind["JsxClosingElement"] = 235] = "JsxClosingElement";
    SyntaxKind[SyntaxKind["JsxAttribute"] = 236] = "JsxAttribute";
    SyntaxKind[SyntaxKind["JsxSpreadAttribute"] = 237] = "JsxSpreadAttribute";
    SyntaxKind[SyntaxKind["JsxExpression"] = 238] = "JsxExpression";
    SyntaxKind[SyntaxKind["CaseClause"] = 239] = "CaseClause";
    SyntaxKind[SyntaxKind["DefaultClause"] = 240] = "DefaultClause";
    SyntaxKind[SyntaxKind["HeritageClause"] = 241] = "HeritageClause";
    SyntaxKind[SyntaxKind["CatchClause"] = 242] = "CatchClause";
    SyntaxKind[SyntaxKind["PropertyAssignment"] = 243] = "PropertyAssignment";
    SyntaxKind[SyntaxKind["ShorthandPropertyAssignment"] = 244] = "ShorthandPropertyAssignment";
    SyntaxKind[SyntaxKind["EnumMember"] = 245] = "EnumMember";
    SyntaxKind[SyntaxKind["SourceFile"] = 246] = "SourceFile";
    SyntaxKind[SyntaxKind["JSDocTypeExpression"] = 247] = "JSDocTypeExpression";
    SyntaxKind[SyntaxKind["JSDocAllType"] = 248] = "JSDocAllType";
    SyntaxKind[SyntaxKind["JSDocUnknownType"] = 249] = "JSDocUnknownType";
    SyntaxKind[SyntaxKind["JSDocArrayType"] = 250] = "JSDocArrayType";
    SyntaxKind[SyntaxKind["JSDocUnionType"] = 251] = "JSDocUnionType";
    SyntaxKind[SyntaxKind["JSDocTupleType"] = 252] = "JSDocTupleType";
    SyntaxKind[SyntaxKind["JSDocNullableType"] = 253] = "JSDocNullableType";
    SyntaxKind[SyntaxKind["JSDocNonNullableType"] = 254] = "JSDocNonNullableType";
    SyntaxKind[SyntaxKind["JSDocRecordType"] = 255] = "JSDocRecordType";
    SyntaxKind[SyntaxKind["JSDocRecordMember"] = 256] = "JSDocRecordMember";
    SyntaxKind[SyntaxKind["JSDocTypeReference"] = 257] = "JSDocTypeReference";
    SyntaxKind[SyntaxKind["JSDocOptionalType"] = 258] = "JSDocOptionalType";
    SyntaxKind[SyntaxKind["JSDocFunctionType"] = 259] = "JSDocFunctionType";
    SyntaxKind[SyntaxKind["JSDocVariadicType"] = 260] = "JSDocVariadicType";
    SyntaxKind[SyntaxKind["JSDocConstructorType"] = 261] = "JSDocConstructorType";
    SyntaxKind[SyntaxKind["JSDocThisType"] = 262] = "JSDocThisType";
    SyntaxKind[SyntaxKind["JSDocComment"] = 263] = "JSDocComment";
    SyntaxKind[SyntaxKind["JSDocTag"] = 264] = "JSDocTag";
    SyntaxKind[SyntaxKind["JSDocParameterTag"] = 265] = "JSDocParameterTag";
    SyntaxKind[SyntaxKind["JSDocReturnTag"] = 266] = "JSDocReturnTag";
    SyntaxKind[SyntaxKind["JSDocTypeTag"] = 267] = "JSDocTypeTag";
    SyntaxKind[SyntaxKind["JSDocTemplateTag"] = 268] = "JSDocTemplateTag";
    SyntaxKind[SyntaxKind["SyntaxList"] = 269] = "SyntaxList";
    SyntaxKind[SyntaxKind["Count"] = 270] = "Count";
    SyntaxKind[SyntaxKind["FirstAssignment"] = 55] = "FirstAssignment";
    SyntaxKind[SyntaxKind["LastAssignment"] = 66] = "LastAssignment";
    SyntaxKind[SyntaxKind["FirstReservedWord"] = 68] = "FirstReservedWord";
    SyntaxKind[SyntaxKind["LastReservedWord"] = 103] = "LastReservedWord";
    SyntaxKind[SyntaxKind["FirstKeyword"] = 68] = "FirstKeyword";
    SyntaxKind[SyntaxKind["LastKeyword"] = 132] = "LastKeyword";
    SyntaxKind[SyntaxKind["FirstFutureReservedWord"] = 104] = "FirstFutureReservedWord";
    SyntaxKind[SyntaxKind["LastFutureReservedWord"] = 112] = "LastFutureReservedWord";
    SyntaxKind[SyntaxKind["FirstTypeNode"] = 149] = "FirstTypeNode";
    SyntaxKind[SyntaxKind["LastTypeNode"] = 158] = "LastTypeNode";
    SyntaxKind[SyntaxKind["FirstPunctuation"] = 15] = "FirstPunctuation";
    SyntaxKind[SyntaxKind["LastPunctuation"] = 66] = "LastPunctuation";
    SyntaxKind[SyntaxKind["FirstToken"] = 0] = "FirstToken";
    SyntaxKind[SyntaxKind["LastToken"] = 132] = "LastToken";
    SyntaxKind[SyntaxKind["FirstTriviaToken"] = 2] = "FirstTriviaToken";
    SyntaxKind[SyntaxKind["LastTriviaToken"] = 7] = "LastTriviaToken";
    SyntaxKind[SyntaxKind["FirstLiteralToken"] = 8] = "FirstLiteralToken";
    SyntaxKind[SyntaxKind["LastLiteralToken"] = 11] = "LastLiteralToken";
    SyntaxKind[SyntaxKind["FirstTemplateToken"] = 11] = "FirstTemplateToken";
    SyntaxKind[SyntaxKind["LastTemplateToken"] = 14] = "LastTemplateToken";
    SyntaxKind[SyntaxKind["FirstBinaryOperator"] = 25] = "FirstBinaryOperator";
    SyntaxKind[SyntaxKind["LastBinaryOperator"] = 66] = "LastBinaryOperator";
    SyntaxKind[SyntaxKind["FirstNode"] = 133] = "FirstNode";
})(SyntaxKind || (SyntaxKind = {}));
var filenameToMid = (function () {
    if (pathUtil.sep === '/') {
        return function (filename) {
            return filename;
        };
    }
    else {
        var separatorExpression = new RegExp(pathUtil.sep.replace('\\', '\\\\'), 'g');
        return function (filename) {
            return filename.replace(separatorExpression, '/');
        };
    }
})();
function getFilenames(files) {
    return files.map(function (filename) {
        var resolvedFilename = pathUtil.resolve(filename);
        return resolvedFilename;
    });
}
function getMembers(members) {
    return members.map(function (member) {
        switch (member.kind) {
            case 138 /* PropertySignature */:
                var pdNode = member;
                var type = getTypeSpec(pdNode);
                type.required = !pdNode.questionToken;
                return type;
            case 147 /* IndexSignature */:
                var sigNode = member;
                return {
                    kind: "IndexSignature",
                    required: false,
                    in: sigNode.parameters.map(function (param) { return getType(param.type); }),
                    out: getType(sigNode.type)
                };
            default:
                return "I don't know how to handle Type literal type " + SyntaxKind[member.kind] + ". " +
                    "Why not submit a PR?";
        }
    });
}
function getEnumMembers(members) {
    return members.map(function (member) {
        switch (member.kind) {
            case 245 /* EnumMember */:
                var enNode = member;
                return {
                    kind: "EnumMember",
                    name: enNode.name.text,
                    value: getExpression(enNode.initializer)
                };
            default:
                return "I don't know how to handle enum subtype " + SyntaxKind[member.kind] + ". " +
                    "Why not submit a PR?";
        }
    });
}
function getExpression(node) {
    switch (node.kind) {
        case 8 /* FirstLiteralToken */:
            return node.text;
        default:
            return "I don't know how to handle expression subtype " + SyntaxKind[node.kind] + ". Why not submit " +
                "a PR?";
    }
}
function getType(node) {
    switch (node.kind) {
        case 149 /* TypeReference */:
            var trNode = node;
            if ("right" in trNode.typeName) {
                return trNode.typeName.right.text;
            }
            else {
                return trNode.typeName.text;
            }
            break;
        case 128 /* StringKeyword */:
            return "string";
            break;
        case 126 /* NumberKeyword */:
            return "number";
            break;
        case 118 /* BooleanKeyword */:
            return "boolean";
            break;
        case 115 /* AnyKeyword */:
            return "boolean";
            break;
        case 154 /* ArrayType */:
            var arNode = node;
            return getType(arNode.elementType) + "[]";
            break;
        case 153 /* TypeLiteral */: {
            var litNode = node;
            return {
                kind: "typeLiteral",
                members: getMembers(litNode.members)
            };
        }
        default:
            return "I don't know how to handle type " + SyntaxKind[node.kind] + ". Why not submit a PR?";
            break;
    }
}
function getTypeSpec(decl) {
    if (decl.type.kind === 150 /* FunctionType */) {
        var fnNode = decl.type;
        return {
            name: decl.name.text,
            kind: "FunctionDeclaration",
            in: fnNode.parameters.map(function (param) { return getType(param.type); }),
            out: getType(fnNode.type)
        };
    }
    else {
        return {
            name: decl.name.text,
            kind: getType(decl.type)
        };
    }
}
function processTree(sourceFile) {
    var code = '';
    var cursorPosition = 0;
    function skip(node) {
        cursorPosition = node.end;
    }
    function readThrough(node) {
        code += sourceFile.text.slice(cursorPosition, node.pos);
        cursorPosition = node.pos;
    }
    function handleSymbol(node, implicitExport) {
        if (implicitExport === void 0) { implicitExport = false; }
        var children = node.getChildren(sourceFile);
        var asts = [];
        var syntaxList = lodash_1.find(children, function (child) { return child.kind === 269 /* SyntaxList */; });
        var isExport = implicitExport || Boolean(node.flags & 1 /* Export */);
        if (!isExport) {
            return;
        }
        switch (node.kind) {
            case 211 /* FunctionDeclaration */: {
                var fdNode = node;
                // ast.children = children.map(child => visit(child)).filter(node => Boolean(node));
                var ast = {
                    kind: SyntaxKind[node.kind],
                    name: fdNode.name.text,
                    in: fdNode.parameters.map(function (param) { return getType(param.type); }),
                    out: getType(fdNode.type)
                };
                asts.push(ast);
                break;
            }
            case 191 /* VariableStatement */: {
                var vdNode = node;
                asts = vdNode.declarationList.declarations.map(function (decl) {
                    return getTypeSpec(decl);
                });
                break;
            }
            case 213 /* InterfaceDeclaration */: {
                var icNode = node;
                var ast = {
                    kind: SyntaxKind[node.kind],
                    name: icNode.name.text,
                    members: getMembers(icNode.members),
                    extends: icNode.heritageClauses ? icNode.heritageClauses.map(function (clause) { return clause.types[0].expression.text; }) : []
                };
                asts.push(ast);
                break;
            }
            case 216 /* ModuleDeclaration */: {
                var modDec = node;
                var ast = {
                    name: modDec.name.text,
                    symbols: lodash_1.flatten(lodash_1.flatten(children.filter(function (node) { return node.kind === 217 /* ModuleBlock */; }).map(function (child) {
                        return child.statements.map(function (sym) { return handleSymbol(sym, true); });
                    }).filter(function (a) { return Boolean(a); })))
                };
                asts.push(ast);
                break;
            }
            case 215 /* EnumDeclaration */: {
                var enDec = node;
                var ast = {
                    kind: SyntaxKind[node.kind],
                    name: enDec.name.text,
                    members: getEnumMembers(enDec.members)
                };
                asts.push(ast);
                break;
            }
            default: {
                var ast = {
                    kind: SyntaxKind[node.kind]
                };
                ast.error = "I don't know how to handle export type " + SyntaxKind[node.kind] + ". Why not submit a PR?";
                ast.childCount = children.map(function (child) { return visit(child); }).filter(function (node) { return Boolean(node); }).length;
                asts.push(ast);
                break;
            }
        }
        return asts;
    }
    function visit(node) {
        // console.log('sk', SyntaxKind[node.kind]);
        // console.log((node as any).text && (node as any).text.substr(0, 500));
        var children = node.getChildren(sourceFile);
        var ast = {
            kind: SyntaxKind[node.kind]
        };
        switch (node.kind) {
            case 246 /* SourceFile */:
                return lodash_1.flatten(children.map(function (child) { return visit(child); }).filter(function (node) { return Boolean(node); }));
                break;
            case 269 /* SyntaxList */:
                return children.map(function (child) { return visit(child); }).filter(function (node) { return Boolean(node); });
                break;
            case 216 /* ModuleDeclaration */:
                var modDec = node;
                ast.name = modDec.name.text;
                ast.symbols = lodash_1.flatten(lodash_1.flatten(children.filter(function (node) { return node.kind === 217 /* ModuleBlock */; }).map(function (child) {
                    return child.statements.map(function (sym) { return handleSymbol(sym); });
                }).filter(function (a) { return Boolean(a); })))
                    .filter(function (a) { return Boolean(a); });
                break;
            case 1 /* EndOfFileToken */:
                return null;
            default:
                ast = handleSymbol(node, true);
                ast.handled = false;
                // ast.childCount = children.map(child => visit(child)).filter(node => Boolean(node)).length;
                break;
        }
        return ast;
    }
    return visit(sourceFile);
}
function generate(options) {
    var noop = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
    };
    var sendMessage = options.sendMessage || noop;
    var verboseMessage = options.verbose ? sendMessage : noop;
    var eol = options.eol || os.EOL;
    var nonEmptyLineStart = new RegExp(eol + '(?!' + eol + '|$)', 'g');
    var target = options.target || 2 /* Latest */;
    verboseMessage("taget = " + target);
    var compilerOptions = {
        declaration: true,
        module: 1 /* CommonJS */,
        target: target
    };
    if (options.outDir) {
        verboseMessage("outDir = " + options.outDir);
        compilerOptions.outDir = options.outDir;
    }
    if (options.moduleResolution) {
        verboseMessage("moduleResolution = " + options.moduleResolution);
        compilerOptions.moduleResolution = options.moduleResolution;
    }
    var filenames = getFilenames(options.files);
    verboseMessage('filenames:');
    filenames.forEach(function (name) { verboseMessage('  ' + name); });
    var excludesMap = {};
    options.exclude = options.exclude || ['node_modules/**/*.d.ts'];
    if (options.exclude) {
        verboseMessage('exclude:');
        options.exclude.forEach(function (name) { verboseMessage('  ' + name); });
    }
    mkdirp.sync(pathUtil.dirname(options.out));
    /* node.js typings are missing the optional mode in createWriteStream options and therefore
     * in TS 1.6 the strict object literal checking is throwing, therefore a hammer to the nut */
    var output = fs.createWriteStream(options.out, { mode: parseInt('644', 8) });
    var host = ts.createCompilerHost(compilerOptions);
    var program = ts.createProgram(filenames, compilerOptions, host);
    var decls = [];
    return new Promise(function (resolve, reject) {
        output.on('close', function () { resolve(undefined); });
        output.on('error', reject);
        if (options.externs) {
            options.externs.forEach(function (path) {
                sendMessage("Writing external dependency " + path);
                output.write(("/// <reference path=\"" + path + "\" />") + eol);
            });
        }
        sendMessage('processing:');
        program.getSourceFiles().some(function (sourceFile) {
            // Source file is a default library, or other dependency from another project, that should not be included in
            // our bundled output
            if (excludesMap[filenameToMid(pathUtil.normalize(sourceFile.fileName))]) {
                return;
            }
            sendMessage("  " + sourceFile.fileName);
            console.assert(sourceFile.fileName.slice(-5) === '.d.ts');
            decls = decls.concat(processTree(sourceFile));
            return false;
        });
        sendMessage("output to \"" + options.out + "\"");
        output.write(JSON.stringify(lodash_1.flatten(decls), null, 2));
        output.end();
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
function main(argv) {
    var kwArgs = {
        files: [],
        sendMessage: console.log.bind(console)
    };
    for (var i = 0; i < argv.length; ++i) {
        var arg = argv[i];
        if (arg.charAt(0) === '-') {
            var key = argv[i].replace(/^-+/, '');
            var value = argv[i + 1];
            ++i;
            if (key === 'exclude') {
                if (!kwArgs.exclude) {
                    kwArgs.exclude = [];
                }
                kwArgs.exclude.push(value);
            }
            else if (key === 'extern') {
                if (!kwArgs.externs) {
                    kwArgs.externs = [];
                }
                kwArgs.externs.push(value);
            }
            else if (key === 'verbose') {
                kwArgs.verbose = true;
                /* decrement counter, because vebose does not take a value */
                --i;
            }
            else {
                kwArgs[key] = value;
            }
        }
        else {
            kwArgs.files.push(argv[i]);
        }
    }
    if (!kwArgs['out']) {
        console.error("Missing required argument \"out\"");
        process.exit(1);
    }
    if (kwArgs.files.length === 0) {
        console.error('Missing files');
        process.exit(1);
    }
    console.log('Starting');
    return generate(kwArgs).then(function () {
        console.log('Done!');
    });
}
main(process.argv.slice(2)).then(function (code) {
    return process.exit(code || 0);
}, function (err) {
    throw err;
});
