const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

export default function lcg(s = 1) {
  if (s < 0) s = Math.abs(s);
  if (s < 1) s = Math.floor(a + m * s);
  const random = () => (s = (a * s + c) % m) / m;
  random(), random(), random(), random(); // initial mix
  return random;
}
