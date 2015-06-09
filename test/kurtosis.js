var arrays = require("d3-arrays");

module.exports = function(array) {
  var mean = arrays.mean(array),
      sum4 = 0,
      sum2 = 0,
      v,
      i = -1,
      n = array.length;

  while (++i < n) {
    v = array[i] - mean;
    sum2 += v * v;
    sum4 += v * v * v * v;
  }

  return (1 / n) * sum4 / Math.pow((1 / n) * sum2, 2) - 3;
};
