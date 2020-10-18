import request from 'request'; 

const imageController = (req, res) => {
	let imagePath = req.url.split("IMG").pop();
	let options = { 
		"method": 'GET',
	  	"url": 'http://localhost:8080' + imagePath,
	  	"gzip" : true,
	  	encoding: null
	};
	request(options, (error, response, body) => {
		if (error){ 
			throw new Error(error);
		}
		res.writeHead(200, {
			'Cache-Control': 'public, max-age=31557600',
			'Content-Type': response.headers['content-type']
		});
		res.write(body);
		res.end();
	});
}

export default imageController;