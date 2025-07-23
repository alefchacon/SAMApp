import React from "react";

import { Link, useLocation } from "react-router-dom";
import Account from "../../../features/auth/components/Account";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import ROUTES from "../../../routing/FrontendRoutes";
import { useStatus } from "../../contexts/StatusContext";
import NavLink from "./NavLink";
import { UserRoles } from "@/stores/EUserRoles";
import { useState } from "react";
import Badge from "../Badge";
import { IProfile } from "@/features/auth/domain/Profile";
import "../../../app/App.css";

interface INavbarProps {
  accessRequestCount: number;
  profile: IProfile;
}

export default function Navbar({
  accessRequestCount = 0,
  profile,
}: INavbarProps) {
  const { loading } = useStatus();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleShowMobileMeun = () => setShowMobileMenu(!showMobileMenu);

  const leftMenu = (
    <>
      <NavLink
        route={ROUTES.LANDING}
        label={"Inicio"}
        iconType={"home"}
        selected={pathname === "/"}
      ></NavLink>

      <NavLink
        route={ROUTES.COLLECTION}
        label={"Colección"}
        iconType={"pets"}
        selected={pathname.includes(ROUTES.COLLECTION)}
      ></NavLink>

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
          {accessRequestCount > 0 && (
            <Badge>
              <div>accessRequestCount</div>
            </Badge>
          )}

          {profile?.role === UserRoles.TECHNICAL_PERSON && (
            <NavLink
              route={ROUTES.REQUESTS}
              iconType={"notifications"}
              selected={pathname.includes(ROUTES.REQUESTS)}
            ></NavLink>
          )}
        </div>
        <Account accessRequestCount={accessRequestCount}></Account>
      </div>
    </>
  );

  return (
    <>
      <span className="main-title-uv">Universidad Veracruzana</span>
      <nav className="flex flex-column bg-gradient-2 relative">
        <div className="flex-row">
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
