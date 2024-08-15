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
import FormTemplate from "../components/ui/FormTemplate";

import Searchbar from "../components/ui/Searchbar";

import { mockGetSpecies } from "../features/specie/api/getSpecies";

import Account from "../features/user/Account";

// COMPONENTS
import Stepper from "../components/ui/Stepper";

// CSS
import "./App.css";

function App() {
  const location = useLocation();
  const [selectedSpecie, setSelectedSpecie] = useState({});
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    async function fetchSpecies() {
      const species = await mockGetSpecies();
      console.log(species);
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
    setSelectedSpecie(newSelectedSpecie);
    console.log(newSelectedSpecie);
  };

  return (
    <>
      <nav>
        NAVBAR
        <div>Fichas fotográficas</div>
        <div>Acerca de</div>
        <Searchbar items={species}></Searchbar>
        <Account></Account>
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
              <FormTemplate title="Agregar espécimen">
                <NewSpecimen></NewSpecimen>
              </FormTemplate>
            }
          ></Route>

          <Route
            path={"/coleccion?:name?/:catalog_id?"}
            element={
              <SpecieDashboard onSelectionChange={handleSelectedSpecieChange} />
            }
          ></Route>
          <Route path={"/agregarEspecie"} element={<NewSpecie />}></Route>
          <Route
            path={"/editarEspecie"}
            element={<NewSpecie specie={selectedSpecie} />}
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
