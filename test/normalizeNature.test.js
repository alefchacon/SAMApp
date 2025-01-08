
import { it, expect, describe, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { normalizeNature } from '../src/features/specimens/businessLogic/specimenNormalization';

describe('normalizeNature', () => {

    const defaultString = "ND";

    //validNature === true
    it('returns E/A when input is E/A', () => {
        const value = "E/A";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })
    it('returns PC when input is PC', () => {
        const value = "PC";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })

    //nature === EA
    it('returns E/A when input is EA', () => {
        const value = "EA";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe("E/A")
    })
    
    //validNormalizedNature === true
    it('returns PC when input is P/C', () => {
        const value = "P/C";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe("PC")
    })
    it('returns SP when input is S/P', () => {
        const value = "S/P";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe("SP")
    })

    //!validNormalizedNature
    it('returns ND when input is ASDF', () => {
        const value = "ASDF";
        const result = normalizeNature(value);
        expect(result).toBeTruthy();
        expect(result).toBe("ND")
    })
})
