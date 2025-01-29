import React from 'react'
import { it, expect, describe, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import TextField from '../src/components/ui/TextField'
import { getOrDefaultString } from '../src/utils/getOrDefault'

describe('getOrDefaultString', () => {

    const defaultString = "ND";

    it('should get the string 123', () => {
        const value = "123";
        const result = getOrDefaultString(value);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })

    it('should get the string ND when value is null', () => {
        const value = null;
        const result = getOrDefaultString(value);
        expect(result).toBe(defaultString)
    })
    it('should get the string ND when value is undefined', () => {
        const value = undefined;
        const result = getOrDefaultString(value);
        expect(result).toBe(defaultString)
    })
    it('should get the string ND when value is empty string', () => {
        const value = "";
        const result = getOrDefaultString(value);
        expect(result).toBe(defaultString)
    })
    it('should get the string ND when value is blank string', () => {
        const value = "  ";
        const result = getOrDefaultString(value);
        expect(result).toBe(defaultString)
    })
})
