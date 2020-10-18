var c = document.getElementById("wheel");
var ctx = c.getContext("2d");
var positionx = 0;
var index = 0;


window.onwheel = function () {
	let {deltaX, deltaY, x, y} = event;
	ctx.strokeStyle = "rgb(255, 0, 0)";
	drawGraph(deltaX, index);
	// ctx.strokeStyle = "rgb(0, 0, 255)";
	// drawGraph(deltaY, index);
	index++;
	index = index%1200;
};

ctx.beginPath();
ctx.moveTo(0, 400);
ctx.lineTo(1200, 400);
ctx.lineWidth = 1;
ctx.stroke();

function drawGraph(value, index){
	ctx.moveTo(index, 400);
	ctx.lineTo(index, 400 - value);
	ctx.stroke();
}