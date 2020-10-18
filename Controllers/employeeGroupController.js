import React from 'react';
import {renderToString} from 'react-dom/server';
import EmployeeGroupComponent from '../JS/employeeGroup';
import {groupByField} from '../Services/dataMappingService';

export let employeeGroupController = (req, res) => {
	let field = req.params.field;
	let finalExpectedJSON = groupByField(field, (value) => {
		if(field == 'dateOfBirth'){
			return value.split('/').pop();
		}
		return value;
	});
	
	res.render('groupTemplate', {
		innerHTML: renderToString(<EmployeeGroupComponent data={finalExpectedJSON} />)
	});
}


