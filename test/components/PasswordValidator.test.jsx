import React from 'react'
import { it, expect, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Checker from '../../src/features/auth/components/Checker'
import '@testing-library/jest-dom/vitest'
import PasswordValidator from '../../src/features/auth/components/PasswordValidator'


describe('Checker', () => {
    it('should render an empty circle', () => {
        render(<Checker >Test</Checker>);
        const icon = screen.getByRole("img");
        expect(icon).toHaveClass("color-lightgray")
        expect(icon).toHaveTextContent(/circle/i)
        screen.debug();
    })
    it('should render an checked circle', () => {
        render(<Checker fulfilled>Test</Checker>);
        const icon = screen.getByRole("img");
        expect(icon).toHaveClass("color-uv-green")
        expect(icon).toHaveTextContent(/check_circle/i)
        screen.debug();
    })
    it('should render a red circle', () => {
        render(<Checker hasError>Test</Checker>);
        const icon = screen.getByRole("img");
        expect(icon).toHaveClass("color-error")
        expect(icon).toHaveTextContent(/circle/i)
        screen.debug();
    })
    it('should render a idk circle', () => {
        render(<Checker hasError fulfilled>Test</Checker>);
        const icon = screen.getByRole("img");
        expect(icon).toHaveClass("color-uv-green")
        expect(icon).toHaveTextContent(/circle/i)
        screen.debug();
    })
})

describe('PasswordChecker', () => {
    it('should have 1 check with `asdf`', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdf"}
                passwordConfirmation={"asdf"}
                //passwordHasError={errors.password && touched.password}
                /*
                passwordConfirmationHasError={
                errors.passwordConfirmation && touched.passwordConfirmation
                }
                passwordConfirmationErrorMessage={errors.passwordConfirmation}
                passwordErrorMessage={errors.password}
                */
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-lightgray")
        expect(lengthChecker).toHaveClass("color-lightgray")
        expect(numberChecker).toHaveClass("color-lightgray")
        expect(symbolChecker).toHaveClass("color-lightgray")
    })
    it('should have 2 checks with `asdfA`', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA"}
                passwordConfirmation={"asdf"}
                //passwordHasError={errors.password && touched.password}
                /*
                passwordConfirmationHasError={
                errors.passwordConfirmation && touched.passwordConfirmation
                }
                passwordConfirmationErrorMessage={errors.passwordConfirmation}
                passwordErrorMessage={errors.password}
                */
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-lightgray")
        expect(numberChecker).toHaveClass("color-lightgray")
        expect(symbolChecker).toHaveClass("color-lightgray")
    })
    it('should have 3 checks with `asdfA1`', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA1"}
                passwordConfirmation={"asdf"}
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-lightgray")
        expect(numberChecker).toHaveClass("color-uv-green")
        expect(symbolChecker).toHaveClass("color-lightgray")
    })
    it('should have 4 checks with `asdfA1-`', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA1-"}
                passwordConfirmation={"asdf"}
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-lightgray")
        expect(numberChecker).toHaveClass("color-uv-green")
        expect(symbolChecker).toHaveClass("color-uv-green")
    })
    it('should have 5 checks with `asdfA1-+`', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA1-+"}
                passwordConfirmation={"asdf"}
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-uv-green")
        expect(numberChecker).toHaveClass("color-uv-green")
        expect(symbolChecker).toHaveClass("color-uv-green")
    })
    it('should have 6 checks with matching passwords', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA1-+"}
                passwordConfirmation={"asdfA1-+"}
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        const matchChecker = screen.getByTestId("match-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-uv-green")
        expect(numberChecker).toHaveClass("color-uv-green")
        expect(symbolChecker).toHaveClass("color-uv-green")
        expect(matchChecker).toHaveClass("color-uv-green")
    })
    it('should have 1 checks with `asdf` and the rest is error after submitting without getting all checks', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdf"}
                passwordConfirmation={""}
                passwordHasError
                passwordConfirmationHasError
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        const matchChecker = screen.getByTestId("match-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-error")
        expect(lengthChecker).toHaveClass("color-error")
        expect(numberChecker).toHaveClass("color-error")
        expect(symbolChecker).toHaveClass("color-error")
        expect(matchChecker).toHaveClass("color-error")
    })
    it('should have all checks but user forgot to re-enter password so that one is a big fat error', () => {
        render(
            <PasswordValidator
                name="password"
                password={"asdfA1-+"}
                passwordConfirmation={""}
                passwordHasError
                passwordConfirmationHasError
            ></PasswordValidator>
        )
        const lowercaseChecker = screen.getByTestId("lowercase-checker");
        const uppercaseChecker = screen.getByTestId("uppercase-checker");
        const lengthChecker = screen.getByTestId("length-checker");
        const numberChecker = screen.getByTestId("number-checker");
        const symbolChecker = screen.getByTestId("symbol-checker");
        const matchChecker = screen.getByTestId("match-checker");
        expect(lowercaseChecker).toHaveClass("color-uv-green")
        expect(uppercaseChecker).toHaveClass("color-uv-green")
        expect(lengthChecker).toHaveClass("color-uv-green")
        expect(numberChecker).toHaveClass("color-uv-green")
        expect(symbolChecker).toHaveClass("color-uv-green")
        expect(matchChecker).toHaveClass("color-error")
    })
})

afterEach(() => {
    // Removes any rendered components
    cleanup()
  })