export default function(min, max, random) {
  min = min == null ? 0 : +min;
  max = max == null ? 1 : +max;
  random = random == null ? Math.random : random;
  if (arguments.length === 1) max = min, min = 0;
  else max -= min;
  return function() {
    return random() * max + min;
  };
}
