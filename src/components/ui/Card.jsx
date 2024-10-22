export default function Card({ children, className, style }) {
  return (
    <div
      className={`card bg-white rounded-20 border ${className}`}
      style={{ boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.3)" }}
    >
      {children}
    </div>
  );
}
