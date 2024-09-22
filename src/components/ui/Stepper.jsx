import { useState } from "react";

import Button from "./Button";

export default function Stepper({
  children,
  className,
  selectedStepId = null,
  onResetScroll,
  endButtonLabel = "Agregar especímen",
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(selectedStepId);

  console.log(selectedId);

  const handleSelectedTabChange = (newSelectedIndex) => {
    onResetScroll();
    setSelectedId(newSelectedIndex);
  };

  console.log(children[0].props.id);

  const buttonRow = (index) => (
    <div className="button-row">
      {index > 0 && (
        <Button
          value={children[index + -1]?.props.id}
          className="secondary"
          iconType="chevron_left"
          onClick={handleSelectedTabChange}
        >
          Regresar
        </Button>
      )}

      {index < children.length - 1 ? (
        <Button
          value={children[index + 1]?.props.id}
          className="secondary"
          iconType="chevron_right"
          onClick={handleSelectedTabChange}
        >
          Continuar
        </Button>
      ) : (
        <Button>{endButtonLabel}</Button>
      )}
    </div>
  );

  return (
    <div className="stepper-wrapper">
      <ul className={`stepper`}>
        {children.map((tab, index) => (
          <div className="step-wrapper flex-row align-items-center" key={index}>
            <div
              key={index}
              className={` step selectable rounded `}
              onClick={() => handleSelectedTabChange(tab.props.id)}
            >
              <div
                className={`stepper-circle ${
                  selectedId === tab.props.id ? "selected" : ""
                }`}
              >
                {index + 1}
              </div>
              <p className={`${selectedId === tab.props.id ? "selected" : ""}`}>
                {tab.props.label}
              </p>
            </div>

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
            selectedId === tab.props.id ? "visible tab-panel " : "invisible"
          }`}
        >
          {selectedId === tab.props.id && tab.props.children}
          {buttonRow(index)}
        </div>
      ))}
    </div>
  );
}
