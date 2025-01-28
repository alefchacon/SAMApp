//LIBRARIES
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "moment/dist/locale/es-mx";
import moment from "moment";
// FEATURES
import SpecieDashboard from "./routes/app/SpecieDashboard";
import SpecimenForm from "./routes/app/SpecimenForm.jsx";
import AccessRequests from "./routes/app/AccessRequests";
import Photosheets from "./routes/app/Photosheets";
import ROUTES from "../routing/frontendRoutes.js";
import AccessRequestForm from "./routes/app/AccessRequestForm";
import Users from "./routes/app/Users.jsx";
import Migrate from "./routes/app/Migrate.jsx";
import Search from "./routes/app/Search.jsx";
import AboutCollection from "./routes/app/AboutCollection.jsx";
import AboutInstitute from "./routes/app/AboutInstitute.jsx";
import AboutSystem from "./routes/app/AboutSystem.jsx";
// COMPONENTS
import RouteGuard from "../routing/RouteGuard.jsx";
import { ROLE_TYPES } from "../stores/roleTypes";
import Navbar from "../components/ui/navbar/Navbar.jsx";
// CSS
import "./App.css";

import useAccessRequests from "../features/accessRequests/businessLogic/useAccessRequests.jsx";
import Profile from "./routes/app/Profile.jsx";
import useSession from "../features/auth/businessLogic/useSession.jsx";
import Landing from "./routes/app/Landing.jsx";

function App() {
  moment.locale("es-mx");
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
      <main  
        ref={mainDivRef}
        className="flex-row h-100 overflow-auto"
      >
        <Routes>
            <Route
              path={ROUTES.REQUESTS}
              element={
                <RouteGuard profile={profile} technicalPersonOnly>
                  <AccessRequests />
                </RouteGuard>
              }
            ></Route>

            <Route
              path={ROUTES.PHOTOSHEETS}
              element={
                <RouteGuard profile={profile}>
                  <Photosheets isTechnicalPerson={isTechnicalPerson} />
                </RouteGuard>
              }
            ></Route>

            <Route 
              path={ROUTES.REQUESTS} 
              element={<AccessRequests />}>  
            </Route>

            <Route
              path={ROUTES.ADD_SPECIMEN}
              element={
                <RouteGuard profile={profile} technicalPersonOnly>
                  <SpecimenForm
                    selectedSpecie={selectedSpecie}
                    onResetScroll={resetScroll}
                  ></SpecimenForm>
                </RouteGuard>
              }
            ></Route>

            <Route
              index
              path={ROUTES.LANDING}
              element={
                <Landing/>
              }
            ></Route>
            <Route
              path={ROUTES.SEARCH}
              element={
                <Search/>
              }
            ></Route>
            <Route
              path={`${ROUTES.COLLECTION}/:specieId`}
              element={
                <SpecieDashboard
                  onSpecieSelection={handleSelectedSpecieChange}
                  role={profile?.role}
                />
              }
            ></Route>
            <Route
              path={ROUTES.COLLECTION}
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
                <RouteGuard profile={profile} visitorOnly>
                  <AccessRequestForm />
                </RouteGuard>
              }
            ></Route>

            <Route
              path={ROUTES.PERSONAL}
              element={
                <RouteGuard profile={profile} technicalPersonOnly>
                  <Users />
                </RouteGuard>
              }
            ></Route>
            <Route
              path={ROUTES.MIGRATE}
              element={
                <RouteGuard profile={profile} technicalPersonOnly>
                  <Migrate />
                </RouteGuard>
              }
            ></Route>
            <Route
              path={ROUTES.PROFILE}
              element={
                <RouteGuard profile={profile}>
                  <Profile profile={profile}></Profile>
                </RouteGuard>
              }
            ></Route>
            <Route
              path={ROUTES.ABOUT_COLLECTION}
              element={
                <AboutCollection></AboutCollection>
              }
            ></Route>
            <Route
              path={ROUTES.ABOUT_INSTITUTE}
              element={
                <AboutInstitute></AboutInstitute>
              }
            ></Route>
            <Route
              path={ROUTES.ABOUT_SYSTEM}
              element={
                <AboutSystem></AboutSystem>
              }
            ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
