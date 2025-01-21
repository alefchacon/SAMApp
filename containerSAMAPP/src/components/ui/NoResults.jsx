import { ROLE_TYPES } from "../../stores/roleTypes";

export default function NoResults({ role, itemName = "resultados", button }) {
  return (
    <div className="no-results flex-col h-100 gap-1rem align-items-center p-2rem">
      {" "}
      <img
        src="src\assets\icons\empty-box.svg"
        alt=""
        style={{ width: "150px", opacity: 0.3 }}
      />
      <p style={{ color: "gray", fontSize: 20 }}>
        No se encontraron {itemName}
      </p>
      <br />
      {role === ROLE_TYPES.TECHNICAL_PERSON && button}
    </div>
  );
}
