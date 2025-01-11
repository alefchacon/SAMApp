import { useState, isValidElement } from "react";

export default function Tabs({
  children,
  className,
  buttons = null,
  center = false,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (newIndex) => {
    setSelectedIndex(newIndex);
  };

  function preventSingleTabCrash() {
    const theresOnlyOneTab = !Array.isArray(children);
    if (theresOnlyOneTab) {
      children = [children];
    }
  }
  preventSingleTabCrash();

  function preventConditionalTabCrash() {
    /*
      Suppose you conditionally render a tab, like:
      <Tabs>
        {foo && <div label="Conditional tab"></div>}
      </Tabs>

      If foo = true, Tabs will receive a valid React element and render as expected. 
      But if !foo, then Tabs receives a "false" boolean value and crashes, 
      so we need to remove any such values:
    */
    children = children.filter((child) => isValidElement(child));
  }
  preventConditionalTabCrash();

  const alignment = center 
    ? "page-padding"
    : ""

  return (
    <div className="tab-content flex-grow-1 overflow-auto h-100 flex-col">
      <div
        className={`tab-bar divider flex-rowalign-content-center`}
      >
        <ul
          className={`tab-group flex-row ${className} ${alignment} align-items-center unstyled`}
        >
          {children.map((tab, index) => (
            <li
              key={index}
              className={`tab selectable p-1rem flex-row justify-content-center ${
                selectedIndex === index ? "selected-tab" : ""
              }`}
              onClick={() => handleSelectedTabChange(index)}
            >
              {tab.props.label}
            </li>
          ))}
        </ul>
        <div className="tab-actions flex-row align-items-center">
          {buttons && buttons}
        </div>
      </div>

      <div className={`${children[selectedIndex]?.props?.className} tab-panel`}>
        {children[selectedIndex]}
      </div>
    </div>
  );
}
