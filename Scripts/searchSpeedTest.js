var numbers = "0123456789";
var lowerCase = "abcdefghijklmnopqrstuvwxyz";
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var specialCharacters = "!@#$%^&*()-+";

function minimumNumber(n, password) {
	var retNumber = 0;
	var satisfyObj = {
		'numbers': false,
		'lowerCase': false,
		'upperCase': false,
		'specialCharacters': false,
		'length': false
	};

	if(password.length >= 6){
		satisfyObj.length = true;
	}
	
	for(var i=0; i<password.length; i++){
		if(numbers.indexOf(password[i]) !== -1){
			satisfyObj.numbers = true;
		}
		else if(lowerCase.indexOf(password[i]) !== -1){
			satisfyObj.lowerCase = true;
		}
		else if(upperCase.indexOf(password[i]) !== -1){
			satisfyObj.upperCase = true;
		}
		else if(specialCharacters.indexOf(password[i]) !== -1){
			satisfyObj.specialCharacters = true;
		}
	}


	for(var key in satisfyObj){
		if(!satisfyObj[key] && key != 'length'){
			retNumber++;
		}
	}

	if(!satisfyObj.length){
		retNumber = Math.max((6 - password.length), retNumber);
	}

	return retNumber;
}

console.log(minimumNumber(undefined, '___'));
