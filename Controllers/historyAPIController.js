import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import btcSchema from '../Modals/modal';

let data = {};
let histroy = [];
let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;
let btcModal = mongoose.model('btcModal', btcSchema);
let db = {};

let init = () => {
	mongoose.connect('mongodb://localhost/pocMongoos');
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(){
		console.log("done connection mongo");
	});
}

let getDayData  = (query, res) => {
	let {start, end, size, key} = query;
	let select = {};
	select.time = 1;
	select[key] = 1;
	try{
		btcModal.find({"time" : {$lt : end, $gt : start}}).limit(parseInt(size)).select(select).then(response => {
			histroy = response.map(val => val[key]);
			min = Math.min(...histroy);
			max = Math.max(...histroy);
			histroy = response;
			response = {
				min : min,
				max : max,
				data : histroy
			};
			res.writeHead(200, {'Content-Type': 'application/JSON'});
			res.write(JSON.stringify(response));
			res.end();
		})
	}
	catch(e){
		console.log(e);
		return e;
	}
}

let historyController = (req, res) => {
	getDayData(req.query, res);
}

// console.log("creating connection mongo");
// init();

export default historyController;