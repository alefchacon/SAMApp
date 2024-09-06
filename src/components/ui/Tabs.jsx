import { useState, isValidElement } from "react";

export default function Tabs({ children, className, buttons = null }) {
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
    <div className="tab-content" style={{ flexGrow: 1, minHeight: "100%" }}>
      <div
        className="tab-bar flex-row bg-white align-content-center justify-content-center divider"
        style={{}}
      >
        <ul
          className={`tab-group divider flex-row ${className} bg-white justify-content-start align-items-center`}
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
              onClick={() =>
                handleSelectedTabChange(
                  index,
                  tab.props.tabKey,
                  tab.props.label
                )
              }
            >
              {tab.props.label}
            </li>
          ))}
        </ul>
        <div className="tab-actions flex-row align-items-center">
          {buttons && buttons}
        </div>
      </div>

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
