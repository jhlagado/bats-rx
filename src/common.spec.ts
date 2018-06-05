import { add, isEven, notEmpty, square } from './common';

test('should fail with an odd number', () => {
    const actual = isEven(1);
    const expected = false;
    expect(expected).toEqual(actual);
})

test('should pass with an even number', () => {
    const actual = isEven(2);
    const expected = true;
    expect(expected).toEqual(actual);
});

test('should calculate the square of a number', () => {
    const actual = square(3);
    const expected = 9;
    expect(expected).toEqual(actual);
});

test('should add two numbers', () => {
    const actual = add(2,3);
    const expected = 5;
    expect(expected).toEqual(actual);
});

test('should check if an array or string has zero length', () => {
    const actual = notEmpty('');
    const expected = false;
    expect(expected).toEqual(actual);
});
