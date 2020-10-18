var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var CANVAS_HEIGHT = window.innerHeight - 100;
var CANVAS_WIDTH = window.innerWidth - 50;
var COMMON_RETARDATION = 0;
var CANVAS_COLOR = "#333";

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

function getNumber(lowerLimit, upperLimit){
	var random = Math.random();
	return Math.round(lowerLimit + (upperLimit - lowerLimit)*random);
}

function getBallsColor(){
	return `rgba(${getNumber(0, 255)}, ${getNumber(0, 255)}, ${getNumber(0, 255)}, ${getNumber(0, 1)})`
}

function fillBalls(length){
	var arr = [];
	while(length){
		arr.push(
			new BallClass(
				getNumber(20, CANVAS_WIDTH - 25), 
				getNumber(20, CANVAS_HEIGHT -25),
				getNumber(20, 50),
				getNumber(5, 10),
				getNumber(5, 10), 
				getBallsColor(),
				length
			));
		length--;
	}
	return arr;
}

function init(){
	canvas.balls = fillBalls(2);
	(function animloop(){
		requestAnimFrame(animloop);
		context.beginPath();
		refillCanvas();
		for(var ball of canvas.balls){
			ball.paint();
		}
	})();
}

function BallClass(x, y, r, vx, vy, clr, id){
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = vx;
	this.vy = vy;
	this.clr = clr;
	this.id = id;
}

BallClass.prototype.getValueFromKey = function(key) {
	return this[key];
};

BallClass.prototype.move = function() {
	updateVelocity(this, CANVAS_WIDTH, CANVAS_HEIGHT);
	this.x += this.vx;
	this.y += this.vy;
};


BallClass.prototype.paint = function(){
	this.move();
	context.fillStyle = this.getValueFromKey('clr');
	context.arc(this.getValueFromKey("x"), this.getValueFromKey("y"), this.getValueFromKey("r"), 0, 2*Math.PI);
	context.closePath();
	context.fill();
}

function updateVelocity(iball, maxPositionX, maxPositionY){
	var tx = iball.x + iball.vx - Math.sign(iball.vx)*COMMON_RETARDATION;
	var ty = iball.y + iball.vy - Math.sign(iball.vy)*COMMON_RETARDATION;
	var flag = true;
	var distance = 0;
	var bva = 0;
	var iva = 0;
	var ca = 0;

	if((iball.vx > 0 && (tx + iball.r > maxPositionX)) || (iball.vx < 0 && tx - iball.r < 0)){
		iball.vx = -iball.vx;
		flag = false;
	}

	if((iball.vy > 0 && (ty + iball.r > maxPositionY)) || (iball.vy < 0 && ty - iball.r < 0)){
		iball.vy = -iball.vy;
		flag = false;
	}

	if(flag){
		for(var ball of canvas.balls){
			if(ball.id != iball.id){
				distance = Math.sqrt(Math.pow(iball.x - ball.x, 2) + Math.pow(iball.y - ball.y, 2));
				if(distance <= ball.r + iball.r){
					iva = Math.atan(iball.vy/iball.vx);
					ivelocity = Math.sqrt(Math.pow(iball.vx, 2) + Math.pow(iball.vy, 2));
					bvelocity = Math.sqrt(Math.pow(ball.vx, 2) + Math.pow(ball.vy, 2));
					bva = Math.atan(ball.vy/ball.vx);
					ca = Math.atan((iball.y - ball.y)/(iball.x - ball.x));

					inormal = -Math.cos(iva - ca)*ivelocity;
					itangent = Math.sin(iva - ca)*ivelocity;
					iball.vx = itangent*Math.sin(ca) - inormal*Math.cos(ca);
					iball.vy = itangent*Math.cos(ca) - inormal*Math.sin(ca);

					bnormal = -Math.cos(bva - ca)*bvelocity;
					btangent = Math.sin(bva - ca)*bvelocity;
					ball.vx = btangent*Math.sin(ca) - bnormal*Math.cos(ca);
					ball.vy = btangent*Math.cos(ca) - bnormal*Math.sin(ca);
					if(iball.vx > 1000 || iball.vy > 1000  || ball.vx > 1000  || ball.vy > 1000 ){
						console.log(iball.vx, iball.vy, ball.vx, ball.vy);
					}
				}
			}
		}  
	}

	iball.vx = iball.vx - Math.sign(iball.vx)*COMMON_RETARDATION;
	iball.vy = iball.vy - Math.sign(iball.vy)*COMMON_RETARDATION;
}

function refillCanvas(){
	context.fillStyle = CANVAS_COLOR;
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

init();