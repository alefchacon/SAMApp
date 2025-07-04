import React, { useState, useEffect, useRef } from "react";
import useTextFilter from "../../hooks/useTextFilter";
import TextField from "./TextField";
import Highlight from "./Highlight";
import useKeyboardSelection from "../../hooks/useKeyboardSelection";

interface IAutocompleteProps {
  items: string[];
  label: string | React.ReactElement;
  placeholder: string | React.ReactElement;
  required: boolean;
  errorMessage: string | React.ReactElement;
  name: string;
  id: string;
  hasError: boolean;
  value: string;
  disabled: boolean;
  type: string;
  setFieldValue: (name: string, option: string) => void;
  onChange: () => void;
  onBlur: () => void;
  maxLength: number;
}
export default function Autocomplete(props: IAutocompleteProps) {
  const {
    items = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    label = null,
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
    onBlur,
    maxLength = 50,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const textFieldRef = useRef();
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(items, 0);

  const handleOptionSelect = (option) => {
    textFieldRef.current.value = option;
    setFieldValue(name, option);
    setIsOpen(false);
  };
  const { handleKeyDown, selectedIndex } = useKeyboardSelection(
    isOpen,
    setIsOpen,
    filteredItems,
    handleOptionSelect
  );

  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  const handleBlur = (event: HTMLevent) => {
    setIsOpen(false);
    onBlur(event);
  };

  return (
    <div className="dropdown position-relative" ref={dropdownRef}>
      <TextField
        isFormik
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
        onKeydown={handleKeyDown}
        value={value}
        onBlur={handleBlur}
        ref={textFieldRef}
        hasError={hasError}
        errorMessage={errorMessage}
      ></TextField>

      {isOpen && (
        <ul className="dropdown-menu pop-up unstyled" role="listbox">
          {filteredItems.map((item, index) => (
            <li
              className={`selectable p-05rem ${
                selectedIndex === index ? "selected" : ""
              }`}
              key={index}
              role="option"
              onClick={() => handleOptionSelect(item)}
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
