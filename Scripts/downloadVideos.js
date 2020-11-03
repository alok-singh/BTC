const fs = require("fs");
const request = require("request");

const urlFunction = (count) => ``;

const headers = {
  authority: "1-397-19-14.b.cdn13.com",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
  accept: "*/*",
  origin: "",
  "sec-fetch-site": "cross-site",
  "sec-fetch-mode": "cors",
  referer: "",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
};

const download = (uri, fileName, headers) => {
  return new Promise((resolve) => {
    request.head(uri, () => {
      request({ uri, headers })
        .pipe(fs.createWriteStream("./videoPartials/" + fileName))
        .on("close", () => {
          console.log(uri);
          resolve();
        });
    });
  });
};

const parallelDownload = (start, end) => {
  let promiseArr = [];
  let url = "";
  for (let index = start; index <= end; index++) {
    url = urlFunction(index);
    promiseArr.push(download(url, `partial-${index}.ts`, headers));
  }
  Promise.all(promiseArr).then(() => {
    console.log("done");
  });
};

parallelDownload(1, 143);
