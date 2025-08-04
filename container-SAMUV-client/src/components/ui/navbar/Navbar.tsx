import React from "react";

import { Link, useLocation } from "react-router-dom";
import Account from "../../../features/auth/components/Account";
import { Button } from "../button";
import ProgressBar from "../ProgressBar";
import ROUTES from "../../../routing/FrontendRoutes";
import { useStatus } from "../../contexts/StatusContext";
import NavLink from "./NavLink";
import { UserRoles } from "@/stores/EUserRoles";
import { useState } from "react";
import SearchInput from "../SearchInput";
import useSearch from "@/features/specie/businessLogic/useSearch";
import { IProfile, Profile } from "@/features/auth/domain/Profile";
import "../../../app/App.css";
import { Home, PawPrint, Aperture, User, Bell, Info, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../Badge";

interface INavbarProps {
  accessRequestCount: number;
  profile: Profile;
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
        <DropdownMenuTrigger className="flex flex-row selectable-dark p-1 items-center rounded-sm gap-3">
          <Info></Info> Sobre nosotros...
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

      {!profile.isVisitor() && (
        <>
          <NavLink
            route={ROUTES.PHOTOSHEETS}
            selected={pathname.includes(ROUTES.PHOTOSHEETS)}
          >
            <Aperture></Aperture> Fichas fotográficas
          </NavLink>
          <NavLink
            route={ROUTES.PERSONAL}
            selected={pathname.includes(ROUTES.PERSONAL)}
          >
            <User></User> Personal
          </NavLink>
        </>
      )}
    </>
  );

  const rightMenu = (
    <>
      <div className="gap-5 flex flex-row items-center">
        <SearchInput placeholder={``} onSubmit={search}></SearchInput>
        <div className="flex flex-row gap-3 relative">
          {profile?.role === UserRoles.TECHNICAL_PERSON && (
            <NavLink
              route={ROUTES.REQUESTS}
              selected={pathname.includes(ROUTES.REQUESTS)}
            >
              <div className="relative">
                {accessRequestCount > 0 && (
                  <Badge
                    variant={"destructive"}
                    className="h-fit w-fit absolute bottom-3 left-3"
                  >
                    {accessRequestCount}
                  </Badge>
                )}
                <Bell></Bell>
              </div>
            </NavLink>
          )}
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
        </div>
        <div
          className={`shrink flex-col flex-if-mobile hide-if-desktop ${
            showMobileMenu ? "test1" : "shrink"
          }`}
        >
          {leftMenu}
          {rightMenu}
        </div>
        <Button
          className="flex-if-mobile hide-if-desktop"
          onClick={toggleShowMobileMeun}
          variant={"ghost"}
        >
          <Menu />
        </Button>
        {loading && <ProgressBar main></ProgressBar>}
      </nav>
    </>
  );
}
