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

function Checker({ children, fulfilled = false, hasError = true }) {
  return (
    <div className="flex-row gap-1rem">
      <span
        className={`material-symbols-outlined ${
          fulfilled ? "color-uv-green" : "color-lightgray"
        } ${hasError && !fulfilled ? "color-error" : "color-lightgray"}`}
      >
        {fulfilled ? "check_circle" : "circle"}
      </span>
      {children}
    </div>
  );
}

export default function PasswordValidator({
  label = "Contraseña",
  password = "",
  passwordConfirmation,
  onChange,
  name = "name",
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

  /*
  useEffect(() => {
    if (criteriaAreMet && !passwordsMatch) {
      setFieldError(name, "fuck");
    }
  }, []);*/

  return (
    <div className="password-validator flex-col ">
      <TextField
        isFormik
        name={name}
        value={password}
        type="password"
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
          className="length-checker"
          fulfilled={hasMinLength}
          hasError={passwordHasError}
        >
          Al menos 8 caracteres
        </Checker>
        <Checker
          className="case-checker"
          fulfilled={hasUpperCase}
          hasError={passwordHasError}
        >
          Mayúsculas
        </Checker>
        <Checker
          className="case-checker"
          fulfilled={hasLowerCase}
          hasError={passwordHasError}
        >
          Minúsculas
        </Checker>
        <Checker
          className="number-checker"
          fulfilled={hasNumber}
          hasError={passwordHasError}
        >
          Al menos un número
        </Checker>
        <Checker
          className="symbol-checker"
          fulfilled={hasSymbol}
          hasError={passwordHasError}
        >
          {" "}
          Al menos un símbolo
        </Checker>
      </div>
      <br />
      <TextField
        name="passwordConfirmation"
        hasError={passwordConfirmationHasError}
        type="password"
        label={"Confirme la contraseña"}
        onChange={onChange}
        errorMessage={passwordConfirmationErrorMessage}
      />
      <br />
      <Checker
        className="match-checker"
        fulfilled={passwordsMatch}
        hasError={passwordConfirmationHasError}
      >
        Las contraseñas coinciden
      </Checker>
    </div>
  );
}
