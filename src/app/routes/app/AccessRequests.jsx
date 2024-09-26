import { useState, useEffect } from "react";
//import { getAccessRequests } from "../../../features/access/businessLogic/getAccessRequests";
import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { useModal } from "../../../components/contexts/ModalContext";
import AccessRequest from "../../../features/access/components/AccessRequest";
import Card from "../../../components/ui/Card";
import Header from "../../../components/ui/Header";
import HeaderPage from "../../../components/ui/HeaderPage";
import Footer from "../../../components/ui/Footer";
import RequestAccessResponseForm from "../../../features/access/RequestAccessResponseForm";

import useAccessRequests from "../../../features/access/businessLogic/useAccessRequests";

import NoResults from "../../../components/ui/NoResults";

import {
  getPendingAccessRequests,
  getPendingAccessRequestsCount,
} from "../../../features/access/businessLogic/getAccessRequests";

export default function AccessRequests() {
  const [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
  ] = useAccessRequests();

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
    <div
      className="flex-col w-100"
      style={{
        overflowY: "scroll",
      }}
    >
      <HeaderPage title="Solicitudes de acceso"></HeaderPage>
      <div
        className="flex-col h-fit-content gap-1rem page-padding h-100"
        style={{ flexGrow: 1 }}
      >
        <br />
        {pendingAccessRequestCount > 0 ? (
          pendingAccessRequests.map((accessRequest, index) => (
            <Card className={"p-2rem"}>
              <AccessRequest
                key={index}
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
      </div>
      <Footer></Footer>
    </div>
  );
}
