

export const mockGetSpecies = [
  {
    orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Artibeus",
      epithet: "jamaicensis",
      subspecie: "yucatenicus",
    },
    {
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Artibeus",
      epithet: "toltecus",
      subspecie: " ",
    },
    {
      orden: "Rodentia",
      family: "Cricetidae",
      gender: "Baiomys",
      epithet: "taylori",
      subspecie: "taylori",
    },
    {
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Desmodus",
      epithet: "rotundus",
      subspecie: "mirinus",
    },
    {
      orden: "Didelphimorphia",
      family: "Didelphidae",
      gender: "Marmosa",
      epithet: "mexicana",
      subspecie: "mexicana",
    },
    {
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Myotis",
      epithet: "albescens",
      subspecie: " ",
    },
  ]


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