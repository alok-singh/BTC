function findNthNumber(t1, t2, n) {
  var memoizationArray = [];
  memoizationArray[0] = String(t1);
  memoizationArray[1] = String(t2);

  for (var i = 0; i < n - 2; i++) {
    // if(i+3>9999){console.log('finding', i+3, 'fibonacci number');}
    memoizationArray[(i + 2) % 3] = stringSum(
      memoizationArray[i % 3],
      memoizationArray[(i + 1) % 3]
    );
  }
  return memoizationArray[(n - 1) % 3];
}

/*
	accepts two string and return sum string
	designed for handling number greater than 
	53 bit integer
*/

function stringSum(a, b) {
  var retString = "";
  var iteration = 0;
  var partialSum = 0;
  var carry = 0;
  var partialA = 0;
  var partialB = 0;

  iteration = a.length > b.length ? a.length : b.length;

  for (
    var i = a.length - 1, j = b.length - 1;
    iteration > 0;
    iteration--, i--, j--
  ) {
    partialA = i < 0 ? 0 : parseInt(a[i]);
    partialB = j < 0 ? 0 : parseInt(b[j]);

    partialSum = carry + partialA + partialB;

    carry = Math.floor(partialSum / 10);
    partialSum = partialSum % 10;

    retString = partialSum + retString;
  }

  retString = carry ? carry + retString : retString;

  return retString;
}

/*
	accepts two string and return a-b string
	designed for handling number greater than 
	53 bit integer
*/

function stringSubstract(a, b) {
  var retString = "";
  var partialSub = 0;
  var partialA = 0;
  var partialB = 0;
  var carry = 0;
  var trimIndex = 0;

  if (isGreater(a, b) == a) {
    for (var i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
      partialA = parseInt(a[i]);
      partialB = j < 0 ? 0 : parseInt(b[j]);
      partialSub = partialA - partialB + carry;
      carry = partialSub >= 0 ? 0 : -1;
      partialSub = partialSub >= 0 ? partialSub : 10 + partialSub;
      retString = partialSub + retString;
    }
    while (retString[trimIndex] == 0 && trimIndex < retString.length - 1) {
      trimIndex++;
    }
    return retString.slice(trimIndex);
  } else {
    return "-" + stringSubstract(b, a);
  }
}

function isGreater(a, b) {
  if (a.length > b.length) {
    return a;
  } else if (b.length > a.length) {
    return b;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (parseInt(a[i]) > parseInt(b[i])) {
        return a;
      } else if (parseInt(a[i]) < parseInt(b[i])) {
        return b;
      }
    }
  }
  return a;
}

/*
	run test cases for number much lower then 
	64-bit integer
*/
function basicSumTest() {
  var isFailed = false;
  console.log("started");
  for (var i = 0; i < 10000; i++) {
    for (var j = 0; j < 10000; j++) {
      var output = stringSum(String(i), String(j));
      var expected = String(i + j);
      if (expected !== output) {
        isFailed = true;
        console.log("failed for case", i, j);
        console.log("expected output", i + j);
        console.log("returned output", output);
      }
    }
  }
  if (!isFailed) {
    console.log("passed all test cases");
  }
}

function basicSubstractTest() {
  var isFailed = false;
  console.log("started");
  for (var i = 0; i < 10000; i++) {
    for (var j = 0; j < 10000; j++) {
      var output = stringSubstract(String(i), String(j));
      var expected = String(i - j);
      if (expected !== output) {
        isFailed = true;
        console.log("failed for case", i, j);
        console.log("expected output", i - j);
        console.log("returned output", output);
      }
    }
  }
  if (!isFailed) {
    console.log("passed all test cases");
  }
}

console.time("execution time");
console.log(findNthNumber(0, 1, process.argv[2]));
console.timeEnd("execution time");
