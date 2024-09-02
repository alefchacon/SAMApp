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
import Photosheets from "./routes/app/Photosheets";

import SpecieList from "../features/specie/components/SpecieList";
import SpecieDetail from "../features/specie/components/SpecieDetail";

import { mockGetSpecies } from "../features/specie/api/getSpecies";

import Account from "../features/auth/components/Account";
// COMPONENTS
import FormTemplate from "../components/ui/FormTemplate";
import Stepper from "../components/ui/Stepper";
import Dropdown from "../components/ui/Dropdown";
import DropdownItem from "../components/ui/DropdownItem";
import Uploader from "../components/ui/Uploader";
import Button from "../components/ui/Button";
import InfoItem from "../components/ui/InfoItem";
import ProgressBar from "../components/ui/ProgressBar";
import RouteGuard from "../components/logic/RouteGuard";

import Navbar from "../components/ui/Navbar";

import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
// CSS
import "./App.css";

import { getAccessRequestsCount } from "../features/access/api/getAccessRequests";
function App() {
  useAxiosInterceptors();
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
      <Navbar accessRequestCount={accessRequestCount}></Navbar>
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
            path={"/fichas"}
            element={
              <RouteGuard>
                <Photosheets />
              </RouteGuard>
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
              <div className="p-1rem gap-1rem w-100 ">
                <Uploader></Uploader>
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
