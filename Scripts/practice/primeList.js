const primeList = {};

const isPrime = (n) => {
  for (let index = 2; index < n; index++) {
    if (n % index === 0) {
      return false;
    }
  }
  primeList[n] = true;
}

for(let i = 2; i < 1000000; i++) {
  isPrime(i);
}

console.log(Object.keys(primeList));