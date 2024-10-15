// LIBRARIES
import { Children, useState, useEffect, cloneElement, useRef } from "react";
import { Field } from "formik";

// COMPONENTS
import Button from "./Button";
import ChipLabel from "./ChipLabel";

export default function TextField({
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
  onFocus = null,
  ref = null,
  step = 1,
  max = null,
  min = null,
  onBlur = null,
  defaultValue,
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
        <div className="form-label" style={{ paddingBottom: "0.5rem" }}>
          <label
            htmlFor={`${id}`}
            className="input-label flex-row gap-05rem"
            style={{ cursor: "pointer", flexWrap: "wrap" }}
          >
            {label}
            {required && <ChipLabel iconType={"check"}>Requerido</ChipLabel>}
          </label>
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
          height: "40px",

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
        {isFormik && type === "text" ? (
          <>
            <Field
              id={id}
              name={name}
              type={type}
              className={`input ${getErrorClassName()} ${
                fullwidth && "w-100"
              } ${fullwidth && "h-100"} ${
                iconType || customIcon ? "has-icon" : ""
              }`}
              maxLength={maxLength}
              disabled={disabled}
              value={value}
              onKeyDown={onKeydown}
              max={max}
              min={min}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onChange}
              defaultValue={defaultValue}
              step={step}
            ></Field>
          </>
        ) : (
          <input
            id={id}
            //value={value}
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
            onKeyDown={handleKeyDown}
            ref={ref}
            step={step}
          ></input>
        )}
      </div>

      {hasError && (
        <div
          className={`error-text`}
          htmlFor={`${id}`}
          id={`${id}-error-message`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
