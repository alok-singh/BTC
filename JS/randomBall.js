var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
canvas.height = windowHeight;
canvas.width = windowWidth;

window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

function paint(x, y, r, vx, vy, colour){
	context.beginPath();
	context.fillStyle = "rgba(0,0,0,0.2)";
	context.fillRect(0, 0, windowWidth, windowHeight);
	context.fillStyle = colour;
	context.arc(x + vx, y + vy, r, 0, 2*Math.PI);
	context.closePath();
	context.fill();
}

function getVelocity(position, velocity, maxPosition){
	if(velocity > 0 && (position + velocity + 15 > maxPosition)){
		velocity = 0 - Math.abs(velocity);
	}	
	else if(velocity < 0 && position + velocity - 15 < 0){
		velocity = Math.abs(velocity);
	}
	return velocity;
}

function init(){
	var positionX = 0;
	var positionY = 300;
	var velocityX = 5;
	var velocityY = 1;
	var radius = 30;
	var colour = "rgba(255,255,255,1)";

	(function animloop(){
		requestAnimFrame(animloop);
		paint(positionX, positionY, radius, velocityX, velocityY, colour);
		velocityX = getVelocity(positionX, velocityX, windowWidth);
		velocityY = getVelocity(positionY, velocityY, windowHeight);
		positionX = positionX + velocityX;
		positionY = positionY + velocityY;
	})();
}

init();
