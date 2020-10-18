const request = require('request');
const xmlParser = require('xml2json');
const mysql = require('mysql');

const { sitemapUrls } = require('./sitemapUrls');
const totalUrls = sitemapUrls.length;

const headers = {
  'authority': 'beta.astroawani.com',
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  'cookie': 'AMCVS_43D8021954C26BE10A4C98A5%40AdobeOrg=1; _gcl_au=1.1.796803047.1595995470; _hjid=f7c57815-4a85-4616-8c7e-981c22073042; _ga=GA1.2.1491143357.1595995470; OB-USER-TOKEN=8fab7742-3336-4acc-92b6-624866a8c5d1; s_cc=true; aam_uuid=26179334469810426144342541185001775595; _fbp=fb.1.1595995471425.934132387; _SI_VID_1.16f054658300010afb3d9e8f=de9a7492eb549744caded510; _SI_DID_1.16f054658300010afb3d9e8f=d0c30b03-c257-32ff-9415-f0b91afa1d42; s_sq=%5B%5BB%5D%5D; _cb_ls=1; _cb=BI8c2TDlRD6dDUqSq6; aam_uuid=26179334469810426144342541185001775595; uuid=NTNlYTFlYjktOWZkOS00MTAxLTgwZGQtOGQwMWNmZjY0NGMy; token=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR2xsYm5RaU9pSmhkMkZ1YVY5M1pXSWlMQ0prWlhacFkyVkpaQ0k2SWpVelpXRXhaV0k1TFRsbVpEa3ROREV3TVMwNE1HUmtMVGhrTURGalptWTJORFJqTWlJc0ltbGhkQ0k2TVRVNU5UazVOVFUyT0N3aVpYaHdJam94TlRrMk5qQXdNelk0ZlEuN0QzNjVXSmN1VkdwYW1VRXloWXJuRS1jOEY4anZ2ZWZhZUJ3N0IzNHFlNA==; refreshToken=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR2xsYm5RaU9pSmhkMkZ1YVY5M1pXSWlMQ0prWlhacFkyVkpaQ0k2SWpVelpXRXhaV0k1TFRsbVpEa3ROREV3TVMwNE1HUmtMVGhrTURGalptWTJORFJqTWlJc0ltbGhkQ0k2TVRVNU5UazVOVFUyT0N3aVpYaHdJam94TlRrNE5UZzNOVFk0ZlEuaUtvQ0Nxc3RWc0JrYTZIOFJianZaU2hmM3BfVDZtYmJYUG1KTUwxN3B0VQ==; AMCV_43D8021954C26BE10A4C98A5%40AdobeOrg=1585540135%7CMCIDTS%7C18473%7CMCMID%7C31801789933774545283761993720070637981%7CMCAAMLH-1596625384%7C3%7CMCAAMB-1596625384%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1596027784s%7CNONE%7CMCSYNCSOP%7C411-18480%7CvVersion%7C4.4.0; ins-storage-version=3; _SI_SID_1.16f054658300010afb3d9e8f=b9f88275acfbb62bb75e1201.1596020596022.25028571; cto_bundle=fVGHxV80ZktXa2s2eWE1dEVPcDZ5WVlCbm1KJTJCb3lSWDNHS3AwVjFuOEw5ZFZjV1FSSVBnalclMkJITzkwWnJaanB1b0FGd1NET3h2WEl3dFIydmx3NXR0RDFZUURUYmdxUDc2NENsOUh2JTJGZkdZJTJGRGF5cldWd3VpbjBlWEtscWJkTXBTRXhYOExPb0UzN0tCNGRkSzV4MGhTRzRGdyUzRCUzRA; _gid=GA1.2.226860404.1596424817; __gads=ID=38dd066cf2372b98:T=1595995469:S=ALNI_MaORdpBppd_ADiXKWleQOb5OIEWtg; _chartbeat2=.1595995568340.1596424817443.100001.Ccfy3VCmRSbJgGnbZhUrAjDBYp0Z.2; __atuvc=2%7C31%2C1%7C32'
};

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alok@123",
  database: "ssr_caching",
});

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        console.log('fail');
        console.log(options);
        reject(error)
      } else {
        resolve(response.body);  
      }
    });
  });
};

const getSQLQuery = (url) => {
  return `INSERT INTO beta_urls (url) VALUES ("${url}")`;
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, err => {
      if (err) {
        console.log(err.code, filePath);
        connection.close();
        reject(err);
      };
      resolve('success');
    });
  })
}

const fetchUrls = async (urls, concurrency, totalUrls) => {
  try {
    while(urls.length) {    
      const completed = totalUrls - urls.length;
      console.log(`starting ${completed + concurrency}...`);
      const data = await Promise.all(urls.splice(0, concurrency).map((url => {
        const options = { method: "GET", url, headers};
        return makeRequest(options);
      })));
      console.log(`finished ${completed + concurrency}...`);
      for(let dataIndex = 0; dataIndex < data.length; dataIndex++) {
        const list = JSON.parse(xmlParser.toJson(data[dataIndex]));
        try {
          for(let listIndex = 0; listIndex < list.urlset.url.length; listIndex++) {
            const query = getSQLQuery(list.urlset.url[listIndex].loc);
            const result = await executeQuery(query);
            if(result !== 'success') {
              process.exit(1);
            }
          }
        } catch (error) {
          console.log(error);
          console.log(list);
        }
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connection.connect((err) => {
  if (err) throw err;
  fetchUrls(sitemapUrls, 1, sitemapUrls.length);
});
