export default function Card({ children, className, style }) {
  return (
    <div
      className={`card bg-white rounded-20 border ${className} shadow-all`}
    >
      {children}
    </div>
  );
}
