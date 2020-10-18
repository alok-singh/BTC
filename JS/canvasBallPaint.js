var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var random = true;
var count = 0;
canvas.height = windowHeight;
canvas.width = windowWidth;
var radiusLimit = 25;

function initStars() {
  random = false;
  radiusLimit = 2;
  canvas.style.background = "#000";
  init();
}

function initPaintBall() {
  random = true;
  radiusLimit = 25;
  canvas.style.background = "#fff";
  init();
}

function paint(x, y, r, colour) {
  // context.clearRect(0, 0, windowWidth, windowHeight);
  context.beginPath();
  context.fillStyle = colour;
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

function getNumber(lowerLimit, upperLimit) {
  var random = Math.random();
  return Math.round(lowerLimit + (upperLimit - lowerLimit) * random);
}

function getBallsColor() {
  if (random) {
    return `rgba(${getNumber(0, 255)}, ${getNumber(0, 255)}, ${getNumber(
      0,
      255
    )}, ${getNumber(0, 1)})`;
  } else {
    return "#fff";
  }
}

function init() {
  context.clearRect(0, 0, windowWidth, windowHeight);
  count = 0;
  var interval = setInterval(function() {
    var x = getNumber(0, windowWidth);
    var y = getNumber(0, windowHeight);
    var r = getNumber(1, radiusLimit);
    var colour = getBallsColor();
    paint(x, y, r, colour);
    count++;
    if (count > 1000) {
      clearInterval(interval);
    }
    // var colour = getNumber(0, 16777215).toString(16).padStart(5, "0");
  }, 20);
}

// init();
