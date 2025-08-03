import React, { useState, useEffect, useCallback } from "react";

interface IResizableDiv {
  children: React.ReactNode;
  className?: string;
  width?: number;
  resizeVertical?: boolean;
  hide?: boolean;
}
export default function ResizableDiv(props: IResizableDiv) {
  const {
    children,
    className = "",
    width = 600,
    resizeVertical = false,
    hide = false,
  } = props;

  const [size, setSize] = useState({ width: width, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");

  const handleMouseDown = useCallback(
    (direction: string) => (e: any) => {
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
    (e: MouseEvent) => {
      if (!isResizing) {
        return;
      }
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
      className={`resizable-div overflow-auto ${className}`}
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
        className="resize-bar shadow-lg flex flex-col justify-center align-center"
        style={{
          cursor: "e-resize",
        }}
        onMouseDown={handleMouseDown("e")}
      >
        <span
          style={{
            height: "100px",
            width: "2px",
            backgroundColor: "var(--dark)",
          }}
        ></span>
      </div>
      {children}
    </div>
  );
}
