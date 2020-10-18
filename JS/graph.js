var c1 = document.getElementById("buy");
var c2 = document.getElementById("sell");
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var index = 0;
var oldPriceBuy = 0;
var oldPriceSell = 0;
ctx1.beginPath();
ctx2.beginPath();

// ctx1.moveTo(0, 300);
// ctx1.lineTo(1200, 300);
// ctx2.moveTo(0, 300);
// ctx2.lineTo(1200, 300);
// ctx1.strokeStyle = "black";
// ctx1.strokeStyle = "black";
// ctx1.stroke();
// ctx2.stroke();

function drawCurrentPrice(buy, sell, index){
	var buyDiff = getScaledPrice(buy);
	var sellDiff = getScaledPrice(sell, true);

	ctx1.moveTo(index, 300);
	ctx1.lineTo(index, 300 - getScaledPrice(buy));
	ctx1.strokeStyle = "red";
	ctx1.stroke();
	
	ctx2.moveTo(index, 300);
	ctx2.lineTo(index, 300 - getScaledPrice(sell, true));
	ctx2.strokeStyle = "green";
	ctx2.stroke();
}

function getScaledPrice(price, isSell){
	if(isSell){
		if(oldPriceSell){
			var retVal = 100*(price-oldPriceSell);
			oldPriceSell = price; 
			return retVal;
		}
		else{
			oldPriceSell = price; 
			return 0;
		}
	}
	else{
		if(oldPriceBuy){
			var retVal = 100*(price-oldPriceBuy);
			oldPriceBuy = price;
			return retVal; 	
		}
		else{
			oldPriceBuy = price;
			return 0;
		}
	}
}

function sendRequest(){
	var url = "/get-btc";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(resp){
		if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
			var data = JSON.parse(resp.currentTarget.responseText);
			drawCurrentPrice(data.buy, data.sell, index++);
		}
	}
    request.open("GET", url);
    request.send();
}

setInterval(function(){
	sendRequest();
}, 1000)



