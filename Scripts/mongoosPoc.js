var mongoose = require('mongoose');
var request = require("request");
var btcSchema = require('../Modals/modal');
var btcModal = mongoose.model('btcModal', btcSchema);
var done = true;
var TIME_TO_HIT = 5000;
var db = "";
var count = 0;

mongoose.connect('mongodb://localhost/pocMongoos');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('connected!');
	init();
});

function writeInDB(data){
	return new Promise(resolve => {
		var priceInsance = new btcModal(data);
		priceInsance.save(function (error){
		    resolve(error);
		});
	});
}

function getData(){
	var options = { 
		"method": 'GET',
	  	"url": 'https://www.zebapi.com/api/v1/market/ticker-new/btc/inr',
		"gzip" : true 
	};
	var data = {};
	request(options, function (error, response, body){
		if(error || !body){
			return;
		}
		data = JSON.parse(body);
		data.time = (new Date()).getTime();
		writeInDB(data).then(function (error){
			if(error){
				console.log("error", error);
			}
			done = true;
			++count;
		});
	});
}

function init(){
	setInterval(function(){
		if(done){
			console.log(count);
			getData();
		}
	}, TIME_TO_HIT);
}