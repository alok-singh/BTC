var velocityElementX = document.getElementById("velocityX");
var velocityElementY = document.getElementById("velocityY");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var windowHeight = window.innerHeight - 100;
var windowWidth = window.innerWidth - 50;
var positionX = 0;
var positionY = 300;
var velocityX = 0;
var velocityY = 0;
var radius = 10;
var accelaration = 1;
var initVelocity = 30;
var colour = "rgba(255,255,255,1)";

canvas.height = windowHeight;
canvas.width = windowWidth;

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function paint(x, y, r, vx, vy, colour) {
  context.beginPath();
  context.fillStyle = "rgba(0,0,0,0.1)";
  context.fillRect(0, 0, windowWidth, windowHeight);
  context.fillStyle = colour;
  context.arc(x + vx, y + vy, r, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}

function getVelocity(position, velocity, maxPosition) {
  var test = position + velocity + Math.sign(velocity) * accelaration;
  if (velocity > 0 && test + radius > maxPosition) {
    velocity = -velocity;
  } else if (velocity < 0 && test - radius < 0) {
    velocity = -velocity;
  }
  return velocity - (Math.sign(velocity) * accelaration) / 8;
}

function init() {
  (function animloop() {
    requestAnimFrame(animloop);
    paint(positionX, positionY, radius, velocityX, velocityY, colour);
    velocityX = getVelocity(positionX, velocityX, windowWidth);
    velocityY = getVelocity(positionY, velocityY, windowHeight);
    velocityElementX.innerHTML = velocityX;
    velocityElementY.innerHTML = velocityY;
    positionX = positionX + velocityX;
    positionY = positionY + velocityY;
  })();
}

function isTotalVelocityZero(vx, vy) {
  return Math.abs(vx) + Math.abs(vy) == 0;
}

document.addEventListener("keydown", keyDownHandler);

function keyDownHandler() {
  if (event.keyCode == 38 && velocityY == 0) {
    // keyup
    velocityY = -(velocityY || initVelocity);
  } else if (event.keyCode == 40 && velocityY == 0) {
    // keydown
    velocityY = velocityY || initVelocity;
  } else if (event.keyCode == 39 && velocityX == 0) {
    // right
    velocityX = velocityX || initVelocity;
  } else if (event.keyCode == 37 && velocityX == 0) {
    //left
    velocityX = -(velocityX || initVelocity);
  }
}
init();
