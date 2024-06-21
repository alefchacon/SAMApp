//LIBRARIES
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// FEATURES
import SpecieDashboard from "../features/specie/SpecieDashboard";
import NewSpecie from "../features/specie/NewSpecie";

// CSS
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        NAVBAR
        <input type="search" placeholder="Buscar especies" />
      </nav>
      <main>
        {/*SPECIE AND SPECIMEN*/}

        <Routes>
          <Route path={"/coleccion"} element={<SpecieDashboard />}></Route>
          <Route path={"/nuevaEspecie"} element={<NewSpecie />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
