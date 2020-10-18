const puppeteer = require('puppeteer');
const fs = require('fs');
const pageUrls = require('./pekbookUrls.json');
let mainData = [];

const getImageUrls = (page, url) => {
	return new Promise(resolve => {
		page.goto(url).then(() => {
			page.evaluate(() => {
                return document.querySelector('.image-center img').src
			}).then(data => {
                resolve(data);
            });
		});
	}); 
}

const sequalise = (page, urls, browserInstance) => {
    console.log(urls.length);
    if(urls.length) {
        let currentUrl = urls.pop();
        getImageUrls(page, currentUrl).then(data => {
            mainData.push(data);
            sequalise(page, urls, browserInstance);
        })
    }
    else {
        fs.writeFile("./pekbookImageList.json", JSON.stringify(mainData, null, '    '), 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            browserInstance.close();
        });
        console.log(mainData.length);
    }
}

puppeteer.launch().then(browserInstance => {
	console.log('launched');
	browserInstance.newPage().then(page => {
        console.log('newPage');
        sequalise(page, pageUrls, browserInstance);
	});
});