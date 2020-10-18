const puppeteer = require('puppeteer');
const fs = require('fs');
const videoPageURLs = require('./videoPageList.json');
let mainData = [];

const getVideoUrls = (page, url) => {
	return new Promise(resolve => {
		page.goto(url).then(() => {
			page.evaluate(() => {
                let video = document.querySelector('video source');
                return video ? video.src : undefined;
			}).then(data => {
                resolve(data, url);
            });
		});
	}); 
}

const sequalise = (page, urls, browserInstance) => {
    if(urls.length) {
        let currentUrl = urls.pop();
        console.log(currentUrl);
        getVideoUrls(page, currentUrl).then(data => {
            if(data) {
                mainData.push(data);
            }
            sequalise(page, urls, browserInstance);
        })
    }
    else {
        fs.writeFile("./videoList.json", JSON.stringify(mainData, null, '    '), 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            browserInstance.close();
        });
        console.log(Object.keys(mainData).length);
    }
}


puppeteer.launch().then(browserInstance => {
	console.log('launched');
	browserInstance.newPage().then(page => {
        console.log('newPage');
        sequalise(page, videoPageURLs, browserInstance);
	});
});