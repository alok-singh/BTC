function curriedVersion(inputFunction, ...inputArguments) {
    return function() {

    }
}


function multiply(a) {
    return function(b) {
        return function(c) {
            return a*b*c;
        }
    }
}


Array.prototype.myReduce = function(iteratorFunction, initialValue) {
    let returnedValue = initialValue;
    this.forEach(item => {
        returnedValue = iteratorFunction(returnedValue, item);
    });
    return returnedValue;
}


function throttle(inputFunction, timeout) {
    let inProgress = false;
    return function(inputArguments) {
        if(inProgress) {
            return;
        }
        else {
            inProgress = true;
            setTimeout(function() {
                inputFunction(inputArguments);
                inProgress = false;
            }, timeout);
        }
    }
}

function debounce(inputFunction, timeout) {
    let executionTimeout = undefined;
    return function(inputArguments) {
        if(executionTimeout) {
            clearTimeout(executionTimeout);
        }
        executionTimeout = setTimeout(function() {
            inputFunction(inputArguments);
            inProgress = false;
        }, timeout);
    }
}





Function.prototype.myCall = function(thisArgument, ...inputArguments) {
    let tempProp = '';
    let retValue = '';
    if(thisArgument[this.name]) {
        tempProp = thisArgument[this.name];
        thisArgument[this.name] = this;
        retValue = thisArgument[this.name](...inputArguments);
        delete thisArgument[this.name];
        thisArgument[this.name] = tempProp;
        return retValue;
    }
    else {
        thisArgument[this.name] = this;
        retValue = thisArgument[this.name](...inputArguments);
        delete thisArgument[this.name];
        return retValue;
    }
}

Function.prototype.myBind = function(thisArgument) {
    return function(...args) {
        let tempProp = '';
        let retValue = '';
        if(thisArgument[this.name]) {
            tempProp = thisArgument[this.name];
        }
        
        thisArgument[this.name] = this;
        retValue = thisArgument[this.name](...args);
        
        if(tempProp) {
            thisArgument[this.name] = tempProp
        }
        else {
            delete thisArgument[this.name];
        }
        return retValue;
    }
}

function myFunction(a, b, c) {
    console.log(this.name, a, b, c);
}

myFunction.myCall({name: "alok"}, 1, 2, 3);


var myBindedFunction = myFunction.bind({name: "alok"});
myBindedFunction(1, 2, 3);




Object.prototype.myCreate = function(parent) {
    if(typeof parent !== "object") {

    }
    else {
        function Fn() {}
        Fn.prototype = parent;
        let retObj = new Fn();
        return retObj;
    }
}

function myPromise(callback) {
    callback
}

myPromise.prototype.then = function(successCallback, errorCallback){
    if(this.status === 'resolve') {
        successCallback(this.data);
    }
    else if(this.status === 'rejected') {
        errorCallback(this.data);
    }
}

myPromise.prototype.resolve = function() {
    this.status = 'pending';
}

myPromise.prototype.reject = function() {
    this.status = 'rejected';
}


var p = new Promise((resolve, reject) => {
    setTimeout(function(){
        if(100*(Math.random()) < 50) {
            resolve(123);
        }
        else {
            reject(0);
        }
    }, 1000);
});

p.then(function(data) {
    console.log(data);
}, function(error){
    console.log(error);
})