import React from 'react'
import { it, expect, describe, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import TextField from '../src/components/ui/TextField'
import { getOrDefaultDate } from '../src/utils/getOrDefault'
import moment from "moment"

describe('getOrDefaultDate', () => {

    const defaultDateNumbers = {
        day: 11,
        month: 12,
        year: 1986
    };
    const defaultDateStrings = {
        day: "14",
        month: "3",
        year: "1986"
    };

    const today = moment().format("YYYY-MM-DD");

    it(`should get the string 1986-12-11 when keys are numbers`, () => {
        const value = "1986-12-11";
        const result = getOrDefaultDate(defaultDateNumbers);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })

    it(`should get the string 1986-03-14 when keys are number strings`, () => {
        const value = "1986-03-14";
        const result = getOrDefaultDate(defaultDateStrings);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })

    it(`should get today when missing day key`, () => {
        const copy = {...defaultDateNumbers}
        delete copy.day
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    it(`should get today when missing month key`, () => {
        const copy = {...defaultDateNumbers}
        delete copy.month
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    it(`should get today when missing year key`, () => {
        const copy = {...defaultDateNumbers}
        delete copy.year
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    it(`should get today when year key isn't a number`, () => {
        const copy = {...defaultDateNumbers}
        copy.year = "asdf"
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    it(`should get today when month key isn't a number`, () => {
        const copy = {...defaultDateNumbers}
        copy.month = "asdf"
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    it(`should get today when day key isn't a number`, () => {
        const copy = {...defaultDateNumbers}
        copy.day = "asdf"
        const result = getOrDefaultDate(copy);
        expect(result).toBeTruthy();
        expect(result).toBe(today)
    })
    

})
