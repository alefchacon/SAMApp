import { useState, useRef, useEffect } from "react";

import Button from "../../components/ui/Button";

export default function Dropdown({ header, children }) {
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
    <div
      className="dropdown flex-row selectable rounded align-items-center p-05rem gap-1rem"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      {header}
      <span className="material-symbols-outlined">arrow_drop_down</span>

      {isOpen && <div className="dropdown-menu rounded">{children}</div>}
    </div>
  );
}
