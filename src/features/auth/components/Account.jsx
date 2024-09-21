import { useState, useRef, useEffect } from "react";

import Button from "../../../components/ui/Button";
import { useModal } from "../../../components/contexts/ModalContext";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import { useStatus } from "../../../components/contexts/StatusContext";
import Dropdown from "../../../components/ui/Dropdown";
import DropdownItem from "../../../components/ui/DropdownItem";

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
              {accessRequestCount > 0 && (
                <span
                  className="flex-row justify-content-center align-items-center"
                  style={{
                    backgroundColor: "var(--error)",
                    position: "absolute",
                    top: -10,
                    right: -10,
                    borderRadius: "50%",
                    padding: 2,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  {accessRequestCount}
                </span>
              )}
              <Button
                iconType="notifications"
                className="icon-only secondary"
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
