import { useState, useEffect, useRef } from "react";
import useTextFilter from "../../hooks/useTextFilter";
import Highlight from "../../components/ui/Highlight";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Chip from "../../components/ui/Chip";

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
  label = null,
  helperText = null,
  placeholder = null,
  required = false,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  validate = true,
  hasError = false,
  disabled = false,
  type = "text",
  setFieldValue,
  onChange,
  onBlur,
  maxLength = 50,
}) {
  console.log(contributors);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter(contributors);
  const dropdownRef = useRef();
  const textFieldRef = useRef();
  const getErrorClassName = () => {
    return hasError ? "hasError" : "";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    //clearFilter();
    setSelectedContributor(option);
    setIsOpen(false);
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

  const handleClearSelection = () => {
    setSelectedContributor(null);
  };

  function CardContributor({
    contributor = {
      code: "code",
      name: "name",
    },
    index = 0,
  }) {
    return (
      <div
        style={{ maxWidth: "fit-content", padding: "0.5rem 1rem" }}
        id={`contributor-${index}`}
        className="contributor flex-row align-items-center gap-1rem  "
      >
        <p
          id={`contributor-code-${index}`}
          className="contributor-code"
          style={{ letterSpacing: "1px" }}
        >
          <b>
            <Highlight
              text={contributor.code}
              highlight={filterText}
            ></Highlight>
          </b>
        </p>
        <p id={`contributor-name-${index}`} className="contributor-name">
          <Highlight text={contributor.name} highlight={filterText}></Highlight>
        </p>
      </div>
    );
  }

  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const [paddingLeft, setPaddingLeft] = useState(0);

  useEffect(() => {
    // Function to adjust padding based on icon width
    const adjustPadding = () => {
      if (iconRef.current && textFieldRef.current) {
        const iconWidth = iconRef.current.offsetWidth;
        setPaddingLeft(iconWidth + 15); // Add some extra space between the icon and text
      }
    };

    // Call on component mount and window resize (in case of responsive changes)
    adjustPadding();
    window.addEventListener("resize", adjustPadding);

    return () => {
      window.removeEventListener("resize", adjustPadding);
    };
  }, [selectedContributor]);

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

        <div
          className="flex-row align-items-center"
          style={{
            position: "relative",
            display: "inline-block",
            borderRadius: "10px",
            height: "60px",

            gap: "1rem",
            minWidth: "fit-content",
            width: "100%",
          }}
        >
          <input
            ref={textFieldRef}
            type="text"
            className="w-100 h-100 input"
            style={{
              flex: 1,
              border: "none",
              paddingLeft: `${paddingLeft}px`,
            }}
            maxLength={maxLength}
            disabled={disabled}
            onChange={handleFilterChange}
            onFocus={toggleDropdown}
            onBlur={onBlur}
          />

          <span
            ref={iconRef}
            style={{
              position: "absolute",
              transform: "translateY(-50%)",
              left: "10px",
              top: "50%",
            }}
          >
            {selectedContributor && (
              <Chip onRemove={handleClearSelection}>
                <CardContributor contributor={selectedContributor} index={1} />
              </Chip>
            )}
          </span>
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
            <li className="selectable" onClick={() => handleOptionClick(item)}>
              <CardContributor contributor={item} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
