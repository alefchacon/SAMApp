import { useState, useEffect } from "react";
import { Field } from "formik";

export default function TextField({
  label = "label",
  helperText = "helperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperTexthelperText",
  required = true,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  value = ``,
}) {
  const [errorClassName, setErrorClassName] = useState();

  useEffect(() => {
    setErrorClassName(hasError ? "hasError" : "");
  }, [hasError]);

  return (
    <div className={`text-field ${errorClassName}`}>
      <div className="sam-text-field-info">
        <label htmlFor={`${id}`} className="sam-text-field-label">
          {label}
        </label>
        <label
          htmlFor={`${id}`}
          className={`sam-text-field-helper-text`}
          id={`${id}-helper-text`}
        >
          {helperText}
        </label>
        <label
          className={`sam-text-field-error-text`}
          htmlFor={`${id}`}
          id={`${id}-error-message`}
        >
          {errorMessage}
        </label>
      </div>

      <Field
        id={id}
        name={name}
        type="text"
        className={`${errorClassName}`}
        maxLength={50}
      ></Field>
    </div>
  );
}
