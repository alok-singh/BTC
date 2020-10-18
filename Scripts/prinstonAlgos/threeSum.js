/*
  given an array of integers find all possible
  triplets having sum as 0
  repetation not allowed
*/

const input = [1, 2, 3, 4, 5, 0, -1, -2, -3, -4, -5]

function threeSumBruteForce(array) {
  let count = 0;
  const retArr = [];
  for(let i = 0; i < array.length; i++) {
    for(let j = i + 1; j < array.length; j++) {
      for(let k = j + 1; k < array.length; k++) {
        if(array[i] + array[j] + array[k]) {
          ret[count++] = [array[i], array[j], array[k]];
        }
      }
    }  
  }
  // return array of all possible triplets
  return retArr; 
}


// log(T(N)) vs log(N)