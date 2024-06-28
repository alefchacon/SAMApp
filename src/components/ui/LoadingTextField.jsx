// LIBRARIES
import { useState, useEffect } from "react";
import { Field } from "formik";

// COMPONENTS
import Button from "./Button";

/*
Este componente existe por que no se me ocurrió
una implementación menos compleja, y por que
no quería inyectar dicha complejidad al 
TextField normal, que generalmente no la
necesita.
*/

export default function LoadingTextField({
  label = null,
  helperText = null,
  placeholder = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  disabled = false,
  type = "text",
  onFieldValueChange,
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`text-field ${getErrorClassName()}`}>
      <div className="sam-text-field-info">
        {label && (
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
        )}
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

      <div className="flex-row">
        <input
          id={id}
          name={name}
          type={type}
          className={`${getErrorClassName()}`}
          maxLength={50}
          disabled={disabled}
        ></input>
        {isLoading && <Button></Button>}
      </div>
    </div>
  );
}
