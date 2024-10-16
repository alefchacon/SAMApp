import { useState, useRef, useEffect } from "react";

import Button from "../../../components/ui/Button";
import { useModal } from "../../../components/contexts/ModalContext";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import { useStatus } from "../../../components/contexts/StatusContext";
import Dropdown from "../../../components/ui/Dropdown";
import DropdownItem from "../../../components/ui/DropdownItem";
import Badge from "../../../components/ui/Badge";

export default function Account({
  authenticated = false,
  accessRequestCount = "",
}) {
  const { showModal, closeModal } = useModal();
  const { profile, logOutFront } = useStatus();

  const handleLogOut = async () => {
    logOutFront();
  };

  return (
    <>
      {Boolean(profile) ? (
        <div className="flex-row align-items-center gap-1rem">
          <Link to={"/solicitudes"}>
            <div style={{ position: "relative" }}>
              {accessRequestCount > 0 && <Badge>{accessRequestCount}</Badge>}
              <Button
                iconType="notifications"
                className="icon-only color-white"
              ></Button>
            </div>
          </Link>
          <Dropdown
            header={
              <div>
                <p>{profile.names}</p>
              </div>
            }
          >
            <DropdownItem
              primary={"Cerrar sesión"}
              onClick={handleLogOut}
            ></DropdownItem>
          </Dropdown>
        </div>
      ) : (
        <div className="flex-row">
          <Button
            iconType="login"
            onClick={() =>
              showModal(
                "Entrar",
                <LogInForm onSubmit={closeModal} />,
                true,
                "30%"
              )
            }
          >
            Entrar
          </Button>
        </div>
      )}
    </>
  );
}
