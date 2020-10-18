import NumberClass from './sum';
const numberClassInstance = new NumberClass();

test('summing', () => {
	expect(numberClassInstance.sum(1, 2)).toBe(3);
	expect(numberClassInstance.sum("1", "2")).toBe(3);
	expect(numberClassInstance.sum(1, "2")).toBe(3);
	expect(numberClassInstance.sum(-1, "-2")).toBe(-3);
	expect(numberClassInstance.sum("1", undefined)).toBe(1);
	expect(numberClassInstance.sum("1", null)).toBe(1);
	expect(numberClassInstance.sum("1", true)).toBe(2);
	expect(numberClassInstance.sum("1", NaN)).toBe(1);
	expect(numberClassInstance.sum(NaN, NaN)).toBe(0);
	expect(numberClassInstance.sum(true, false)).toBe(1);
});




