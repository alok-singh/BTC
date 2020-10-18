const request = require('request');
const headers = {
    'Connection': 'keep-alive',
    'Accept': 'application/json;pk=BCpkADawqM2OrBazvDGrXg-DNBIj27Uo_T-jy7aKIh2vtzKMqKxaMzxiwLU7muKLyRZHPW8i0BYvBD_DO72Xu_W-DOXG0cjBWa5rAvj0O4yCp972K_-OIUBn5bIwALXHj8EPr-3U33kTEvpg',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Origin': 'http://www.astroawani.com',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'http://www.astroawani.com/video-sukan/al-sultan-abdullah-dianugerahkan-afc-diamond-asia-1818280',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
};
const options = (brightCovId) => {
    url: `https://edge.api.brightcove.com/playback/v1/accounts/4508222217001/videos/${brightCovId}`,
    headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);
