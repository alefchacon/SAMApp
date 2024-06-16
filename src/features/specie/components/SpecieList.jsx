import { useState } from "react";
import Specie from "./Specie";

export default function SpecieList({ onSelectionChange }) {
  const generateSpecies = () => {
    let species = [];
    for (let i = 0; i < 100; i++) {
      species.push({
        id: i,
        scientific_name: `Nombre de la especie ${i}`,
        orden: `Orden ${i}`,
        family: `Familia ${i}`,
        gender: `Género ${i}`,
        epithet: `építeto ${i}`,
        subspecie: `subespecie ${i}`,
      });
    }
    return species;
  };

  const species = generateSpecies();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    const selectedSpecie = species.filter(
      (specie) => specie.id === newSelectedIndex
    )[0];
    onSelectionChange(selectedSpecie);
  };

  return (
    <ul
      role="list"
      className="border-solid border-2 border-black flex-1 bg-red-500 h-screen w-full overflow-auto"
    >
      SpecieList
      {species.map((specie, index) => (
        <Specie
          key={specie.id}
          specie={specie}
          index={index}
          selectedIndex={selectedIndex}
          onClick={handleSelection}
        />
      ))}
    </ul>
  );
}
