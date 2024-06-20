import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import CheckIcon from "../components/icons/CheckIcon";
import CloseIcon from "../components/icons/CloseIcon";

import SpecieDashboard from "../features/specie/SpecieDashboard";
import NewSpecie from "../features/specie/NewSpecie";
import Button from "../components/ui/Button";

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
        <Routes>
          {/* 
        <SpecieDashboard></SpecieDashboard>
        
        */}
          <Route path={"/coleccion"} element={<SpecieDashboard />}></Route>
          <Route path={"/nuevaEspecie"} element={<NewSpecie />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
