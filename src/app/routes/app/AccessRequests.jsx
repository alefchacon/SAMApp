import { useEffect } from "react";
import Button from "../../../components/ui/Button";
import { useModal } from "../../../components/contexts/ModalContext";
import AccessRequest from "../../../features/accessRequests/components/AccessRequest";
import Card from "../../../components/ui/Card";
import Page from "../../../components/ui/Page";
import useAccessRequests from "../../../features/accessRequests/businessLogic/useAccessRequests";
import NoResults from "../../../components/ui/NoResults";

export default function AccessRequests() {
  const {
    pendingAccessRequests,
    getPendingAccessRequests,
    approveAccessRequest,
    rejectAccessRequest,
  } = useAccessRequests();

  const { showModal } = useModal();

  useEffect(() => {
    getPendingAccessRequests();
  }, []);

  const handleApproveAccessRequest = (requestId) => {
    approveAccessRequest(requestId);
  };

  const showResponseModal = (accessRequest) => {
    showModal(
      "Responderd solicitud de acceso",
      <div className="flex-col">
        <AccessRequest
          fullheight={true}
          accessRequest={accessRequest}
        ></AccessRequest>
        <div className="button-row">
          <Button iconType="thumb_down" className="danger secondary">
            Rechazar
          </Button>
          <Button
            iconType="thumb_up"
            value={accessRequest.id}
            onClick={handleApproveAccessRequest}
          >
            Conceder acceso
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Page title={"Solicitudes de acceso"} disableShadow>
        {pendingAccessRequests.length > 0 ? (
          pendingAccessRequests.map((accessRequest, index) => (
            <Card className={"p-2rem"} key={index}>
              <AccessRequest
                accessRequest={accessRequest}
                onPrimaryAction={showResponseModal}
              />
              <div className="button-row">
                <Button
                  iconType="thumb_down"
                  className="danger secondary"
                  value={accessRequest.id}
                  onClick={rejectAccessRequest}
                >
                  Rechazar
                </Button>
                <Button
                  iconType="thumb_up"
                  value={accessRequest.id}
                  onClick={approveAccessRequest}
                >
                  Conceder acceso
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <NoResults />
        )}
    </Page>
  );
}
