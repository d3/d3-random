export default function(n, random) {
  random = random == null ? Math.random : random;
  return function() {
    for (var sum = 0, i = 0; i < n; ++i) sum += random();
    return sum;
  };
}
