import React, { FocusEventHandler } from "react";
import ChipLabel from "./ChipLabel";

interface IRadioListProps {
  options: any[];
  label: string;
  name: string;
  onChange: (event: React.FormEvent<HTMLFieldSetElement>) => void;
  errorMessage?: string;
  hasError: boolean;
  maxWidth?: number | string;
  required: boolean;
  onBlur: (event: React.FocusEvent<HTMLFieldSetElement, Element>) => void;
  value: any;
}
export default function RadioList({
  options = [
    { label: "option 1", value: 1 },
    { label: "option 2", value: 2 },
  ],
  label = "Radio list",
  name = "radio-list",
  onChange,
  errorMessage,
  hasError = false,
  maxWidth,
  required = false,
  onBlur,
  value,
}: IRadioListProps) {
  const errorClass = hasError ? "hasError" : "";
  return (
    <fieldset
      name={name}
      className={`rounded-5 flex-col gap-05rem ${errorClass}`}
      onChange={onChange}
      onBlur={onBlur}
      style={{ maxWidth: maxWidth ?? "" }}
    >
      <legend className="input-label flex-row gap-05rem">
        {label}
        {required && <ChipLabel iconType={"check"}>Requerido</ChipLabel>}
      </legend>

      {options.map((option, index) => (
        <div key={index} className="option selectable rounded-5">
          <input
            type="radio"
            id={`${name}Choice${index}`}
            name={name}
            value={option.value}
            defaultChecked={option.value === value}
          />
          <label htmlFor={`${name}Choice${index}`} className="cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}

      {hasError && <p className="error-text">{errorMessage}</p>}
    </fieldset>
  );
}
