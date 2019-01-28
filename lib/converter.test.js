const java = require('java');
const Converter = require('./converter');

describe('Converter', () => {
    describe('toString', () => {
        it('should convert Java String Object to JS String', () => {
            const expectedString = 'test string';
            const javaString = java.newInstanceSync('java.lang.String', expectedString);
            const convertedString = Converter.toString(javaString);
            expect(convertedString).toEqual(expectedString);
        });

        it('should convert Java Number Object to JS String', () => {
            const expectedNumber = '5';
            const javaNumber = java.newInstanceSync('java.lang.Integer', expectedNumber);
            const convertedNumber = Converter.toString(javaNumber);
            expect(convertedNumber).toEqual(expectedNumber);
        });
    });

    describe('toArray', () => {
        it('should convert Java List to JS Array', () => {
            const expectedArray = ['a', 'bb', 'ccc'];
            const javaArray = java.newInstanceSync('java.util.ArrayList');
            for (const val of expectedArray)
                javaArray.addSync(val);
            const convertedArray = Converter.toArray(javaArray);
            expect(convertedArray).toEqual(expectedArray);
        });
    });

    describe('toMap', () => {
        it('should convert Java Map to JS Object', () => {
            const expectedMap = { key1: 'aaa', key2: 'bbb', key3: 'ccc' };
            const javaHashMap = java.newInstanceSync('java.util.HashMap');
            for (const key in expectedMap)
                javaHashMap.putSync(key, expectedMap[key]);
            const convertedMap = Converter.toMap(javaHashMap);
            expect(convertedMap).toEqual(expectedMap);
        });
    });
});