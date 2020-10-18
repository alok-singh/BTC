var c = document.getElementById("buy");
var ctx = c.getContext("2d");
var index = 0;
var oldPriceBuy = 0;
var oldPriceSell = 0;
ctx.beginPath();

function drawCurrentPrice(data, key){
	var arr = data.data;
	for (var i=0; i<arr.length; i++) {
		ctx.moveTo(i, 600);
		ctx.lineTo(i, 600 - getScaledPrice(arr[i][key], data.max, data.min));
		ctx.strokeStyle = "#333";
		ctx.stroke();
	}
}

function getScaledPrice(price, max, min){
	var retVal = 500*(price-min)/(max-min);
	return retVal;
}

function sendRequest(){
	var start = document.querySelector("#start").value;
	var end = document.querySelector("#end").value;
	var size = document.querySelector("#size").value;
	var key = document.querySelector("select").value;
	var url = "/get-btc-history?start=" + (new Date(start)).getTime() + "&end=" + (new Date(end)).getTime() + "&size=" + size + "&key=" + key;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(resp){
		if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
			var data = JSON.parse(resp.currentTarget.responseText);
			drawCurrentPrice(data, key);
		}
	}
    request.open("GET", url);
    request.send();
}

// sendRequest();