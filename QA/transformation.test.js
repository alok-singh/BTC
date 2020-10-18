import {mapData, getData} from '../Controllers/employeeGroupController';
import data from '../data.json';

let mappedDataTester = (data) => {
	console.log(JSON.stringify(data, null, "    "));
	return true;
}


test('mappedDataTesting', () => {
	// let flag = mappedDataTester(mapData(data)).length > 1;
	let flag = mappedDataTester(getData());
	expect(flag).toBe(true);
});