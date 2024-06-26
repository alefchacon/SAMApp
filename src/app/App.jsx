//LIBRARIES
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// FEATURES
import SpecieDashboard from "../features/specie/SpecieDashboard";
import NewSpecie from "../features/specie/NewSpecie";

// COMPONENTS
import Stepper from "../components/ui/Stepper";

// CSS
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [selectedSpecie, setSelectedSpecie] = useState({});

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    setSelectedSpecie(newSelectedSpecie);
    console.log(newSelectedSpecie);
  };

  return (
    <>
      <nav>
        NAVBAR
        <input type="search" placeholder="Buscar especies" />
      </nav>
      <main>
        {/*SPECIE AND SPECIMEN*/}

        <Routes>
          <Route
            path="/Test"
            element={
              <div className="stepper-step">
                <button>asdf</button>
                <Stepper>
                  <div label={"Especímenes"}>
                    <p>This is the first tab</p>
                  </div>
                  <div label={"Métricas"}>
                    <p>This is the oither one duh</p>
                  </div>
                  <div label={"Métricas"}>
                    <p>This is the oither one duh</p>
                  </div>
                </Stepper>
              </div>
            }
          ></Route>

          <Route
            path={"/coleccion"}
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
