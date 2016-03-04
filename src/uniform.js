export default function(min, max) {
  if (arguments.length != 2) {
    throw new SyntaxError("uniform(min, max) must be called with both the min and max parameters.");
  }
  min = min == null ? 0 : +min;
  max = max == null ? 1 : +max;
  if (arguments.length === 1) max = min, min = 0;
  else max -= min;
  return function() {
    return Math.random() * max + min;
  };
}
