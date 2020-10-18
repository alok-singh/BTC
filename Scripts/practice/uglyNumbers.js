/**
 * https://www.geeksforgeeks.org/ugly-numbers/
 * 
 * Ugly numbers are numbers whose only prime factors are 2, 3 or 5. 
 * The sequence 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, … shows the first 11 ugly numbers. 
 * By convention, 1 is included.
 * 
  Given a number n, the task is to find n’th Ugly number.
 */

/**
 * V(n) = Min[
 *  Max(V(n - i)*2, V(n - 1)), 
 *  Max(V(n - i)*3, V(n - 1)), 
 *  Max(V(n - i)*5, V(n - 1))
 * ] where (1 <= i <= n);
 */

const map = [1];

const getPowerFactor = (number, numberIndex) => {
  for(let i = 0; i < map.length; i++) {
    if(map[numberIndex - 1] < map[i]*number) {
      return map[i]*number;
    }
  }
  return Number.POSITIVE_INFINITY;
}

const findNthUglyNumber = (n) => {
  for(let index = 1; index < n; index++) {
    const powerTwo = getPowerFactor(2, index);
    const powerThree = getPowerFactor(3, index);
    const powerFive = getPowerFactor(5, index);
    map[index] = Math.min(powerTwo, powerThree, powerFive);
  }
  return map[n - 1];
};

for(let i = 1; i < 1000; i++) {
  console.log(findNthUglyNumber(i));
}
