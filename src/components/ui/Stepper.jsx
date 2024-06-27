import { useState } from "react";

export default function Stepper({ children, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <div className="tabs-wrapper">
      <ul className={`stepper ${className}`}>
        {children.map((tab, index) => (
          <div
            key={index}
            className={` step selectable rounded`}
            onClick={() => handleSelectedTabChange(index)}
          >
            <div
              className={`stepper-circle ${
                selectedIndex === index ? "selected" : ""
              }`}
            >
              {index + 1}
            </div>
            <p className={`${selectedIndex === index ? "selected" : ""}`}>
              {tab.props.label}
            </p>

            {index < children.length - 1 && (
              <div className="stepper-line"></div>
            )}
          </div>
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
