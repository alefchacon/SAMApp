export default function Header({ children, header = "header" }) {
  return (
    <div className={`specie-header p-1rem bg-white rounded-20`}>
      <div className={"p-1rem flex-col gap-1rem"}>
        <h1>{header}</h1>
        {children}
      </div>
    </div>
  );
}
