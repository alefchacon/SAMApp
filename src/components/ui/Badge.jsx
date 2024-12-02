export default function Badge({ children }) {
  return (
    <span
      className="badge flex-row justify-content-center align-items-center"
    >
      {children}
    </span>
  );
}
