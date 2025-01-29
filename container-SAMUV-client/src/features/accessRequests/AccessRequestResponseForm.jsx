import Button from "../../components/ui/Button";
import AccessRequest from "./components/AccessRequest";
export default function AccessRequestResponseForm({ accessRequest }) {
  return (
    <div className="flex-col">
      <AccessRequest
        fullheight={true}
        accessRequest={accessRequest}
      ></AccessRequest>
      <div className="button-row">
        <Button iconType="thumb_down" className="danger secondary">
          Rechazar
        </Button>
        <Button iconType="thumb_up">Conceder acceso</Button>
      </div>
    </div>
  );
}
