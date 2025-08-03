import { Specie } from "./Specie";

export interface IMatch {
  species: Specie[];
  taxon_name: string;
  taxon_rank: string;
}

interface ITaxon {
  rank_name: string;
  taxa_names: string[];
}

export interface IMatches {
  species: Specie[];
  taxa: ITaxon[];
}

export class Matches implements IMatches {
  species: Specie[];
  taxa: ITaxon[];
  constructor(data: IMatches) {
    this.species = data.species.map((specie) => new Specie(specie));
    this.taxa = data.taxa;
  }
}
