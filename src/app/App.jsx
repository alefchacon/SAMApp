//LIBRARIES
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// FEATURES
import SpecieDashboard from "./routes/app/SpecieDashboard";
import SpecimenEditForm from "./routes/app/NewSpecimen/SpecimenEditForm.jsx";
import SpecimenAddForm from "./routes/app/NewSpecimen/SpecimenAddForm.jsx";
import Landing from "./routes/app/Landing";
import Searchbar from "../components/ui/Searchbar";
import AccessRequests from "./routes/app/AccessRequests";
import Photosheets from "./routes/app/Photosheets";
import ROUTES from "../stores/routes";
import AccessRequestForm from "./routes/app/AccessRequestForm";
import Users from "./routes/app/Users.jsx";
import Migrate from "./routes/app/Migrate.jsx";

// COMPONENTS
import AuthGuard from "../components/logic/AuthGuard.jsx";
import { ROLE_TYPES } from "../stores/roleTypes";

import Navbar from "../components/ui/Navbar";
import { useStatus } from "../components/contexts/StatusContext";
import { useAxiosInterceptors } from "../dataAccess/useAxiosInterceptors.jsx";
// CSS
import "./App.css";

import useAccessRequests from "../features/access/businessLogic/useAccessRequests.jsx";
import SignupForm from "./routes/app/SignupForm.jsx";
import Profile from "./routes/app/Profile.jsx";

function App() {
  useAxiosInterceptors();
  const location = useLocation();
  const [species, setSpecies] = useState([]);
  const [selectedSpecie, setSelectedSpecie] = useState();
  const { profile } = useStatus();
  const ROLE = profile?.role ?? ROLE_TYPES.VISITOR;

  const {
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
  } = useAccessRequests();

  useEffect(() => {
    if (ROLE === ROLE_TYPES.TECHNICAL_PERSON) {
      getPendingAccessRequestCount();
    }
  }, []);

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    setSelectedSpecie(newSelectedSpecie);
  };

  const mainDivRef = useRef(null);
  const resetScroll = () => {
    if (mainDivRef.current) {
      mainDivRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <Navbar accessRequestCount={pendingAccessRequestCount}></Navbar>
      <main ref={mainDivRef}>
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
              <AuthGuard>
                <Photosheets role={ROLE} />
              </AuthGuard>
            }
          ></Route>
          <Route path={"/solicitudes"} element={<AccessRequests />}></Route>

          <Route
            path={ROUTES.ADD_SPECIMEN}
            element={
              <SpecimenAddForm
                selectedSpecie={selectedSpecie}
                onResetScroll={resetScroll}
              ></SpecimenAddForm>
            }
          ></Route>
          <Route
            path={`${ROUTES.EDIT_SPECIMEN}/:specimenId`}
            element={
              <SpecimenEditForm
                selectedSpecie={selectedSpecie}
                onResetScroll={resetScroll}
              ></SpecimenEditForm>
            }
          ></Route>

          <Route
            path={`/${ROUTES.COLLECTION}/:epithet?`}
            element={
              <SpecieDashboard
                onSpecieSelection={handleSelectedSpecieChange}
                role={ROLE}
              />
            }
          ></Route>
          <Route
            path={ROUTES.SOLICITAR_ACCESO}
            element={<AccessRequestForm />}
          ></Route>
          <Route path={ROUTES.PERSONAL} element={<Users />}></Route>
          <Route path={ROUTES.MIGRAR} element={<Migrate />}></Route>
          <Route path={ROUTES.ENTRAR} element={<SignupForm />}></Route>
          <Route
            path={ROUTES.PROFILE}
            element={<Profile profile={profile} />}
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
