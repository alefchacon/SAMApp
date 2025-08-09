//LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "moment/dist/locale/es-mx";
import moment from "moment";
// FEATURES
import ROUTES, { FrontendRoutes } from "../routing/FrontendRoutes.js";
import SpecieDashboard from "./routes/app/SpecieDashboard.js";
import SpecimenForm from "./routes/app/SpecimenForm.js";
import AccessRequestForm from "./routes/app/AccessRequestForm.js";
import AccessRequests from "./routes/app/AccessRequests.js";
// COMPONENTS
import { UserRoles } from "@/stores/EUserRoles.js";
import Navbar from "@/components/ui/navbar/Navbar.js";
// CSS
import "./App.css";

import useAccessRequests from "@/features/accessRequests/businessLogic/useAccessRequests";
import useSession from "@/features/auth/businessLogic/useSession";
import Landing from "./routes/app/Landing.js";
import { Combobox } from "@/components/ui/Combobox.js";
import TaxonomyBuilder from "./routes/TaxonomyBuilder.js";
import SpeciesDiscover from "./routes/SpeciesDiscover";
import Search from "./routes/app/Search.js";
import SpecieRouter from "@/features/specie/components/SpecieRouter.js";
import SpecieOrdens from "./routes/SpecieOrdens.js";
import Migrate from "./routes/app/Migrate.js";
import Users from "./routes/app/Users.js";
function App() {
  moment.locale("es-mx");
  const [selectedSpecie, setSelectedSpecie] = useState();
  const { getProfile } = useSession();
  const profile = getProfile();
  const isTechnicalPerson = profile.role === UserRoles.TECHNICAL_PERSON;

  const { getPendingAccessRequestCount } = useAccessRequests();

  useEffect(() => {
    if (isTechnicalPerson) {
      getPendingAccessRequestCount();
    }
  }, []);

  const pendingAccessRequestCount =
    Number(localStorage.getItem("pendingAccessRequestCount")) || 0;

  const mainDivRef = useRef<HTMLDivElement>(null);
  const resetScroll = () => {
    if (mainDivRef.current) {
      mainDivRef.current.scrollTop = 0;
    }
  };

  const getCollectionElement = () => {
    if (profile.isTechnicalPerson()) {
      return (
        <SpecieDashboard role={profile.role} onSpecieSelection={() => {}} />
      );
    } else {
      return <SpecieOrdens />;
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
        className="flex-row h-100 overflow-auto bg-gray-50"
      >
        <Routes>
          <Route index path={ROUTES.LANDING} element={<Landing />}></Route>
          <Route
            index
            path={`${ROUTES.SPECIES}/${ROUTES.ADD_SPECIMEN}`}
            element={<SpecimenForm onResetScroll={resetScroll} />}
          ></Route>
          <Route index path={`/test`} element={<SpeciesDiscover />}></Route>
          <Route
            index
            path={`${FrontendRoutes.SPECIES}/:specieId`}
            element={<TaxonomyBuilder />}
          ></Route>
          <Route
            index
            path={`${FrontendRoutes.SPECIES}`}
            element={<SpecieRouter profile={profile} />}
          ></Route>
          <Route
            index
            path={`${FrontendRoutes.MIGRATE}`}
            element={<Migrate />}
          ></Route>
          <Route
            index
            path={`${FrontendRoutes.PERSONAL}`}
            element={<Users />}
          ></Route>
          <Route
            index
            path={`${FrontendRoutes.REQUEST_ACCESS}`}
            element={<AccessRequestForm />}
          ></Route>
          <Route
            index
            path={`${FrontendRoutes.REQUESTS}`}
            element={<AccessRequests />}
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
