function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

export function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}
