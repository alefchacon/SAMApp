import { lowerCase } from "lodash";
import TextField from "../../../components/ui/TextField";
import {
  minLengthRegex,
  upperCaseRegex,
  lowerCaseRegex,
  numberRegex,
  symbolRegex,
} from "../../../validation/regexesPassword";
import { useState, useEffect } from "react";
import Checker from "./Checker";


export default function PasswordValidator({
  required,
  label = "Contraseña",
  password = "",
  passwordConfirmation,
  onChange,
  onBlur,
  name = "name",
  passwordConfirmationName = "passwordConfirmation",
  passwordHasError = false,
  passwordConfirmationHasError = false,
  setFieldError,
  passwordErrorMessage,
  passwordConfirmationErrorMessage,
}) {
  //CRITERIA:
  const hasMinLength = minLengthRegex.test(password);
  const hasUpperCase = upperCaseRegex.test(password);
  /*
    /[a-z]/.test(password) = true, because JS casts null into "null" (a string)
    so we make sure password is NOT null, and *then* test it against the regex.
    */
  const hasLowerCase = password && lowerCaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);

  const criteriaAreMet =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;

  const passwordsMatch =
    password && passwordConfirmation && password === passwordConfirmation;

  return (
    <div className="password-validator flex-col ">
      <TextField
        required={required}
        isFormik
        name={name}
        value={password}
        type="password"
        onBlur={onBlur}
        label={label}
        helperText={
          "Ingrese una contraseña que cumpla los siguientes criterios"
        }
        onChange={onChange}
        hasError={passwordHasError}
        errorMessage={passwordErrorMessage}
      />
      <br />
      <div>
        <Checker
          id="length-checker"
          fulfilled={hasMinLength}
          hasError={passwordHasError}
        >
          Al menos 8 caracteres
        </Checker>
        <Checker
          id="uppercase-checker"
          fulfilled={hasUpperCase}
          hasError={passwordHasError}
        >
          Mayúsculas
        </Checker>
        <Checker
          id="lowercase-checker"
          fulfilled={hasLowerCase}
          hasError={passwordHasError}
        >
          Minúsculas
        </Checker>
        <Checker
          id="number-checker"
          fulfilled={hasNumber}
          hasError={passwordHasError}
        >
          Al menos un número
        </Checker>
        <Checker
          id="symbol-checker"
          fulfilled={hasSymbol}
          hasError={passwordHasError}
        >
          {" "}
          Al menos un símbolo
        </Checker>
      </div>
      <br />
      <TextField
        required={required}
        name={passwordConfirmationName}
        hasError={passwordConfirmationHasError}
        type="password"
        label={"Confirme la contraseña"}
        onChange={onChange}
        errorMessage={passwordConfirmationErrorMessage}
      />
      <br />
      <Checker
        id="match-checker"
        fulfilled={passwordsMatch}
        hasError={passwordConfirmationHasError}
      >
        Las contraseñas coinciden
      </Checker>
    </div>
  );
}
