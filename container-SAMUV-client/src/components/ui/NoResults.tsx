import React from "react";
import { UserRoles } from "../../stores/EUserRoles";

interface INoResultsProps {
  role?: UserRoles;
  itemName?: string;
  button?: React.ReactNode;
}
export default function NoResults(props: INoResultsProps) {
  const { role = UserRoles.VISITOR, itemName = "resultados", button } = props;

  return (
    <div className="no-results flex-col h-100 gap-1rem align-items-center p-2rem">
      <img
        src="src\assets\icons\empty-box.svg"
        alt=""
        style={{ width: "150px", opacity: 0.3 }}
      />
      <p style={{ color: "gray", fontSize: 20 }}>
        No se encontraron {itemName}
      </p>
      <br />
      {role === UserRoles.TECHNICAL_PERSON && button}
    </div>
  );
}
