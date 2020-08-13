var tape = require("tape"),
     d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta.js");

tape("lcg is the expected deterministic PRNG", test => {
  const R1 = 0.7048832636792213;
  var lcg = d3.randomLcg();
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R1, 1e-16);
  lcg = d3.randomLcg();
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R1, 1e-16);
  test.end();
});

tape("lcg is seeded", test => {
  const seed = 42;
  const R42 = 0.22255426598712802;
  const lcg = d3.randomLcg(seed);
  test.inDelta((lcg(), lcg(), lcg(), lcg()), R42, 1e-16);
  test.end();
});

tape("lcg is well-distributed", test => {
  const seed = 2; // 1…11 are ok
  const lcg = d3.randomLcg(seed);
  const run = Float32Array.from({length: 10000}, lcg);
  test.inDelta(d3.mean(run), 1 / 2, 1e-2);
  test.inDelta(d3.deviation(run), Math.sqrt(1 / 12), 1e-2);
  const histogram = d3.rollup(run, v => v.length, d => Math.floor(d * 10));
  for (const h of histogram) test.inDelta(h[1], 1000, 120);
  test.end();
});
