const request = require('request');

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        console.log('fail');
        console.log(options);
        resolve('');
      } else {
        resolve(response);  
      }
    });
  });
};

const main = async () => {
  const url = 'https://de-awani-web-portal-stg.eco.astro.com.my/berita-malaysia/video-ayah-saya-masak-ketum-hasil-kajian-akta-anti-buli-siber-dibentang-hujung-tahun-ini-255856';
  const headers = {
    'user-agent': 'googlebot',
  };
  const options = { method: "GET", url, headers};
  const data = await makeRequest(options);
  console.log(data.headers['x-cache'], (new Date()).toString());
}

main();