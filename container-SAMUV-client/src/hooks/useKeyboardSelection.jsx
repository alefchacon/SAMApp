import { useState } from "react";
export default function useKeyboardSelection(
  isOpen,
  setIsOpen,
  items,
  handleOptionSelect
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex > 0 ? previousIndex - 1 : items.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex < items.length - 1 ? previousIndex + 1 : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleOptionSelect(items[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return { handleKeyDown, selectedIndex };
}
