function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(num: number) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

export function getRandomPrimeInRange(min: number, max: number) {
  if (min >= max) {
    return null; // Invalid input range
  }

  let randomPrime;
  do {
    randomPrime = getRandomInt(min, max);
  } while (!isPrime(randomPrime));

  return randomPrime;
}
