const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const domain = 'https://english.astroawani.com';

const getMetaItems = url => {
  return new Promise((resolve, reject) => {
    request(`${domain}/${url}`, (error, response, body) => {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

const LEGACY_AWANI_ENGLISH_CATEGORIES = [
  {
    id: 7,
    url: 'blog'
  },
  {
    id: 8,
    url: 'opinion'
  },
  {
    id: 11,
    url: 'opinion-special'
  },
  {
    id: 13,
    url: 'assemblyelection-news'
  },
  {
    id: 14,
    url: 'parliamentelection-news'
  },
  {
    id: 16,
    url: 'awani-this-week'
  },
  {
    id: 17,
    url: 'timelines'
  },
  {
    id: 18,
    url: 'infographics'
  },
  {
    id: 19,
    video_id: 12,
    video_url: 'video-ramadan',
    url: 'ramadan'
  },
  {
    id: 20,
    video_id: 5,
    photo_id: 11,
    video_url: 'fashion-videos',
    photo_url: 'fashion-photos',
    url: 'fashion'
  },
  {
    id: 23,
    photo_id: 12,
    photo_url: 'malaysia-at-50-photos',
    url: 'malaysia-at-50-news'
  },
  {
    id: 24,
    url: 'view-points'
  },
  {
    id: 28,
    url: 'economy-policy'
  },
  {
    id: 29,
    url: 'world-marketing-summit'
  },
  {
    id: 30,
    photo_id: 13,
    photo_url: 'awani745-news-photos',
    url: 'awani745-news'
  },
  {
    id: 31,
    url: 'budget-infographics'
  },
  {
    id: 33,
    url: 'budget2014-news'
  },
  {
    id: 36,
    url: 'heat-wave'
  },
  {
    id: 37,
    url: 'dengue-news'
  },
  {
    id: 38,
    url: 'mh370-news'
  },
  {
    id: 39,
    url: 'obama'
  },
  {
    id: 40,
    url: 'features'
  },
  {
    id: 41,
    url: 'terengganu-politics'
  },
  {
    id: 42,
    url: 'myguru'
  },
  {
    id: 43,
    url: 'kini-trending'
  },
  {
    id: 44,
    url: 'politics-news'
  },
  {
    id: 45,
    url: 'pemilu-2014'
  },
  {
    id: 46,
    url: 'fifa2014-news'
  },
  {
    id: 47,
    url: 'budget2015-news'
  },
  {
    id: 48,
    url: 'mh17-news'
  },
  {
    id: 49,
    url: 'merdeka2014'
  },
  {
    id: 57,
    url: 'gst-news'
  },
  {
    id: 59,
    url: 'before-2015'
  },
  {
    id: 60,
    url: 'flood-news'
  },
  {
    id: 61,
    url: 'airasia-qz8501-news'
  },
  {
    id: 9,
    video_id: 9,
    photo_id: 9,
    video_url: 'latest-videos',
    photo_url: 'latest-photos'
  },
  {
    photo_id: 31,
    video_id: 9,
    video_url: 'motoring-videos',
    photo_url: 'motoring-photos'
  }
];

const AWANI_ENGLISH_CATEGORIES = [
  {
    id: 1,
    video_id: 9,
    photo_id: 2,
    url: 'malaysia-news',
    photo_url: 'malaysia-photos',
    video_url: 'malaysia-videos'
  },
  {
    id: 2,
    video_id: 6,
    photo_id: 3,
    url: 'world-news',
    photo_url: 'world-photos',
    video_url: 'world-videos'
  },
  {
    id: 3,
    video_id: 1,
    photo_id: 8,
    url: 'business-news',
    photo_url: 'business-photos',
    video_url: 'latest-videos'
  },
  {
    id: 4,
    video_id: 14,
    photo_id: 7,
    url: 'sports-news',
    photo_url: 'sports-photos',
    video_url: 'latest-videos'
  },
  {
    id: 5,
    video_id: 4,
    photo_id: 4,
    url: 'entertainment-news',
    photo_url: 'entertainment-photos',
    video_url: 'latest-videos'
  },
  {
    id: 8,
    video_id: 15,
    photo_id: 5,
    url: 'technology-news',
    photo_url: 'technology-photos',
    video_url: 'latest-videos'
  },
  {
    id: 12,
    video_id: 3,
    photo_id: 10,
    url: 'election-news',
    photo_url: 'malaysia-photos',
    video_url: 'latest-videos'
  },
  {
    id: 7,
    video_id: 7,
    photo_id: 32,
    url: 'lifestyle',
    photo_url: 'lifestyle-photos',
    video_url: 'lifestyle-videos'
  }
];

const urls = Object.keys([...AWANI_ENGLISH_CATEGORIES, ...LEGACY_AWANI_ENGLISH_CATEGORIES].reduce((acc, item) => {
  if (item.url) {
    acc[item.url] = true;
  }
  if (item.photo_url) {
    acc[item.photo_url] = true;
  }
  if (item.video_url) {
    acc[item.video_url] = true;
  }
  return acc;
}, {}));

console.log(urls);

// const idList = [...document.querySelectorAll('.listing-item .listing-image a')].map(item => {
//   return item.href.split('-').pop();
// });
// const vodResponseList = [];
// const sequalise = async (currentId, idList) => {
//   if(idList.length) {
//     const data = await getMetaItems(`http://api.vod.astro.com.my/rest/media/search?key=astroawani&applicationalias=awani&output=json&tags=[${currentId}]`);
//     vodResponseList.push(data);
//     sequalise(idList.pop(), idList);
//   }
//   else {
//     console.log('done vod');
//   }
// }
// await sequalise(idList.pop(), idList);
// const vodData = vodResponseList.map(JSON.parse).find(item => item && item.list && item.list.length && item.list[0].media && item.list[0].media[0]);
// dataList.push({ url, vodData });

// if(urls.length) {
//   console.log(urls.length);
//   console.log(JSON.stringify(dataList, null, '  '));
//   myScrapper(urls.pop());
// } else {
//   console.log(JSON.stringify(dataList, null, '  '));
// }

const dataMap = {};

const myScrapper = async url => {
  try {
    const data = await getMetaItems(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;
    dataMap[url] = {
      description: document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').content,
      title: document.title,
      keywords: document.querySelector('meta[name="keywords"]') && document.querySelector('meta[name="keywords"]').content
      // h1: document.querySelector('h1') && document.querySelector('h1').innerHTML
    }; 
    if (urls.length) {
      console.log(urls.length);
      myScrapper(urls.pop());
    } else {
      console.log(dataMap);
    }
  } catch (error) {
    dataMap[url] = {
      description: "error",
      title: "error",
      keywords: "error"
      // h1: "error"
    };
    if (urls.length) {
      console.log(urls.length);
      myScrapper(urls.pop());
    } else {
      console.log(dataMap);
    }
  }
};

console.log(urls.length);
myScrapper(urls.pop());