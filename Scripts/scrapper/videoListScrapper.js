const puppeteer = require('puppeteer');
const fs = require('fs');
const videoListingPageURLs = [];
let videoPageURLs = [];

for(let i=1; i<=2; i++) {
    videoListingPageURLs.push(`https://www.sexyandfunny.com/videos/kayla-louise_2080${i ? '_' + i : ''}.html`);
}

const getVideoPageUrls = (page, url) => {
    console.log(url);
	return new Promise(resolve => {
		page.goto(url).then(() => {
			page.evaluate(() => {
                let data = [];
                document.querySelectorAll('.feature.group .feature-text.group a').forEach(val => data.push(val.href));
                return data.filter(url => url.indexOf('watch_video') !== -1);
			}).then(data => {
                resolve(data);
            });
		});
	}); 
}

const sequalise = (page, urls, browserInstance) => {
    console.log(urls.length);
    if(urls.length) {
        getVideoPageUrls(page, urls.pop()).then(data => {
            videoPageURLs.push(...data);
            sequalise(page, urls, browserInstance);
        });
    }
    else {
        console.log(videoPageURLs.length);
        fs.writeFile("./videoPageList.json", JSON.stringify(videoPageURLs, null, '    '), 'utf8', (err) => {
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
        sequalise(page, videoListingPageURLs, browserInstance);
	});
});