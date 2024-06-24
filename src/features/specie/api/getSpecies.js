

export const mockGetSpecies = async () => {
  return [
    {
      id: 1,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Artibeus",
      epithet: "jamaicensis",
      subspecie: "yucatenicus",
      scientific_name: `Artibeus jamaicensis`,
    },
    {
      id: 2,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Artibeus",
      epithet: "toltecus",
      subspecie: " ",
      scientific_name: `Artibeus toltecus`,
    },
    {
      id: 3,
      orden: "Rodentia",
      family: "Cricetidae",
      gender: "Baiomys",
      epithet: "taylori",
      subspecie: "taylori",
      scientific_name: `Baiomys taylori`,
    },
    {
      id: 4,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Desmodus",
      epithet: "rotundus",
      subspecie: "mirinus",
      scientific_name: `Desmodus rotundus mirinus`,
    },
    {
      id: 5,
      orden: "Didelphimorphia",
      family: "Didelphidae",
      gender: "Marmosa",
      epithet: "mexicana",
      subspecie: "mexicana",
      scientific_name: `Marmosa mexicana mexicana`,
    },
    {
      id: 6,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Myotis",
      epithet: "albescens",
      subspecie: " ",
      scientific_name: `Myotis albescens`,
    },
  ];
} 
  
  
  export const getOrdens = async () => {
    const allOrdens =  mockGetSpecies.map(specie => specie["orden"]);
    return [...new Set(allOrdens)];
}
export const getFamilies = async () => {
  const allFamilies =  mockGetSpecies.map(specie => specie["family"]);
  return [...new Set(allFamilies)];
}
export const getGenders = async () => {
  const allGenders =  mockGetSpecies.map(specie => specie["gender"]);
  return [...new Set(allGenders)];
}
export const getEpithets = async () => {
  const allEpithets =  mockGetSpecies.map(specie => specie["epithet"]);
  return [...new Set(allEpithets)];
}
export const getSubspecies = async () => {
  const allSubspecies =  mockGetSpecies.map(specie => specie["subspecie"]);
  return [...new Set(allSubspecies)];
}