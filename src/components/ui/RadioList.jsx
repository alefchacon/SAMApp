import ChipLabel from "./ChipLabel";

export default function RadioList({
  options = [
    { label: "option 1", value: 1 },
    { label: "option 2", value: 2 },
  ],
  label = "Radio list",
  name = "radio-list",
  onChange,
  errorMessage = null,
  hasError = false,
  maxWidth = null,
  required = false,
  onBlur,
  value,
}) {
  const errorClass = errorMessage ? "hasError" : "";
  return (
    <fieldset
      name={name}
      className={`rounded-20 flex-col gap-05rem ${errorClass}`}
      onChange={onChange}
      onBlur={onBlur}
      style={{ maxWidth: maxWidth ?? "" }}
    >
      <legend
        className="input-label flex-row gap-05rem"
        style={{ paddingBottom: "0.5rem" }}
      >
        {label}
        {required && <ChipLabel iconType={"check"}>Requerido</ChipLabel>}
      </legend>

      {options.map((option, index) => (
        <div key={index} className="option selectable rounded-20">
          <input
            type="radio"
            id={`${name}Choice${index}`}
            name={name}
            value={option.value}
            checked={option.value === value}
          />
          <label
            htmlFor={`${name}Choice${index}`}
            style={{ cursor: "pointer" }}
          >
            {option.label}
          </label>
        </div>
      ))}

      {hasError && <p className="error-text">{errorMessage}</p>}
    </fieldset>
  );
}
