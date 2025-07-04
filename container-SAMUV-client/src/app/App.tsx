//LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "moment/dist/locale/es-mx";
import moment from "moment";
// FEATURES
import ROUTES from "../routing/FrontendRoutes.js";
import SpecieDashboard from "./routes/app/SpecieDashboard.js";
// COMPONENTS
import { UserRoles } from "@/stores/EUserRoles.js";
import Navbar from "@/components/ui/navbar-ts/Navbar";
// CSS
import "./App.css";

import useAccessRequests from "@/features/accessRequests/businessLogic/useAccessRequests";
import useSession from "@/features/auth/businessLogic/useSession";
import Landing from "./routes/app/Landing.js";

function App() {
  moment.locale("es-mx");
  const [selectedSpecie, setSelectedSpecie] = useState();
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === UserRoles.TECHNICAL_PERSON;

  const { pendingAccessRequestCount, getPendingAccessRequestCount } =
    useAccessRequests();

  useEffect(() => {
    if (isTechnicalPerson) {
      getPendingAccessRequestCount();
    }
  }, []);

  /*
  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    setSelectedSpecie(newSelectedSpecie);
  };
  */

  const mainDivRef = useRef(null);
  const resetScroll = () => {
    /*
    if (mainDivRef.current) {
      mainDivRef.current.scrollTop = 0;
    }
      */
  };

  return (
    <>
      <span className="main-title-uv">Universidad Veracruzana</span>
      <Navbar
        profile={profile}
        accessRequestCount={pendingAccessRequestCount}
      ></Navbar>
      <main ref={mainDivRef} className="flex-row h-100 overflow-auto">
        <Routes>
          <Route index path={ROUTES.LANDING} element={<Landing />}></Route>
          <Route
            index
            path={ROUTES.COLLECTION}
            element={
              <SpecieDashboard
                role={UserRoles.VISITOR}
                onSpecieSelection={() => {}}
              />
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
