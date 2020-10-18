const deepCopyPureObject = (object, retObject) => {
  return Object.keys(object).reduce((acc, key) => {
    const value = object[key];
    if(Array.isArray(value)) {
      acc[key] = value.map(item => {
        return deepCopyPureObject(item, {});
      });
    }
    else if(typeof value === 'object') {
      acc[key] = deepCopyPureObject(value, {});
    }
    else {
      acc[key] = value;
    }

    return acc;
  }, retObject);
}

const test = {
  a: {
    a: {
      b: {
        c: {
          d: 12
        }
      }
    },
    b: {
      c: [
        {
          a: 123
        },
        {
          a: 123
        },
        {
          a: 123
        }
      ]
    }
  },
  c: 1
}

console.time('test');
for(let i = 0; i < 1000000; i++) {
  // const result = deepCopyPureObject(test, {});
  const result = JSON.parse(JSON.stringify(test));
}

console.timeEnd('test');

// console.log(JSON.stringify(result, null, "    "));