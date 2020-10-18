import fs from "fs";

const directory = "./Articles";
let fileNameList = [];

fs.readdir(directory, (err, files) => {
  fileNameList = (files || []).map((file) => {
    return {
      name: file,
      id: file.split("-").pop(),
    };
  });
});

export const articleListingController = (req, res) => {
  let offset = parseInt(req.query.offset);
  let size = parseInt(req.query.size);
  res.writeHead(200, {
    "Content-Type": "application/JSON",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.write(JSON.stringify(fileNameList.slice(offset, offset + size)));
  res.end();
};
