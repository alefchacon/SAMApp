import React from "react";
import IconText from "../../../components/ui/IconText";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Button } from "@/components/ui/button";
import { useModal } from "../../../components/contexts/ModalContext";
import {
  AccessRequest,
  defaultAccessRequest,
  IAccessRequest,
} from "../domain/AccessRequest";

interface ICardAccessRequestProps {
  accessRequest: AccessRequest;
}
export default function CardAccessRequest({
  accessRequest = defaultAccessRequest,
}: ICardAccessRequestProps) {
  const { showModal } = useModal();
  const toggleAcademicModal = () => {
    showModal({
      title: "Información del académico",
      content: (
        <div className="flex-col">
          <h3>{`${accessRequest.academic?.names} ${accessRequest.academic?.father_last_name} ${accessRequest.academic?.mother_last_name}`}</h3>
          <p>{accessRequest.academic?.degree}</p>
          <p className="flex-row">
            {accessRequest.academic?.position} en{" "}
            {accessRequest.academic?.college}
          </p>
          <p>
            {accessRequest.academic?.city}, {accessRequest.academic?.state}
          </p>
        </div>
      ),
    });
  };

  return (
    <div className="access-request flex-col max-h-600">
      <div className="flex-col gap-05rem h-100 overflow-hidden flex-grow-1">
        <div className="flex-row gap-1rem align-items-center">
          <IconText
            text={
              <h3>
                {accessRequest.academic?.names + " "}
                {accessRequest.academic?.father_last_name + " "}
                {accessRequest.academic?.mother_last_name}
              </h3>
            }
            iconType={"person"}
          ></IconText>
          <Button className="icon-only" onClick={toggleAcademicModal}>
            Ver info.
          </Button>
        </div>
        <a
          href={`https://orcid.org/${accessRequest.orcid}`}
          className="font-weight-600"
          target="_blank"
        >
          <IconText text={accessRequest.orcid}></IconText>
        </a>

        <a href={`mailto:${accessRequest.academic?.user.email}`}>
          <IconText
            text={accessRequest.academic?.user.email}
            iconType={"email"}
          ></IconText>
        </a>
        <IconText
          fullheight
          text={accessRequest.about}
          iconType={"message"}
        ></IconText>
      </div>
    </div>
  );
}
