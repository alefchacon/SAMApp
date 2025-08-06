import React from "react";
//import refreshToken from "../businessLogic/refreshToken";

import useAuth from "../businessLogic/useAuth";
import useSession from "../businessLogic/useSession";
import { Button } from "@/components/ui/button";
export default function RefreshForm() {
  const { refreshToken } = useAuth();
  const { deleteSession } = useSession();

  return (
    <div className="flex-col">
      <p>¿Necesita más tiempo?</p>
      <div className="button-row">
        <Button type="button" variant={"outline"} onClick={deleteSession}>
          No, cierra la sesión
        </Button>{" "}
        <Button onClick={refreshToken}>Sí, dame más tiempo</Button>
      </div>
    </div>
  );
}
