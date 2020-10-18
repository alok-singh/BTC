import data from '../Scripts/data.json';
import fs from 'fs';
import deepFileReader from 'deep-file-reader';
import packageJSON from '../package.json';

const mainObj = {};
const {imageDirectoryPath} = packageJSON;

data.list.forEach(val => {
    let imageName = val.imageSrc.split('/').pop();
    mainObj[imageName] = val.name;
});

const imagePathList = deepFileReader(imageDirectoryPath, ['jpg', 'webp', 'png']).map(file => {
    let filePath = file.split(imageDirectoryPath).pop();
    let fileName = file.split("/").pop();
    return {
        imageName: filePath,
        placeName: mainObj[fileName] ? mainObj[fileName] : fileName
    };
});

export const getImagePathList = () => {
    return new Promise((resolve, reject) => {
        resolve(imagePathList);
    })
}

let getImagesList = (req, res) => {    
    getImagePathList().then((data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    });
}

export default getImagesList;