import defaultSource from "./defaultSource";

export default (function sourceRandomGeometric(source) {
  function randomGeometric(p) {
    if ((p = 1 - p) < 0 || p >= 1) throw new RangeError("invalid p");
    return function() {
      return 1 + Math.floor(Math.log(source()) / Math.log(p));
    };
  }

  randomGeometric.source = sourceRandomGeometric;

  return randomGeometric;
})(defaultSource);
