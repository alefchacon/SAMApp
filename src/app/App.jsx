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
import NewSpecimen from "./routes/app/NewSpecimen/NewSpecimen";
import NewSpecie from "./routes/app/NewSpecie";
import Landing from "./routes/app/Landing";
import Searchbar from "../components/ui/Searchbar";
import AccessRequests from "./routes/app/AccessRequests";
import Photosheets from "./routes/app/Photosheets";
import UploaderImage from "../components/ui/UploaderImage";
import SpecieList from "../features/specie/components/SpecieList";
import Search from "./routes/app/Search";
import ROUTES from "../stores/routes";
import AccessRequestForm from "./routes/app/AccessRequestForm";
import {
  mockGetSpecies,
  getSpecieList,
} from "../features/specie/businessLogic/getSpecies";
import FormTemplate from "../components/ui/FormTemplate";
// COMPONENTS
import Uploader from "../components/ui/Uploader";
import AuthGuard from "../components/logic/AuthGuard.jsx";
import SignUpGuard from "../components/logic/SignUpGuard.jsx";

import { ROLE_TYPES } from "../stores/roleTypes";

import Navbar from "../components/ui/Navbar";
import { useStatus } from "../components/contexts/StatusContext";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
// CSS
import "./App.css";

import useAccessRequests from "../features/access/businessLogic/useAccessRequests.jsx";
import SignupForm from "./routes/app/SignupForm.jsx";

function App() {
  useAxiosInterceptors();
  const location = useLocation();
  const [species, setSpecies] = useState([]);
  const { profile } = useStatus();
  const ROLE = profile?.role ?? ROLE_TYPES.VISITOR;

  const [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
  ] = useAccessRequests();

  useEffect(() => {
    if (ROLE === ROLE_TYPES.TECHNICAL_PERSON) {
      getPendingAccessRequestCount();
    }
  }, []);

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    //setSelectedSpecie(newSelectedSpecie);
    console.log(newSelectedSpecie);
  };

  //console.log("app");

  return (
    <>
      <Navbar accessRequestCount={pendingAccessRequestCount}></Navbar>
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
          <Route path={ROUTES.BUSCAR} element={<Search />}></Route>
          <Route path={"/solicitudes"} element={<AccessRequests />}></Route>
          <Route
            path={"/fichas"}
            element={
              <AuthGuard>
                <Photosheets role={ROLE} />
              </AuthGuard>
            }
          ></Route>
          <Route path={"/solicitudes"} element={<AccessRequests />}></Route>

          <Route
            path="/Test"
            element={
              <FormTemplate title="Agregar espécimen">
                <NewSpecimen></NewSpecimen>
              </FormTemplate>
              /*
              <div className="p-1rem gap-1rem w-100 ">
              <UploaderImage></UploaderImage>
              </div>
              */
            }
          ></Route>
          <Route
            path={ROUTES.REGISTRARSE.concat("/:token")}
            element={
              <SignUpGuard>
                <SignupForm />
              </SignUpGuard>
            }
          ></Route>

          <Route
            path={`/${ROUTES.COLECCION}?:name?/:catalog_id?`}
            element={
              <SpecieDashboard
                onSelectionChange={handleSelectedSpecieChange}
                role={ROLE}
              />
            }
          ></Route>
          <Route path={"/agregarEspecie"} element={<NewSpecie />}></Route>
          <Route
            path={ROUTES.SOLICITAR_ACCESO}
            element={<AccessRequestForm />}
          ></Route>
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
