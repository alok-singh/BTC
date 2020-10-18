import request from 'request'; 
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export const worldoMeterScrapper = (req, res) => {
    const headers = {
        'authority': 'www.worldometers.info',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'sec-fetch-user': '?1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cookie': 'fsbotchecked=true; _ga=GA1.2.63223932.1583132518; _fsuid=cfefe84a-9672-471f-a362-f43489c46bde; _fsloc=?i=MY&c=Subang Jaya; __beaconTrackerID=9hkwo5tqc; __qca=P0-1827288699-1583141062954; __atssc=google%3B2; __cfduid=d033938db9eb30476618920593aed642e1584329706; _gid=GA1.2.1336493562.1584459701; _fssid=ac3fc322-4ec5-4ea5-ae5b-95b0cc330846; fssts=false; __atuvc=2%7C10%2C0%7C11%2C16%7C12; __atuvs=5e72da6e92804c7a000; __gads=ID=b52052be41291d57:T=1583132518:RT=1584585668:S=ALNI_MZtyQEXYkvo7m0_MLbjYXiDbacqyA'
    };
    const options = {
        url: 'https://www.worldometers.info/coronavirus/',
        headers: headers
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.writeHead(200, {'Content-Type': 'text/html'});
		    res.write(body);
		    res.end();
        }
    });
};