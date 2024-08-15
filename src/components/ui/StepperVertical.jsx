import { useState } from "react";

export default function StepperVertical({ children, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <div className="stepper-vertical">
      <ul id="stepper-vertical">
        {children.map((tab, index) => (
          <div
            id="stepper"
            className="flex-row gap-1rem selectable rounded p-1rem"
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
