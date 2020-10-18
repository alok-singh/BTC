var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "sell": {
    	type: Number,
    	required: true
    },
    "buy": {
    	type: Number,
    	required: true
    },
    "time": {
    	type: Number,
    	required: true
    },
    "pricechange": String,
    "volume": Number,
    "24hoursHigh": String,
    "24hoursLow": String,
    "market": String,
    "pair": String,
    "virtualCurrency": String,
    "currency": String	
});

