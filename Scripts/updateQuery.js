var mongoose = require('mongoose');
var request = require("request");
var path = require("path");
var btcSchema = require('.../Modals/modal');
var fs = require('fs');
var btcModal = mongoose.model('btcModal', btcSchema);
var db = {};
var insertArr = [];
var data = {};

fs.readdirSync(path.resolve('../Data')).forEach(folder => {
	data[folder] = {};
	fs.readdirSync(path.resolve('../Data/' + folder)).forEach(file => {
		data[folder] = Object.assign(data[folder], require(path.resolve('../Data/' + folder + '/' + file)))
	});	
});

for(let folder in data){
	for(let file in data[folder]){
		let val = data[folder][file];
		if(val && val["currency"]){
			val["sell"] = parseInt(val["sell"]);
			val["buy"] = parseInt(val["buy"]);
			val["time"] = parseInt(file);
			val["pricechange"] = val["pricechange"];
			val["volume"] = Number(val["volume"]);
			val["24hoursHigh"] = val["24hoursHigh"];
			val["24hoursLow"] = val["24hoursLow"];
			val["market"] = val["market"];
			val["pair"] = val["pair"];
			val["virtualCurrency"] = val["virtualCurrency"];
			val["currency"] = val["currency"];
			insertArr.push(val);
		}
	}	
}

console.log(insertArr.length);

mongoose.connect('mongodb://localhost/pocMongoos');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	btcModal.insertMany(insertArr, function(error){
		if(error){
			console.log(error);
		}
		process.exit();
	});
});

// Tank.findById(id, function (err, tank) {
//   if (err) return handleError(err);

//   tank.size = 'large';
//   tank.save(function (err, updatedTank) {
//     if (err) return handleError(err);
//     res.send(updatedTank);
//   });
// });