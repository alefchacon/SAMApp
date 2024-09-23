import { useState, useEffect, useRef } from "react";

export default function Autocomplete({
  items = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
  label = null,
  helperText = null,
  placeholder = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  validate = true,
  hasError = false,
  value = ``,
  disabled = false,
  type = "text",
  setFieldValue,
  onChange,
  onBlur,
  maxLength = 50,
}) {
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const textFieldRef = useRef();
  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };
  const handleFilterChange = (event) => {
    onChange(event);
    setFilterText(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    textFieldRef.current.value = option;
    setFieldValue(name, option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    console.log("asdf");
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className={`${getErrorClassName()}`}>
        <div className="flex-col">
          {label && (
            <div className="flex-row gap-05rem">
              <label htmlFor={`${id}`} className="input-label">
                {label}
              </label>
              {required && <p className="required">(requerido)</p>}
            </div>
          )}
          <div
            htmlFor={`${id}`}
            className={`sam-text-field-helper-text`}
            id={`${id}-helper-text`}
          >
            {helperText}
          </div>
        </div>
        <div className="flex-row">
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            className={`${getErrorClassName()} input`}
            maxLength={maxLength}
            disabled={disabled}
            onChange={handleFilterChange}
            onFocus={toggleDropdown}
            onBlur={onBlur}
            ref={textFieldRef}
          ></input>
        </div>
      </div>

      <div
        className={`sam-text-field-error-text`}
        htmlFor={`${id}`}
        id={`${id}-error-message`}
      >
        {hasError && errorMessage}
      </div>

      {isOpen && (
        <ul className="dropdown-menu pop-up">
          {filteredItems.map((item, index) => (
            <li
              className="selectable p-05rem"
              key={index}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
