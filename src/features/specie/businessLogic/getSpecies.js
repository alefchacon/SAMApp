import { api } from "../../../dataAccess/apiClient";
import { SPECIE_URL } from "./specieURL";


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
      specie: "toltecus",
      subspecie: "",
      scientific_name: `Artibeus toltecus`,
    },
    {
      id: 3,
      orden: "Rodentia",
      family: "Cricetidae",
      gender: "Baiomys",
      specie: "taylori",
      subspecie: "taylori",
      scientific_name: `Baiomys taylori`,
    },
    {
      id: 4,
      orden: "Chiroptera",
      family: "Emballonuridae",
      gender: "Balantiopteryx",
      specie: "io",
      subspecie: "",
      scientific_name: `Balantiopteryx io`,
    },
    {
      id: 5,
      orden: "Chiroptera",
      family: "Emballonuridae",
      gender: "Balantiopteryx",
      specie: "plicata",
      subspecie: "",
      scientific_name: `Balantiopteryx plicata`,
    },
    {
      id: 6,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Bauerus",
      specie: "dubiaquercus",
      subspecie: "",
      scientific_name: `Bauerus dubiaquercus`,
    },
    {
      id: 7,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Carollia",
      specie: "subrufa",
      subspecie: "",
      scientific_name: `Carollia subrufa`,
    },
    {
      id: 8,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Chiroderma",
      specie: "villosum",
      subspecie: "jesupi",
      scientific_name: `Chiroderma villosum`,
    },
    {
      id: 9,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Choeroniscus",
      specie: "godmani",
      subspecie: "",
      scientific_name: `Choeroniscus godmani`,
    },
    {
      id: 10,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Corynorhinus",
      specie: "mexicanus",
      subspecie: "",
      scientific_name: `Corynorhinus mexicanus`,
    },
    {
      id: 11,
      orden: "Rodentia",
      family: "Dasyproctidae",
      gender: "Dasyprocta",
      specie: "mexicana",
      subspecie: "",
      scientific_name: `Dasyprocta mexicana`,
    },
    {
      id: 12,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Dermanura",
      specie: "watsoni",
      subspecie: "",
      scientific_name: `Dermanura watsoni`,
    },
    {
      id: 13,
      orden: "Chiroptera",
      family: "Phyllostomidae",
      gender: "Desmodus",
      specie: "rotundus",
      subspecie: "mirinus",
      scientific_name: `Desmodus rotundus mirinus`,
    },
    {
      id: 14,
      orden: "Didelphimorphia",
      family: "Didelphidae",
      gender: "Marmosa",
      specie: "mexicana",
      subspecie: "mexicana",
      scientific_name: `Marmosa mexicana mexicana`,
    },
    {
      id: 15,
      orden: "Chiroptera",
      family: "Vespertilionidae",
      gender: "Myotis",
      specie: "albescens",
      subspecie: "",
      scientific_name: `Myotis albescens`,
    },
    {
      id: 16,
      orden: "Carnivora",
      family: "Canidae",
      gender: "Canis",
      specie: "lupus",
      subspecie: "albus",
    },
  ];
} 
  
export const getSpecieList = async () => {
  
  const response = await api.get(SPECIE_URL, {requestName: "getSpecie", cancelable: false});
  return response;
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
