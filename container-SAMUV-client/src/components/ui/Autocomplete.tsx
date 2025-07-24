import React, {
  useState,
  useEffect,
  useRef,
  LegacyRef,
  RefObject,
} from "react";
import useTextFilter from "../../hooks/useTextFilter";
import TextField from "./TextField";
import Highlight from "./Highlight";
import useKeyboardSelection from "@/hooks/useKeyboardSelection";

interface IAutocompleteProps {
  items?: string[];
  label?: string | React.ReactElement;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  name?: string;
  id?: string;
  hasError?: boolean;
  value?: string;
  disabled?: boolean;
  type?: string;
  setFieldValue?: (name: string, option: string) => void;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent<any, Element>) => void;
  maxLength?: number;
}
export default function Autocomplete(props: IAutocompleteProps) {
  const {
    items = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    label,
    placeholder,
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(items, 0);

  const handleOptionSelect = (option: any) => {
    if (!textFieldRef.current) {
      return;
    }

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

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFieldValue(name, e.target.value);
    handleFilterChange(e);
  };

  const handleBlur = (event: React.FocusEvent<any, Element>) => {
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
