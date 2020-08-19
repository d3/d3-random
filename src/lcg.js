// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

export default function lcg(s) {
  if (s === undefined) s = Math.random();
  if (!(0 <= s && s < 1)) throw new RangeError("invalid seed");
  s = Math.floor(m * s);
  const random = () => (s = (a * s + c) % m) / m;
  return random;
}
