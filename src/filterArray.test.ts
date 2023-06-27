/**
 * Code the filterArray function
 */

describe("filterArray",()=>{

    test("number",()=>{
        const numbers = [1, 2, 3, 4, 5];
        const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);
        expect(evenNumbers).toEqual([2, 4]);
    });


    test("string",()=>{
        const strings = ["apple", "banana", "cherry", "date"];

        const longStrings = filterArray(strings, (str) => str.length > 5);
        expect(longStrings).toEqual( ["banana", "cherry"]);
    });

})