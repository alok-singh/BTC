const fs = require('fs');
const request = require('request');
const urls = require('./videoList.json');

const download = (uri, fileName)  => {
	return new Promise((resolve) => {
		request.head(uri, () => {
			request(uri).pipe(fs.createWriteStream('./videos/' + fileName)).on('close', () => {
				console.log(uri);
				resolve();
			});
		});
	});
};

const parallelDownload = () => {
    let promiseArr = urls.reduce((acc, url) => {
        acc.push(download(url, url.split('/').pop()));
        return acc;
    }, []);

	Promise.all(promiseArr).then(() => {
		console.log('done');
	})
}


parallelDownload();