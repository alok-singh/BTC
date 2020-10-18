import {sort} from '../Controllers/employeeController';
import data from '../data.json';
import {filterArgumentList} from './argumentList';

let getKeyList = (data) => {
	return Object.keys((() => {
		let obj = {};
		filterArgumentList.forEach(val => {
			Object.keys(val).forEach(key => {
				obj[key] = true;
			});
		});
		return obj;
	})())
}

let printData = (data, key) => {
	data.forEach(employee => {
		employee.fieldDetails.forEach(attr => {
			if(attr.labelName == key){
				console.log(attr.value);
			}
		})
	})
};

let sortTester = (key, result, asc) => {
	let flag = true;
	result.forEach((employee, index) => {
		if(index > 0){
			let valueA = result[index - 1].fieldDetails.find(val => {
				return val.labelName == key
			}).value;
			let valueB = employee.fieldDetails.find(val => {
				return val.labelName == key
			}).value;
			
			if(key.toLowerCase().indexOf('date') !== -1){
				valueA = valueA.split('/').reverse().join();
				valueB = valueB.split('/').reverse().join();
			}
		
			if((valueA > valueB) && (asc == "asc")){
				flag = false;
			}
			else if((valueB > valueA) && (asc == "desc")){
				flag = false;
			}
		}
	});

	return flag;
}

test('sort', () => {
	let asc = 'asc';
	let desc = 'desc';
	let flag = true;
	let keyList = getKeyList(data);
	
	let sequentialRun = () => {
		let key = keyList.pop();
		if(key){
			sort(key, data, asc).then(result => {
				let flag = sortTester(key, result, asc);
				if(flag){
					expect(flag).toBe(true);
					sequentialRun();
				}
				else{
					console.log("failed at: ", key);
					expect(flag).toBe(true);
				}
			});
		}
		else{
			console.log('finished');
		}
	}

	sequentialRun();

	// keyList.forEach(key => {
	// 	sort(key, data, asc).then(result => {
	// 		expect(sortTester(key, result, asc)).toBe(true);
	// 	});
		// sort(key, data, desc).then(result => {
		// 	expect(sortTester(key, result, desc)).toBe(true);
		// });
	// });
	
});