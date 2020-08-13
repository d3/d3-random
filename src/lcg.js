export default seed => {
  const a = 1664525,
    c = 1013904223,
    m = 4294967296; // 2^32
  let s = Math.abs(a * +seed) || 1;
  return () => (s = (a * s + c) % m) / m;
};
