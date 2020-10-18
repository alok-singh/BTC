const fs = require("fs");
const fetch = require("fetch");
const defaultSaveDirectory = './videoPartials';
const urlFunction = (count) => `https://1-389-19-14.b.cdn13.com/hls/011/651/340/2160p.h264.mp4/seg-${count}-v1-a1.ts?cdn_creation_time=1582340400&cdn_ttl=14400&cdn_cv_data=202.187.70.138&cdn_hash=8ee7bfea84e797037337a3a90397cc40`;

const options = {
    credentials: "omit",
    headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    },
    referrer:
        "https://xhamster9.com/videos/granny-in-her-seventies-with-huge-breasts-11651340",
    referrerPolicy: "unsafe-url",
    method: "GET",
    mode: "cors"
};
const downloadFile = (url, options, path) => {
    const urlStream = new fetch.FetchStream(url, options);
    const fileStream = fs.createWriteStream(path);
    urlStream.pipe(fileStream);
};

const init = (start, end) => {
    for(let index = start; index <= end; index++) {
        downloadFile(urlFunction(index), options, `${defaultSaveDirectory}/partial-${index}.ts`);
    }
};


init(1, 6)