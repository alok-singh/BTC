const request = require('request');

module.exports.getAPIData = (loid, session) => {
    const headers = {
        'authority': 'gateway.reddit.com',
        'x-reddit-loid': loid,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'x-reddit-session': session,
        'content-type': 'application/x-www-form-urlencoded',
        'accept': '*/*',
        'origin': 'https://www.reddit.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'referer': 'https://www.reddit.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
    };
    
    const options = {
        url: 'https://gateway.reddit.com/desktopapi/v1/subreddits/SexyWallpapers?rtj=only&redditWebClient=web2x&app=web2x-client-production&allow_over18=1&include=prefsSubreddit&after=t3_37yen2&dist=25&layout=card&sort=hot&geo_filter=IN',
        headers: headers
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
}
