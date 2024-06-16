import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import SpecieDashboard from "../features/specie/SpecieDashboard";

import "./App.css";
import "../output.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        NAVBAR
        <input type="search" placeholder="Buscar especies" />
      </nav>
      <main>
        <SpecieDashboard></SpecieDashboard>
      </main>
    </>
  );
}

export default App;
