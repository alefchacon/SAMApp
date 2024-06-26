import { useState } from "react";

export default function Tabs({ children, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <div className="tabs-wrapper">
      <ul className={`tabs ${className}`}>
        {children.map((tab, index) => (
          <li
            key={index}
            className={`selectable ${
              selectedIndex === index ? "selected-tab" : ""
            }`}
            onClick={() => handleSelectedTabChange(index)}
          >
            {tab.props.label}
          </li>
        ))}
      </ul>

      {children.map((tab, index) => (
        <div
          key={index}
          className={`${
            selectedIndex === index ? "visible tab-panel " : "invisible"
          }`}
        >
          {selectedIndex === index && tab.props.children}
        </div>
      ))}
    </div>
  );
}
