import { useState } from "react";

export default function Tabs({ children, className }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedTabChange = (tabIndex, tabKey, tabLabel) => {
    setSelectedIndex(tabIndex);
  };

  return (
    <div className="flex-col">
      <ul
        className={`tabs ${className} bg-white justify-content-center`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
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
            ${selectedIndex === index ? "visible tab-panel " : "invisible"}`}
        >
          {selectedIndex === index && tab.props.children}
        </div>
      ))}
    </div>
  );
}
