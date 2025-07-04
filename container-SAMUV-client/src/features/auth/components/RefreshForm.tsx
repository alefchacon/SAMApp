import React from "react";
//import refreshToken from "../businessLogic/refreshToken";

import useAuth from "../businessLogic/useAuth";
import useSession from "../businessLogic/useSession";

export default function RefreshForm() {
  const { refreshToken } = useAuth();
  const { deleteSession } = useSession();

  return (
    <div className="flex-col">
      <p>¿Necesita más tiempo?</p>
      <div className="button-row">
        <button type="button" className="secondary" onClick={deleteSession}>
          No, cierra la sesión
        </button>{" "}
        <button className="primary" onClick={refreshToken}>
          Sí, dame más tiempo
        </button>
      </div>
    </div>
  );
}
