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
  fullwidth = false,
  iconType = null,
  maxLength = 50,
  customIcon = null,
}) {
  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };

  return (
    <div className={`text-field ${getErrorClassName()} w-100`}>
      <div className="sam-text-field-info">
        <div className="form-label flex-row gap-05rem">
          <label htmlFor={`${id}`} className="sam-text-field-label">
            {label}
          </label>
          {required && <p className="required">(requerido)</p>}
        </div>

        {helperText && (
          <div
            htmlFor={`${id}`}
            className={`sam-text-field-helper-text`}
            id={`${id}-helper-text`}
          >
            {helperText}
          </div>
        )}
      </div>

      <div
        style={{
          height: "50px",
          display: "flex",
          position: "relative",
        }}
        className="flex-row align-items-center"
      >
        {iconType && (
          <span
            className="material-symbols-outlined p-1rem"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
            }}
          >
            {iconType}
          </span>
        )}
        {customIcon && (
          <span
            className="material-symbols-outlined p-1rem"
            style={{ position: "fixed" }}
          >
            {customIcon}
          </span>
        )}
        {isFormik ? (
          <Field
            id={id}
            name={name}
            type={type}
            className={`input ${getErrorClassName()} ${fullwidth && "w-100"} ${
              fullwidth && "h-100"
            } ${iconType || customIcon ? "has-icon" : ""}`}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
          ></Field>
        ) : (
          <input
            id={id}
            //value={value}
            name={name}
            type={type}
            style={{ flex: 2, minHeight: "100%" }}
            className={`input ${getErrorClassName()} ${fullwidth && "w-100"} ${
              fullwidth && "h-100"
            } ${iconType || customIcon ? "has-icon" : ""}`}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
          ></input>
        )}
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
  );
}
