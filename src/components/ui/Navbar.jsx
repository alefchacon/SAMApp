import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import InfoItem from "./InfoItem";
import Account from "../../features/auth/components/Account";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Searchbar from "./Searchbar";
import ROUTES from "../../stores/routes";
import ButtonIcon from "./ButtonIcon";
import { useStatus } from "../contexts/StatusContext";

import { ROLE_TYPES } from "../../stores/roleTypes";
import { useState } from "react";
export default function Navbar({ accessRequestCount = 0, profile }) {
  const { loading } = useStatus();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleShowMobileMeun = () => setShowMobileMenu(!showMobileMenu);

  const NAV_ITEMS = [
    {
      route: ROUTES.LANDING,
      label: "Inicio",
      iconType: "home",
    },
    {
      route: ROUTES.COLLECTION,
      label: "Colección",
      iconType: "pets",
    },
  ];

  const leftMenu = (
    <>
      {NAV_ITEMS.map((navItem, index) => (
        <Link
          key={index}
          to={navItem.route}
          className={`selectable nav-link ${
            navItem.route === pathname ? "selected" : ""
          }`}
        >
          <InfoItem
            label={navItem.label}
            iconType={navItem.iconType}
          ></InfoItem>
        </Link>
      ))}

      {profile?.role !== ROLE_TYPES.VISITOR && (
        <Link
          to={ROUTES.PHOTOSHEETS}
          className={`selectable nav-link ${
            ROUTES.PHOTOSHEETS === pathname ? "selected" : ""
          }`}
        >
          <InfoItem
            label={"Fichas fotográficas"}
            iconType={"image"}
          ></InfoItem>
        </Link>
      )}

      {profile?.role === ROLE_TYPES.TECHNICAL_PERSON && (
        <Link
          to={ROUTES.PERSONAL}
          className={`selectable nav-link ${
            ROUTES.PERSONAL === pathname ? "selected" : ""
          }`}
        >
          <InfoItem label={"Personal"} iconType={"group"}></InfoItem>
        </Link>
      )}

      <Dropdown
        className={"nav-link"}
        header={
          <InfoItem label={"Acerca de..."} iconType={"help"}></InfoItem>
        }
      >
        <DropdownItem primary={"Instituto de Investigaciones Biológicas"} />
        <DropdownItem primary={"Otra opción idk"} />
      </Dropdown>
    </>
  )

  const rightMenu = (
    <>
      <div className="flex-row gap-1rem align-items-center justify-content-center">
        <Account accessRequestCount={accessRequestCount}></Account>
      </div>
    </>
  )

  return (
    <>
    <span className="main-title-uv">Universidad Veracruzana</span>
    <nav
      className="flex-col bg-gradient position-relative justify-content-center"
    >
      <div className="flex-row">
      <div className="flex-row align-items-center gap-2rem h-100">
        <div
          className="left-side flex-row align-items-center hide-if-mobile h-100 gap-2rem flex-grow-1"
        >
          {leftMenu}
        </div>
      </div>
      <span></span>
      <div className="flex-grow-1"></div>
      <div className="right-side hide-if-mobile  flex-row gap-1rem h-100 align-items-center">
        {rightMenu}
      </div>

      <ButtonIcon 
        white 
        className="flex-if-mobile hide-if-desktop" 
        iconType={"menu"}
        onClick={toggleShowMobileMeun}
      ></ButtonIcon>
      </div>
      <div className={`shrink flex-col flex-if-mobile hide-if-desktop gap-1rem ${showMobileMenu ? "grow" : "shrink"}`}>
        {leftMenu}
        {rightMenu}
      </div>
      {loading && <ProgressBar main></ProgressBar>}
    </nav>
    </>
  );
}
