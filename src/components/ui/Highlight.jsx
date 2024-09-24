export default function Highlight({ text, highlight }) {
  if (!highlight) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            style={{
              backgroundColor: "yellow",
              borderRadius: "5px",
              border: "1px solid orange",
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
