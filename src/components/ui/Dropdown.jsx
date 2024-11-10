import { useState, useRef, useEffect } from "react";

import Button from "../../components/ui/Button";

export default function Dropdown({ header, children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex-col position-relative">
      <div
        className={`${className} dropdown flex-row selectable justify-content-start gap-05rem`}
        onClick={toggleDropdown}
        ref={dropdownRef}
        style={{ position: "relative" }}
      >
        {header}
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </div>
      {isOpen && <ul className="dropdown-menu unstyled">{children}</ul>}
    </div>
  );
}
