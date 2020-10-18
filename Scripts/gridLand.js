/*

a b c d e
j i h g f

_ a _
_ b _
_ c _
_ d _
_ e _
_ j _
_ i _
_ h _
_ g _
_ f _

*/


function gridlandProvinces(s1, s2) {
	var circularPathObj = circularPaths(s1, s2);
	var zigZagPathObj = zigZagPaths(s1, s2);
	var combinationPathObj = combinationPaths(s1, s2);
	var retObj = Object.assign({}, circularPathObj, zigZagPathObj, combinationPathObj);
	var totalPaths = Object.keys(retObj).reduce((acc, val) => {
		acc[val] = true;
		acc[val.split('').reverse().join('')] = true;
		return acc;
	}, {});
	return totalPaths;
	
}

function combinationPaths(s1, s2) {
	var rowA = s1.split('');
	var rowB = s2.split('');
	var gridArray = rowA.map((val, index) => [val, rowB[index]]);
	var pathTop = '';
	var pathBottom = '';
	var stringObj = {};
	var maxZigzagMotion = gridArray.length-2;
	var start = 0;
	var stop = 0;

	if(gridArray.length >= 4){
		for(var zigzagCount=2; zigzagCount<=maxZigzagMotion; zigzagCount++){
			for(var i=0; i<=zigzagCount-2; i+=2){
				// start zigzag from top
				pathTop += gridArray[i][0];
				pathTop += gridArray[i][1];
				pathTop += gridArray[i+1][1];
				pathTop += gridArray[i+1][0];

				pathBottom += gridArray[i][1];
				pathBottom += gridArray[i][0];
				pathBottom += gridArray[i+1][0];
				pathBottom += gridArray[i+1][1];


			 	// start from bottom
			}
			start = i;
			stop = i;
			if(zigzagCount%2){
				pathTop += gridArray[i][0];
				pathTop += gridArray[i][1];
				pathBottom += gridArray[i][1];
				pathBottom += gridArray[i][0];
				start = i + 1;
				stop = i + 1;
			}
			for(; start<gridArray.length; start++){
				if(zigzagCount%2){
					pathTop += gridArray[start][1];
					pathBottom += gridArray[start][0];
				}
				else{
					pathTop += gridArray[start][0];	
					pathBottom += gridArray[start][1];
				}
			}
			for(var reverse=gridArray.length-1; reverse>=stop; reverse--){
				if(zigzagCount%2){
					pathTop += gridArray[reverse][0];
					pathBottom += gridArray[reverse][1];
				}
				else{
					pathTop += gridArray[reverse][1];	
					pathBottom += gridArray[reverse][0];	
				}
			}
			stringObj[pathTop] = 1;
			stringObj[pathBottom] = 1;
			pathTop = '';
			pathBottom = '';
		}

		gridArray = gridArray.reverse();

		for(var zigzagCount=2; zigzagCount<=maxZigzagMotion; zigzagCount++){
			for(var i=0; i<=zigzagCount-2; i+=2){
				// start zigzag from top
				pathTop += gridArray[i][0];
				pathTop += gridArray[i][1];
				pathTop += gridArray[i+1][1];
				pathTop += gridArray[i+1][0];

				pathBottom += gridArray[i][1];
				pathBottom += gridArray[i][0];
				pathBottom += gridArray[i+1][0];
				pathBottom += gridArray[i+1][1];


			 	// start from bottom
			}
			start = i;
			stop = i;
			if(zigzagCount%2){
				pathTop += gridArray[i][0];
				pathTop += gridArray[i][1];
				pathBottom += gridArray[i][1];
				pathBottom += gridArray[i][0];
				start = i + 1;
				stop = i + 1;
			}
			for(; start<gridArray.length; start++){
				if(zigzagCount%2){
					pathTop += gridArray[start][1];
					pathBottom += gridArray[start][0];
				}
				else{
					pathTop += gridArray[start][0];	
					pathBottom += gridArray[start][1];
				}
			}
			for(var reverse=gridArray.length-1; reverse>=stop; reverse--){
				if(zigzagCount%2){
					pathTop += gridArray[reverse][0];
					pathBottom += gridArray[reverse][1];
				}
				else{
					pathTop += gridArray[reverse][1];	
					pathBottom += gridArray[reverse][0];	
				}
			}
			stringObj[pathTop] = 1;
			stringObj[pathBottom] = 1;
			pathTop = '';
			pathBottom = '';
		}
	}

	return stringObj;

}


function circularPaths(s1, s2) {
	var mainStringArr = s1.split('').concat(s2.split('').reverse());
	var stringObj = {};
	var key = '';

	for(var start=0; start<mainStringArr.length; start++){
		for(var index=0; index<mainStringArr.length; index++){
			key += mainStringArr[(start + index)%mainStringArr.length];
		}
		stringObj[key] = 1;
		key = '';
	}
	return stringObj;
}


function zigZagPaths(s1, s2) {
	var rowA = s1.split('');
	var rowB = s2.split('');
	var gridArray = rowA.map((val, index) => [val, rowB[index]]);
	var path = '';
	var stringObj = {};

	// start from top left
	for(var i=0; i<=gridArray.length-2; i+=2){
		path += gridArray[i][0];
		path += gridArray[i][1];
		path += gridArray[i+1][1];
		path += gridArray[i+1][0];
	}

	if(gridArray.length%2){
		path += gridArray[i][0];
		path += gridArray[i][1];
	}

	stringObj[path] = 1;
	path = '';

	// start from bottom left
	for(var i=0; i<=gridArray.length-2; i+=2){
		path += gridArray[i][1];
		path += gridArray[i][0];
		path += gridArray[i+1][0];
		path += gridArray[i+1][1];
	}

	if(gridArray.length%2){
		path += gridArray[i][1];
		path += gridArray[i][0];
	}

	stringObj[path] = 1;
	path = '';

	// start from top right
	gridArray = gridArray.reverse();
	for(var i=0; i<=gridArray.length-2; i+=2){
		path += gridArray[i][0];
		path += gridArray[i][1];
		path += gridArray[i+1][1];
		path += gridArray[i+1][0];
	}

	if(gridArray.length%2){
		path += gridArray[i][0];
		path += gridArray[i][1];
	}

	stringObj[path] = 1;
	path = '';
	
	// start from bottom right
	for(var i=0; i<=gridArray.length-2; i+=2){
		path += gridArray[i][1];
		path += gridArray[i][0];
		path += gridArray[i+1][0];
		path += gridArray[i+1][1];
	}

	if(gridArray.length%2){
		path += gridArray[i][1];
		path += gridArray[i][0];
	}

	stringObj[path] = 1;
	path = '';

	return stringObj;
}


console.log('abbaa\naaaaa');
console.log(gridlandProvinces('abbaa', 'aaaaa'));
