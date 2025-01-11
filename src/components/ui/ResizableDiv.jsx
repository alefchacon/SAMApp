import { useState, useEffect, useCallback } from "react";

export default function ResizableDiv({
  children,
  className,
  width = 600,
  resizeVertical = false,
  hide = false,
}) {
  const [size, setSize] = useState({ width: width, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");

  const handleMouseDown = useCallback(
    (direction) => (e) => {
      setIsResizing(true);
      setResizeDirection(direction);
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeDirection("");
    document.body.classList.remove("no-select");
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing) {
        return
      };
      document.body.classList.add("no-select");
      const { movementX, movementY } = e;

      setSize((previousSize) => {
        const newSize = { ...previousSize };

        if (resizeDirection.includes("w")) {
          newSize.width = Math.max(50, previousSize.width - movementX);
        } else if (resizeDirection.includes("e")) {
          newSize.width = Math.max(50, previousSize.width + movementX);
        }

        if (resizeDirection.includes("n")) {
          newSize.height = Math.max(50, previousSize.height - movementY);
        } else if (resizeDirection.includes("s")) {
          newSize.height = Math.max(50, previousSize.height + movementY);
        }

        return newSize;
      });
    },
    [isResizing, resizeDirection]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`resizable-div flex-row ${className}`}
      style={{
        width: hide ? "fit-content" : `${size.width}px`,
        height: resizeVertical
          ? `${size.height}px`
          : hide
          ? "fit-content"
          : "100%",
      }}
    >
      <div
        className="resize-bar shadow-all flex-col justify-content-center align-items-center"
        style={{
          cursor: "e-resize",
        }}
        onMouseDown={handleMouseDown("e")}
      >
        <span
          style={{
            height: "100px",
            width: "2px",
            backgroundColor: "var(--dark)"
          }}
        ></span>
      </div>
      {children}
    </div>
  );
}
