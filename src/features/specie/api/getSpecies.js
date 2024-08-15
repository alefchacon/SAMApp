

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
      subspecie: "",
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
      family: "Emballonuridae",
      gender: "Balantiopteryx",
      epithet: "io",
      subspecie: "",
      scientific_name: `Balantiopteryx io`,
    },
    {
      id: 5,
      orden: "Chiroptera",
      family: "Emballonuridae",
      gender: "Balantiopteryx",
      epithet: "plicata",
      subspecie: "",
      scientific_name: `Balantiopteryx plicata`,
    },
    {
      id: 6,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Bauerus",
      epithet: "dubiaquercus",
      subspecie: "",
      scientific_name: `Bauerus dubiaquercus`,
    },
    {
      id: 7,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Carollia",
      epithet: "subrufa",
      subspecie: "",
      scientific_name: `Carollia subrufa`,
    },
    {
      id: 8,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Chiroderma",
      epithet: "villosum",
      subspecie: "jesupi",
      scientific_name: `Chiroderma villosum`,
    },
    {
      id: 9,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Choeroniscus",
      epithet: "godmani",
      subspecie: "",
      scientific_name: `Choeroniscus godmani`,
    },
    {
      id: 10,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Corynorhinus",
      epithet: "mexicanus",
      subspecie: "",
      scientific_name: `Corynorhinus mexicanus`,
    },
    {
      id: 11,
      orden: "Rodentia",
      family: "Dasyproctidae",
      gender: "Dasyprocta",
      epithet: "mexicana",
      subspecie: "",
      scientific_name: `Dasyprocta mexicana`,
    },
    {
      id: 12,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Dermanura",
      epithet: "watsoni",
      subspecie: "",
      scientific_name: `Dermanura watsoni`,
    },
    {
      id: 13,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Desmodus",
      epithet: "rotundus",
      subspecie: "mirinus",
      scientific_name: `Desmodus rotundus mirinus`,
    },
    {
      id: 14,
      orden: "Didelphimorphia",
      family: "Didelphidae",
      gender: "Marmosa",
      epithet: "mexicana",
      subspecie: "mexicana",
      scientific_name: `Marmosa mexicana mexicana`,
    },
    {
      id: 15,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Myotis",
      epithet: "albescens",
      subspecie: "",
      scientific_name: `Myotis albescens`,
    },
  ];
} 
  
  
  export const getOrdens = async () => {
    const species = await mockGetSpecies();
    const allOrdens =  species.map(specie => specie["orden"]);
    return [...new Set(allOrdens)];
  }
export const getFamilies = async () => {
  const species = await mockGetSpecies();
  const allFamilies =  species.map(specie => specie["family"]);
  return [...new Set(allFamilies)];

}
export const getGenders = async () => {
  const species = await mockGetSpecies();
  const allGenders =  species.map(specie => specie["gender"]);
  return [...new Set(allGenders)];
}
export const getEpithets = async () => {
  const species = await mockGetSpecies();
  const allEpithets =  species.map(specie => specie["epithet"]);
  return [...new Set(allEpithets)];
}
export const getSubspecies = async () => {
  const species = await mockGetSpecies();
  const allSubspecies =  
    species.map(specie => specie["subspecie"])
           .filter(subspecie => subspecie);
  return [...new Set(allSubspecies)];
}
