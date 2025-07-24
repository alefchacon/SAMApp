import { useState } from "react";

export default function useKeyboardSelection(
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  items: any[],
  handleOptionSelect: (option: any) => void
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex > 0 ? previousIndex - 1 : items.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex < items.length - 1 ? previousIndex + 1 : 0
        );
        break;
      case "Enter":
        event.preventDefault();
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
