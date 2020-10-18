const fs = require("fs");
const data = require("./data.json");

const main = data => {
  fs.writeFile("test.xml", generateXMLFile(data), () => {
    console.log("done");
  });
};

const generateXMLFile = itemList => {
  let content = itemList.reduce((acc, item, index) => {
    return `${acc}${generateXMLURLItem(item)}`;
  }, "");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${content}
  </urlset>`;
};

const getImageUrlFromContent = content => {
  try {
    return JSON.parse(content);
  } catch (error) {
    return content;
  }
};

const generateURLFromCategory = ({ category, title, id, type }) => {
  try {
    if (type === 'VIDEO')
      return `/${category.video_url}/${cleanTitle(title)}-${id}`;
    if (type === 'ALBUM')
      return `/${category.photo_url}/${cleanTitle(title)}-${id}`;
    return `/${category.url}/${cleanTitle(title)}-${id}`;
  } catch {
    return `/berita-malaysia/${cleanTitle(title)}-${id}`;
  }
}

const cleanTitle = title => {
  const maxLength = 100;
  const separator = '-';
  // Words that will be filtered out before processing
  const stopWordsRegex = new RegExp(
    [
      '\\ba',
      'an',
      'as',
      'at',
      'before',
      'but',
      'by',
      'for',
      'from',
      'is',
      'in',
      'into',
      'like',
      'of',
      'off',
      'on',
      'onto',
      'per',
      'since',
      'than',
      'the',
      'this',
      'that',
      'to',
      'up',
      'via',
      'with',
    ].join('\\b|\\b'),
    'g',
  );
  const nonAlphanumericRegex = new RegExp('[^a-zA-Z0-9]+', 'g');
  const removeSeparatorLiteralRegex = new RegExp(
    `^\\${separator}+|\\${separator}+$`,
    'g',
  );
  return title
    .toLowerCase()
    .replace(/'/g, separator)
    .replace(stopWordsRegex, '')
    .replace(nonAlphanumericRegex, separator)
    .replace(removeSeparatorLiteralRegex, '')
    .trim(0, maxLength);
}

const generateImageTagsFromImageData = imageData => {
  const imageList = getImageUrlFromContent(imageData);
  if(Array.isArray(imageList)) {
    return imageList.reduce((acc, item) => {
      return `${acc}${generateImageTagsFromUrl(item)}`;
    }, ``);
  }
  else {
    return generateImageTagsFromUrl(imageList);
  }
}

const generateImageTagsFromUrl = (imageUrl) => {
  return `<image:image>
    <image:loc>
      ${imageUrl}
    </image:loc>
  </image:image>`;
}

const generateXMLURLItem = item => {
  return (
    `<url>
      <loc>
        ${generateURLFromCategory(item)}
      </loc>
      ${generateImageTagsFromImageData(item.imageUrl)}
      <lastmod>${item.publishDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`
  );

}

main(data.response);
