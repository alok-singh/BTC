const fs = require('fs');
const request = require('request');

const download = (uri, folderName, callback) => {
    request.head(uri, () => {
        let fileName = `${folderName}/${uri.split('/').pop()}`;
        request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);
    });
};

const sequalise = (imageUrls, folderName, resolve) => {
    console.log(imageUrls.length);
    if(imageUrls.length) {
        download(imageUrls.pop(), folderName, () => {
            sequalise(imageUrls, folderName, resolve);
        });	
    }
    else {
        console.log('done', folderName);
        resolve('done');
    }
}

module.exports.imageScrapper = (imageUrls, folderName) => {
    return new Promise(resolve => {
        sequalise(imageUrls, folderName, resolve);
    })
}

module.exports.download = download;
module.exports.sequalise = sequalise;