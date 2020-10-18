import React from 'react';
import ReactDOM from 'react-dom';
import ImageViewComponent from './imageViewComponent';

let data = JSON.parse(document.getElementById('data').innerHTML);
ReactDOM.render(<ImageViewComponent data={data} />, document.getElementById('root'));




// const rootElement = document.getElementById("root");
// const body = document.body;
// let timeStamp = 0;
// let fullElement = "";

// const sendRequest = () => {
// 	return new Promise((resolve, reject) => {
// 		let url = "/img-list";
// 	    let request = new XMLHttpRequest();
// 	    request.onreadystatechange = (resp) => {
// 			if(resp.currentTarget.readyState == 4 && resp.currentTarget.status == 200 && resp.currentTarget.statusText == "OK"){
// 				let data = JSON.parse(resp.currentTarget.responseText);
// 				resolve(data);
// 			}
// 		}
// 	    request.open("GET", url);
// 	    request.send();
// 	})
// }

// const getImageElement = (imageData) => {
// 	let img = document.createElement("div");
// 	let overlay = document.createElement("div");
// 	let url = encodeURI(`/IMG/${imageData.imageName}`);
	
// 	img.style = `
// 		background-image: url("${url}")
// 	`;
// 	overlay.classList = [`img-overlay`];
// 	overlay.innerHTML = imageData.placeName;
// 	img.classList = [`img-div`];
// 	img.append(overlay);
// 	return img;
// }

// const init = () => {
// 	sendRequest().then(data => {
// 		rootElement.append(...data.map(val => {
// 			return getImageElement(val);
// 		}));
// 		eventHandler();
// 	})
// }

// const getNthSibiling = (element, count) => {
// 	let retElement = element;
// 	if(count > 0){
// 		while(retElement.nextElementSibling && count){
// 			retElement = retElement.nextElementSibling;
// 			count--;
// 		}
// 	}
// 	else{
// 		while(retElement.previousElementSibling && count){
// 			retElement = retElement.previousElementSibling;
// 			count++;
// 		}
// 	}
// 	return retElement;
// }

// const eventHandler = () => {
	
// 	let timeout = '';
// 	let isOnWheelRunning = '';
// 	let executed = {};
// 	let sum = 0;

// 	rootElement.addEventListener("click", (event) => {
// 		let {target} = event;
// 		let imgElement = target.closest('.img-div');
// 		let fullElement = target.closest('.full');
// 		if(fullElement){
// 			fullElement.className = "img-div";
// 			document.body.style.overflow = 'auto';
// 		}
// 		else if(imgElement){
// 			imgElement.className = "img-div full";
// 			document.body.style.overflow = 'hidden';
// 		}
// 	});

// 	document.body.addEventListener("keydown", (event) => {
// 		let element = document.querySelector(".full");
// 		let nextElement = element ? element.nextElementSibling : null;
// 		let previousElement = element ? element.previousElementSibling : null;
		
// 		if(element && nextElement && event.keyCode == 39){
// 			element.className = "img-div";
// 			nextElement.className = "img-div full";
// 		}
// 		else if(element && previousElement && event.keyCode == 37){
// 			element.className = "img-div";
// 			previousElement.className = "img-div full";
// 		}
// 	});

// 	document.addEventListener('wheel', (event) => {
// 		/*event.preventDefault();
// 		if (event.ctrlKey) {
// 		    // Your zoom/scale factor
// 		    scale -= e.deltaY * 0.01;
// 		} 
// 		else {
// 		    // Your trackpad X and Y positions
// 		    posX -= e.deltaX * 2;
// 		    posY -= e.deltaY * 2;
// 		}*/
// 	})

// }

// init();




