import {filter} from '../Controllers/employeeController';
import data from '../data.json';
import {filterArgumentList} from './argumentList';

let filterTester = (mapping, data) => {
	return new Promise(resolve => {
		filter(mapping, data).then(filteredDataList => {
			let flag = true;
			let keyObj = {};
			let resultList = [];
			if(filteredDataList.length){
				filteredDataList.forEach(filteredData => {
					filteredData.fieldDetails.forEach(field => {
						keyObj[field.labelName] = field.value;
					});
					for(let key in mapping){
						if(keyObj[key].toLowerCase().indexOf(mapping[key].toLowerCase()) !== -1){
							flag = true;
						}
						else{
							flag = false;
							break;
						}
					}
					resultList.push(flag);
				});
				flag = resultList.length === resultList.reduce((sum, val) => sum + val, 0);
			}
			else{
				console.log("No data after filter");
			}
			resolve(flag);
		});
	})
};

test('matching', () => {
	filterArgumentList.forEach(mapping => {
		filterTester(mapping, data).then(flag => {
			expect(flag).toBe(true);
		});
	});
});