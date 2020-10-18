var c = document.getElementById("sinx");
var cm = document.getElementById("motion");
var cv = document.getElementById("velocity");
var ctx = c.getContext("2d");
var ctxm = cm.getContext("2d");
var ctxv = cv.getContext("2d");
var positionx = 0;
var index = 0;

var plotFunction = function(x) {
  // return fact(x/100)/fact()
  // return 10*Math.sin(x)*Math.pow(Math.E, x/100)
  //   return bellFunction(x);
  return 10 * sumOfDigits(x);
};

var fact = function(x) {
  if (x <= 0) {
    return 1;
  }
  return x * fact(x - 1);
};

var bellFunction = function(x) {
  var miu = 0;
  var sigma = 150;
  var firstTerm = 1 / Math.pow(2 * Math.PI, 0.5);
  var power = -Math.pow(miu - x, 2) / (2 * Math.pow(sigma, 2));
  var secondTerm = Math.pow(Math.E, power);
  return firstTerm * secondTerm * 800;
};

ctx.beginPath();
ctx.moveTo(0, 500);
ctx.lineTo(1200, 500);
ctx.strokeStyle = "rgba(10,0,120,0.02)";
ctxm.fillStyle = "rgba(10,0,0,120.02)";
ctx.lineWidth = 1;
ctx.stroke();

function sumOfDigits(number) {
  return String(number)
    .split("")
    .reduce((sum, val) => {
      sum += parseInt(val);
      return sum;
    }, 0);
}

function drawGraph(value, index) {
  index = index % 1200;
  ctx.moveTo(index, 500);
  ctx.lineTo(index, 500 - value);
  ctx.stroke();
}

function makeObject(positionx, positiony) {
  positionx = positionx % 1200;
  positiony = positiony % 600;
  // ctxm.clearRect(0, 0, 1200, 600);
  ctxm.beginPath();
  ctxm.arc(positionx, 300 - positiony, 25, 0, 2 * Math.PI);
  ctxm.closePath();
  ctxm.fill();
}

// function velocityPloter(velocity, position){
// 	position = (position + velocity)%1200;
// 	ctxv.clearRect(0, 0, 1200, 600);
// 	ctxv.beginPath();
// 	ctxv.arc(position, 300, 25, 0, 2*Math.PI);
// 	ctxv.closePath();
// 	ctxv.fill();
// 	positionx = position;
// }

function getValue(fun) {
  drawGraph(fun(index), index);
  makeObject(index, fun(index));
  // velocityPloter(fun(index), positionx);
}

setInterval(function() {
  getValue(plotFunction);
  index++;
}, 10);
