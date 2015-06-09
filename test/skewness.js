var arrays = require("d3-arrays");

module.exports = function(array) {
  var mean = arrays.mean(array),
      sum3 = 0,
      sum2 = 0,
      v,
      i = -1,
      n = array.length;

  while (++i < n) {
    v = array[i] - mean;
    sum2 += v * v;
    sum3 += v * v * v;
  }

  return (1 / n) * sum3 / Math.pow((1 / (n - 1)) * sum2, 3 / 2);
};
