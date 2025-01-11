export default function TooltipGraph({ active, label = null, payload = 420 }) {
  const name = payload[0]?.name;
  const value = payload[0]?.value;
  return (
    <div className="bg-black-transparent rounded-5 p-1rem shadow-all flex-col  color-white">
      <p className="flex-row h-100">
        <b>{label ?? name}</b>
      </p>
      <p>
        {value} {value === 1 ? "espécimen" : "especímenes"}
      </p>
    </div>
  );
}
