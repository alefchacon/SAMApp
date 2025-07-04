import React, { useState, isValidElement } from "react";
import Tab, { ITabProps } from "./Tab";
interface ITabsProps {
  children: React.ReactElement<ITabProps>[];
  className: string;
  buttons?: React.ReactNode;
  center?: boolean;
}
export default function Tabs(props: ITabsProps) {
  const { children, className, buttons = null, center = false } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  /*
  let normalizedChildren: React.ReactNode[] | React.ReactNode = children;
  function preventSingleTabCrash() {
    const theresOnlyOneTab = !Array.isArray(children);
    if (theresOnlyOneTab) {
      normalizedChildren = [children];
    }
  }
  preventSingleTabCrash();

  function preventConditionalTabCrash() {

    normalizedChildren = normalizedChildren!.filter((child) =>
      isValidElement(child)
    );
  }
  preventConditionalTabCrash();

  if (!normalizedChildren) {
    return;
  }
  */

  const alignment = center ? "page-padding" : "";

  return (
    <div className="tab-content flex-grow-1 overflow-auto h-100 flex-col">
      <div className={`tab-bar flex-rowalign-content-center`}>
        <ul
          className={`tab-group flex-row ${className} ${alignment} align-items-center unstyled`}
        >
          {children.map((tab, index) => {
            if (!React.isValidElement(tab)) return null;

            return (
              <li
                key={index}
                className={`tab selectable p-1rem flex-row justify-content-center ${
                  selectedIndex === index ? "selected-tab" : ""
                }`}
                onClick={() => handleSelectedTabChange(index)}
              >
                {tab.props.label}
              </li>
            );
          })}
        </ul>
        <hr></hr>
        <div className="tab-actions flex-row align-items-center">
          {buttons && buttons}
        </div>
      </div>

      <div className={`${children[selectedIndex]?.props?.className} tab-panel`}>
        {children[selectedIndex].props.children}
      </div>
    </div>
  );
}
