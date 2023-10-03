// Function to calculate the greatest common divisor (GCD) using Euclid's algorithm
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Function to check if two numbers are coprime (have GCD equal to 1)
function areCoprime(a: number, b: number) {
  return gcd(a, b) === 1;
}

// Function to generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Finding a random number coprime to 780
export function findCoprime() {
  const min = 2; // Minimum value for e (greater than 1)
  const max = 780; // Maximum value for e (exclusive)

  let e;
  do {
    e = getRandomInt(min, max);
  } while (!areCoprime(e, 780));

  return e;
}
