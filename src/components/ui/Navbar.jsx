import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import InfoItem from "./InfoItem";
import Account from "../../features/auth/components/Account";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import TextField from "./TextField";

import ROUTES from "../../stores/routes";

import { useStatus } from "../contexts/StatusContext";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
export default function Navbar({ accessRequestCount = 0 }) {
  const { loading } = useStatus();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("q", searchQuery);

    // Navigate to the same page but with new search params
    navigate(ROUTES.BUSCAR.concat(`?${params.toString()}`));
  };

  return (
    <nav
      className="flex-row justify-content-space-between shadow-down bg-gradient"
      style={{ minHeight: "60px", position: "relative", padding: "0 1rem" }}
    >
      <div className="flex-row align-items-center gap-2rem h-100">
        <span className="material-symbols-outlined">nest_eco_leaf</span>

        <div
          className="left-side flex-row align-items-center hide-if-mobile h-100 gap-2rem"
          style={{ flex: 1 }}
        >
          <Link to={"/coleccion"} className="selectable nav-link">
            <InfoItem label={"Colección"} iconType={"pets"}></InfoItem>
          </Link>
          <Link to={"/fichas"} className="selectable nav-link">
            <InfoItem label={"Fichas"} iconType={"photo"}></InfoItem>
          </Link>
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
      <div style={{ flex: 1 }}></div>
      <div
        className="right-side align-items-center flex-row gap-1rem"
        style={{ flex: 2 }}
      >
        <TextField
          className="nav-input"
          placeholder={"Buscar especies"}
          iconType={"search"}
          onEnter={handleSearch}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeydown={handleSearch}
        ></TextField>

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
