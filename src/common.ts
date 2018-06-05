export const add = (a:number, b:number) => a + b;

export const assertDeepEqual = (actual:any, expected:any) => expect(actual).toEqual(expected);

export const isEven = (num:number) => num % 2 === 0;

export const notEmpty = (list:[any] | string) => list.length > 0;

export const square = (num:number) => num * num;
