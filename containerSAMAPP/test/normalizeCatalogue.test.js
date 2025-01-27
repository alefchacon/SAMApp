
import { it, expect, describe, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { normalizeCatalogue } from '../src/features/specimens/businessLogic/specimenNormalization';
import SEX from '../src/stores/sex';
import AGE from '../src/stores/age';
describe('normalizeCatalogue', () => {

    const defaultString = "ND";

    //validSex === true
    it('SEX: returns M when input is M', () => {
        const value = "M";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })
    it('SEX: returns H when input is H', () => {
        const value = "H";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })
    it('SEX: returns H when input is h', () => {
        const value = "h";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe(value.toUpperCase())
    })
    it('AGE: returns JUVENIL when input is Juvenil', () => {
        const value = "Juvenil";
        const result = normalizeCatalogue(value, AGE, AGE.ND);
        expect(result).toBeTruthy();
        expect(result).toBe(value.toUpperCase())
    })
    // return
    it('SEX: returns N when input is ASDF', () => {
        const value = "ASDF";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe("N")
    })
    it('SEX: returns N when input is ND', () => {
        const value = "ND";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe("N")
    })
    it('SEX: returns N when input is N/D', () => {
        const value = "N/D";
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe("N")
    })
    it('SEX: returns N when input is non truthy', () => {
        const value = undefined;
        const result = normalizeCatalogue(value, SEX, SEX.ND);
        expect(result).toBeTruthy();
        expect(result).toBe("N")
    })
    it('AGE: returns ND when input is non truthy', () => {
        const value = undefined;
        const result = normalizeCatalogue(value, AGE, AGE.ND);
        expect(result).toBeTruthy();
        expect(result).toBe("ND")
    })
})
