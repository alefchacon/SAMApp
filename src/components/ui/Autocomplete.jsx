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
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
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

        <div className="flex-row">
          <input
            id={id}
            name={name}
            type={type}
            className={`${getErrorClassName()}`}
            maxLength={50}
            disabled={disabled}
            onChange={handleFilterChange}
            onFocus={toggleDropdown}
            onBlur={onBlur}
            ref={textFieldRef}
          ></input>
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {filteredItems.map((item, index) => (
            <li
              className="selectable p-1rem"
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
