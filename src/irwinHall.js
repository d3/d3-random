export default function(n) {
  if (arguments.length != 1) {
    throw new SyntaxError("irwinHall(n) must be called with only the n parameter.");
  }
  return function() {
    for (var sum = 0, i = 0; i < n; ++i) sum += Math.random();
    return sum;
  };
}
