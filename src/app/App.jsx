//LIBRARIES
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// FEATURES
import SpecieDashboard from "./routes/app/SpecieDashboard";
import SpecimenForm from "./routes/app/NewSpecimen/SpecimenForm.jsx";
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
// CSS
import "./App.css";

import useAccessRequests from "../features/access/businessLogic/useAccessRequests.jsx";
import Profile from "./routes/app/Profile.jsx";
import useSession from "../features/auth/businessLogic/useSession.jsx";

function App() {
  const [species, setSpecies] = useState([]);
  const [selectedSpecie, setSelectedSpecie] = useState();
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === ROLE_TYPES.TECHNICAL_PERSON;

  const { pendingAccessRequestCount, getPendingAccessRequestCount } =
    useAccessRequests();

  useEffect(() => {
    if (isTechnicalPerson) {
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
      <Navbar
        profile={profile}
        accessRequestCount={pendingAccessRequestCount}
      ></Navbar>
      <main ref={mainDivRef}>
        {/*SPECIE AND SPECIMEN*/}

        <Routes>

          <Route
            path={"/solicitudes"}
            element={
              <AuthGuard profile={profile} technicalPersonOnly>
                <AccessRequests />
              </AuthGuard>
            }
          ></Route>
          <Route
            path={"/fichas"}
            element={
              <AuthGuard profile={profile}>
                <Photosheets isTechnicalPerson={isTechnicalPerson} />
              </AuthGuard>
            }
          ></Route>
          <Route path={"/solicitudes"} element={<AccessRequests />}></Route>

          <Route
            path={ROUTES.ADD_SPECIMEN}
            element={
              <AuthGuard profile={profile} technicalPersonOnly>
                <SpecimenForm
                  selectedSpecie={selectedSpecie}
                  onResetScroll={resetScroll}
                ></SpecimenForm>
              </AuthGuard>
            }
          ></Route>

          <Route
            path={`/`}
            element={
              <SpecieDashboard
                onSpecieSelection={handleSelectedSpecieChange}
                role={profile?.role}
              />
            }
          ></Route>
          <Route
            path={ROUTES.REQUEST_ACCESS}
            element={
              <AuthGuard profile={profile} visitorOnly>
                <AccessRequestForm />
              </AuthGuard>
            }
          ></Route>

          <Route
            path={ROUTES.PERSONAL}
            element={
              <AuthGuard profile={profile} technicalPersonOnly>
                <Users />
              </AuthGuard>
            }
          ></Route>
          <Route
            path={ROUTES.MIGRATE}
            element={
              <AuthGuard profile={profile} technicalPersonOnly>
                <Migrate />
              </AuthGuard>
            }
          ></Route>
          <Route
            path={ROUTES.PROFILE}
            element={<Profile profile={profile} />}
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
