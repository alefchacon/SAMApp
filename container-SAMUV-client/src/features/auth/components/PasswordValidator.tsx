import React from "react";
import TextField from "../../../components/ui/TextField";
import FormInput from "@/components/ui/FormInput";
import {
  minLengthRegex,
  upperCaseRegex,
  lowerCaseRegex,
  numberRegex,
  symbolRegex,
} from "@/validation/regexesPassword";
import Checker from "./Checker";

interface IPasswordValidatorProps {
  required?: boolean;
  label?: string;
  password?: string;
  passwordConfirmation?: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  onBlur?: (event: React.FocusEvent<any, Element>) => void;
  name: string;
  passwordConfirmationName: string;
  passwordHasError: boolean;
  passwordConfirmationHasError: boolean;
  passwordErrorMessage: string;
  passwordConfirmationErrorMessage: string;
}
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
  passwordErrorMessage,
  passwordConfirmationErrorMessage,
}: IPasswordValidatorProps) {
  //CRITERIA:
  const hasMinLength = minLengthRegex.test(password);
  const hasUpperCase = upperCaseRegex.test(password);
  /*
    /[a-z]/.test(password) = true, because JS casts null into "null" (a string)
    so we make sure password is NOT null, and *then* test it against the regex.
    */
  const hasLowerCase = Boolean(password && lowerCaseRegex.test(password));
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);

  const criteriaAreMet =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;

  const passwordsMatch = Boolean(
    password && passwordConfirmation && password === passwordConfirmation
  );

  return (
    <div className="password-validator flex-col ">
      <FormInput
        required={required}
        isFormik
        name={name}
        value={password}
        type="password"
        onBlur={(e) => onBlur}
        label={label}
        helperText={
          "Ingrese una contraseña que cumpla los siguientes criterios"
        }
        onChange={onChange}
        hasError={passwordHasError}
        errorMessage={passwordErrorMessage}
      />
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
      <FormInput
        name={passwordConfirmationName}
        hasError={passwordConfirmationHasError}
        type="password"
        label={"Confirme la contraseña"}
        onChange={onChange}
        errorMessage={passwordConfirmationErrorMessage}
      />

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
