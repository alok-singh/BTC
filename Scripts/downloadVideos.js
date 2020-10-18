const fs = require("fs");
const request = require("request");

const urlFunction = (count) =>
  `https://ip186543017.ahcdn.com/key=kxfiJZz5h0QjENoYTegfpA,s=,end=1603018800,limit=3/data=110.159.191.84/state=X4vpbp+-/reftag=78545578/media=hlsA/ssd1/21/3/215865773.mp4/seg-${count}-v1-a1.ts`;

const headers = {
  authority: "1-397-19-14.b.cdn13.com",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
  accept: "*/*",
  origin: "https://xhamster9.com",
  "sec-fetch-site": "cross-site",
  "sec-fetch-mode": "cors",
  referer: "https://xhamster9.com/videos/boobs-cool-11341423",
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

// download('https://slow-214.keep2share.cc/a8ec8df1c5ea6/8e0600e2dfd58/457d94e1ec273?temp_url_sig=651892e54abf47738387919d030c596552fe046bb6e5b127da2cd3be680e92f4b05bc198778bc21d9f94b98a217c3913d1e010d856e818fe9a9d76f87150a53f&temp_url_expires=1582544663&id=7ae9151f0a6b4&ip=any&node_id=214&countable=1&project=moneyplatform&rate_limit=51200&uf=ad915f1d54605&tags=k2s%2Cwebapi%2Cdownload&name=Nikki-Sims-Pool-Cleaner-HD-Video-140717.zip', 'Nikki-Sims-Pool-Cleaner-HD-Video-140717.zip', {})
