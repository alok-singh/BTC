
// https://www.hackerrank.com/challenges/fibonacci-modified/problem
// solution not fast enough

function findNthNumber(t1, t2, n) {
	var memoizationArray = [];
	memoizationArray[0] = String(t1);
	memoizationArray[1] = String(t2);
	
	for(var i=2; i<n; i++){
		// console.log(i);
		// memoizationArray[i] = stringSum(memoizationArray[i-2], multiplyString(memoizationArray[i-1], memoizationArray[i-1]))
		memoizationArray[i] = stringSum(memoizationArray[i-2], memoizationArray[i-1]);	
	}
	return memoizationArray[n-1];
}


function addZeros(n) {
	var retString = '';
	while(n>0){
		retString += '0';
		n--;
	}
	return retString;
}


function multiplyString(a, b) {
	var mainA = '';
	var mainB = '';
	var rowDigit = 0;
	var rowDigitCarry = 0;
	var rowNumber = '';
	var retString = '0';

	mainA = a.length > b.length ? a : b;
	mainB = a.length > b.length ? b : a;

	for(var i=mainB.length-1; i>=0; i--){
		for(var j=mainA.length-1; j>=0; j--){
			rowDigit = parseInt(mainB[i])*parseInt(mainA[j]) + rowDigitCarry;
			rowDigitCarry = Math.floor(rowDigit/10);
			rowDigit = rowDigit%10;
			rowNumber = rowDigit + rowNumber;
		}
		rowNumber = rowDigitCarry ? (rowDigitCarry + rowNumber) : rowNumber;
		rowNumber = rowNumber + addZeros(mainB.length - 1 - i);
		retString = stringSum(retString, rowNumber);
		rowNumber = '';
		rowDigitCarry = 0;
	}

	return retString;

}


/*
	accepts two string and return sum string
	designed for handling number greater than 
	53 bit integer
*/

function stringSum(a, b){
	var retString = '';
	var iteration = 0;
	var partialSum = 0;
	var carry = 0;
	var partialA = 0;
	var partialB = 0;
	
	iteration = a.length > b.length ? a.length : b.length;

	for(var i=a.length-1,j=b.length-1; iteration>0; iteration--,i--,j--){
		
		partialA = i < 0 ? 0 : parseInt(a[i]);
		partialB = j < 0 ? 0 : parseInt(b[j]);
		
		partialSum = carry + partialA + partialB;
		
		carry = Math.floor(partialSum/10);
		partialSum = partialSum%10;
		
		retString = partialSum + retString;
	}

	retString = carry ? (carry + retString) : retString;
	
	return retString;
}

/*
	run test cases for number much lower then 
	64-bit integer
*/
function basicSumTest() {
	var isFailed = false;
	console.log('started');
	for(var i=0; i<10000; i++){
		for(var j=0; j<10000; j++){
			var output = stringSum(String(i), String(j));
			var expected = String(i+j);
			if(expected !== output){
				isFailed = true;
				console.log('failed for case', i, j);
				console.log('expected output', i + j);
				console.log('returned output', output);
			}
		}	
	}
	if(!isFailed){
		console.log('passed all test cases');
	}
}


/*
	accepts two string and return a-b string
	designed for handling number greater than 
	53 bit integer
*/


function stringSubstract(a, b){
	var retString = '';
	var partialSub = 0;
	var partialA = 0;
	var partialB = 0;
	var carry = 0;
	var trimIndex = 0;

	if(isGreater(a, b) == a){
		for(var i=a.length-1,j=b.length-1; i>=0; i--,j--){
			partialA = parseInt(a[i]);
			partialB = j < 0 ? 0 : parseInt(b[j]);
			partialSub = partialA - partialB + carry;
			carry = partialSub >= 0 ? 0 : -1;
			partialSub = partialSub >= 0 ? partialSub : 10 + partialSub;
			retString = partialSub + retString;
		}
		while((retString[trimIndex] == 0) && (trimIndex < retString.length - 1)){
			trimIndex++;
		}
		return retString.slice(trimIndex);
	}
	else{
		return '-' + stringSubstract(b, a);
	}
}

/*
	run test cases for number much lower then 
	64-bit integer
*/
function basicMultiplyTest() {
	var isFailed = false;
	var stopLoop = false;
	var start = (new Date()).getTime();
	console.log('started');
	for(var i=1; i<10000; i++){
		for(var j=1; j<10000; j++){
			var output = multiplyString(String(i), String(j));
			var expected = String(i*j);
			if(expected !== output){
				isFailed = true;
				console.log('failed for case', i, j);
				console.log('expected output', expected);
				console.log('returned output', output);
				stopLoop = true;
			}
			if(stopLoop){
				break;
			}
		}
		if(stopLoop){
			break;
		}	
	}
	if(!isFailed){
		console.log('passed all test cases');
		console.log('time elapsed multiplyString', (new Date()).getTime() - start);
	}
}


function stringSubstract(a, b){
	var retString = '';
	var partialSub = 0;
	var partialA = 0;
	var partialB = 0;
	var carry = 0;
	var trimIndex = 0;

	if(isGreater(a, b) == a){
		for(var i=a.length-1,j=b.length-1; i>=0; i--,j--){
			partialA = parseInt(a[i]);
			partialB = j < 0 ? 0 : parseInt(b[j]);
			partialSub = partialA - partialB + carry;
			carry = partialSub >= 0 ? 0 : -1;
			partialSub = partialSub >= 0 ? partialSub : 10 + partialSub;
			retString = partialSub + retString;
		}
		while((retString[trimIndex] == 0) && (trimIndex < retString.length - 1)){
			trimIndex++;
		}
		return retString.slice(trimIndex);
	}
	else{
		return '-' + stringSubstract(b, a);
	}
}


function power(a, b){
	var retNum = '1';
	for(var i=1; i<=b; i++){
		retNum = multiplyString(String(a), retNum);
	}
	return retNum;
}

function factorial(num) {
	var retNum = '1';
	for(var i=1; i<=num; i++){
		retNum = multiplyString(retNum, String(i));
	}
	return retNum;
}


// basicMultiplyTest();
// console.log(findNthNumber(0,1,10));
// var start = (new Date()).getTime();
// var a = '12312312312123123123123123123123';
// console.log(multiplyString(a, a));
// console.log('time elapsed multiplyString', (new Date()).getTime() - start);



// console.log(findNthNumber(0, 1, 1000000));

// console.log(power(2, 1000));

console.log(factorial(1000));
