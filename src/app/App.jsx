//LIBRARIES
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// FEATURES
import SpecieDashboard from "../features/specie/SpecieDashboard";
import NewSpecie from "../features/specie/NewSpecie";
import TextField from "../components/ui/TextField";
import NewSpecimen from "../features/specimens/NewSpecimen/NewSpecimen";
import FormTemplate from "../components/ui/FormTemplate";

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
        <TextField></TextField>
      </nav>
      <main>
        {/*SPECIE AND SPECIMEN*/}

        <Routes>
          <Route
            path="/Test"
            element={
              <FormTemplate title="Agregar espécimen">
                <NewSpecimen></NewSpecimen>
              </FormTemplate>
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
