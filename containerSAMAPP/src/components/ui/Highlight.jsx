export default function Highlight({ text, highlight }) {
  if (!highlight) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            className="highlight"
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
