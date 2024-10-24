import { useState, useRef, useEffect } from "react";

import Button from "../../../components/ui/Button";
import { useModal } from "../../../components/contexts/ModalContext";
import { Link, useNavigate } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import { useStatus } from "../../../components/contexts/StatusContext";
import Dropdown from "../../../components/ui/Dropdown";
import DropdownItem from "../../../components/ui/DropdownItem";
import Badge from "../../../components/ui/Badge";
import ROUTES from "../../../stores/routes";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function Account({
  authenticated = false,
  accessRequestCount = "",
}) {
  const { showModal, closeModal } = useModal();
  const { getProfile, logOutFront } = useStatus();
  const profile = getProfile();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    logOutFront();
  };

  if (profile.role === ROLE_TYPES.VISITOR) {
    return (
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
    );
  }

  return (
    <>
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
              <p>@{profile.username}</p>
            </div>
          }
        >
          <DropdownItem
            primary={"Ver perfil"}
            onClick={() => navigate(ROUTES.PROFILE)}
          ></DropdownItem>
          <hr />
          <DropdownItem
            primary={"Cerrar sesión"}
            onClick={handleLogOut}
          ></DropdownItem>
        </Dropdown>
      </div>
    </>
  );
}
