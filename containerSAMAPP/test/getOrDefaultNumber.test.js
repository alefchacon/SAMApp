import React from 'react'
import { it, expect, describe, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import TextField from '../src/components/ui/TextField'
import { getOrDefaultNumber } from '../src/utils/getOrDefault'

describe('getOrDefaultNumber', () => {
    it('should get the number 123', () => {
        const value = 123;
        const result = getOrDefaultNumber(value);
        expect(result).toBeTruthy();
        expect(result).toBe(value)
    })
    it('should get the number 0.0 when value is null', () => {
        const value = null;
        const result = getOrDefaultNumber(value);
        expect(result).toBe(0)
    })
    it('should get the number 0.0 when value is undefined', () => {
        const value = undefined;
        const result = getOrDefaultNumber(value);
        expect(result).toBe(0)
    })
    it('should get the number 123 when value is string', () => {
        const value = "123";
        const result = getOrDefaultNumber(value);
        expect(result).toBeTruthy();
        expect(result).toBe(123)
    })
    it('should get the number [  123   ] when value is string', () => {
        const value = "  123   ";
        const result = getOrDefaultNumber(value);
        expect(result).toBeTruthy();
        expect(result).toBe(123)
    })
    it('should get the number [  1 2  3   ] when value is string', () => {
        const value = "  123   ";
        const result = getOrDefaultNumber(value);
        expect(result).toBeTruthy();
        expect(result).toBe(123)
    })
    it('should get the number 0.0 when value is empty string', () => {
        const value = "";
        const result = getOrDefaultNumber(value);
        expect(result).toBe(0)
    })
    it('should get the number 0.0 when value is a blank space', () => {
        const value = " ";
        const result = getOrDefaultNumber(value);
        expect(result).toBe(0)
    })
    it('should get the number 0.0 when value is non-numeric string', () => {
        const value = "asdf";
        const result = getOrDefaultNumber(value);
        expect(result).toBe(0)
    })
})
