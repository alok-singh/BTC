const puppeteer = require('puppeteer');
const fs = require('fs');
const galleryURLs = require('./galleryList.json');
let mainData = {};

const getImageUrls = (page, url) => {
	return new Promise(resolve => {
		page.goto(url).then(() => {
			page.evaluate(() => {
                let data = [];
                document.querySelectorAll('a img').forEach(val => data.push(val.src));
                return data.filter(url => url.indexOf('https://files.sexyandfunny.com/gallery_thumbs') !== -1).map(url => url.replace('gallery_thumbs', 'img_orig'));
			}).then(data => {
                resolve(data, url);
            });
		});
	}); 
}

const sequalise = (page, urls, browserInstance) => {
    console.log(urls.length);
    if(urls.length) {
        let currentUrl = urls.pop();
        let folderName = currentUrl.split('/').pop().replace('.html', '');
        getImageUrls(page, currentUrl).then(data => {
            mainData[folderName] = data;
            sequalise(page, urls, browserInstance);
        })
    }
    else {
        fs.writeFile("./imageList.json", JSON.stringify(mainData, null, '    '), 'utf8', (err) => {
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
        sequalise(page, galleryURLs, browserInstance);
	});
});