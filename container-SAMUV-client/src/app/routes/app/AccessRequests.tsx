import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CardBase from "@/components/ui/CardBase";
import Page from "../../../components/ui/Page";
import useAccessRequests from "../../../features/accessRequests/businessLogic/useAccessRequests";
import NoResults from "../../../components/ui/NoResults";
import { AtSign, ThumbsUp, ThumbsDown } from "lucide-react";
import { ORCIDIcon } from "@/components/ui/ORCIDIcon";
import IconText from "@/components/ui/IconText";
import { toast } from "sonner";

export default function AccessRequests() {
  const {
    pendingAccessRequests,
    getPendingAccessRequests,
    approveAccessRequest,
    rejectAccessRequest,
  } = useAccessRequests();

  useEffect(() => {
    getPendingAccessRequests();
  }, []);

  return (
    <Page title={"Solicitudes de acceso"} disableShadow>
      <div className="grid gap-5 w-full">
        {pendingAccessRequests.length > 0 ? (
          pendingAccessRequests.map((accessRequest, index) => (
            <CardBase
              key={index}
              title={accessRequest.academic?.fullName}
              description={accessRequest.about}
              action={"asdf"}
              content={
                <div className="flex flex-col gap-2">
                  <IconText
                    icon={<ORCIDIcon />}
                    text={accessRequest.orcid}
                  ></IconText>
                  <IconText
                    icon={<AtSign />}
                    text={accessRequest.academic?.user.email}
                  ></IconText>
                </div>
              }
              footer={
                <div className="button-row">
                  {" "}
                  <Button
                    variant={"outline"}
                    onClick={() => rejectAccessRequest(accessRequest.id)}
                  >
                    <ThumbsDown></ThumbsDown> Rechazar
                  </Button>
                  <Button
                    onClick={() => approveAccessRequest(accessRequest.id)}
                  >
                    <ThumbsUp></ThumbsUp> Conceder acceso
                  </Button>
                </div>
              }
            ></CardBase>
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </Page>
  );
}
