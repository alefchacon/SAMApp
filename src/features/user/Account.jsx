import { useState, useRef, useEffect } from "react";

import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import DropdownItem from "../../components/ui/DropdownItem";
import { useModal } from "../../components/contexts/ModalContext";

import LogInForm from "./LogInForm";
export default function Account({
  authenticated = true,
  accessRequestCount = "",
}) {
  const { showModal } = useModal();

  function AccountHeader() {
    return <div className="flex-col">Nombre del usuario</div>;
  }

  return (
    <>
      {authenticated ? (
        <div className="flex-row align-items-center">
          <div style={{ position: "relative" }}>
            {accessRequestCount && (
              <span
                className="flex-row justify-content-center align-items-center"
                style={{
                  backgroundColor: "var(--error)",
                  position: "absolute",
                  top: -10,
                  right: -1,
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
              className="icon-only selectable"
            ></Button>
          </div>
          <Dropdown header={<AccountHeader />}>
            <DropdownItem primary={"Perfil"} />
            <DropdownItem primary={"Salir"} />
          </Dropdown>
        </div>
      ) : (
        <div className="flex-row">
          <Button
            iconType="login"
            onClick={() => showModal("Entrar", <LogInForm />)}
          >
            Entrar
          </Button>
        </div>
      )}
    </>
  );
}
