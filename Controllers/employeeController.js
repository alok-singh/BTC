// import data from '../data_new.json';
// import mapping from '../mapping.json';
import {mapDataToOldForAug} from '../Services/dataMappingService';

let sendResponse = (data, req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
};

export let employeeController = (req, res) => {
	if(req.url == '/get-employee-schema'){
		sendResponse(JSON.stringify(mapping), req, res);
	}
	else{
		// getEmployeeList(req, res, data);
		getEmployeeList(req, res, mapDataToOldForAug());
	}
}

export let getEmployeeList = (req, res, data) => {
	let query = req.query;
	let sortOnKey = query ? query.sortOn : undefined;
	let order = query ? query.order : undefined;
	
	let filterObj = mapping.reduce((filterObj, key) => {
		if(query[key]){
			filterObj[key] = query[key];
		}
		return filterObj;
	}, {});
	
	filter(filterObj, data).then(filteredData => {
		if(sortOnKey && order){
			sort(sortOnKey, filteredData, order).then(sortedResponse => {
			    sendResponse(sortedResponse, req, res);
			}).catch(error => {
				console.log(error);
				sendResponse(filteredData, req, res);
			});
		}
		else{
			sendResponse(filteredData, req, res);
		}
	}).catch(error => {
		console.log(error);
		sendResponse(data, req, res);
	});
}

export let sort = (key, data, order) => {
	return new Promise((resolve, reject) => {
		try{
			data.sort((employeeA, employeeB) => {
				let valueA = employeeA.fieldDetails.find(val => {
					return val.labelName == key
				}).value;
				let valueB = employeeB.fieldDetails.find(val => {
					return val.labelName == key
				}).value;
				
				if(key.toLowerCase().indexOf('date') !== -1){
					valueA = valueA.split('/').reverse().join();
					valueB = valueB.split('/').reverse().join();
				}
				
				if(valueA < valueB){
					return order == 'asc' ? -1 : 1;
				} 
				else{
					return order == 'asc' ? 1 : -1;
				}
			});
			resolve(data);
		}
		catch(e){
			console.log('controller error', e);
			reject('error');
		}
	});
}

export let filter = (map, data) => {
	return new Promise((resolve, reject) => {
		let keys = Object.keys(map).length ? Object.keys(map) : [];
		try{
			let filteredData = data.filter(({fieldDetails}) => {
				return fieldDetails.reduce((acc, val) => {
					if(map[val.labelName]){
						return acc + (val.value.toLowerCase().indexOf(map[val.labelName].toLowerCase()) !== -1);
					}
					else{
						return acc;
					}
				}, 0) == keys.length;
			});
			resolve(filteredData);
		}
		catch(e){
			console.log(e);
			return resolve(data);
		}
	});
}






