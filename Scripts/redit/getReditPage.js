const fs = require("fs");
const request = require("request");
const { getAPIData } = require('./request');

const headers = {
    authority: "www.reddit.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    "upgrade-insecure-requests": "1",
    "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    "sec-fetch-user": "?1",
    accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    referer: "https://www.reddit.com/r/SexyWallpapers/",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
};
const options = {
    url: "https://www.reddit.com/r/SexyWallpapers/",
    headers: headers
};

const retriveInfo = body => {
    try {
        let endPart = body.split('<script id="data">').pop();
        let contentScript = endPart.split("</script>").shift();
        let start = contentScript.indexOf("{");
        contentScript = contentScript.substring(
            start,
            contentScript.length - 1
        );
        return JSON.parse(contentScript);
    } catch (error) {
        console.log(error);
        return {};
    }
};

request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const data = retriveInfo(body);
        const { loid, version, loidCreated, blob } = data.user.loid;
        const session = data.user.sessionTracker;
        const loidToken = `${loid}.${version}.${loidCreated}.${blob}`;
        getAPIData(loidToken, session);
    }
});
