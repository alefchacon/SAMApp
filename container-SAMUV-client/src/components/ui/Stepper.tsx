import React, { ReactElement, useState } from "react";

import Button from "./ButtonCustom";

interface IStepperProps {
  children: React.ReactNode;
  selectedStepId: number | string;
  onResetScroll?: () => void;
  endButtonLabel?: string;
  onEndButtonClick: () => void;
  invalidSteps?: any[];
}

export default function Stepper({
  children,
  selectedStepId,
  onResetScroll,
  endButtonLabel = "Agregar espécimen",
  onEndButtonClick,
  invalidSteps = [],
}: IStepperProps) {
  const [selectedId, setSelectedId] = useState(selectedStepId);

  const handleSelectedTabChange = (newSelectedIndex: number) => {
    if (onResetScroll) {
      onResetScroll();
    }
    setSelectedId(newSelectedIndex);
  };

  const childArray = React.Children.toArray(children);

  const buttonRow = (index: number) => (
    <div className="button-row p-1rem">
      {index > 0 && (
        <Button
          value={(childArray[index + -1] as ReactElement).props.id}
          className="secondary"
          type="button"
          icon="chevron_left"
          onClick={handleSelectedTabChange}
        >
          Regresar
        </Button>
      )}

      {index < childArray!.length - 1 ? (
        <Button
          value={(childArray[index + 1] as ReactElement).props.id}
          type="button"
          className="secondary"
          icon="chevron_right"
          onClick={handleSelectedTabChange}
        >
          Continuar
        </Button>
      ) : (
        <Button type="button" onClick={onEndButtonClick}>
          {endButtonLabel}
        </Button>
      )}
    </div>
  );

  const currentChild = childArray.find(
    (child): child is ReactElement =>
      React.isValidElement(child) && child.props.id === selectedId
  );
  const currentIndex = childArray.indexOf(currentChild!);

  return (
    <div className="stepper-wrapper flex-wrap-wrap">
      <ul
        className={`stepper flex-row bg-white unstyled position-sticky top-0 z-index-5 shadow-sm rounded-sm`}
      >
        {childArray.map((tab, index) => (
          <div
            className="step-wrapper flex-row align-items-center justify-content-space-evenly flex-grow-1"
            key={index}
          >
            <div
              key={index}
              className={` step selectable rounded-5 `}
              onClick={() =>
                handleSelectedTabChange((tab as ReactElement).props.id)
              }
            >
              <div
                className={`stepper-circle ${
                  selectedId === (tab as ReactElement).props.id
                    ? "selected"
                    : ""
                }`}
              >
                {invalidSteps.includes((tab as ReactElement).props.id) && (
                  <div>!</div>
                )}
                {index + 1}
              </div>
              <h3
                className={`${
                  selectedId === (tab as ReactElement).props.id
                    ? "selected"
                    : ""
                }`}
              >
                {(tab as ReactElement).props.label}
              </h3>
            </div>

            {index < childArray.length - 1 && (
              <span className="material-symbols-outlined">chevron_right</span>
            )}
          </div>
        ))}
      </ul>
      <br />
      {childArray.find(
        (child) =>
          React.isValidElement(child) &&
          (child as ReactElement).props.id === selectedId
      )}
      {buttonRow(currentIndex)}
    </div>
  );
}
