import React, { useState, isValidElement } from "react";
import Tab, { ITabProps } from "./Tab";
interface ITabsProps {
  children: React.ReactElement<ITabProps>[];
  className: string;
  buttons?: React.ReactNode;
  center?: boolean;
  onChange?: (selectedTabIndex: number) => void;
  defaultActiveTabIndex?: number;
}
export default function Tabs(props: ITabsProps) {
  const { children, className, buttons = null, center = false } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(
    props.defaultActiveTabIndex || 0
  );

  const handleSelectedTabChange = (newIndex: number) => {
    setActiveTabIndex(newIndex);
    if (props.onChange) {
      props.onChange(newIndex);
    }
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
    <div className="tab-content flex flex-col flex-grow-1 overflow-auto h-100">
      <div className={`tab-bar flex flex-row align-center`}>
        <ul
          className={`tab-group flex flex-row ${className} ${alignment} align-center`}
        >
          {children.map((tab, index) => {
            if (!React.isValidElement(tab)) return null;

            return (
              <li
                key={index}
                className={`tab selectable p-1rem flex-row justify-content-center ${
                  activeTabIndex === index ? "selected-tab" : ""
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

      <div className={`tab-panel flex flex-col`}>
        {children[activeTabIndex].props.children}
      </div>
    </div>
  );
}
