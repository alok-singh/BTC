"use strict";

// import { employeeController } from './Controllers/employeeController';
import { employeeGroupController } from "./Controllers/employeeGroupController";
import { employeeTreeController } from "./Controllers/employeeTreeController";
import { imageViewController } from "./Controllers/imageViewController";
import { malayController } from "./Controllers/malayController";

import { articleDetailsController } from "./Controllers/articleDetailsController";
import { articleListingController } from "./Controllers/articleListingController";

import { worldoMeterScrapper } from "./Controllers/worldoMeterController";
import querystring from "querystring";

import http from "http";
import express from "express";
import path from "path";
import fs from "fs";
import bitcoinAPIController from "./Controllers/bitcoinAPIController";
// import historyAPIController from './Controllers/historyAPIController';
import imageListController from "./Controllers/imageListController";
import imageController from "./Controllers/imageController";
import compression from "compression";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express();
// const options = {
//   key: fs.readFileSync('Encryption/client-key.pem'),
//   cert: fs.readFileSync('Encryption/client-cert.pem')
// };

app.use(compression());

// set the view engine to ejs and view directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Templates"));

// *********************** pages routes ************************** //

app.get("/", function(req, res) {
  console.log(req.query);
  getFileFromPath("./HTML/status.html", res);
});

app.get("/graph", function(req, res) {
  getFileFromPath("./HTML/graph.html", res);
});

app.get("/history", function(req, res) {
  getFileFromPath("./HTML/history.html", res);
});

app.get("/sin", function(req, res) {
  getFileFromPath("./HTML/sinx.html", res);
});

app.get("/paint-ball", function(req, res) {
  getFileFromPath("./HTML/canvasBallsPaint.html", res);
});

app.get("/random-motion", function(req, res) {
  getFileFromPath("./HTML/randomMotion.html", res);
});

app.get("/defined-motion", function(req, res) {
  getFileFromPath("./HTML/definedMotion.html", res);
});

app.get("/change-logs", function(req, res) {
  getFileFromPath("./HTML/CHANGELOG.html", res);
});

app.get("/collisions", function(req, res) {
  getFileFromPath("./HTML/collisions.html", res);
});

app.get("/image-view", function(req, res) {
  imageViewController(req, res);
});

app.get("/tearable-cloth", function(req, res) {
  getFileFromPath("./HTML/tearableCloth.html", res);
});

app.get("/employee", function(req, res) {
  getFileFromPath("./HTML/employee.html", res);
});

app.get("/employee/:field", function(req, res) {
  employeeGroupController(req, res);
});

app.get("/employee-tree/", function(req, res) {
  employeeTreeController(req, res);
});

app.get("/language/:languageName", function(req, res) {
  malayController(req, res);
});

app.get("/mouse-wheel/", function(req, res) {
  getFileFromPath("./HTML/mouseWheel.html", res);
});

app.get(["/cv", "/cv:name"], function(req, res) {
  getFileFromPath(
    "./HTML/cv" + (req.params.name ? req.params.name : "") + ".html",
    res
  );
});

app.get("/cv_naukri", function(req, res) {
  getFileFromPath("./HTML/cv_naukri.html", res);
});

app.get("/world-meter", function(req, res) {
  worldoMeterScrapper(req, res);
});

// ********************** APIs **********************  //

app.get("/get-btc", function(req, res) {
  bitcoinAPIController(req, res);
});

// app.get('/get-btc-history', function (req, res) {
// 	historyAPIController(req, res);
// });

app.get("/article-list", function(req, res) {
  articleListingController(req, res);
});

app.get("/img-list", function(req, res) {
  imageListController(req, res);
});

app.get("/get-employee-schema", function(req, res) {
  employeeController(req, res);
});

app.get("/get-employee-data", function(req, res) {
  employeeController(req, res);
});

// *********************** static files ************************** //

app.get("/JS/*", function(req, res) {
  let filePath = "./JS/" + req.url.split("/").pop();
  getFileFromPath(filePath, res, { "Content-Type": "application/javascript" });
});

app.get("/build/*", function(req, res) {
  let filePath = "./build/" + req.url.split("/").pop();
  getFileFromPath(filePath, res, { "Content-Type": "application/javascript" });
});

app.get("/CSS/*", function(req, res) {
  let filePath = "./CSS/" + req.url.split("/").pop();
  getFileFromPath(filePath, res, { "Content-Type": "text/css" });
});

app.get("/IMG/*", function(req, res) {
  // let filePath = path.resolve('./Images' + decodeURI(req.url.split('IMG').pop()));
  // getFileFromPath(filePath, res, {
  // 	'Content-Type': 'image/webp',
  // 	'Cache-Control': 'public, max-age=31557600'
  // });
  imageController(req, res);
});

app.get("/*", function(req, res) {
  sendTo404(res);
});

// *********************** helper function ************************** //

let getFileFromPath = (
  filePath,
  res,
  contentType = { "Content-Type": "text/html" }
) => {
  fs.readFile(filePath, function(err, data) {
    if (err) {
      sendTo404(res);
    } else {
      res.writeHead(200, contentType);
      res.write(data);
      res.end();
    }
  });
};

let sendTo404 = (res) => {
  res.writeHead(404, { "Content-Type": "text" });
  res.write("404 Not found");
  res.end();
};

// *********************** server start ************************** //

http.createServer(app).listen(8000);
console.log("server startted in port 8000");
