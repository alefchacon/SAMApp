import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Specie from "../../features/specie/components/Specie";

export default function Searchbar({
  items = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
  label = null,
  required = false,
  name = ``,
  id = `${name}`,
  hasError = false,
  disabled = false,
  type = "text",
  onBlur,
}) {
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const textFieldRef = useRef();

  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    textFieldRef.current.value = option.scientific_name;
    setIsOpen(false);
    navigate(`/coleccion?name=${option.scientific_name}`);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.scientific_name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="flex-row">
        <input
          id={id}
          name={name}
          type={type}
          className={`searchbar`}
          maxLength={50}
          disabled={disabled}
          onChange={handleFilterChange}
          onFocus={toggleDropdown}
          ref={textFieldRef}
          placeholder="Buscar mamíferos"
        ></input>
        <Button
          className="secondary searchbar-button"
          iconType="search"
        ></Button>
      </div>
      {isOpen && (
        <ul className="dropdown-menu rounded">
          {filteredItems.map((item, index) => (
            <Specie
              key={index}
              specie={item}
              onClick={() => handleOptionClick(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
