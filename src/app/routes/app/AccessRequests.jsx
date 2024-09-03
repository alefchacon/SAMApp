import { useState, useEffect } from "react";
import { getAccessRequests } from "../../../features/access/dataAccess/getAccessRequests";
import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { useModal } from "../../../components/contexts/ModalContext";
import AccessRequest from "../../../features/access/components/AccessRequest";
import Card from "../../../components/ui/Card";
import Header from "../../../components/ui/Header";

import RequestAccessResponseForm from "../../../features/access/RequestAccessResponseForm";

export default function AccessRequests() {
  const [accessRequests, setAccessRequest] = useState([]);

  const { showModal } = useModal();

  useEffect(() => {
    fetchAccessRequests();
  }, []);

  async function fetchAccessRequests() {
    const response = await getAccessRequests();
    console.log(response);
    setAccessRequest(response.data);
  }

  const showResponseModal = (accessRequest) => {
    showModal(
      "Responder solicitud de acceso",
      <RequestAccessResponseForm accessRequest={accessRequest} />
    );
  };

  return (
    <div
      className="flex-col w-100"
      style={{
        overflow: "scroll",
      }}
    >
      <Header header="Solicitudes de acceso"></Header>
      <div className="p-2rem h-fit-content gap-1rem  grid">
        {accessRequests.map((accessRequest, index) => (
          <Card>
            <AccessRequest
              key={index}
              accessRequest={accessRequest}
              onPrimaryAction={showResponseModal}
            />
            <div className="button-row">
              <Button
                iconType="message"
                onClick={() => showResponseModal(accessRequest)}
              >
                Responder
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
