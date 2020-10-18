// function sendEmail(email) {
//   // apis to send email
//   console.log(email);
// }

// const obj = (function(retObj){
//   retObj.subscribers = {}

//   // if a user subscribes to a topic it shoud be added the topics object list
//   retObj.subscribe = function(topicName, userId, email) {
//     if (!this.subscribers[topicName]) {
//       this.subscribers[topicName] = [];
//     }
//     this.subscribers[topicName].push({id: userId, email});
//   };
  
//   retObj.publish = function(topicName, article) {
//     if(this.subscribers[topicName]) {
//       this.subscribers[topicName].forEach(subscriber => {
//         sendEmail(subscriber.email, article);
//       });
//     }
//   }
//   return retObj;
// })({});

// obj.subscribe('react', '123', 'email@email.com');
// obj.publish('react', 'article');


// users
// user = {
//   subscriptions: [],
//   email: '',
//   id: ''
// }

// articles
// articles = [{
//   body: '',
//   id: '',
//   topic: '',
// }]

function delay (t, v) { 
  return new Promise(function(resolve) { setTimeout(resolve.bind(null, v), t) }); 
}

const myPromiseAll = (listOfPromises) => {
  let count = 0;
  const responseList = [];
  return new Promise((resolve, reject) => {
    listOfPromises.forEach((aPromise, index) => {
      aPromise.then(result => {
        responseList[index] = result;
        count += 1;
        if(count === listOfPromises.length) {
          resolve(responseList);
        }
      }).catch(error => {
        reject(error);
      });
    })
  });
}

// myPromiseAll([
//   delay(1000, 1000),
//   delay(3000, 3000),
//   delay(2000, 2000),
// ]).then(result => {
//   console.log(result);  
// })


// function func(a, b) {
//   return memoisation(() => {
//     // actual implementation of the function
//   }, [a, b]);
// }

// const cache = {};
// function memoisation(func, argumentList) {
//   const key = `${func.name}-${[argumentList].join('-')}`;
//   if(cache[key]) {
//     console.log('from cache');
//     return cache[key];
//   }
//   console.log('not from cache');
//   cache[key] = func(...argumentList);
//   return cache[key];
// }

// function sum(a, b) {
//   return memoisation(function(a, b) {
//     return a + b;
//   }, [a, b]);
// }

console.log(sum(10, 20));
console.log(sum(10, 20));

function memoisation(func) {
  return function(argumentList) {
    const key = `${func.name}-${[argumentList].join('-')}`;
    if(memoisation.cache[key]) {

    } else {
      memoisation.cache[key] = func(...argumentList);
      return memoisation.cache[key];
    }
  }
}

function sum(a, b) {
  return a + b;
}

const resultFunction = memoisation(sum);