import Location from "./location";
import { capitalize } from "lodash";
class Specimen {
  constructor(
    data,
  ){
    this.colection_code = data.colection_code;
    this.catalog_id = data.catalog_id;
    this.colection_date = data.colection_date;
    this.preparation_date = data.preparation_date;
    this.hour = data.hour;
    this.status = capitalize(data.status);
    this.sex = data.sex;
    this.number_embryos = data.number_embryos;
    this.comment = data.comment;
    this.class_age = data.class_age;
    //medidas-morfometricas
    this.length_total = data.length_total;
    this.length_ear = data.length_ear;
    this.length_paw = data.length_paw; 
    this.length_tail = data.length_tail;
    this.weight = data.weight;
    //this.location = new Location(data);
  }

}

export default Specimen;