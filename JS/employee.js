let container = document.getElementById('container');
let form = document.getElementById('form');
let dataStore = {
	index: 0
};

let sortOn = document.getElementById('sort');
let order = document.getElementById('order');

let getData = (withoutFilter) => {
    return new Promise((resolve, reject) => {
    	let request = new XMLHttpRequest();
    	let url = withoutFilter ? `/get-employee-data` : getURL();
	    request.onreadystatechange = function(resp){
			if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
				resolve(resp.currentTarget.responseText);
			}
		}
	    request.open("GET", url);
	    request.send();
    })
};

let getSchema = () => {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		let url = `/get-employee-schema`;
	    request.onreadystatechange = function(resp){
			if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
				resolve(JSON.parse(resp.currentTarget.responseText));
			}
		}
	    request.open("GET", url);
	    request.send();
	});
}

let getQueryString = (queryObj) => {
	return Object.keys(queryObj).reduce((queryString, val) => {
		return queryObj[val] ? `${queryString}&${val}=${queryObj[val]}` : queryString;
	}, "");
}

let getURL = () => {
	let selectList = form.getElementsByTagName('select');
	let inputList = form.getElementsByTagName('input');
	selectList = Array(...selectList);
	if(selectList.length){
		let query = selectList.reduce((obj, select, index) => {
			obj[select.value] = inputList[index].value;
			return obj;
		}, {});
		query.sortOn = sortOn.value;
		query.order = order.value;
		return `/get-employee-data?${getQueryString(query)}`;
	}
	return `/get-employee-data`;
}

let getHTML = (data) => {
	return data.reduce((resultHTML, employee) => {
		return `
			${resultHTML}
			<div class="employee">
				${employee.fieldDetails.reduce((resultEmployee, field) => {
					return `
						${resultEmployee}
						${getFieldHTML(field.labelName, field.value)}
					`
				}, "")}
			</div>
		`;
	}, "");
};

let getFieldHTML = (labelName, value) => {
	if(labelName.toLowerCase() == 'photo'){
		if(value.indexOf('viewPhoto') !== -1){
			value = 'https://people.zoho.com/' + value;	
		}
		else{
			value = 'https://contacts.zoho.com/file?ID=648041888&fs=thumb';
		}
		return `
			<div class="employee-detail">
				<div class="field"></div>
				<div class="value">
					<img src="${value}" />
				</div>
			</div>
		`
	}
	else{
		return `
			<div class="employee-detail">
				<div class="field">${labelName}</div>
				<div class="value">${value}</div>
			</div>
		`;
	}
}

let renderForm = (options, index) => {
	return `
		<div class="form-list">
			${renderFormELement(options, index)}
		</div>
	`
}

let addFilterElement = () => {
	let formList = form.getElementsByClassName('form-list')[0];
	formList.insertAdjacentHTML('beforeend', renderFormELement(dataStore.schema, ++dataStore.index));
}

let requestServer = () => {
	getData().then((data) => {
		data = JSON.parse(data);
		container.innerHTML = getHTML(data);
	});
}

let clearFilters = () => {
	getData(true).then((data) => {
		data = JSON.parse(data);
		container.innerHTML = getHTML(data);
	});
}

let getOptions = (options) => {
	return `${options.map(val => {
		return `<option val=${val}>${val}</option>`
	})}`
}

let renderFormELement = (options, index) => {
	return `
		<div class="form-element">
			<select>
				${getOptions(options)}
			</select>
			<input name=${index} type="text">
		</div>
	`;
}

let init = () => {
	Promise.all([getData(), getSchema()]).then(([data, schema]) => {
		schema = JSON.parse(schema);
		data = JSON.parse(data);
		form.innerHTML = renderForm(schema, 0);
		sortOn.innerHTML = getOptions(schema);
		container.innerHTML = getHTML(data);
		dataStore.schema = schema;
	});
}

init();