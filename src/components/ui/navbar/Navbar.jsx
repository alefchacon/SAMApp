import { Link, useLocation } from "react-router-dom";
import Dropdown from "../Dropdown";
import DropdownItem from "../DropdownItem";
import InfoItem from "../InfoItem";
import Account from "../../../features/auth/components/Account";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import Searchbar from "../Searchbar";
import ROUTES from "../../../stores/routes";
import ButtonIcon from "../ButtonIcon";
import { useStatus } from "../../contexts/StatusContext";
import NavLink from "./NavLink";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { useState } from "react";
import Badge from "../Badge";
export default function Navbar({ accessRequestCount = 0, profile }) {
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
      

      {profile?.role !== ROLE_TYPES.VISITOR && (
        <NavLink 
          route={ROUTES.PHOTOSHEETS} 
          label={"Fichas fotográficas"}
          iconType={"image"}
          selected={pathname.includes(ROUTES.PHOTOSHEETS)}
        ></NavLink>
      )}

      {profile?.role === ROLE_TYPES.TECHNICAL_PERSON && (
        <NavLink 
          route={ROUTES.PERSONAL} 
          label={"Personal"}
          iconType={"group"}
          selected={pathname.includes(ROUTES.PERSONAL)}
        ></NavLink>
      )}

      <Dropdown
        className={"nav-link selectable-dark h-100"}
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
        <div style={{
          position: "relative"
        }}>
          {
            accessRequestCount > 0 &&
            <Badge>{accessRequestCount}</Badge>
          }

          {profile?.role === ROLE_TYPES.TECHNICAL_PERSON && (
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
          className="left-side flex-row align-items-center hide-if-mobile h-100 gap-05rem flex-grow-1"
        >
          {leftMenu}
        </div>
      </div>
      <span></span>
      <div className="flex-grow-1"></div>
      <div className="right-side hide-if-mobile flex-row gap-1rem h-100">
        {rightMenu}
      </div>

      <ButtonIcon 
        white 
        className="flex-if-mobile hide-if-desktop" 
        iconType={"menu"}
        onClick={toggleShowMobileMeun}
      ></ButtonIcon>
      </div>
      <div className={`shrink flex-col flex-if-mobile hide-if-desktop ${showMobileMenu ? "grow" : "shrink"}`}>
        {leftMenu}
        {rightMenu}
      </div>
      {loading && <ProgressBar main></ProgressBar>}
    </nav>
    </>
  );
}
