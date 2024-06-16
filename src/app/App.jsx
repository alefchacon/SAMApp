import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import Specie from "../features/specie/components/Specie";
import Button from "../components/ui/Button";
import SpecieList from "../features/specie/components/SpecieList";
import SpecieDetail from "../features/specie/components/SpecieDetail";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [selectedSpecie, setSelectedSpecie] = useState();

  return (
    <>
      <nav>
        NAVBAR
        <input type="search" placeholder="Buscar especies" />
      </nav>
      <main>
        <SpecieList onSelectionChange={setSelectedSpecie}></SpecieList>
        <SpecieDetail specie={selectedSpecie}></SpecieDetail>
      </main>
    </>
  );
}

export default App;
