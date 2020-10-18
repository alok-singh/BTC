const fs = require("fs");
const request = require("request");
const { generateAuthToken } = require("./authTokenGenerator");
const sfvId = 96950;
const playListAPI = `https://de-api-dev.eco.astro.com.my/sfv/api/v1/playlist/${sfvId}`;

const DIRECTORY_PATH = "../Articles";

const urlCategoryList = [
  `https://de-api-dev.eco.astro.com.my/feed/api/v1/articles?site=awani&pageSize=10`
];

const getArticleList = id =>
  `https://de-api-dev.eco.astro.com.my/feed/api/v1/articles/${id}?site=awani`;

const getAPIPromise = (url, token) => {
  const options = {
    url: url,
    headers: {
      accept: "application/json, text/plain, */*",
      authorization: token
    },
    method: "GET"
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        resolve(body);
      }
    });
  });
};

const scrapper = async (urlList, callback) => {
  const auth = JSON.parse(await generateAuthToken());
  const data = await Promise.all(
    urlList.map(url => getAPIPromise(url, auth.response.token))
  );
  console.log(auth);
  const articleIdList = data
    .filter((articleList, index) => {
      let parsedData = JSON.parse(articleList);
      if (parsedData.response && parsedData.response.length) {
        return true;
      } else {
        console.log(index);
        return false;
      }
    })
    .map(articleList => {
      let parsedData = JSON.parse(articleList);
      return parsedData.response.map(val => val.id);
    })
    .reduce((acc, val) => [...acc, ...val], []);

  const articleData = await Promise.all(
    articleIdList.map(id =>
      getAPIPromise(getArticleList(id), auth.response.token)
    )
  );

  console.log("writing ", articleData.length, " articles");

  articleData
    .filter((data, index) => {
      let response = "";
      try {
        response = JSON.parse(data).response;
      } catch (error) {
        response = "";
        console.log(data);
      }
      if (response) {
        return true;
      } else {
        console.log("empty article response", index);
        return false;
      }
    })
    .forEach(data => {
      let response = JSON.parse(data).response;
      fs.writeFile(
        `${DIRECTORY_PATH}/article-${response.id}.json`,
        JSON.stringify(response, null, "    "),
        () => {
          // console.log("done");
        }
      );
    });

  callback();
};

const setScrapper = (start, interval) => {
  console.log({ start }, { end: start + interval });
  let urlList = urlCategoryList.reduce((acc, url) => {
    for (let i = start; i < start + interval; i++) {
      acc.push(`${url}&pageNumber=${i}`);
    }
    return acc;
  }, []);
  scrapper(urlList, () => setScrapper(start + interval, interval));
};

setScrapper(5571, 10);
