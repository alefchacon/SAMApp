// LIBRARIES
import { Children, useState, useEffect, cloneElement } from "react";
import { Field } from "formik";

// COMPONENTS
import Button from "./Button";

export default function TextField({
  label = null,
  helperText = null,
  placeholder = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  value = ``,
  isFormik = false,
  disabled = false,
  type = "text",
}) {
  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
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

      <div className="flex-row p-2px">
        {isFormik ? (
          <Field
            id={id}
            name={name}
            type={type}
            className={`${getErrorClassName()}`}
            maxLength={50}
            disabled={disabled}
            value={value}
          ></Field>
        ) : (
          <input
            id={id}
            value={value}
            name={name}
            type={type}
            className={`${getErrorClassName()}`}
            maxLength={50}
            disabled={disabled}
          ></input>
        )}
      </div>
    </div>
  );
}
