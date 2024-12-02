export default function HoverableActions({ children, position = "absolute" }) {
  return (
    <div
      className="show-on-hover justify-content-center align-items-center position-absolute h-100 top-0 right-0"

    >
      <div
        className="bg-black-transparent rounded shadow-down flex-row"
      >
        {children}
      </div>
    </div>
  );
}
