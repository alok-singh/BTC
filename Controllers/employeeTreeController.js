import React from 'react';
import {renderToString} from 'react-dom/server';
import {groupByField, mapData} from '../Services/dataMappingService';
import EmployeeTreeComponent from '../JS/employeeTree';

export let employeeTreeController = (req, res) => {
	let mappedData = mapData();
	let treeObject = groupByField('reportingTo', (value) => {
		return value.split(" ").pop();
	});

	let companyCEOemployeeID = Object.keys(mappedData).filter(employeeID => {
		let employee = mappedData[employeeID];
		return employee.reportingTo == '' && 
			treeObject[employee.employeeID] && 
			treeObject[employee.employeeID].length;
	}).pop();

	res.render('employeeTreeTemplate', {
		innerHTML: renderToString(<EmployeeTreeComponent 
			mappedData={mappedData} 
			treeObject={treeObject} 
			companyCEOemployeeID={companyCEOemployeeID} 
		/>)
	});
}