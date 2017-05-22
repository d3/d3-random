import defaultSource from "./defaultSource";

export default (function sourceRandomPareto(source) {
  function randomPareto(alpha) {
    return function() {
        if ((alpha = +alpha) < 0) throw new RangeError("invalid alpha");
        
        return 1 / Math.pow(1 - source(), 1 / alpha);
    };
  }

  randomPareto.source = sourceRandomPareto;

  return randomPareto;
})(defaultSource);
