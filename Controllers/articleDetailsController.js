export const articleDetailsController = (req, res) => {
  const article = require(`../Articles/article-${req.params.id}`);
  res.writeHead(200, {
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });
  res.write(JSON.stringify(article));
  res.end();
};
