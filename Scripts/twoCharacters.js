// https://www.hackerrank.com/challenges/two-characters/problem

var alphabets = "abcdefghijklmnopqrstuvwxyz";



// Complete the alternate function below.
function alternate(s) {
	var stringArray = [];
	var replacedString = '';
	if(isStringGood(s)){
		return s.length;
	}
	for(var i=0; i<alphabets.length; i++){
		for(var j=i+1; j<alphabets.length; j++){
			for(var k=0; k<s.length; k++){
				if((s[k] == alphabets[i]) || (s[k] == alphabets[j])){
					replacedString += s[k];
				}
			}
			if(isStringGood(replacedString)){
				stringArray.push({
					replacedString: replacedString,
					remainingChars: alphabets[i] + "-" + alphabets[j]
				});
			}
			replacedString = '';
		}	
	}
	return stringArray;
}

function isStringGood(string) {
	if(string.length < 4){
		if(string.length == 3 && string[0] == string[2] && string[1] != string[2]){
			return true;
		}
		if(string.length == 2 && string[0] != string[1]){
			return true;
		}
		return false;
	}
	for(var i=0; i<=string.length-4; i++){
		if((string[i] != string[i+2]) || (string[i+1] != string[i+3])){
			return false;
		}
	}
	if(string[0] == string[1]){
		return false;
	}
	return true;
}




function testIsStringGood() {
	console.log(isStringGood('ababababa'));
	console.log(isStringGood('a'));
	console.log(isStringGood(''));
	console.log(isStringGood('ab'));
	console.log(isStringGood('aba'));
}

// testIsStringGood();



/*
	simple time complexity test 
*/
function testAlternateTimeComplexity(){
	for (var i=0; i<1000; i++){
		console.log(alternate('beabeefeab'));
	}
}

// var start = (new Date()).getTime();
// testAlternateTimeComplexity();
// console.log('Time Elapsed', (new Date()).getTime() - start);



console.log(alternate('ab'));


