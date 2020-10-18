var webp = require('webp-converter');
var fs = require('fs');

var folder = './webp';

fs.readdir(folder, (err, files) => {
    if(err) {
        console.log(err);
    }
    else {
        files.forEach(file => {
            if(file.indexOf('.webp') != -1) {
                let inputPath = folder + '/' + file;
                let outputPath = './converted/' + file.replace('.webp', '.jpg');
                console.log(inputPath, ",", outputPath);
                webp.dwebp(inputPath, outputPath, "-o", (status,error) => {
                      console.log(status,error);	
                });
            }
        });
    }
});


// webp.dwebp("./webp/file_9.webp", "./converted/file_9.jpg", "-o", (status,error) => {
//   	console.log(status,error);	
// });