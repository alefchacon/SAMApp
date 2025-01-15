import { useState, useEffect, useRef } from "react";
import useTextFilter from "../../../hooks/useTextFilter";

import Chip from "../../../components/ui/ChipInput";
import ChipLabel from "../../../components/ui/ChipLabel";
import CardContributor from "./CardContributor";
import useKeyboardSelection from "../../../hooks/useKeyboardSelection";
export default function ContributorAutocomplete({
  contributors = [
    {
      code: "code",
      name: "name",
    },
    {
      code: "code",
      name: "name",
    },
  ],
  roleId,
  label = null,
  helperText = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  disabled = false,
  onChange,
  maxLength = 50,
  value,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(contributors);
  const dropdownRef = useRef();
  const textFieldRef = useRef();
  const handleOptionSelect = (option) => {
    option.contributor_role_id = roleId;
    onChange(option, roleId);
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

  const selectedContributor = contributors.find(
    (contributor) => contributor.code === value?.code
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [filterText]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const iconRef = useRef(null);
  const [paddingLeft, setPaddingLeft] = useState(0);

  useEffect(() => {
    const adjustPadding = () => {
      if (iconRef.current && textFieldRef.current) {
        const iconWidth = iconRef.current.offsetWidth;
        setPaddingLeft(iconWidth + 30);
      }
    };

    adjustPadding();
    window.addEventListener("resize", adjustPadding);

    return () => {
      window.removeEventListener("resize", adjustPadding);
    };
  }, [selectedContributor]);

  return (
    <div className="dropdown position-relative" ref={dropdownRef}>
      <div className={`${getErrorClassName()}`}>
        <div className="flex-col">
          {label && (
            <label htmlFor={`${id}`} className="input-label flex-row gap-1rem">
              {label}
              {required && (
                <p className="required">
                  <ChipLabel iconType={"check"}>Requerido</ChipLabel>
                </p>
              )}
            </label>
          )}
          <div
            htmlFor={`${id}`}
            className={`helper-text`}
            id={`${id}-helper-text`}
          >
            {helperText}
          </div>
        </div>
<br></br>
        <div
          className=" display-inline-block flex-row align-items-center w-100 g-1rem position-relative min-w-fit-content"
        >
          <input
            ref={textFieldRef}
            type="text"
            name={name}
            className={`w-100 h-100 input flex-grow-1 ${hasError ? "hasError" : ""}`}
            style={{
              paddingLeft: `${paddingLeft}px`,
            }}
            maxLength={maxLength}
            disabled={disabled}
            onChange={handleFilterChange}
            onFocus={toggleDropdown}
            onKeyDown={handleKeyDown}
            placeholder="Busque colaboradores"
          />

          <span
            ref={iconRef}
            className="contributor-autocomplete position-absolute"
          >
            {selectedContributor && (
              <Chip>
                <CardContributor
                  filterText={filterText}
                  contributor={selectedContributor}
                  index={1}
                />
              </Chip>
            )}
          </span>
        </div>
      </div>

      <div
        className={`error-text`}
        htmlFor={`${id}`}
        id={`${id}-error-message`}
      >
        {hasError && errorMessage}
      </div>

      {isOpen && (
        <ul className="dropdown-menu pop-up unstyled">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className={`selectable p-05rem ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(item)}
            >
              <CardContributor
                filterText={filterText}
                contributor={item}
                index={index}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
