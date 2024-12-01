import React from 'react'
import { it, expect, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Checker from '../../src/features/auth/components/Checker'
import '@testing-library/jest-dom/vitest'
import PasswordValidator from '../../src/features/auth/components/PasswordValidator'
import TextField from '../../src/components/ui/TextField'
import userEvent from '@testing-library/user-event'

describe('TextField', () => {
    it('should render an error message', () => {
        render(
            <TextField
                //isFormik
                name="orcid"
                value={"Test value"}
                
                hasError
                errorMessage={"Test error message"}
                label={"ORCID"}
            ></TextField>
        );
        const errorMessage = screen.getByRole("alert");
        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveTextContent(/Test error message/i)

        screen.debug();
    })
    it('should render with red border', async () => {
        render(
            <TextField
                //isFormik
                name="orcid"
                label={"Test label"}
                hasError
                errorMessage={"Test error message"}
            ></TextField>
        );
        const input = screen.getByLabelText("Test label");
        expect(input).toBeInTheDocument()
        expect(input).toHaveClass(/hasError/i)

        const user = userEvent.setup();
        await user.type(input, "Test value");
        expect(input).toHaveValue("Test value");

        screen.debug();
    })
    

})

afterEach(() => {
    cleanup()
  })