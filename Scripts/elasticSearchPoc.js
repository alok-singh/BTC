const request = require("request");
const fs = require("fs");
const directory = "../Articles/";
let count = 0;

const requestPromise = (url, method, body) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: url,
      method: method,
      headers: {
        accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    };
    options.body = body ? body : undefined;
    request(options, (error, response, body) => {
      if (body) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

const pushDataToElasticSearch = article => {
  return requestPromise(
    "http://localhost:9200/articles/article/",
    "POST",
    JSON.stringify(article)
  )
    .then(response => {
      count++;
      console.log(count, JSON.parse(response)._id);
      return response;
    })
    .catch(error => {
      console.log("catch", error);
    });
};

fs.readdir(directory, (err, files) => {
  const postData = data => {
    pushDataToElasticSearch(data).then(response => {
      let file = files.pop();
      console.log({ file });
      if (file) {
        let data = require(`${directory}${file}`);
        postData(data);
      }
    });
  };
  let data = require(`${directory}${files.pop()}`);
  postData(data);
});
