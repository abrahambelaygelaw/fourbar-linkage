import { cosLawAngle } from "./math-helpers.js";

 const limitsFourBar = function (g, f, a, b) {
  let limits = {};
  limits.L = g + f + a + b;
  limits.ValidityIndex = limits.L - 2 * Math.max(g, f, a, b);
  limits.valid = limits.ValidityIndex >= 0 && Math.min(g, f, a, b) >= 0;
  if (limits.ValidityIndex >= 0) {
    limits.ValidityRelation = "≥ 0";
  } else {
    limits.ValidityRelation = "< 0";
  }

  limits.GrashofIndex =
    limits.L - 2 * (Math.max(g, f, a, b) + Math.min(g, f, a, b));
  if (limits.GrashofIndex > 0) {
    limits.GrashofRelation = "> 0";
  } else if (limits.GrashofIndex == 0) {
    limits.GrashofRelation = "= 0";
  } else {
    limits.GrashofRelation = "< 0";
  }

  limits.T1 = g + f - a - b;
  limits.T2 = b + g - a - f;
  limits.T3 = b + f - a - g;
  let charVal = function (TVal) {
    if (TVal > 0) {
      return "+";
    } else if (TVal == 0) {
      return "0";
    } else {
      // TVal < 0
      return "-";
    }
  };
  let linkageKey = charVal(limits.T1) + charVal(limits.T2) + charVal(limits.T3);

  let limitAngles = [
    cosLawAngle(a, g, f + b),
    -cosLawAngle(a, g, f + b),
    cosLawAngle(a, g, f - b),
    2 * Math.PI - cosLawAngle(a, g, f - b),
    cosLawAngle(a, g, b - f),
    2 * Math.PI - cosLawAngle(a, g, b - f),
  ];

  let keyMap = {
    "+++": ["crank", "rocker", true, 0, 0, -1, -1],
    "0++": ["crank", "π-rocker", true, 0, 2, -1, -1],
    "-++": ["π-rocker", "π-rocker", false, 0, 2, 2, 3],
    "+0+": ["crank", "0-rocker", true, 0, 2, -1, -1],
    "00+": ["crank", "crank", true, 0, 2, -1, -1],
    "-0+": ["crank", "crank", true, 0, 2, -1, -1],
    "+-+": ["π-rocker", "0-rocker", false, 0, 2, 4, 5],
    "0-+": ["crank", "crank", true, 0, 2, -1, -1],
    "--+": ["crank", "crank", true, 0, 0, -1, -1],
    "++0": ["crank", "π-rocker", true, 1, 2, -1, -1],
    "0+0": ["crank", "π-rocker", true, 0, 1, -1, -1],
    "-+0": ["π-rocker", "π-rocker", true, 1, 1, 2, 3],
    "+00": ["crank", "crank", true, 0, 1, -1, -1],
    "000": ["crank", "crank", true, 0, 1, -1, -1],
    "-00": ["crank", "crank", true, 0, 1, -1, -1],
    "+-0": ["π-rocker", "crank", true, 1, 1, 4, 5],
    "0-0": ["crank", "crank", true, 0, 1, -1, -1],
    "--0": ["crank", "crank", true, 1, 2, -1, -1],
    "++-": ["0-rocker", "π-rocker", false, 0, 2, 1, 0],
    "0+-": ["0-rocker", "π-rocker", true, 1, 1, 1, 0],
    "-+-": ["rocker", "rocker", true, 0, 2, 2, 0],
    "+0-": ["0-rocker", "crank", true, 1, 1, 1, 0],
    "00-": ["0-rocker", "crank", true, 1, 1, 1, 0],
    "-0-": ["0-rocker", "0-rocker", true, 1, 1, 1, 0],
    "+--": ["rocker", "crank", true, 0, 2, 4, 0],
    "0--": ["0-rocker", "crank", true, 1, 1, 1, 0],
    "---": ["0-rocker", "0-rocker", false, 0, 2, 1, 0],
  };
  let data = keyMap[linkageKey];
  limits.inputType = data[0];
  limits.outputType = data[1];
  limits.canFlip = data[4] > 0;
  limits.limited = data[5] >= 0;
  limits.Grashof = data[2];
  limits.flipPhase = data[3];
  limits.flipPeriod = data[4];
  limits.alphaMin = data[5] >= 0 ? limitAngles[data[5]] : 0;
  limits.alphaMax = data[6] >= 0 ? limitAngles[data[6]] : 0;

  if (limits.Grashof) {
    limits.GrashofType = "Grashof";
    limits.GrashofInfo = "rotates fully";
  } else {
    limits.GrashofType = "non-Grashof";
    limits.GrashofInfo = "reciprocates";
  }

  return limits;
};


export { limitsFourBar };