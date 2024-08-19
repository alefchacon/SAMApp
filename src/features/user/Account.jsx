import { useState, useRef, useEffect } from "react";

import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import DropdownItem from "../../components/ui/DropdownItem";

export default function Account(authenticated = false) {
  function AccountHeader() {
    return (
      <div className="flex-col">
        <p className="caption">Bienvenido,</p>
        Nombre del usuario
      </div>
    );
  }

  return (
    <>
      {authenticated ? (
        <Dropdown header={<AccountHeader />}>
          <DropdownItem primary={"Perfil"} />
          <DropdownItem primary={"Salir"} />
        </Dropdown>
      ) : (
        <Button iconType="login">Entrar</Button>
      )}
    </>
  );
}
