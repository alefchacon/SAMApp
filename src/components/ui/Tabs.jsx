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

  return (
    <div className="tab-content flex-col">
      <div
        className={`tab-bar flex-rowalign-content-center  ${
          center ? "justify-content-center" : "justify-content-space-between"
        }`}
        style={{ padding: "0 1rem" }}
      >
        <ul
          className={`tab-group flex-row ${className} justify-content-start align-items-center unstyled`}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
          }}
        >
          {children.map((tab, index) => (
            <li
              key={index}
              className={`tab selectable ${
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

      <div className={`${children[selectedIndex].props.className} tab-panel`}>
        {children[selectedIndex]}
      </div>
    </div>
  );
}
