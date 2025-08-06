import React from "react";
import { Input } from "./input";
import { Label } from "./label";
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
    inputClassName,
  } = props;

  let style = inputClassName;
  if (hasError) {
    style = style?.concat(" pr-8 border-destructive");
  }

  return (
    <div className="flex flex-col gap-2 relative pb-5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        className={style}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      ></Input>

      {hasError && (
        <>
          <p className="text-sm text-destructive">{errorMessage}</p>
        </>
      )}
    </div>
  );
}
