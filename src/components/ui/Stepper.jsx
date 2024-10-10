import { useState } from "react";

import Button from "./Button";
import Badge from "./Badge";

export default function Stepper({
  children,
  className,
  selectedStepId = null,
  onStepChange = null,
  onResetScroll,
  endButtonLabel = "Agregar especímen",
  hasError,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(selectedStepId);

  const handleSelectedTabChange = (newSelectedIndex) => {
    console.log(newSelectedIndex);
    onResetScroll();
    setSelectedId(newSelectedIndex);
  };

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
        <Button type="submit">{endButtonLabel}</Button>
      )}
    </div>
  );

  return (
    <div className="stepper-wrapper bg-white" style={{ flexWrap: "wrap" }}>
      <ul
        className={`stepper flex-row align-items-center bg-white shadow-down`}
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        {children.map((tab, index) => (
          <div
            className="step-wrapper flex-row align-items-center"
            key={index}
            style={{ flex: 1 }}
          >
            <div
              key={index}
              className={` step selectable rounded `}
              onClick={() => handleSelectedTabChange(tab.props.id)}
            >
              <div
                className={`stepper-circle ${
                  selectedId === tab.props.id ? "selected" : ""
                }`}
                style={{ position: "relative" }}
              >
                {index + 1}
              </div>
              <p className={`${selectedId === tab.props.id ? "selected" : ""}`}>
                {tab.props.label}
              </p>
            </div>

            {index < children.length - 1 && (
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "1.4rem" }}
              >
                chevron_right
              </span>
            )}
          </div>
        ))}
      </ul>

      <div>{children.find((child) => child.props.id === selectedId)}</div>
    </div>
  );
}
