var tape = require("tape-await"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta.js");

tape("lcg is the expected deterministic PRNG", test => {
  const R1 = 0.6678668977692723;
  var lcg = d3.randomLcg(0);
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R1, 1e-16);
  lcg = d3.randomLcg(0);
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R1, 1e-16);
});

tape("lcg is seeded", test => {
  const seed = 0.42;
  const R42 = 0.6760216606780887;
  const lcg = d3.randomLcg(seed);
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R42, 1e-16);
});

tape("lcg is well-distributed", test => {
  const seed = 0.2; // 1…11 are ok
  const lcg = d3.randomLcg(seed);
  const run = Float32Array.from({length: 10000}, lcg);
  test.inDelta(d3.mean(run), 1 / 2, 1e-2);
  test.inDelta(d3.deviation(run), Math.sqrt(1 / 12), 1e-2);
  const histogram = d3.rollup(run, v => v.length, d => Math.floor(d * 10));
  for (const h of histogram) test.inDelta(h[1], 1000, 120);
});

tape("lcg with small fractional seeds is well-distributed", test => {
  const G = d3.range(100).map(i => d3.randomLcg(i/100));
  const means = [], variances = [];
  for (let i = 0; i < 10; i++) {
    const M = G.map(d => d());
    means.push(d3.mean(M));
    variances.push(d3.variance(M));
  }
  test.inDelta(d3.mean(means), 0.5, 0.02);
  test.assert(d3.min(variances) > 0.75 / 12);
});
