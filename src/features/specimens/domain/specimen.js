import Location from "./location";
import { capitalize } from "lodash";
import moment from "moment";
import * as defaults from "../../../utils/getOrDefault";
class Specimen {
  constructor(
    data = {},
  ){
    this.colection_code = data.colection_code;
    this.colection_number =(typeof data.colection_number === "string" && data.colection_number.trim() !== "") 
    ? parseInt(data.colection_number, 10) 
    : data.colection_number || null; 
    this.catalog_id = data.catalog_id;
    if (["day", "month", "year"].every(key => data.hasOwnProperty(key))){
      this.colection_date = this.formatDate(data)
    } else {
      this.colection_date = data.colection_date
    }
    this.preparation_date = data.preparation_date ||null
    this.hour = data.hour;
    this.status = capitalize(data.status ?? "True");
    this.sex = defaults.getOrDefaultString(data.sex)
    this.nature = data.nature;
    this.number_embryos = defaults.getOrDefaultNumber(data.number_embryos),
    this.comment = data.comment;
    this.class_age = defaults.getOrDefaultString(data.class_age);
    //medidas-morfometricas
    this.length_total = defaults.getOrDefaultNumber(data.length_total);
    this.length_ear = defaults.getOrDefaultNumber(data.length_ear);
    this.length_paw = defaults.getOrDefaultNumber(data.length_paw); 
    this.length_tail = defaults.getOrDefaultNumber(data.length_tail);
    this.weight = defaults.getOrDefaultNumber(data.weight);
    if (Boolean(data.location)){
      this.location = new Location(data.location);
    }
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