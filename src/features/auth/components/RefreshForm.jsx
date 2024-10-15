import Button from "../../../components/ui/Button";
import refreshToken from "../businessLogic/refreshToken";

import { useStatus } from "../../../components/contexts/StatusContext";

export default function RefreshForm({ onLogOut }) {
  const { logOutFront } = useStatus();

  const handleLogOut = () => {
    logOutFront();
    onLogOut();
  };
  return (
    <div className="flex-col">
      <p>¿Necesita más tiempo?</p>
      <div className="button-row">
        <Button className="secondary" iconType="logout" onClick={handleLogOut}>
          No, cierra la sesión
        </Button>{" "}
        <Button
          className="primary"
          iconType="restart_alt"
          onClick={refreshToken}
        >
          Sí, dame más tiempo
        </Button>
      </div>
    </div>
  );
}
