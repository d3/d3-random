export default function(random) {
  return function(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += random();
      return sum;
    };
  };
}
