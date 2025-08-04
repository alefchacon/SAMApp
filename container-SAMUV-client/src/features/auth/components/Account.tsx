import { useState, useRef, useEffect } from "react";

import React from "react";
import { useModal } from "../../../components/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
// import Dropdown from "../../../components/ui/Dropdown";
// import DropdownItem from "../../../components/ui/DropdownItem";
import useSession from "../businessLogic/useSession";
import DialogUncontrolled from "@/components/ui/DialogUncontrolled";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FrontendRoutes from "@/routing/FrontendRoutes";
import { LogIn } from "lucide-react";
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
        <DialogUncontrolled
          title="Entrar"
          trigger={
            <button className="selectable-dark rounded-sm p-1 py-2 flex flex-row gap-2 items-center">
              <LogIn></LogIn> Entrar
            </button>
          }
        >
          <LogInForm></LogInForm>
        </DialogUncontrolled>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row selectable-dark p-1 items-center rounded-sm">
        @{profile.username}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(FrontendRoutes.PROFILE)}>
          Ver perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
