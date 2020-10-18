var fs = require("fs");
var request = require("request");
var data = require("./data.json");
var path = require("path");
var urls = require("./urls");

var baseUrl = (count) => `s${count}.jpg`;

// var count = 1;
// var url = baseUrl(count);
// var url = urls[count];
// var fileName = url.split("/").pop();

var download = function(uri, fileName, callback) {
  request.head(uri, function(err, res, body) {
    request(uri)
      .pipe(fs.createWriteStream("./sequalise/" + fileName))
      .on("close", callback);
  });
};

var downloadPromise = function(uri, fileName) {
  return new Promise((resolve, reject) => {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(fileName))
        .on("close", () => {
          console.log("download", uri);
          resolve("done");
        });
    });
  });
};

function init(url, fileName) {
  download(url, function() {
    console.log("done", fileName, count);
    count++;
    if (urls[count]) {
      url = urls[count];
      // url = baseUrl(count);
      fileName = url.split("/").pop();
      init(url, `bundles/${fileName}`);
    } else {
      console.log("Total downloaded", count, "files");
    }
  });
}

function parallelDownload(urls) {
  var promiseArr = [];
  for (var i = 0; i < urls.length; i++) {
    promiseArr.push(
      downloadPromise(urls[i], "./parallel/" + urls[i].split("/").pop())
    );
  }
  Promise.all(promiseArr).then(() => {
    console.log("done");
  });
}

// init(url, fileName);

var urls = [];
for (var i = 0; i < 15; i++) {
  urls.push(baseUrl(i));
}

parallelDownload(urls);
