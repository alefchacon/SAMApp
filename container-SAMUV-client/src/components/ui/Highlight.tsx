import React from "react";

interface IHighlightProps {
  text: string;
  highlight: string | null;
}
export default function Highlight(props: IHighlightProps) {
  if (!props.highlight) return <span>{props.text}</span>;

  const parts = props.text.split(new RegExp(`(${props.highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === props.highlight?.toLowerCase() ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
