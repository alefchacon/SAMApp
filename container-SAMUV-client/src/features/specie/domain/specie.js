class Specie {
  constructor(
    data,
    specimens = []
  ){
    this.id = data?.id || "";
    this.class_specie = "Mammalia";
    this.orden = data?.orden || "";
    this.family = data?.family || "";
    this.gender = data?.gender || "";
    this.subspecie = data?.subspecie || "";
    this.specie_specie = data?.specie_specie || "";
    this.specimens = specimens || "";
  }

  get epithet() {
    return `${this.gender} ${this.specie_specie} ${this.subspecie}`
  }
}

export default Specie;