import Button from "../../../components/ui/Button";
//import refreshToken from "../businessLogic/refreshToken";

import { useStatus } from "../../../components/contexts/StatusContext";
import useAuth from "../businessLogic/useAuth";
import useSession from "../businessLogic/useSession";

export default function RefreshForm({ onLogOut }) {
  const { refreshToken } = useAuth();
  const { deleteSession } = useSession();

  return (
    <div className="flex-col">
      <p>¿Necesita más tiempo?</p>
      <div className="button-row">
        <Button className="secondary" iconType="logout" onClick={deleteSession}>
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
