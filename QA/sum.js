export default class Number{
	sum(a, b){
		a = (typeof a === "boolean" ? (a === true ? 1 : 0) : a);
		b = (typeof b === "boolean" ? (b === true ? 1 : 0) : b);
	 	a = isNaN(parseInt(a)) ? 0 : parseInt(a);
		b = isNaN(parseInt(b)) ? 0 : parseInt(b);
		return a + b;
	}
} 