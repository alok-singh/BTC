const fs = require('fs');
const data = require('./imageList.json');
const {imageScrapper} = require('./imageDownloader');

let promiseList = Object.keys(data).map(key => {
    let folder = './images/' + key.substring(0, key.indexOf('_')).split('-').join(' ');
    let urls = data[key];
    if (!fs.existsSync(folder)){
       fs.mkdirSync(folder);
    }
    return imageScrapper(urls, folder);
});

Promise.all(promiseList).then(response => {
    console.log(response);
});

