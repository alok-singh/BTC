// import historyController from './Controllers/historyController';
import request from 'request';

let options = { 
	"method": 'GET',
  	"url": 'https://localhost:8000/get-btc-history',
	"gzip" : true
};

request(options, (error, response, body) => {
	if (error){ 
		throw new Error(error);
	}
	res.writeHead(200, {'Content-Type': 'application/JSON'});
	res.write(body);
	res.end();
});