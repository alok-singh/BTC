const puppeteer = require('puppeteer');
const fs = require('fs');
const galleryListingURLs = [];
let galleryURLs = [];

for(let i=1; i<=2; i++) {
    galleryListingURLs.push(`https://www.sexyandfunny.com/galleries/kayla-louise_2080${i ? '_' + i : ''}.html`);
}

const getGalleryUrls = (page, url) => {
	return new Promise(resolve => {
		page.goto(url).then(() => {
			page.evaluate(() => {
                let data = [];
                document.querySelectorAll('.feature.group .feature-text.group a').forEach(val => data.push(val.href));
                return data.filter(url => url.indexOf('image_gallery') !== -1);
			}).then(data => {
                resolve(data);
            });
		});
	}); 
}

const sequalise = (page, urls, browserInstance) => {
    console.log(urls.length);
    if(urls.length) {
        getGalleryUrls(page, urls.pop()).then(data => {
            galleryURLs.push(...data);
            sequalise(page, urls, browserInstance);
        });
    }
    else {
        console.log(galleryURLs.length);
        fs.writeFile("./galleryList.json", JSON.stringify(galleryURLs, null, '    '), 'utf8', (err) => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
            browserInstance.close();
        });
    }
}

puppeteer.launch().then(browserInstance => {
	console.log('launched');
	browserInstance.newPage().then(page => {
        console.log('newPage');
        sequalise(page, galleryListingURLs, browserInstance);
	});
});