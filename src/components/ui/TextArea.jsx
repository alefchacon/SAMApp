// LIBRARIES
import { Children, useState, useEffect, cloneElement } from "react";
import { Field } from "formik";

// COMPONENTS
import Button from "./Button";

export default function TextArea({
  className = "",
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
  onChange = null,
  maxWidth = null,
  onKeydown = null,
  onEnter = null,
  onBlur = null,
  ref = null,
}) {
  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onEnter) {
      onEnter();
      return;
    }
  };

  return (
    <div
      className={`text-field ${getErrorClassName()} w-100 justify-content-center`}
    >
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
          display: "flex",
          position: "relative",
          maxWidth: maxWidth ?? undefined,
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
              display: "flex",
              alignItems: "center",
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

        <textarea
          id={id}
          value={value}
          name={name}
          type={type}
          style={{ flex: 2, minHeight: "100%" }}
          className={`input ${className} ${getErrorClassName()} ${
            fullwidth && "w-100"
          } ${fullwidth && "h-100"} ${
            iconType || customIcon ? "has-icon" : ""
          }`}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          ref={ref}
        ></textarea>
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
