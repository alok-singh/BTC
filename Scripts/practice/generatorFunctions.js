function* generator() {
  while(true) {
    yield Math.random();
  }
}

const a = generator();

setInterval(() => {
  console.log(a.next().value);
}, 1000);