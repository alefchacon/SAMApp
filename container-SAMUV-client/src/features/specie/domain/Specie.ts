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
  class_specie: string = "";
  orden: string = "";
  family: string = "";
  gender: string = "";
  subspecie: string = "";
  specie_specie: string = "";
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
    id: 0,
    class_specie: "",
    orden: "",
    family: "",
    gender: "",
    subspecie: "",
    specie_specie: "",
  },
  []
);
