// import data from '../data_new.json';
// import dataAug from '../data_aug.json';

const mappingObject = {
	"Photo": "photo",
	"EmployeeID": "employeeID",
	"FirstName": "firstName",
	"LastName": "lastName",
	"EmailID": "emailID",
	"Department": "department",
	"Designation": "designation",
	"Dateofjoining": "dateOfJoining",
	"Work_location": "workLocation",
	"Work_phone": "workPhone",
	"Extension": "extension",
	"Reporting_To": "reportingTo",
	"Date_of_birth": "dateOfBirth",
	"Mobile": "mobile",
	"Address": "address",
	"Employeestatus": "employeeStatus",
	"Employee_type": "employeeType",
	"Marital_status": "maritalStatus",
	"Role": "role",
	"AboutMe": "aboutMe",
	"Current_Job_Description": "currentJobDescription",
	"Expertise": "expertise"
};

const mappingArray = [
	'Photo',
	'EmployeeID',
	'FirstName',
	'LastName',
	'EmailID',
	'Department',
	'Designation',
	'Dateofjoining',
	'Work_location',
	'Work_phone',
	'Extension',
	'Reporting_To',
	'Date_of_birth',
	'Mobile',
	'Address',
	'Employeestatus',
	'Employee_type',
	'Marital_status',
	'Role',
	'AboutMe',
	'Current_Job_Description',
	'Expertise'
]

export const mapData = () => {
	return data.reduce((finalObject, employee) => {
		let employeeReducedData = employee.fieldDetails.reduce((employeeData, field) => {
			employeeData[mappingObject[field.labelName]] = field.value;
			return employeeData;		
		}, {})
		finalObject[employeeReducedData.employeeID] = employeeReducedData;
		return finalObject;
	}, {});
}

export const mapDataToOldForAug = () => {
	return dataAug.map((employee) => {
		return {
			fieldDetails: employee.fieldDetails.map((val, index) => {
				if(!index){
					return {
						labelName: mappingArray[index],
						value: val.downloadUrl
					}
				}
				return {
					labelName: mappingArray[index],
					value: val
				}
			})
		}
	})
}

export const groupByField = (field, valueTransformer) => {
	let mappedData = mapData(mapDataToOldForAug());
	let employeeIDList = Object.keys(mappedData);
	return employeeIDList.reduce((finalObject, employeeID) => {
		let key = valueTransformer(mappedData[employeeID][field]);
		if(finalObject[key]){
			finalObject[key].push(mappedData[employeeID]);
		}
		else{
			finalObject[key] = [];
			finalObject[key].push(mappedData[employeeID]);
		}
		return finalObject;
	}, {});	
}