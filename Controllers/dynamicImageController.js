const puppeteer = require('puppeteer');
const imageName = process.argv[2];
const url = process.argv[3];

const request = require('request'); 


let getHTMLString = (url) => {
	let options = { 
		"method": 'GET',
	  	"url": url,
		"gzip" : true 
	};
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			if (error){ 
				throw new Error(error);
				reject(error);
			}
			else{
				resolve(response);
			}
		});
	}) 
}

puppeteer.launch().then(browserInstance => {
	browserInstance.newPage().then(page => {
		page.goto('http://localhost:8000/cv_naukri').then((response) => {
			page.setViewport({
			  	width: 1020,
				height: 1638,
				deviceScaleFactor: 2
			}).then(() => {
				page.screenshot({path: './dynimages/cv_naukri.png'}).then(() => {
					browserInstance.close();
				});
			});
		})	
	});
})

/*puppeteer.launch().then(browserInstance => {
	browserInstance.newPage().then(page => {
		getHTMLString('http://localhost:8000/cv').then((response) => {
			console.log(response.body);
			page.setContent(response.body).then(data => {
				page.setViewport({
				  	width: 1020,
					height: 1850,
					deviceScaleFactor: 2
				}).then(() => {
					page.screenshot({path: './dynimages/cv.png'}).then(() => {
						browserInstance.close();
					});
				});
			})
		})	
	});
})*/


// browser.then(() => {
// 	page = browser.newPage();
// 	page.then(() => {
// 		page.goto('https://www.google.com').then(() => {
// 			page.screenshot({path: 'test.png'});
// 			browser.close();
// 		})
// 	})
// });

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.google.com');
//   await page.screenshot({path: 'google.png'});
//   await browser.close();
// })();


// page.goto(url).then(() => {
	// page.setViewport({
	//   	width: 1920,
	// 	height: 1080
	// }).then(() => {
	// 	page.screenshot({path: imageName + '.png'}).then(() => {
	// 		browserInstance.close();
	// 	});
	// });
// })