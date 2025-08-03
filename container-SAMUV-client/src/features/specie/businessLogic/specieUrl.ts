export const SPECIE_URL = "species";
export const TAXONOMY_RANKS_URL = "ranks-preview";
export const ORDENS_URL = `${SPECIE_URL}/orders`;
export const SPECIE_MIGRATE_URL = `${SPECIE_URL}/migrate`;
export const SPECIE_SEARCH_URL = (query: string) =>
  `${SPECIE_URL}/search?query=${query}`;
export const METRICS_URL = (query: string) =>
  `${SPECIE_URL}/metrics?query=${query}`;
export const SPECIE_BY_TAXON_URL = ({ taxon = "", query = "" }) =>
  `${SPECIE_URL}/${taxon}/${query}`;

export const TAXON_URL = (query: string) => `${SPECIE_URL}/taxon/${query}`;
