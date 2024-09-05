import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import InfoItem from "./InfoItem";
import Account from "../../features/auth/components/Account";
import Button from "./Button";
import ProgressBar from "./ProgressBar";

import { useStatus } from "../contexts/StatusContext";

export default function Navbar({ accessRequestCount = 0 }) {
  const { loading } = useStatus();

  return (
    <nav
      className="flex-row justify-content-space-between"
      style={{ minHeight: "70px", position: "relative", padding: "0 3rem" }}
    >
      <div className="flex-row align-items-center gap-2rem">
        [Nombre o logo]
        <div className="flex-row gap-1rem align-items-center hide-if-mobile">
          <Link to={"/coleccion"} className="selectable p-1rem rounded">
            <InfoItem label={"Colección"} iconType={"pets"}></InfoItem>
          </Link>
          <Link to={"/fichas"} className="selectable p-1rem rounded">
            <InfoItem
              label={"Fichas fotográficas"}
              iconType={"photo"}
            ></InfoItem>
          </Link>
          <Dropdown
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
      {/*
  <Searchbar items={species}></Searchbar>
  */}
      <div className="flex-row gap-1rem">
        {/*
        <Button iconType="search" className="secondary"></Button>
        */}
        <div className="hide-if-mobile">
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
