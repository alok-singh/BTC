// const fs = require('fs');
const mysql = require('mysql');
const idList = require('./id.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Alok@123',
  database: 'sfv_video_data',
});

const getRandomQuery = () => {
  const randomIndex = Math.ceil(0 + (idList.length * Math.random()));
  const randomId = idList[randomIndex - 1];
  return `select * from sfv_videos where videoId = ${randomId}`;
}

const makeQuery = (connection, query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      };
      resolve(result[0].videoId);
    });
  });
}

connection.connect((err) => {
  if (err) throw err;
  const promiseArr = [];
  const numberOfQueries = parseInt(process.argv[2]);
  console.log('datbase length', idList.length);
  console.log('number of queries', numberOfQueries);
  for(let index = 0; index < numberOfQueries; index++) {
    const query = getRandomQuery();
    promiseArr.push(makeQuery(connection, query));
  }
  console.time('test');
  Promise.all(promiseArr).then(data => {
    console.timeEnd('test');
    connection.end();
    process.exit(1);
  });
});
