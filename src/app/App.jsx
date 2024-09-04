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

import {
  mockGetSpecies,
  getSpecieList,
} from "../features/specie/dataAccess/getSpecies";

// COMPONENTS
import Uploader from "../components/ui/Uploader";
import RouteGuard from "../components/logic/RouteGuard";

import { ROLE_TYPES } from "../stores/roleTypes";

import Navbar from "../components/ui/Navbar";
import { useStatus } from "../components/contexts/StatusContext";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
// CSS
import "./App.css";

import { getAccessRequestsCount } from "../features/access/dataAccess/getAccessRequests";
function App() {
  useAxiosInterceptors();
  const location = useLocation();
  const [species, setSpecies] = useState([]);
  const [accessRequestCount, setAccessRequestCount] = useState("");
  const { profile } = useStatus();
  const ROLE = profile?.role ?? ROLE_TYPES.VISITOR;

  /*
  useEffect(() => {
    async function fetchSpecies() {
      //const species = await mockGetSpecies();
      //const accessRequestResponse = await getAccessRequestsCount();
      //setAccessRequestCount(accessRequestResponse.data);
      const species = (await getSpecieList()).data;
      setSpecies(species);
    }

    fetchSpecies();
  }, []);
*/
  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    //setSelectedSpecie(newSelectedSpecie);
    console.log(newSelectedSpecie);
  };

  //console.log("app");

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
                <Photosheets role={ROLE} />
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
              <SpecieDashboard
                onSelectionChange={handleSelectedSpecieChange}
                role={ROLE}
              />
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
