import request from 'request'; 

let getBitcoinData = (req, res) => {
	let options = { 
		"method": 'GET',
	  	"url": 'https://www.zebapi.com/api/v1/market/ticker-new/btc/inr',
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
}

export default getBitcoinData;