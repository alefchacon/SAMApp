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
        <div className="form-label">
          <label htmlFor={`${id}`} className="sam-text-field-label">
            {label}
          </label>
          {required ? (
            <p className="required">(requerido)</p>
          ) : (
            <p>(opcional)</p>
          )}
        </div>
        <div
          htmlFor={`${id}`}
          className={`sam-text-field-helper-text`}
          id={`${id}-helper-text`}
        >
          {helperText}
        </div>
        {hasError && (
          <div
            className={`sam-text-field-error-text`}
            htmlFor={`${id}`}
            id={`${id}-error-message`}
          >
            {errorMessage}
          </div>
        )}
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
