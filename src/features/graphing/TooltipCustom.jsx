export default function TooltipCustom({ active, label = null, payload = 420 }) {
  const name = payload[0]?.name;
  const value = payload[0]?.value;
  console.log(payload[0]);
  return (
    <div className="bg-black-transparent rounded-20 p-1rem box-shadow flex-col  color-white">
      <p className="flex-row h-100">
        <b>{label ?? name}</b>
      </p>
      <p>
        {value} {value === 1 ? "espécimen" : "especímenes"}
      </p>
    </div>
  );
}
