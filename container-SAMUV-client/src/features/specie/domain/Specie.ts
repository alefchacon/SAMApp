export interface ISpecie {
  id: number;
  class_specie: string;
  orden: string;
  family: string;
  gender: string;
  subspecie: string;
  specie_specie: string;
}

export class Specie implements ISpecie {
  id: number = -1;
  class_specie: string = "CLASE";
  orden: string = "ORDEN";
  family: string = "FAMILIA";
  gender: string = "GÉNERO";
  subspecie: string = "SUBESPECIE";
  specie_specie: string = "ESPECIE";
  specimens: any[] = [];
  constructor(data: ISpecie, specimens = []) {
    this.id = data?.id;
    this.class_specie = "Mammalia";
    this.orden = data?.orden;
    this.family = data?.family;
    this.gender = data?.gender;
    this.subspecie = data?.subspecie;
    this.specie_specie = data?.specie_specie;
    this.specimens = specimens;
  }

  get epithet() {
    return `${this.gender} ${this.specie_specie} ${this.subspecie}`;
  }
}

export const defaultSpecie: Specie = new Specie(
  {
    id: 1,
    class_specie: "CLASE",
    orden: "ORDEN",
    family: "FAMILIA",
    gender: "GÉNERO",
    subspecie: "SUBESPECIE",
    specie_specie: "ESPECIE",
  },
  []
);
