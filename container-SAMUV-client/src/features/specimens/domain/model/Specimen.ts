import Location, { defaultLocation } from "./Location";
import { capitalize } from "lodash";
import moment from "moment";
import * as defaults from "@/utils/getOrDefault";
import {
  normalizeNature,
  normalizeCatalogue,
} from "../../businessLogic/specimenNormalization";
import { SEX, ESex } from "@/features/specimens/domain/enum/ESex";
import AGE, { EAge } from "../enum/EAge";
import { EReproductiveStatus } from "../enum/EReproductiveStatus";
import { Specie } from "@/features/specie/domain/Specie";
import { ENature } from "@/stores/nature";
import {
  IContributor,
  IContributorSpecimen,
} from "@/features/contributors/domain/Contributor";

interface IDatedObject {
  year?: number;
  month?: number;
  day?: number;
}

export interface ISpecimen extends IDatedObject {
  id?: number;
  colection_code: string;
  colection_number: string;
  catalog_id: string;
  colection_date: moment.Moment | string;
  preparation_date: moment.Moment | string;
  hour?: string;
  status?: boolean | string;
  sex: string;
  reproductive_status: string;
  nature: string;
  number_embryos: number;
  comment: string;
  class_age: string;
  //medidas-morfometricas
  length_total: number;
  length_ear: number;
  length_paw: number;
  length_tail: number;
  weight: number;
  location?: Location;
  /*
  "specie" can be an object or an integer.
  This is because the backend's serializer calls the specie FK "specie",
  so the following is written as such to be backend-compliant 
  */
  specie?: number | Specie;
  colector?: IContributorSpecimen | string;
  preparator?: IContributorSpecimen | string;
}

class Specimen implements ISpecimen {
  id?: number = -1;
  colection_code: string = "";
  colection_number: string = "";
  catalog_id: string = "";
  colection_date: moment.Moment | string = "";
  preparation_date: moment.Moment | string = "";
  hour?: string = "";
  status?: boolean | string = false;
  sex: string = ESex.ND;
  reproductive_status: string = EReproductiveStatus.ACTIVE;
  nature: string = ENature.ND;
  number_embryos: number = 0;
  comment: string = "";
  class_age: string = EAge.ND;
  //medidas-morfometricas
  length_total: number = 0;
  length_ear: number = 0;
  length_paw: number = 0;
  length_tail: number = 0;
  weight: number = 0;
  location?: Location;
  specie?: number | Specie = -1;
  colector?: IContributorSpecimen;
  preparator?: IContributorSpecimen;

  [key: string]: any;

  constructor(data: ISpecimen) {
    this.colection_code = data.colection_code || "ND";
    this.colection_number = defaults.getOrDefaultNumber(
      data?.colection_number,
      undefined
    );
    this.catalog_id = data.catalog_id;

    this.colection_date = moment()
      .year(Number(data.year))
      // months are zero indexed.
      // december is 11 instead of 12
      .month(Number(data.month) - 1)
      .date(Number(data.day))
      .format("YYYY-MM-DD");

    this.preparation_date = data.preparation_date;
    this.hour = data.hour;

    // the backend handles booleans as strings: "True" and "False"
    this.status = capitalize(String(data.status ?? "True"));

    // TEST THESE:
    this.sex = normalizeCatalogue(data.sex, ESex, SEX.ND);
    this.nature = normalizeNature(data.nature);
    this.class_age = normalizeCatalogue(data.class_age, EAge, AGE.ND);

    this.reproductive_status =
      data.reproductive_status || EReproductiveStatus.ND;
    (this.number_embryos = defaults.getOrDefaultNumber(data.number_embryos)),
      (this.comment = data.comment);
    //medidas-morfometricas
    this.length_total = defaults.getOrDefaultNumber(data.length_total);
    this.length_ear = defaults.getOrDefaultNumber(data.length_ear);
    this.length_paw = defaults.getOrDefaultNumber(data.length_paw);
    this.length_tail = defaults.getOrDefaultNumber(data.length_tail);
    this.weight = defaults.getOrDefaultNumber(data.weight);
    if (data.location) {
      this.location = new Location(data.location);
    }

    /*
    "specie" can be an object or an integer.
    This is because the backend's serializer calls the specie FK "specie", 
    so the following is written as such to be backend-compliant 
    */
    if (data.specie !== null && typeof data.specie === "object") {
      this.specie = data.specie.id;
    } else if (data.specie) {
      this.specie = data.specie;
    }
  }
}

export default Specimen;

export const defaultSpecimen: ISpecimen = {
  id: 1,
  colection_code: "IIB-UV MAM",
  colection_number: "",
  catalog_id: "",
  colection_date: "",
  preparation_date: "",
  hour: "",
  status: false,
  sex: ESex.ND,
  reproductive_status: EReproductiveStatus.ND,
  nature: ENature.ND,
  number_embryos: 0,
  comment: "",
  class_age: "",

  //medidas-morfometricas
  length_total: 0,
  length_ear: 0,
  length_paw: 0,
  length_tail: 0,
  weight: 0,
  location: defaultLocation,
  /*
  "specie" can be an object or an integer.
  This is because the backend's serializer calls the specie FK "specie",
  so the following is written as such to be backend-compliant 
  */
  specie: 0,
  colector: "",
  preparator: "",
};
