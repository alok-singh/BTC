// Complete the commonChild function below.

var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function commonChild(s1, s2) {

	var commonLetters = getCommonLetters(s1, s2);
	var childS1 = getChildS1(s1, commonLetters);
	var childS2 = getChildS1(s2, commonLetters);

	
}


function getCommonLetters(s1, s2) {
	var commonLetters = {};
	for(var i=0; i<s1.length; i++){
		if(s2.indexOf(s1[i]) !== -1){
			commonLetters[s1[i]] = true;
		}
	}
	return commonLetters;
}


commonChild('SHINCHAN', 'NOHARAAA');