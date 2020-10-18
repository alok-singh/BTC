var request = require('request');

var headers = {
    'authority': 'pixabay.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'sec-fetch-user': '?1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'navigate',
    'referer': 'https://www.google.com/',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cookie': '__cfduid=d089825cf30bd8554c3380a1dbf21d9e21584068030; anonymous_user_id=41a86b8c-2a97-4386-823e-85ab135e35c9; is_human=1; _sp_ses.aded=*; _ga=GA1.2.450338647.1584068033; _gid=GA1.2.78400528.1584068033; dwf_attribution_template_ads=True; client_width=715; _sp_id.aded=9bee87d7-4f3d-490b-8c0b-4a4e6ff438d7.1584068033.1.1584068091.1584068033.36f3498e-ea76-412f-a2f5-ae468c9b9a99'
};

var options = {
    url: 'https://pixabay.com/',
    headers: headers
};

function callback(error, response, body) {
    if (!error) {
        console.log(body);
    }
}

request(options, callback); 