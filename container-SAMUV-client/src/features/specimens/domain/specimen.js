import Location from "./location";
import { capitalize } from "lodash";
import moment from "moment";
import * as defaults from "../../../utils/getOrDefault";
import { normalizeNature, normalizeCatalogue } from "../businessLogic/specimenNormalization";
import SEX from "../../../stores/sex";
import AGE from "../../../stores/age";

class Specimen {
  constructor(
    data = {},
  ){
    this.colection_code = data.colection_code || "ND";
    this.colection_number = defaults.getOrDefaultNumber(data?.colection_number, null) 
    this.catalog_id = data.catalog_id;
    
    this.colection_date = defaults.getOrDefaultDate(data)
    this.preparation_date = data.preparation_date || null;
    this.hour = data.hour || null;
    this.status = capitalize(data.status ?? "True");
    this.sex = normalizeCatalogue(data.sex, SEX, SEX.ND);
    this.reproductive_status = data.reproductive_status || "ND";
    this.nature = normalizeNature(data.nature);
    this.number_embryos = defaults.getOrDefaultNumber(data.number_embryos),
    this.comment = data.comment;
    this.class_age =  normalizeCatalogue(data.class_age, AGE, AGE.ND);
    //medidas-morfometricas
    this.length_total = defaults.getOrDefaultNumber(data.length_total);
    this.length_ear = defaults.getOrDefaultNumber(data.length_ear);
    this.length_paw = defaults.getOrDefaultNumber(data.length_paw); 
    this.length_tail = defaults.getOrDefaultNumber(data.length_tail);
    this.weight = defaults.getOrDefaultNumber(data.weight);
    if (Boolean(data.location)){
      this.location = new Location(data.location);
    }

    /*
    "specie" can be an object or an integer.
    This is because the backend's serializer calls the specie FK "specie", 
    so the following is written as such to be backend-compliant 
    */
    if (data.specie !== null && typeof data.specie === "object"){
      this.specie = data.specie.id
    } else if (data.specie){
      this.specie = data.specie
    }
  }
  
  formatDate(data) {
    return moment()
      .day(Number(data.day))
      .month(Number(data.month))
      .year(Number(data.year))
      .format("YYYY-MM-DD")
  }

}

export default Specimen;