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
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      console.log("hey!!");
      if (!isResizing) return;

      const { movementX, movementY } = e;

      setSize((prevSize) => {
        const newSize = { ...prevSize };

        if (resizeDirection.includes("w")) {
          newSize.width = Math.max(50, prevSize.width - movementX);
        } else if (resizeDirection.includes("e")) {
          newSize.width = Math.max(50, prevSize.width + movementX);
        }

        if (resizeDirection.includes("n")) {
          newSize.height = Math.max(50, prevSize.height - movementY);
        } else if (resizeDirection.includes("s")) {
          newSize.height = Math.max(50, prevSize.height + movementY);
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
      className={`${className}`}
      style={{
        overflow: "auto",
        position: "relative",
        width: hide ? "fit-content" : `${size.width}px`,
        height: resizeVertical
          ? `${size.height}px`
          : hide
          ? "fit-content"
          : "100%",
      }}
    >
      <div
        className="resize-bar"
        style={{
          cursor: "n-resize",
        }}
        onMouseDown={handleMouseDown("n")}
      />
      <div
        className="resize-bar"
        style={{
          cursor: "s-resize",
        }}
        onMouseDown={handleMouseDown("s")}
      />
      <div
        className="resize-bar"
        style={{
          cursor: "w-resize",
        }}
        onMouseDown={handleMouseDown("w")}
      />
      <div
        className="resize-bar"
        style={{
          cursor: "e-resize",
        }}
        onMouseDown={handleMouseDown("e")}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          cursor: "nw-resize",
        }}
        onMouseDown={handleMouseDown("nw")}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "5px",
          height: "5px",
          cursor: "ne-resize",
        }}
        onMouseDown={handleMouseDown("ne")}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "5px",
          height: "5px",
          cursor: "sw-resize",
        }}
        onMouseDown={handleMouseDown("sw")}
      />
      <div
        style={{
          position: "absolute",

          bottom: 0,
          right: 0,
          width: "5px",
          height: "5px",
          cursor: "se-resize",
        }}
        onMouseDown={handleMouseDown("se")}
      />
      {children}
    </div>
  );
}
