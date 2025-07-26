// LIBRARIES
import React, { Children, useState, useEffect, cloneElement } from "react";
import { Field } from "formik";

// COMPONENTS
import Button from "./ButtonCustom";

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
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
          <label htmlFor={`${id}`} className="input-label">
            {label}
          </label>
          {required && <p className="required">(requerido)</p>}
        </div>

        {helperText && (
          <label
            htmlFor={`${id}`}
            className={`sam-text-field-helper-text`}
            id={`${id}-helper-text`}
          >
            {helperText}
          </label>
        )}
      </div>

      <div
        style={{
          maxWidth: maxWidth ?? undefined,
        }}
        className="flex-row align-items-center position-relative"
      >
        <textarea
          id={id}
          value={value}
          name={name}
          type={type}
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
        <label
          role="alert"
          aria-live="assertive"
          className={`error-text text-wrap`}
          htmlFor={`${id}`}
          id={`${id}-error-message`}
        >
          {errorMessage}
        </label>
      )}
    </div>
  );
}
