export default function(mu, sigma) {
  if (mu == null) mu = 0;
  if (sigma == null) sigma = 1;
  return function() {
    var x, y, r;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);
    return mu + sigma * x * Math.sqrt(-2 * Math.log(r) / r);
  };
};
