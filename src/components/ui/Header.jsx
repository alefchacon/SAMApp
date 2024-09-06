export default function Header({ children, header = "header" }) {
  return (
    <div className={`specie-header p-1rem bg-white`}>
      <br />
      <div className={"flex-col gap-1rem"}>
        <h1>{header}</h1>
        {children}
      </div>
    </div>
  );
}
