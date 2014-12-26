var assert = require("assert");
function popFront(t) {
    t.slice(1);
    return t;
}
(function (StartStop) {
    StartStop[StartStop["Start"] = 0] = "Start";
    StartStop[StartStop["Stop"] = 1] = "Stop";
})(exports.StartStop || (exports.StartStop = {}));
var StartStop = exports.StartStop;
(function (StartStopContinue) {
    StartStopContinue[StartStopContinue["Start"] = 0] = "Start";
    StartStopContinue[StartStopContinue["Stop"] = 1] = "Stop";
    StartStopContinue[StartStopContinue["Continue"] = 2] = "Continue";
})(exports.StartStopContinue || (exports.StartStopContinue = {}));
var StartStopContinue = exports.StartStopContinue;
(function (StartStopSingle) {
    StartStopSingle[StartStopSingle["Single"] = 3] = "Single";
    StartStopSingle[StartStopSingle["Start"] = 0] = "Start";
    StartStopSingle[StartStopSingle["Stop"] = 1] = "Stop";
})(exports.StartStopSingle || (exports.StartStopSingle = {}));
var StartStopSingle = exports.StartStopSingle;
(function (SymbolSize) {
    SymbolSize[SymbolSize["Unspecified"] = 0] = "Unspecified";
    SymbolSize[SymbolSize["Full"] = 1] = "Full";
    SymbolSize[SymbolSize["Cue"] = 2] = "Cue";
    SymbolSize[SymbolSize["Large"] = 3] = "Large";
})(exports.SymbolSize || (exports.SymbolSize = {}));
var SymbolSize = exports.SymbolSize;
(function (AboveBelow) {
    AboveBelow[AboveBelow["Above"] = 1] = "Above";
    AboveBelow[AboveBelow["Below"] = 2] = "Below";
    AboveBelow[AboveBelow["Unspecified"] = 0] = "Unspecified";
})(exports.AboveBelow || (exports.AboveBelow = {}));
var AboveBelow = exports.AboveBelow;
(function (OverUnder) {
    OverUnder[OverUnder["Over"] = 1] = "Over";
    OverUnder[OverUnder["Under"] = 2] = "Under";
    OverUnder[OverUnder["Unspecified"] = 0] = "Unspecified";
})(exports.OverUnder || (exports.OverUnder = {}));
var OverUnder = exports.OverUnder;
(function (UpDown) {
    UpDown[UpDown["Down"] = 1] = "Down";
    UpDown[UpDown["Up"] = 0] = "Up";
})(exports.UpDown || (exports.UpDown = {}));
var UpDown = exports.UpDown;
(function (TopBottom) {
    TopBottom[TopBottom["Top"] = 0] = "Top";
    TopBottom[TopBottom["Bottom"] = 1] = "Bottom";
})(exports.TopBottom || (exports.TopBottom = {}));
var TopBottom = exports.TopBottom;
(function (LeftRight) {
    LeftRight[LeftRight["Right"] = 1] = "Right";
    LeftRight[LeftRight["Left"] = 0] = "Left";
})(exports.LeftRight || (exports.LeftRight = {}));
var LeftRight = exports.LeftRight;
function verifyNumberOfLines(m) {
    assert(m >= 0 && m <= 3);
}
exports.verifyNumberOfLines = verifyNumberOfLines;
function verifyRotation(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyRotation = verifyRotation;
(function (EnclosureShape) {
    EnclosureShape[EnclosureShape["Circle"] = 3] = "Circle";
    EnclosureShape[EnclosureShape["Bracket"] = 4] = "Bracket";
    EnclosureShape[EnclosureShape["Triangle"] = 5] = "Triangle";
    EnclosureShape[EnclosureShape["Diamond"] = 6] = "Diamond";
    EnclosureShape[EnclosureShape["None"] = 7] = "None";
    EnclosureShape[EnclosureShape["Square"] = 1] = "Square";
    EnclosureShape[EnclosureShape["Oval"] = 2] = "Oval";
    EnclosureShape[EnclosureShape["Rectangle"] = 0] = "Rectangle";
})(exports.EnclosureShape || (exports.EnclosureShape = {}));
var EnclosureShape = exports.EnclosureShape;
(function (NormalItalic) {
    NormalItalic[NormalItalic["Italic"] = 1] = "Italic";
    NormalItalic[NormalItalic["Normal"] = 0] = "Normal";
})(exports.NormalItalic || (exports.NormalItalic = {}));
var NormalItalic = exports.NormalItalic;
(function (NormalBold) {
    NormalBold[NormalBold["Bold"] = 2] = "Bold";
    NormalBold[NormalBold["Normal"] = 0] = "Normal";
})(exports.NormalBold || (exports.NormalBold = {}));
var NormalBold = exports.NormalBold;
function verifyNumberLevel(m) {
    assert(m >= 1 && m <= 6);
}
exports.verifyNumberLevel = verifyNumberLevel;
function verifyBeamLevel(m) {
    assert(m >= 1 && m <= 8);
}
exports.verifyBeamLevel = verifyBeamLevel;
(function (LeftCenterRight) {
    LeftCenterRight[LeftCenterRight["Right"] = 1] = "Right";
    LeftCenterRight[LeftCenterRight["Center"] = 2] = "Center";
    LeftCenterRight[LeftCenterRight["Left"] = 0] = "Left";
})(exports.LeftCenterRight || (exports.LeftCenterRight = {}));
var LeftCenterRight = exports.LeftCenterRight;
(function (TopMiddleBottomBaseline) {
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Top"] = 0] = "Top";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Middle"] = 1] = "Middle";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Baseline"] = 3] = "Baseline";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Bottom"] = 2] = "Bottom";
})(exports.TopMiddleBottomBaseline || (exports.TopMiddleBottomBaseline = {}));
var TopMiddleBottomBaseline = exports.TopMiddleBottomBaseline;
(function (DirectionMode) {
    DirectionMode[DirectionMode["Lro"] = 2] = "Lro";
    DirectionMode[DirectionMode["Rlo"] = 3] = "Rlo";
    DirectionMode[DirectionMode["Ltr"] = 0] = "Ltr";
    DirectionMode[DirectionMode["Rtl"] = 1] = "Rtl";
})(exports.DirectionMode || (exports.DirectionMode = {}));
var DirectionMode = exports.DirectionMode;
(function (StraightCurved) {
    StraightCurved[StraightCurved["Curved"] = 1] = "Curved";
    StraightCurved[StraightCurved["Straight"] = 0] = "Straight";
})(exports.StraightCurved || (exports.StraightCurved = {}));
var StraightCurved = exports.StraightCurved;
(function (SolidDashedDottedWavy) {
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dashed"] = 1] = "Dashed";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Wavy"] = 3] = "Wavy";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dotted"] = 2] = "Dotted";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Solid"] = 0] = "Solid";
})(exports.SolidDashedDottedWavy || (exports.SolidDashedDottedWavy = {}));
var SolidDashedDottedWavy = exports.SolidDashedDottedWavy;
(function (NormalAngledSquare) {
    NormalAngledSquare[NormalAngledSquare["Angled"] = 1] = "Angled";
    NormalAngledSquare[NormalAngledSquare["Square"] = 2] = "Square";
    NormalAngledSquare[NormalAngledSquare["Normal"] = 0] = "Normal";
})(exports.NormalAngledSquare || (exports.NormalAngledSquare = {}));
var NormalAngledSquare = exports.NormalAngledSquare;
(function (UprightInverted) {
    UprightInverted[UprightInverted["Upright"] = 0] = "Upright";
    UprightInverted[UprightInverted["Inverted"] = 1] = "Inverted";
})(exports.UprightInverted || (exports.UprightInverted = {}));
var UprightInverted = exports.UprightInverted;
(function (UpperMainBelow) {
    UpperMainBelow[UpperMainBelow["Main"] = 1] = "Main";
    UpperMainBelow[UpperMainBelow["Below"] = 2] = "Below";
    UpperMainBelow[UpperMainBelow["Upper"] = 0] = "Upper";
})(exports.UpperMainBelow || (exports.UpperMainBelow = {}));
var UpperMainBelow = exports.UpperMainBelow;
(function (WholeHalfUnison) {
    WholeHalfUnison[WholeHalfUnison["Unison"] = 2] = "Unison";
    WholeHalfUnison[WholeHalfUnison["Whole"] = 0] = "Whole";
    WholeHalfUnison[WholeHalfUnison["Half"] = 1] = "Half";
})(exports.WholeHalfUnison || (exports.WholeHalfUnison = {}));
var WholeHalfUnison = exports.WholeHalfUnison;
(function (WholeHalfNone) {
    WholeHalfNone[WholeHalfNone["None"] = 3] = "None";
    WholeHalfNone[WholeHalfNone["Whole"] = 0] = "Whole";
    WholeHalfNone[WholeHalfNone["Half"] = 1] = "Half";
})(exports.WholeHalfNone || (exports.WholeHalfNone = {}));
var WholeHalfNone = exports.WholeHalfNone;
function verifyMidiChannel(m) {
    assert(m >= 1 && m <= 16);
}
exports.verifyMidiChannel = verifyMidiChannel;
function verifyMidiBank(m) {
    assert(m >= 1 && m <= 16384);
}
exports.verifyMidiBank = verifyMidiBank;
function verifyMidiProgram(m) {
    assert(m >= 1 && m <= 128);
}
exports.verifyMidiProgram = verifyMidiProgram;
function verifyMidiUnpitched(m) {
    assert(m >= 1 && m <= 128);
}
exports.verifyMidiUnpitched = verifyMidiUnpitched;
function verifyVolume(m) {
    assert(m >= 1 && m <= 100);
}
exports.verifyVolume = verifyVolume;
function verifyPan(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyPan = verifyPan;
function verifyElevation(m) {
    assert(m >= -180 && m <= 180);
}
exports.verifyElevation = verifyElevation;
(function (OddEvenBoth) {
    OddEvenBoth[OddEvenBoth["Both"] = 2] = "Both";
    OddEvenBoth[OddEvenBoth["Even"] = 1] = "Even";
    OddEvenBoth[OddEvenBoth["Odd"] = 0] = "Odd";
})(exports.OddEvenBoth || (exports.OddEvenBoth = {}));
var OddEvenBoth = exports.OddEvenBoth;
(function (CueGraceLarge) {
    CueGraceLarge[CueGraceLarge["Grace"] = 1] = "Grace";
    CueGraceLarge[CueGraceLarge["Cue"] = 0] = "Cue";
    CueGraceLarge[CueGraceLarge["Large"] = 2] = "Large";
})(exports.CueGraceLarge || (exports.CueGraceLarge = {}));
var CueGraceLarge = exports.CueGraceLarge;
(function (SeparatorType) {
    SeparatorType[SeparatorType["None"] = 0] = "None";
    SeparatorType[SeparatorType["Horizontal"] = 1] = "Horizontal";
    SeparatorType[SeparatorType["Diagonal"] = 2] = "Diagonal";
    SeparatorType[SeparatorType["Vertical"] = 3] = "Vertical";
    SeparatorType[SeparatorType["Adjacent"] = 4] = "Adjacent";
})(exports.SeparatorType || (exports.SeparatorType = {}));
var SeparatorType = exports.SeparatorType;
(function (TimeSymbolType) {
    TimeSymbolType[TimeSymbolType["DottedNote"] = 4] = "DottedNote";
    TimeSymbolType[TimeSymbolType["Cut"] = 1] = "Cut";
    TimeSymbolType[TimeSymbolType["SingleNumber"] = 2] = "SingleNumber";
    TimeSymbolType[TimeSymbolType["Note"] = 3] = "Note";
    TimeSymbolType[TimeSymbolType["Common"] = 0] = "Common";
    TimeSymbolType[TimeSymbolType["Normal"] = 5] = "Normal";
})(exports.TimeSymbolType || (exports.TimeSymbolType = {}));
var TimeSymbolType = exports.TimeSymbolType;
(function (CancelLocation) {
    CancelLocation[CancelLocation["Right"] = 1] = "Right";
    CancelLocation[CancelLocation["BeforeBarline"] = 2] = "BeforeBarline";
    CancelLocation[CancelLocation["Left"] = 0] = "Left";
})(exports.CancelLocation || (exports.CancelLocation = {}));
var CancelLocation = exports.CancelLocation;
(function (PartSymbolType) {
    PartSymbolType[PartSymbolType["None"] = 0] = "None";
    PartSymbolType[PartSymbolType["Line"] = 2] = "Line";
    PartSymbolType[PartSymbolType["Bracket"] = 3] = "Bracket";
    PartSymbolType[PartSymbolType["Square"] = 4] = "Square";
    PartSymbolType[PartSymbolType["Brace"] = 1] = "Brace";
})(exports.PartSymbolType || (exports.PartSymbolType = {}));
var PartSymbolType = exports.PartSymbolType;
(function (ShowFretsType) {
    ShowFretsType[ShowFretsType["Letters"] = 1] = "Letters";
    ShowFretsType[ShowFretsType["Numbers"] = 0] = "Numbers";
})(exports.ShowFretsType || (exports.ShowFretsType = {}));
var ShowFretsType = exports.ShowFretsType;
(function (Count) {
    Count[Count["Quarter"] = 4] = "Quarter";
    Count[Count["Breve"] = 9990] = "Breve";
    Count[Count["Long"] = 9991] = "Long";
    Count[Count["_1024th"] = 1024] = "_1024th";
    Count[Count["_32nd"] = 32] = "_32nd";
    Count[Count["_16th"] = 16] = "_16th";
    Count[Count["Eighth"] = 8] = "Eighth";
    Count[Count["Maxima"] = 9992] = "Maxima";
    Count[Count["_512th"] = 512] = "_512th";
    Count[Count["_64th"] = 64] = "_64th";
    Count[Count["_256th"] = 256] = "_256th";
    Count[Count["_128th"] = 128] = "_128th";
    Count[Count["Half"] = 2] = "Half";
    Count[Count["Whole"] = 1] = "Whole";
})(exports.Count || (exports.Count = {}));
var Count = exports.Count;
(function (MxmlAccidental) {
    MxmlAccidental[MxmlAccidental["NaturalFlat"] = 7] = "NaturalFlat";
    MxmlAccidental[MxmlAccidental["SharpUp"] = 13] = "SharpUp";
    MxmlAccidental[MxmlAccidental["ThreeQuartersFlat"] = 10] = "ThreeQuartersFlat";
    MxmlAccidental[MxmlAccidental["ThreeQuartersSharp"] = 11] = "ThreeQuartersSharp";
    MxmlAccidental[MxmlAccidental["QuarterFlat"] = 8] = "QuarterFlat";
    MxmlAccidental[MxmlAccidental["Flat"] = 2] = "Flat";
    MxmlAccidental[MxmlAccidental["TripleSharp"] = 18] = "TripleSharp";
    MxmlAccidental[MxmlAccidental["Flat1"] = 27] = "Flat1";
    MxmlAccidental[MxmlAccidental["Flat2"] = 28] = "Flat2";
    MxmlAccidental[MxmlAccidental["Flat3"] = 29] = "Flat3";
    MxmlAccidental[MxmlAccidental["Flat4"] = 291] = "Flat4";
    MxmlAccidental[MxmlAccidental["TripleFlat"] = 19] = "TripleFlat";
    MxmlAccidental[MxmlAccidental["Flat5"] = 30] = "Flat5";
    MxmlAccidental[MxmlAccidental["Sharp"] = 0] = "Sharp";
    MxmlAccidental[MxmlAccidental["QuarterSharp"] = 9] = "QuarterSharp";
    MxmlAccidental[MxmlAccidental["SlashFlat"] = 21] = "SlashFlat";
    MxmlAccidental[MxmlAccidental["FlatDown"] = 16] = "FlatDown";
    MxmlAccidental[MxmlAccidental["NaturalDown"] = 14] = "NaturalDown";
    MxmlAccidental[MxmlAccidental["SlashQuarterSharp"] = 19] = "SlashQuarterSharp";
    MxmlAccidental[MxmlAccidental["SharpSharp"] = 4] = "SharpSharp";
    MxmlAccidental[MxmlAccidental["Sharp1"] = 23] = "Sharp1";
    MxmlAccidental[MxmlAccidental["FlatUp"] = 17] = "FlatUp";
    MxmlAccidental[MxmlAccidental["Sharp2"] = 24] = "Sharp2";
    MxmlAccidental[MxmlAccidental["Sharp3"] = 25] = "Sharp3";
    MxmlAccidental[MxmlAccidental["DoubleSharp"] = 3] = "DoubleSharp";
    MxmlAccidental[MxmlAccidental["Sharp4"] = 251] = "Sharp4";
    MxmlAccidental[MxmlAccidental["Sharp5"] = 26] = "Sharp5";
    MxmlAccidental[MxmlAccidental["Sori"] = 31] = "Sori";
    MxmlAccidental[MxmlAccidental["DoubleSlashFlat"] = 22] = "DoubleSlashFlat";
    MxmlAccidental[MxmlAccidental["SharpDown"] = 12] = "SharpDown";
    MxmlAccidental[MxmlAccidental["Koron"] = 32] = "Koron";
    MxmlAccidental[MxmlAccidental["NaturalUp"] = 15] = "NaturalUp";
    MxmlAccidental[MxmlAccidental["SlashSharp"] = 20] = "SlashSharp";
    MxmlAccidental[MxmlAccidental["NaturalSharp"] = 6] = "NaturalSharp";
    MxmlAccidental[MxmlAccidental["FlatFlat"] = 5] = "FlatFlat";
    MxmlAccidental[MxmlAccidental["Natural"] = 1] = "Natural";
    MxmlAccidental[MxmlAccidental["DoubleFlat"] = 33] = "DoubleFlat";
})(exports.MxmlAccidental || (exports.MxmlAccidental = {}));
var MxmlAccidental = exports.MxmlAccidental;
(function (StemType) {
    StemType[StemType["None"] = 2] = "None";
    StemType[StemType["Double"] = 3] = "Double";
    StemType[StemType["Down"] = 0] = "Down";
    StemType[StemType["Up"] = 1] = "Up";
})(exports.StemType || (exports.StemType = {}));
var StemType = exports.StemType;
(function (NoteheadType) {
    NoteheadType[NoteheadType["InvertedTriangle"] = 7] = "InvertedTriangle";
    NoteheadType[NoteheadType["CircleDot"] = 14] = "CircleDot";
    NoteheadType[NoteheadType["ArrowUp"] = 9] = "ArrowUp";
    NoteheadType[NoteheadType["Do"] = 18] = "Do";
    NoteheadType[NoteheadType["Mi"] = 20] = "Mi";
    NoteheadType[NoteheadType["Cross"] = 4] = "Cross";
    NoteheadType[NoteheadType["Slash"] = 0] = "Slash";
    NoteheadType[NoteheadType["Fa"] = 21] = "Fa";
    NoteheadType[NoteheadType["Triangle"] = 1] = "Triangle";
    NoteheadType[NoteheadType["FaUp"] = 22] = "FaUp";
    NoteheadType[NoteheadType["So"] = 23] = "So";
    NoteheadType[NoteheadType["LeftTriangle"] = 15] = "LeftTriangle";
    NoteheadType[NoteheadType["BackSlashed"] = 11] = "BackSlashed";
    NoteheadType[NoteheadType["None"] = 17] = "None";
    NoteheadType[NoteheadType["La"] = 24] = "La";
    NoteheadType[NoteheadType["Slashed"] = 10] = "Slashed";
    NoteheadType[NoteheadType["Normal"] = 12] = "Normal";
    NoteheadType[NoteheadType["Cluster"] = 13] = "Cluster";
    NoteheadType[NoteheadType["Ti"] = 25] = "Ti";
    NoteheadType[NoteheadType["Re"] = 19] = "Re";
    NoteheadType[NoteheadType["Nrectangle"] = 16] = "Nrectangle";
    NoteheadType[NoteheadType["Square"] = 3] = "Square";
    NoteheadType[NoteheadType["ArrowDown"] = 8] = "ArrowDown";
    NoteheadType[NoteheadType["X"] = 5] = "X";
    NoteheadType[NoteheadType["Diamond"] = 2] = "Diamond";
    NoteheadType[NoteheadType["CircleX"] = 6] = "CircleX";
})(exports.NoteheadType || (exports.NoteheadType = {}));
var NoteheadType = exports.NoteheadType;
(function (BeamType) {
    BeamType[BeamType["BackwardHook"] = 4] = "BackwardHook";
    BeamType[BeamType["Begin"] = 0] = "Begin";
    BeamType[BeamType["ForwardHook"] = 3] = "ForwardHook";
    BeamType[BeamType["Continue"] = 1] = "Continue";
    BeamType[BeamType["End"] = 2] = "End";
})(exports.BeamType || (exports.BeamType = {}));
var BeamType = exports.BeamType;
(function (AccelRitNone) {
    AccelRitNone[AccelRitNone["Accel"] = 0] = "Accel";
    AccelRitNone[AccelRitNone["None"] = 2] = "None";
    AccelRitNone[AccelRitNone["Rit"] = 1] = "Rit";
})(exports.AccelRitNone || (exports.AccelRitNone = {}));
var AccelRitNone = exports.AccelRitNone;
(function (ActualBothNone) {
    ActualBothNone[ActualBothNone["None"] = 2] = "None";
    ActualBothNone[ActualBothNone["Both"] = 1] = "Both";
    ActualBothNone[ActualBothNone["Actual"] = 0] = "Actual";
})(exports.ActualBothNone || (exports.ActualBothNone = {}));
var ActualBothNone = exports.ActualBothNone;
(function (HoleLocation) {
    HoleLocation[HoleLocation["Right"] = 0] = "Right";
    HoleLocation[HoleLocation["Top"] = 3] = "Top";
    HoleLocation[HoleLocation["Bottom"] = 1] = "Bottom";
    HoleLocation[HoleLocation["Left"] = 2] = "Left";
})(exports.HoleLocation || (exports.HoleLocation = {}));
var HoleLocation = exports.HoleLocation;
(function (HoleClosedType) {
    HoleClosedType[HoleClosedType["No"] = 1] = "No";
    HoleClosedType[HoleClosedType["Yes"] = 0] = "Yes";
    HoleClosedType[HoleClosedType["Half"] = 2] = "Half";
})(exports.HoleClosedType || (exports.HoleClosedType = {}));
var HoleClosedType = exports.HoleClosedType;
(function (BreathMarkType) {
    BreathMarkType[BreathMarkType["Empty"] = 2] = "Empty";
    BreathMarkType[BreathMarkType["Comma"] = 0] = "Comma";
    BreathMarkType[BreathMarkType["Tick"] = 1] = "Tick";
})(exports.BreathMarkType || (exports.BreathMarkType = {}));
var BreathMarkType = exports.BreathMarkType;
(function (BarlineLocation) {
    BarlineLocation[BarlineLocation["Right"] = 1] = "Right";
    BarlineLocation[BarlineLocation["Middle"] = 2] = "Middle";
    BarlineLocation[BarlineLocation["Left"] = 0] = "Left";
})(exports.BarlineLocation || (exports.BarlineLocation = {}));
var BarlineLocation = exports.BarlineLocation;
(function (BarStyleType) {
    BarStyleType[BarStyleType["Regular"] = 0] = "Regular";
    BarStyleType[BarStyleType["LightHeavy"] = 5] = "LightHeavy";
    BarStyleType[BarStyleType["HeavyLight"] = 6] = "HeavyLight";
    BarStyleType[BarStyleType["Short"] = 9] = "Short";
    BarStyleType[BarStyleType["None"] = 10] = "None";
    BarStyleType[BarStyleType["Dashed"] = 2] = "Dashed";
    BarStyleType[BarStyleType["HeavyHeavy"] = 7] = "HeavyHeavy";
    BarStyleType[BarStyleType["Tick"] = 8] = "Tick";
    BarStyleType[BarStyleType["Dotted"] = 1] = "Dotted";
    BarStyleType[BarStyleType["Heavy"] = 3] = "Heavy";
    BarStyleType[BarStyleType["LightLight"] = 4] = "LightLight";
})(exports.BarStyleType || (exports.BarStyleType = {}));
var BarStyleType = exports.BarStyleType;
(function (StartStopDiscontinue) {
    StartStopDiscontinue[StartStopDiscontinue["Discontinue"] = 2] = "Discontinue";
    StartStopDiscontinue[StartStopDiscontinue["Start"] = 0] = "Start";
    StartStopDiscontinue[StartStopDiscontinue["Stop"] = 1] = "Stop";
})(exports.StartStopDiscontinue || (exports.StartStopDiscontinue = {}));
var StartStopDiscontinue = exports.StartStopDiscontinue;
(function (WingedType) {
    WingedType[WingedType["None"] = 0] = "None";
    WingedType[WingedType["Curved"] = 2] = "Curved";
    WingedType[WingedType["DoubleCurved"] = 4] = "DoubleCurved";
    WingedType[WingedType["Straight"] = 1] = "Straight";
    WingedType[WingedType["DoubleStraight"] = 3] = "DoubleStraight";
})(exports.WingedType || (exports.WingedType = {}));
var WingedType = exports.WingedType;
(function (DirectionTypeBg) {
    DirectionTypeBg[DirectionTypeBg["Forward"] = 1] = "Forward";
    DirectionTypeBg[DirectionTypeBg["Backward"] = 0] = "Backward";
})(exports.DirectionTypeBg || (exports.DirectionTypeBg = {}));
var DirectionTypeBg = exports.DirectionTypeBg;
(function (TipDirection) {
    TipDirection[TipDirection["Right"] = 3] = "Right";
    TipDirection[TipDirection["Northwest"] = 4] = "Northwest";
    TipDirection[TipDirection["Southwest"] = 7] = "Southwest";
    TipDirection[TipDirection["Down"] = 1] = "Down";
    TipDirection[TipDirection["Northeast"] = 5] = "Northeast";
    TipDirection[TipDirection["Southeast"] = 6] = "Southeast";
    TipDirection[TipDirection["Up"] = 0] = "Up";
    TipDirection[TipDirection["Left"] = 2] = "Left";
})(exports.TipDirection || (exports.TipDirection = {}));
var TipDirection = exports.TipDirection;
(function (WedgeType) {
    WedgeType[WedgeType["Diminuendo"] = 1] = "Diminuendo";
    WedgeType[WedgeType["Crescendo"] = 0] = "Crescendo";
    WedgeType[WedgeType["Stop"] = 2] = "Stop";
    WedgeType[WedgeType["Continue"] = 3] = "Continue";
})(exports.WedgeType || (exports.WedgeType = {}));
var WedgeType = exports.WedgeType;
(function (LineEndType) {
    LineEndType[LineEndType["None"] = 4] = "None";
    LineEndType[LineEndType["Both"] = 2] = "Both";
    LineEndType[LineEndType["Arrow"] = 3] = "Arrow";
    LineEndType[LineEndType["Down"] = 1] = "Down";
    LineEndType[LineEndType["Up"] = 0] = "Up";
})(exports.LineEndType || (exports.LineEndType = {}));
var LineEndType = exports.LineEndType;
(function (PedalType) {
    PedalType[PedalType["Change"] = 3] = "Change";
    PedalType[PedalType["Start"] = 0] = "Start";
    PedalType[PedalType["Stop"] = 1] = "Stop";
    PedalType[PedalType["Continue"] = 2] = "Continue";
})(exports.PedalType || (exports.PedalType = {}));
var PedalType = exports.PedalType;
(function (OctaveShiftType) {
    OctaveShiftType[OctaveShiftType["Down"] = 2] = "Down";
    OctaveShiftType[OctaveShiftType["Stop"] = 3] = "Stop";
    OctaveShiftType[OctaveShiftType["Up"] = 1] = "Up";
    OctaveShiftType[OctaveShiftType["Continue"] = 4] = "Continue";
})(exports.OctaveShiftType || (exports.OctaveShiftType = {}));
var OctaveShiftType = exports.OctaveShiftType;
(function (VoiceSymbol) {
    VoiceSymbol[VoiceSymbol["None"] = 4] = "None";
    VoiceSymbol[VoiceSymbol["Hauptstimme"] = 1] = "Hauptstimme";
    VoiceSymbol[VoiceSymbol["Nebenstimme"] = 2] = "Nebenstimme";
    VoiceSymbol[VoiceSymbol["Plain"] = 3] = "Plain";
})(exports.VoiceSymbol || (exports.VoiceSymbol = {}));
var VoiceSymbol = exports.VoiceSymbol;
(function (ExplicitImpliedAlternate) {
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Explicit"] = 1] = "Explicit";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Implied"] = 2] = "Implied";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Alternate"] = 3] = "Alternate";
})(exports.ExplicitImpliedAlternate || (exports.ExplicitImpliedAlternate = {}));
var ExplicitImpliedAlternate = exports.ExplicitImpliedAlternate;
(function (ChordType) {
    ChordType[ChordType["Augmented"] = 3] = "Augmented";
    ChordType[ChordType["Diminished"] = 4] = "Diminished";
    ChordType[ChordType["Major"] = 1] = "Major";
    ChordType[ChordType["Minor"] = 2] = "Minor";
    ChordType[ChordType["HalfDiminished"] = 5] = "HalfDiminished";
})(exports.ChordType || (exports.ChordType = {}));
var ChordType = exports.ChordType;
