var main = {
	buy : 0,
	sell : 484500,
	money : 51092,
	coins : 0
};

function sendRequest(){
	var url = "/get-btc";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(resp){
		if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
			takeDecision(JSON.parse(resp.currentTarget.responseText));
		}
	}
    request.open("GET", url);
    request.send();
}

function whatPercentIncrease(numerator, denominator){
	return 100*(numerator - denominator)/denominator
}

function takeDecision(data){
	if(whatPercentIncrease(data.sell, main.buy) > 10){
		// sell everything
		if(main.coins){
			main.money += getMoneyAfterSell(main.coins, data.sell);
			main.coins = 0;
			main.sell = data.sell;
		}
	}
	else if(whatPercentIncrease(data.buy, main.buy) < -10){
		// buy of all money
		alert("buy");
		if(main.money){
			main.coins += getCoinsAfterBuy(main.money, data.buy);
			main.money = 0;
			main.buy = data.buy;
		}
	}
	document.body.innerHTML = getHTML(main) + `<hr style="height: 2px;
    margin-top: 60px;
    border: 0px;
    background: rgba(0,0,0,0.1);"/>` + getHTML(data);
}

function getCoinsAfterBuy(money, price){
	return money*0.982/price;
}

function getMoneyAfterSell(coins, price){
	return coins*price*0.982;
}

function getHTML(data){
	return `<div style="
			    padding: 30px;
			    font-size: 30px;
			    text-transform: capitalize;
			    font-family: sans-serif;
			    border: 1px solid #eaeaea;
			    width: 30%;
			    margin-top: 60px;
			    color: #9e8b77;
			    text-align: left;
			    box-shadow: 1px 1px 30px rgba(0,0,0,0.12);
			    border-radius: 8px;
			    background: whitesmoke;
			">
			    <div>
			    	buy : ${data.buy}
			    </div>
			    <div>
			    	sell : ${data.sell}
			    </div>
			    <div>
			    	money : ${data.money ? data.money : "NA"}
			    </div>
			    <div>
			    	coins : ${data.coins ? data.coins : "NA"}
			    </div>
			</div>`;
}

function getGraphBar(height, maxHeight){
	return `<div class="u-ib" style="height=${100*height/maxHeight}%"></div>`
}

setInterval(function(){
	sendRequest();
}, 10000);

