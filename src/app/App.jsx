//LIBRARIES
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

// FEATURES
import SpecieDashboard from "./routes/app/SpecieDashboard";
import NewSpecie from "./routes/app/NewSpecie";
import Landing from "./routes/app/Landing";
import Searchbar from "../components/ui/Searchbar";
import AccessRequests from "./routes/app/AccessRequests";

import SpecieList from "../features/specie/components/SpecieList";
import SpecieDetail from "../features/specie/components/SpecieDetail";

import { mockGetSpecies } from "../features/specie/api/getSpecies";

import Account from "../features/user/Account";

// COMPONENTS
import FormTemplate from "../components/ui/FormTemplate";
import Stepper from "../components/ui/Stepper";
import Dropdown from "../components/ui/Dropdown";
import DropdownItem from "../components/ui/DropdownItem";
import Multigraph from "../features/graphing/Multigraph";
import Button from "../components/ui/Button";
import InfoItem from "../components/InfoItem";
import ProgressBar from "../components/ui/ProgressBar";

// CSS
import "./App.css";

import { getAccessRequestsCount } from "../features/access/api/getAccessRequests";
function App() {
  const location = useLocation();
  const [species, setSpecies] = useState([]);
  const [accessRequestCount, setAccessRequestCount] = useState("");

  useEffect(() => {
    async function fetchSpecies() {
      const species = await mockGetSpecies();
      const accessRequestResponse = await getAccessRequestsCount();
      setAccessRequestCount(accessRequestResponse.data);
      setSpecies(species);
    }

    fetchSpecies();
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/agregarEspecie") {
      console.log("YEAAA");
    }
  }, [location]);

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    //setSelectedSpecie(newSelectedSpecie);
    console.log(newSelectedSpecie);
  };

  return (
    <>
      <nav
        className="flex-row justify-content-space-between"
        style={{ minHeight: "70px", position: "relative" }}
      >
        <div className="flex-row align-items-center gap-2rem">
          NAVBAR
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
              <DropdownItem
                primary={"Instituto de Investigaciones Biológicas"}
              />
              <DropdownItem primary={"Otra opción idk"} />
            </Dropdown>
          </div>
        </div>
        <span></span>
        {/*
        <Searchbar items={species}></Searchbar>
        */}
        <div className="flex-row">
          <Button iconType="search" className="secondary"></Button>
          <div className="hide-if-mobile">
            <Account accessRequestCount={accessRequestCount}></Account>
          </div>
          <Button
            className="secondary flex-if-mobile hide-if-desktop"
            iconType="menu"
          ></Button>
        </div>
        <ProgressBar main></ProgressBar>
      </nav>
      <main>
        {/*SPECIE AND SPECIMEN*/}

        <Routes>
          <Route
            path={"/"}
            element={
              <Landing species={species}>
                <Searchbar items={species}></Searchbar>
              </Landing>
            }
          ></Route>
          <Route path={"/solicitudes"} element={<AccessRequests />}></Route>

          <Route
            path="/Test"
            element={
              /*
              <FormTemplate title="Agregar espécimen">
                <NewSpecimen></NewSpecimen>
              </FormTemplate>
              */
              <div
                className="p-1rem gap-1rem w-100"
                style={{ backgroundColor: "red", display: "block" }}
              ></div>
            }
          ></Route>

          <Route
            path={"/coleccion?:name?/:catalog_id?"}
            element={
              <SpecieDashboard onSelectionChange={handleSelectedSpecieChange} />
            }
          ></Route>
          <Route path={"/agregarEspecie"} element={<NewSpecie />}></Route>
          {/*
          
          <Route
            path={"/editarEspecie"}
            element={<NewSpecie specie={selectedSpecie} />}
          ></Route>
          */}
        </Routes>
      </main>
    </>
  );
}

export default App;
