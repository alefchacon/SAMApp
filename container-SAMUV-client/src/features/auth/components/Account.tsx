import { useState, useRef, useEffect } from "react";

import React from "react";
import { useModal } from "../../../components/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
// import Dropdown from "../../../components/ui/Dropdown";
// import DropdownItem from "../../../components/ui/DropdownItem";
import Badge from "@/components/ui/Badge";
import ROUTES from "../../../routing/FrontendRoutes";
import useSession from "../businessLogic/useSession";

export default function Account({
  authenticated = false,
  accessRequestCount = 0,
}) {
  const { showModal, closeModal } = useModal();
  const { getProfile, deleteSession } = useSession();
  const profile = getProfile();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    deleteSession();
  };

  if (profile.isVisitor()) {
    return (
      <div className="flex-row">
        <button
          className="selectable-dark rounded-sm p-1"
          onClick={() =>
            showModal({
              title: "Entrar",
              content: <LogInForm onSubmit={closeModal} />,
              dismissable: true,
              maxHeight: "30%",
            })
          }
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="flex-row align-items-center gap-1rem selectable-dark rounded-5 nav-link">
      {/*
        <Dropdown
          header={
            <div>
              <p className="font-weight-600">@{profile.username}</p>
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
              */}
    </div>
  );
}
