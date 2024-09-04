import { useState, isValidElement } from "react";

export default function Tabs({ children, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (tabIndex, tabKey, tabLabel) => {
    setSelectedIndex(tabIndex);
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

      If foo = true, Tabs will receive a React element and render as expected. 
      But if !foo, then Tabs receives a "false" boolean value and crashes, 
      so we need to remove any such values:
    */
    children = children.filter((child) => isValidElement(child));
  }
  preventConditionalTabCrash();

  return (
    <div className="tab-wrapper" style={{ flexGrow: 1, maxHeight: "100%" }}>
      <ul
        className={`tabs divider ${className} bg-white justify-content-center`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        {children.map((tab, index) => (
          <li
            key={index}
            className={`selectable ${
              selectedIndex === index ? "selected-tab" : ""
            }`}
            onClick={() =>
              handleSelectedTabChange(index, tab.props.tabKey, tab.props.label)
            }
          >
            {tab.props.label}
          </li>
        ))}
      </ul>

      {children.map((tab, index) => (
        <div
          key={index}
          className={`
            ${selectedIndex === index ? "visible tab-panel" : "invisible"}`}
        >
          {selectedIndex === index && tab.props.children}
        </div>
      ))}
    </div>
  );
}
