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
import TextField from "../components/ui/TextField";
import NewSpecimen from "./routes/app/NewSpecimen/NewSpecimen";
import Landing from "./routes/app/Landing";
import Searchbar from "../components/ui/Searchbar";

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
      <nav className="flex-row justify-content-space-between">
        <div className="flex-row gap-1rem align-items-center hide-if-mobile">
          NAVBAR
          <Link to={"/fichas"} className="selectable p-1rem rounded">
            Fichas fotográficas
          </Link>
          <Dropdown header={"Acerca de"}>
            <DropdownItem primary={"Instituto de Investigaciones Biológicas"} />
            <DropdownItem primary={"Otra opción idk"} />
          </Dropdown>
        </div>
        <span></span>
        {/*
        <Searchbar items={species}></Searchbar>
        */}
        <div className="hide-if-mobile">
          <Account accessRequestCount={accessRequestCount}></Account>
        </div>
        <span className="material-symbols-outlined flex-if-mobile hide-if-desktop">
          menu
        </span>
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

          <Route
            path="/Test"
            element={
              /*
              <FormTemplate title="Agregar espécimen">
                <NewSpecimen></NewSpecimen>
              </FormTemplate>
              */
              <div
                className="flex-row p-1rem gap-1rem w-100"
                style={{ backgroundColor: "red" }}
              >
                <Multigraph></Multigraph>
                <Multigraph></Multigraph>
              </div>
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
