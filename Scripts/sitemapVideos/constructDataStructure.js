const fs = require('fs');
const path = require('path');

const constructDataStructure = () => {
  return fs.readdirSync(path.resolve(__dirname, './data')).reduce((mainObject, fileName) => {
    const filePath = path.resolve(__dirname, './data', fileName);
    const fileData = require(filePath);
    fileData.forEach(item => {
      const itemId = item.url.split('/').pop().split('-').pop();
      mainObject[itemId] = item;
    });
    return mainObject;
  }, {});
};

const main = () => {
  const fileName = 'allData';
  const fileData = constructDataStructure();
  fs.writeFile(`./structuredData/${fileName}.json`,
    JSON.stringify(fileData, null, "    "),
    () => {
      console.log(`wrote file ./structuredData/${fileName}.json`);
    }
  );
}

main();

// const makeRequest = (options) => {
//   return new Promise((resolve, reject) => {
//     request(options, (error, response) => {
//       if (error) {
//         console.log('fail');
//         console.log(options);
//         reject(error)
//       } else {
//         resolve(response.body);  
//       }
//     });
//   });
// }

// const sequealise = async (urlList) => {
//   if (urlList.length) {
//     const url = urlList.pop();
//     try {
//       const options = { method: "GET", url};
//       const response = await makeRequest(options); 
//       const json = xmlParser.toJson(response);
//       const parsedJson = JSON.parse(json);
//       const fileData = parsedJson.urlset.url.map((item) => {
//         try {
//           const data = {};
//           data.image = item && item['image:image'] && item['image:image']['image:loc'];
//           data.videoThumbnail = item && item['video:video'] && item['video:video']['video:thumbnail_loc'];
//           data.title = item && item['video:video'] && item['video:video']['video:title'];
//           data.description = item && item['video:video'] && item['video:video']['video:description'];
//           data.duration = item && item['video:video'] && item['video:video']['video:duration'];
//           data.publishDate = item && item['video:video'] && item['video:video']['video:publication_date'];
//           data.modifiedDate = item && item['lastmod'] && item['lastmod'];
//           data.url = item.loc;
//           return data;
//         } catch (error) {
//           console.log(item);
//           console.log(error);
//           process.exit(1);
//         }
//       });
//       const fileName = url.split('/').pop().replace('.xml', '');
      // fs.writeFile(`./data/${fileName}.json`,
      //   JSON.stringify(fileData, null, "    "),
      //   () => {
      //     console.log(`wrote file ./data/${fileName}.json`);
      //     sequealise(urlList);
      //   }
      // );
//     } catch (error) {
//       console.log(url);
//       console.log(error);
//       process.exit(1);
//     }

//   } else {
//     console.log('done');
//   }
// }

// const main = (interval) => {
//   while(videoUrls.length) {
//     sequealise(videoUrls.splice(0, interval));
//   }
// };

// main(15);