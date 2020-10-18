import React from "react";
import { renderToString } from "react-dom/server";
import MalayComponent from "../JS/malayComponent";

export const malayController = (req, res) => {
  res.render("malay", {
    pageTitle: "Malay View",
    cssPath: "../CSS/malay.css",
    jsPath: "../build/malay.js",
    innerHTML: renderToString(<MalayComponent />)
  });
};
