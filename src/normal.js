export default function(mu, sigma) {
  var n = arguments.length;
  if (!n) mu = 0, sigma = 1;
  else if (n === 1) mu = +mu, sigma = 1;
  else mu = +mu, sigma = +sigma;
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
