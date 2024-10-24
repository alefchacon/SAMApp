import React, { useState, useRef } from "react";

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !tooltipRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left + 10;
    let y = e.clientY - rect.top - tooltipRect.height - 50;

    if (x + tooltipRect.width > window.innerWidth) {
      x = e.clientX - rect.left - tooltipRect.width - 10;
    }

    if (y < 0) {
      y = e.clientY - rect.top + 20;
    }

    setPosition({ x, y });
  };

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const tooltipStyle = {
    position: "absolute",
    zIndex: 9999999,
    left: position.x,
    top: position.y,
    transform: "translate(-5%, -150%)",
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "100px",
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className="bg-black-transparent rounded-5 p-1rem box-shadow flex-col  color-white"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
