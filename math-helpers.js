 const roundOff = (num) => {
  return Math.round(num * 10) / 10;
};
const cosLawAngle = function (a, b, c) {
  if (a > 0 && b > 0) {
    let C = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    return C;
  } else {
    return 0;
  }
};

const cosLawLength = function (a, b, C) {
  let c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
  return c;
};

const linearInterp = function (x0, x1, alpha) {
  return (1 - alpha) * x0 + alpha * x1;
};
const solveFourBar = function (g, f, a, b, alpha, flipped) {
  let l = cosLawLength(a, g, alpha);
  let beta1 = cosLawAngle(g, l, a);
  let beta2 = cosLawAngle(l, b, f);
  if (Math.sin(alpha) > 0) {
    if (flipped) {
      return Math.PI - beta1 + beta2;
    } else {
      return Math.PI - beta1 - beta2;
    }
  } else {
    if (flipped) {
      return Math.PI + beta1 + beta2;
    } else {
      return Math.PI + beta1 - beta2;
    }
  }
};

export { roundOff, cosLawAngle, cosLawLength, linearInterp, solveFourBar };