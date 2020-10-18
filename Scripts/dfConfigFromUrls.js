const request = require("request");

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        console.log("fail", error);
        console.log(options.url);
        resolve({
          data: error,
          url: options.url,
        });
      } else {
        resolve({
          data: JSON.parse(response.body),
          url: options.url,
        });
      }
    });
  });
};

const urls = [
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/8XPvdGBrDw/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/WkovWbBNKV/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/dpMB5VvlZa/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/ALNBRzBazx/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/Z9Wy23Bzk4/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/zJYjAZyW93/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/lE2v10BxYn/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/peNyLwjRxP/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/OgdBnqyMP1/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/XmJyzXvo4g/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/pYbBrYyw82/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/6rPy3LBn0W/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/b1mvMGyAGO/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/834BelyDzK/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/oGVjP2BP9Y/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/3gwvq3yEYV/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/GJYBVzBkrz/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/mJrvYmv2G9/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/OPwBQojdG7/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/X2ejOgj18w/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/2XmjXOvRbL/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/6JVBazv73Q/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/z3Vv69BMLN/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/ZKpyw8B3M0/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/Zlxjm8vWVa/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/9ReylNv7O6/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/rdWvEMv3G1/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/L92yJbyx5P/config.json",
  "https://digital-fortress-assets.eco.astro.com.my/prod/config/lqryNQjYAp/config.json",
];

const main = () => {
  urls.forEach((url) => {
    const options = {
      method: "GET",
      url: `${url}?terere`,
    };
    makeRequest(options).then(({data, url}) => {
      if(data.response.config.find(item => item.key === 'gempak_ssr')) {
        console.log(data.response.config[0].key, url);
      }
    });
  });
};

main();