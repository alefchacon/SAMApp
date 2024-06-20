import { useState, useEffect } from "react";
import { Field } from "formik";

export default function SearchField({
  label = "label",
  helperText = " ",
  required = true,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  value = ``,
  options = ["option 1", "option 2", "option 3"],
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
        list="europe-countries"
        type="text"
        id={id}
        name={name}
        className={`${errorClassName}`}
        maxLength={50}
      />
      <datalist id="europe-countries">
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </datalist>
    </div>
  );
}
