const https = require('https');

function fetch(url) {
    return new Promise((resolve, reject) => {
        let responseString = '';
        https.get(url, res => {
            res.on('data', chunk => {
                responseString += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseString));
            });
            res.on('error', (error) => {
                reject(error);
            });
        })
    });
}

async function getWinner(competition, year) {
    const { data } = await fetch(`https://jsonmock.hackerrank.com/api/football_competitions?name=${competition}&year=${year}`);
    return data[0].winner;
}

async function getNumGoals(queryString, readKey) {
    let responseList = [];
    const url = `https://jsonmock.hackerrank.com/api/football_matches?page=1&${queryString}`;
    const firstPage = await fetch(url);
    const totalPages = firstPage.total_pages;
    if(totalPages > 1) {
        const promiseList = new Array(totalPages - 1).fill(0).map((item, index) => {
          console.log(`https://jsonmock.hackerrank.com/api/football_matches?page=${index + 2}&${queryString}`);  
          return fetch(`https://jsonmock.hackerrank.com/api/football_matches?page=${index + 2}&${queryString}`);
        });
        responseList.push(firstPage);
        const response = await Promise.all(promiseList);
        responseList = responseList.concat(response);
    }
    const allData = responseList.map(item => item.data).reduce((acc, item) => {
        acc = [...acc, ...item];
        return acc;
    }, []);

    console.log(allData.length);

    const totalGoals = allData.reduce((count, item) => {
        count += parseInt(item[readKey]);
        return count;
    }, 0);

    return totalGoals;
}

async function getWinnerTotalGoals(competition, year) {
    const winnerName = await getWinner(competition, year);
    const totalGoalsAsTeam1 = await getNumGoals(`year=${year}&competition=${competition}&team1=${winnerName}`, 'team1goals');
    const totalGoalsAsTeam2 = await getNumGoals(`year=${year}&competition=${competition}&team2=${winnerName}`, 'team2goals');
    return totalGoalsAsTeam1 + totalGoalsAsTeam2;
}

async function main() {
  const data = await getWinnerTotalGoals('UEFA Champions League', 2011); 
  console.log(data);
}

main();



// const https = require('https');

// function fetch(url) {
//     return new Promise((resolve, reject) => {
//         let responseString = '';
//         https.get(url, res => {
//             res.on('data', chunk => {
//                 responseString += chunk;
//             });
//             res.on('end', () => {
//                 resolve(JSON.parse(responseString));
//             });
//             res.on('error', (error) => {
//                 reject(error);
//             });
//         })
//     });
// }

// async function getNumDraws(year) {
//     const firstPage = await fetch(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=1`);
//     const totalPages = firstPage.total_pages;
//     let responseList = [];
//     responseList.push(firstPage);
//     if(totalPages > 1) {
//       const promiseList = new Array(totalPages - 1).fill(0).map((item, index) => {
//           return fetch(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&page=${index + 2}`);
//       });
//       const response = await Promise.all(promiseList);
//       responseList = responseList.concat(response);
//     }
//     const allData = responseList.map(item => item.data).reduce((acc, item) => {
//         acc = [...acc, ...item];
//         return acc;
//     }, []);
//     // console.log(allData);
//     const totalDraw = allData.reduce((count, item) => {
//         if(item.team1goals == item.team2goals) {
//             count++;
//         }
//         return count;
//     }, 0);
//     return totalDraw;
// }
// getNumDraws(2011).then(data => {
//   console.log(data);
// });