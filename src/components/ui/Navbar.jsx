import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import InfoItem from "./InfoItem";
import Account from "../../features/auth/components/Account";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Searchbar from "./Searchbar";
import ROUTES from "../../stores/routes";

import { useStatus } from "../contexts/StatusContext";

import { ROLE_TYPES } from "../../stores/roleTypes";
export default function Navbar({ accessRequestCount = 0, profile }) {
  const { loading } = useStatus();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

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

  return (
    <nav
      className="flex-row bg-gradient position-relative"
    >
      <div className="flex-row align-items-center gap-2rem h-100">
        <div
          className="left-side flex-row align-items-center hide-if-mobile h-100 gap-2rem flex-grow-1"
        >
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
        </div>
      </div>
      <span></span>
      <div className="flex-grow-1"></div>
      <div className="right-side flex-row gap-1rem h-100 align-items-center">
        <Searchbar></Searchbar>
        <div className="hide-if-mobile flex-row gap-1rem align-items-center">
          <Account accessRequestCount={accessRequestCount}></Account>
        </div>
        <Button
          className="secondary flex-if-mobile hide-if-desktop"
          iconType="menu"
        ></Button>
      </div>
      {loading && <ProgressBar main></ProgressBar>}
    </nav>
  );
}
