const request = require("request");
const amphtmlValidator = require("amphtml-validator");
const { urls, failingUrls } = require("./ampPageUrls");

const headers = {
  authority: "www.astroawani.com",
  pragma: "no-cache",
  "cache-control": "no-cache",
  "upgrade-insecure-requests": "1",
  "user-agent": "google",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "none",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  cookie:
    "AMCVS_43D8021954C26BE10A4C98A5%40AdobeOrg=1; _gcl_au=1.1.796803047.1595995470; _hjid=f7c57815-4a85-4616-8c7e-981c22073042; _ga=GA1.2.1491143357.1595995470; OB-USER-TOKEN=8fab7742-3336-4acc-92b6-624866a8c5d1; s_cc=true; aam_uuid=26179334469810426144342541185001775595; _fbp=fb.1.1595995471425.934132387; _SI_VID_1.16f054658300010afb3d9e8f=de9a7492eb549744caded510; _SI_DID_1.16f054658300010afb3d9e8f=d0c30b03-c257-32ff-9415-f0b91afa1d42; s_sq=%5B%5BB%5D%5D; _cb_ls=1; _cb=BI8c2TDlRD6dDUqSq6; aam_uuid=26179334469810426144342541185001775595; uuid=NTNlYTFlYjktOWZkOS00MTAxLTgwZGQtOGQwMWNmZjY0NGMy; token=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR2xsYm5RaU9pSmhkMkZ1YVY5M1pXSWlMQ0prWlhacFkyVkpaQ0k2SWpVelpXRXhaV0k1TFRsbVpEa3ROREV3TVMwNE1HUmtMVGhrTURGalptWTJORFJqTWlJc0ltbGhkQ0k2TVRVNU5UazVOVFUyT0N3aVpYaHdJam94TlRrMk5qQXdNelk0ZlEuN0QzNjVXSmN1VkdwYW1VRXloWXJuRS1jOEY4anZ2ZWZhZUJ3N0IzNHFlNA==; refreshToken=ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR2xsYm5RaU9pSmhkMkZ1YVY5M1pXSWlMQ0prWlhacFkyVkpaQ0k2SWpVelpXRXhaV0k1TFRsbVpEa3ROREV3TVMwNE1HUmtMVGhrTURGalptWTJORFJqTWlJc0ltbGhkQ0k2TVRVNU5UazVOVFUyT0N3aVpYaHdJam94TlRrNE5UZzNOVFk0ZlEuaUtvQ0Nxc3RWc0JrYTZIOFJianZaU2hmM3BfVDZtYmJYUG1KTUwxN3B0VQ==; AMCV_43D8021954C26BE10A4C98A5%40AdobeOrg=1585540135%7CMCIDTS%7C18473%7CMCMID%7C31801789933774545283761993720070637981%7CMCAAMLH-1596625384%7C3%7CMCAAMB-1596625384%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1596027784s%7CNONE%7CMCSYNCSOP%7C411-18480%7CvVersion%7C4.4.0; ins-storage-version=3; _SI_SID_1.16f054658300010afb3d9e8f=b9f88275acfbb62bb75e1201.1596020596022.25028571; cto_bundle=fVGHxV80ZktXa2s2eWE1dEVPcDZ5WVlCbm1KJTJCb3lSWDNHS3AwVjFuOEw5ZFZjV1FSSVBnalclMkJITzkwWnJaanB1b0FGd1NET3h2WEl3dFIydmx3NXR0RDFZUURUYmdxUDc2NENsOUh2JTJGZkdZJTJGRGF5cldWd3VpbjBlWEtscWJkTXBTRXhYOExPb0UzN0tCNGRkSzV4MGhTRzRGdyUzRCUzRA; _gid=GA1.2.226860404.1596424817; __gads=ID=38dd066cf2372b98:T=1595995469:S=ALNI_MaORdpBppd_ADiXKWleQOb5OIEWtg; _chartbeat2=.1595995568340.1596424817443.100001.Ccfy3VCmRSbJgGnbZhUrAjDBYp0Z.2; __atuvc=2%7C31%2C1%7C32",
};

let validatorInstance = {};
const resultFinal = {pass: [], fail: []};

const initialiseValidator = async () => {
  validatorInstance = await amphtmlValidator.getInstance();
};

const ampValidator = async (htmlString) => {
  const result = validatorInstance.validateString(htmlString);
  return result;
};

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        console.log("fail", error);
        console.log(options.url);
        resolve({
          html: error,
          url: options.url,
        });
      } else {
        resolve({
          html: response.body,
          url: options.url,
        });
      }
    });
  });
};

const getAMPPageHTML = async (urls, concurrency) => {
  while (urls.length) {
    console.log("starting", concurrency);

    const htmlPages = await Promise.all(
      urls.splice(0, concurrency).map((url) => {
        const options = { method: "GET", url: url.replace('www.astroawani.com', 'de-awani-web-portal-stg.eco.astro.com.my'), headers };
        return makeRequest(options);
      })
    );

    htmlPages.forEach(async ({ html, url }, index) => {
      const result = await ampValidator(html);
      if (result.status === "PASS") {
        console.log(result.status, url);
        resultFinal.pass.push(url);
      } else {
        console.log(result.status, url);
        resultFinal.fail.push(url);
        // console.log(url);
        // result.errors.forEach((error) => {
        //   let msg = `line ${error.line}, col ' ${error.col} ${error.message}`;
        //   if (error.specUrl !== null) {
        //     msg = `${msg}' (see ${error.specUrl})`;
        //   }
        //   (error.severity === "ERROR" ? console.error : console.warn)(msg);
        // });
        // process.exit(1);
      }
    });
    console.log("finished", concurrency, htmlPages.length);
  }
};

const main = async (concurrency) => {
  await initialiseValidator();
  await getAMPPageHTML(urls, concurrency);
  console.log(JSON.stringify(resultFinal, null, '  '));
};

main(50);
