export default function(mu, sigma, random) {
  var x, r;
  mu = mu == null ? 0 : +mu;
  sigma = sigma == null ? 1 : +sigma;
  random = random == null ? Math.random : random;
  return function() {
    var y;

    // If available, use the second previously-generated uniform random.
    if (x != null) y = x, x = null;

    // Otherwise, generate a new x and y.
    else do {
      x = random() * 2 - 1;
      y = random() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);

    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
}
