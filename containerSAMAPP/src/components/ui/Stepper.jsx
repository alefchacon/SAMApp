import { useState } from "react";

import Button from "./Button";
import Badge from "./Badge";

export default function Stepper({
  children,
  selectedStepId = null,
  onResetScroll,
  endButtonLabel = "Agregar espécimen",
  onEndButtonClick,
  invalidSteps = [],
}) {
  const [selectedId, setSelectedId] = useState(selectedStepId);

  const handleSelectedTabChange = (newSelectedIndex) => {
    if (onResetScroll) {
      onResetScroll();
    }
    setSelectedId(newSelectedIndex);
  };

  const buttonRow = (index) => (
    <div className="button-row p-1rem">
      {index > 0 && (
        <Button
          value={children[index + -1]?.props.id}
          className="secondary"
          type="button"
          iconType="chevron_left"
          onClick={handleSelectedTabChange}
        >
          Regresar
        </Button>
      )}

      {index < children.length - 1 ? (
        <Button
          value={children[index + 1]?.props.id}
          type="button"
          className="secondary"
          iconType="chevron_right"
          onClick={handleSelectedTabChange}
        >
          Continuar
        </Button>
      ) : (
        <Button type="button" onClick={onEndButtonClick}>{endButtonLabel}</Button>
      )}
    </div>
  );

  const currentChild = children.find((child) => child.props.id === selectedId);
  const currentIndex = children.indexOf(currentChild);

  return (
    <div className="stepper-wrapper flex-wrap-wrap">
      <ul
        className={`stepper flex-row bg-white unstyled position-sticky top-0 z-index-5`}
      >
        {children.map((tab, index) => (
          <div
            className="step-wrapper flex-row align-items-center justify-content-space-evenly flex-grow-1"
            key={index}
          >
            <div
              key={index}
              className={` step selectable rounded-5 `}
              onClick={() => handleSelectedTabChange(tab.props.id)}
            >
              <div
                className={`stepper-circle ${
                  selectedId === tab.props.id ? "selected" : ""
                }`}
              >
                {invalidSteps.includes(tab.props.id) &&
                  <Badge>!</Badge>
                }
                {index + 1}
              </div>
              <h3 className={`${selectedId === tab.props.id ? "selected" : ""}`}>
                {tab.props.label}
              </h3>
            </div>

            {index < children.length - 1 && (
              <span
                className="material-symbols-outlined"
              >
                chevron_right
              </span>
            )}
          </div>
        ))}
      </ul>
      <br/>
      {children.find((child) => child.props.id === selectedId)}
      {buttonRow(currentIndex)}
    </div>
  );
}
