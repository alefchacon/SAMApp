// LIBRARIES
import { useState, useEffect } from "react";
import Specie from "./Specie";

import LinkButton from "../../../components/ui/LinkButton";

import AddIcon from "../../../components/icons/AddIcon";

// API CALLS
import { mockGetSpecies } from "../api/getSpecies";

export default function SpecieList({ onSelectionChange }) {
  const [species, setSpecies] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const species = await mockGetSpecies();
      setSpecies(species);
    };
    getData();
    setIsReady(true);
  }, []);

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    const selectedSpecie = species.filter(
      (specie) => specie.id === newSelectedIndex
    )[0];
    onSelectionChange(selectedSpecie);
  };

  return (
    <>
      {
        <ul role="list" className="specie-list">
          <div className="action-bar">
            <LinkButton
              label="Agregar especie"
              icon={<AddIcon />}
              href="/nuevaEspecie"
            ></LinkButton>
            <input type="text" placeholder="Buscar especie" />
          </div>
          {species.map((specie, index) => (
            <Specie
              key={specie.id}
              specie={specie}
              index={specie.id}
              selectedIndex={selectedIndex}
              onClick={handleSelection}
            />
          ))}
        </ul>
      }
    </>
  );
}
