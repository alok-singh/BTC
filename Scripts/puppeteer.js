const puppeteer = require("puppeteer");
const path = require("path");

const pageURL =
  "https://de-awani-web-portal-dev.eco.astro.com.my/berita-politik/pemuda-dap-sarawak-isytihar-tamat-kerjasama-dengan-pas-44840";

const takeScreenShot = (page, url, savePath) => {
  return new Promise((resolve, reject) => {
    page.goto(url).then((data) => {
      console.log("goto");
      page
        .evaluate(() => {
          console.log("evaluate");
          return {
            width: 1020, // window.screen.width,
            height: 2035, //window.screen.height,
          };
        })
        .then((data) => {
          console.log("evaluate success");
          page
            .setViewport({
              width: data.width,
              height: data.height,
              deviceScaleFactor: 2,
            })
            .then(() => {
              console.log("setViewport");
              page.screenshot({ path: savePath }).then(() => {
                console.log("screenshot");
                resolve();
              });
            });
        });
    });
  });
};

puppeteer.launch().then((browserInstance) => {
  console.log("launched");
  browserInstance.newPage().then((page) => {
    console.log("newPage");
    takeScreenShot(
      page,
      "http://localhost:8000/cv_astro_1",
      path.resolve("./cv_astro_2.png")
    )
      .then(() => {
        console.log("done");
        browserInstance.close();
      })
      .catch(() => {
        console.log("error");
        browserInstance.close();
      });
  });
});
