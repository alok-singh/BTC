var request = require("request");
var options = {
  method: "GET",
  url: "https://de-awani-web-portal-dev.eco.astro.com.my/",
  headers: {}
};
request(options, function(error, response) {
  if (error) throw new Error(error);
  console.log(response.headers);
});
