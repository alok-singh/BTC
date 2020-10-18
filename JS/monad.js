const MONAD = () => {
	
	let prototype = Object.create(null);

	let unit = (value) => {
		var monad = Object.create(prototype);
		monad.bind = (func, args) => {
			return func(value, ...args);
		};
		return monad;
	}
	
	unit.lift = (name, func) => {
		prototype[name] = function(...args){
			return unit(this.bind(func, args));
		};
		return unit;
	}

	return unit;
};


let instance = MONAD().lift('alert', alert);

let monad = instance("hello world");

monad.alert();

/* 
	unit creates a monad that represents some 
	value and bind function allows another function 
	to have access to that value
*/


