import React from "react";

import { Link, useLocation } from "react-router-dom";
import Account from "../../../features/auth/components/Account";
import Button from "../ButtonCustom";
import ProgressBar from "../ProgressBar";
import ROUTES from "../../../routing/FrontendRoutes";
import { useStatus } from "../../contexts/StatusContext";
import NavLink from "./NavLink";
import { UserRoles } from "@/stores/EUserRoles";
import { useState } from "react";
import SearchInput from "../SearchInput";
import useSearch from "@/features/specie/businessLogic/useSearch";
import { IProfile } from "@/features/auth/domain/Profile";
import "../../../app/App.css";
import { Home, PawPrint } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface INavbarProps {
  accessRequestCount: number;
  profile: IProfile;
}

export default function Navbar({
  accessRequestCount = 0,
  profile,
}: INavbarProps) {
  const { loading } = useStatus();
  const { search } = useSearch();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleShowMobileMeun = () => setShowMobileMenu(!showMobileMenu);

  const leftMenu = (
    <>
      <NavLink route={"/"} label={"Inicio"} selected={pathname === "/"}>
        <Home></Home> Inicio
      </NavLink>

      <NavLink
        route={ROUTES.SPECIES}
        label={"Colección"}
        selected={pathname.includes(ROUTES.SPECIES)}
      >
        <PawPrint></PawPrint> Colección
      </NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger className="nav-link flex flex-row selectable-dark p-1 align-center rounded-sm">
          Sobre nosotros...
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {profile?.role === UserRoles.TECHNICAL_PERSON && (
        <>
          <NavLink
            route={ROUTES.PHOTOSHEETS}
            label={"Fichas de fotocolecta"}
            iconType={"image"}
            selected={pathname.includes(ROUTES.PHOTOSHEETS)}
          ></NavLink>
          <NavLink
            route={ROUTES.PERSONAL}
            label={"Personal"}
            iconType={"group"}
            selected={pathname.includes(ROUTES.PERSONAL)}
          ></NavLink>
        </>
      )}
    </>
  );

  const rightMenu = (
    <>
      <div className="gap-3">
        <div
          style={{
            position: "relative",
          }}
        >
          {accessRequestCount > 0 && <div>accessRequestCount</div>}

          {profile?.role === UserRoles.TECHNICAL_PERSON && (
            <NavLink
              route={ROUTES.REQUESTS}
              iconType={"notifications"}
              selected={pathname.includes(ROUTES.REQUESTS)}
            ></NavLink>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <SearchInput placeholder={``} onSubmit={search}></SearchInput>
          <Account accessRequestCount={accessRequestCount}></Account>
        </div>
      </div>
    </>
  );

  return (
    <>
      <span className="main-title-uv">Universidad Veracruzana</span>
      <nav className="flex flex-column bg-gradient-2 relative">
        <div className="flex flex-row justify-content-between w-full">
          <div className="left-side flex flex-row gap-3 hide-if-mobile">
            {leftMenu}
          </div>
          <span></span>
          <div className="flex-grow-1"></div>
          <div className="right-side hide-if-mobile flex flex-row gap-3">
            {rightMenu}
          </div>
          <button
            className="flex-if-mobile hide-if-desktop"
            onClick={toggleShowMobileMeun}
          >
            sadf
          </button>
        </div>
        <div
          className={`shrink flex-col flex-if-mobile hide-if-desktop ${
            showMobileMenu ? "test1" : "shrink"
          }`}
        >
          {leftMenu}
          {rightMenu}
        </div>
        {loading && <ProgressBar main></ProgressBar>}
      </nav>
    </>
  );
}
