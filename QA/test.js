// const http = require('http');
// const imageType = require('image-type');
// const url = 'https://localhost:8000/IMG/xvkkwtvy13s8uer6omb3.webp';
 
// http.get(url, res => {
//     res.once('data', chunk => {
//         res.destroy();
//         console.log(imageType(chunk));
//         //=> {ext: 'gif', mime: 'image/gif'}
//     });
// });

// const data = require('../data.json');

// let filter = (map, data) => {
// 	let keys = Object.keys(map).length ? Object.keys(map) : [];
// 	try{
// 		return data.filter(({fieldDetails}) => {
// 			return fieldDetails.reduce((acc, val) => {
// 				if(map[val.labelName]){
// 					return acc + (val.value.toLowerCase().indexOf(map[val.labelName].toLowerCase()) !== -1);
// 				}
// 				else{
// 					return acc;
// 				}
// 			}, 0);
// 		});
// 	}
// 	catch(e){
// 		console.log(e);
// 		// return data;
// 	}
// }

// console.log(JSON.stringify(filter({
// 	EmailID: "alok.singh"
// }, data), null, "   "));


// const data = require('../mapping.json');
// console.log(data);

const request = require('request');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let hitAPI = (params) => {
	return new Promise((resolve, reject) => {
		// console.log("requested for ", params);
		let url = getURLFromParams('https://localhost:8000/get-employee-data', params);
		let options = { 
			"method": 'GET',
		  	"url": url
		};
		
		request(options, (error, response, body) => {
			if (error){ 
				throw new Error(error);
				reject(error);
			}
			resolve(body);
		});
		
	})
}

let getURLFromParams = (basePath, params) => {
	return Object.keys(params).reduce((url, key) => {
		return `${url}${key}=${params[key]}`
	}, `${basePath}?`);
}

let findName = (employee) => {
	return employee.fieldDetails.find(val => {
		return val.labelName == 'FirstName'
	}).value + " " + employee.fieldDetails.find(val => {
		return val.labelName == 'LastName'
	}).value + "<div>Age: " + getAge(employee.fieldDetails.find(val => {
		return val.labelName == 'Date_of_birth'
	}).value) + "</div>"
}

let getAge = (dob) => {
	let secondsInYear = 60*60*24*365;
	let dobArr = dob.split('/');
	let year = parseInt(dobArr[2]);
	let month = parseInt(dobArr[1]);
	let date = parseInt(dobArr[0]);
	let dateObj = new Date(year, month-1, date);
	let today = new Date();
	let timeInS = (today.getTime() - dateObj.getTime())/1000;
	let years = parseInt(timeInS/secondsInYear);
	let months = parseInt((timeInS%secondsInYear)/(60*60*24*30));
	let days = parseInt((timeInS%secondsInYear)/(60*60*24)) - months*30;
	return `${years}years ${months}months ${days}days`;
}

let getPromiseList = (year) => {
	return hitAPI({
		Date_of_birth: year
	}).then((data) => {
		data = JSON.parse(data);
		data = data.reduce((list, employee) => {
			list.push(findName(employee));
			return list;
		}, []);
		
		return {
			[year]: data
		}
	});
}

let getHTML = (dataObj) => {
	
	let innerHTML = Object.keys(dataObj).reduce((html, val) => {
		return html + getElement(dataObj[val])
	}, '');

	return `
		<!DOCTYPE html>
		<html>
		<head>
			<title></title>
			<style type="text/css">

				*{
				    font-family: sans-serif;
				    box-sizing: border-box;
				}

				div#root {
				    display: flex;
				    flex-wrap: wrap;
				    justify-content: space-between;
				}

				.year-wrapper {
				    width: 30vw;
				    background: #fff;
				    margin: 10px;
				    box-sizing: border-box;
				    border: 1px solid #eaeaea;
				    border-radius: 5px;
				    overflow: hidden;
				}

				.year {
				    background: #333;
				    color: #fff;
				    padding: 8px;
				    text-align: center;
				}

				.total {
				    text-align: right;
				    padding: 10px;
				}

				.name {
				    display: block;
				    padding: 11px;
				}

				.name:nth-child(odd) {
				    background: #eaeaea;
				}

			</style>
		</head>
		<body>
			<div id="root">
				${innerHTML}
			</div>
		</body>
		</html>
	`
}

let getElement = (year) => {
	let yearString = Object.keys(year)[0];
	let names = year[yearString];
	let innerHTML = names.reduce((html, name) => {
		return html + `<span class="name">${name}</span>`
	}, `
		<div class="year">Year ${yearString}</div>
		<div class="total">Total ${names.length}</div>
	`);

	return `<div class="year-wrapper">${innerHTML}</div>`;

}

let init = () => {
	let arr = [];
	let year = 1956;
	for(let i=0; i<62; i++){
		arr[i] = year + i;
	}

	Promise.all(arr.map(getPromiseList)).then(dataList => {
		dataList.sort((a, b) => b[Object.keys(b)[0]].length - a[Object.keys(a)[0]].length);
		fs.writeFile('age.html', getHTML(dataList), function (err) {
		  	if (err) throw err;
		  	console.log('Saved!');
		});
	})
};

init();