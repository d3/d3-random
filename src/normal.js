export default function(mu, sigma) {
  var n = arguments.length, x, r;
  if (!n) mu = 0, sigma = 1;
  else if (n === 1) mu = +mu, sigma = 1;
  else mu = +mu, sigma = +sigma;
  return function() {
    var y;

    // If available, use the second previously-generated uniform random.
    if (x != null) y = x, x = null;

    // Otherwise, generate a new x and y.
    else do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);

    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
};
