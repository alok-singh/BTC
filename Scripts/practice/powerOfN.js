/**
 * https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/
 * 
 * Write a program to calculate pow(x,n)
 * Given two integers x and n, write a function to compute xn. 
 * We may assume that x and n are small and overflow doesn’t happen.
 * 
 */

const powerOfN = (number, power) => {
  let result = number;
  let runningPower = 1;

  if(power === 1) {
    return number;
  }
  
  if(power === 0) {
    return 1;
  }

  while(runningPower < power/2) {
    runningPower = runningPower * 2;
    result = result * result;
    if(runningPower === power) {
      return result;
    }
  }
  return result * powerOfN(number, power - runningPower);
}

for (let index = 0; index < 10; index++) {
  console.log(powerOfN(10, index));
}