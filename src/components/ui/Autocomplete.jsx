import { useState, useEffect, useRef } from "react";
import useTextFilter from "../../hooks/useTextFilter";
import TextField from "./TextField";
import Highlight from "./Highlight";

export default function Autocomplete({
  items = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
  label = null,
  helperText = null,
  placeholder = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  value = ``,
  disabled = false,
  type = "text",
  setFieldValue,
  onChange,
  onBlur,
  maxLength = 50,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const textFieldRef = useRef();
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(items, 0);

  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
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

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
    handleFilterChange(e);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <TextField
        label={label}
        placeholder={placeholder}
        required={required}
        id={id}
        name={name}
        type={type}
        className={`${getErrorClassName()} input`}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleChange}
        onFocus={toggleDropdown}
        onBlur={onBlur}
        ref={textFieldRef}
        hasError={hasError}
        errorMessage={errorMessage}
      ></TextField>

      {isOpen && (
        <ul className="dropdown-menu pop-up" role="listbox">
          {filteredItems.map((item, index) => (
            <li
              className="selectable p-05rem"
              key={index}
              role="option"
              onClick={() => handleOptionClick(item)}
            >
              <Highlight
                text={item}
                highlight={filterText}
                key={index}
              ></Highlight>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
