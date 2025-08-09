import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Check } from "lucide-react";
interface IFormInputProps {
  id?: string;
  label?: string;
  name: string;
  hasError?: boolean;
  errorMessage?: string;
  type?: "text" | "number" | "date" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value?: any;
  inputClassName?: string;
  maxLength?: number;
  helperText?: string;
  required?: boolean;
}
export default function FormInput(props: IFormInputProps) {
  const {
    id,
    name,
    label = "Label",
    hasError = false,
    errorMessage = "Error message",
    type = "text",
    onChange,
    onBlur,
    value,
    inputClassName = "",
    maxLength,
    helperText,
    required,
  } = props;

  let style = inputClassName;
  if (hasError) {
    style = style.concat(" border-2 border-destructive");
  }

  return (
    <div className="flex flex-col gap-2 relative pb-5">
      <div className="flex flex-row gap-2">
        <Label htmlFor={name} className="font-semibold">
          {label}
        </Label>
        {required && (
          <span className="flex flex-row gap-1 items-center text-xs bg-green-300 px-2 rounded-sm opacity-80">
            <Check size={"0.8rem"}></Check> Requerido
          </span>
        )}
      </div>
      {helperText && <p className="text-sm color-gray">{helperText}</p>}
      <Input
        id={id}
        name={name}
        className={style}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        maxLength={maxLength}
      ></Input>

      {hasError && (
        <>
          <p className="text-sm text-destructive">{errorMessage}</p>
        </>
      )}
    </div>
  );
}
