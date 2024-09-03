import Button from "../../../components/ui/Button";
import refreshToken from "../dataAccess/refreshToken";

import { useStatus } from "../../../components/contexts/StatusContext";

export default function RefreshForm() {
  return (
    <div className="flex-col">
      <p>¿Necesita más tiempo?</p>
      <div className="button-row">
        <Button className="secondary" iconType="logout">
          No, cierra la sesión
        </Button>{" "}
        <Button className="primary" iconType="restart_alt">
          Sí, dame más tiempo
        </Button>
      </div>
    </div>
  );
}
