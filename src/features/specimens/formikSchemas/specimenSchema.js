
import * as yup from 'yup';

import messages from '../../../validation/messages';
import { catalogIdSpecimenRegex, hourRegex, sexRegex } from '../../../validation/regexes';
import { decimalSchema } from '../../../validation/formikSchemas/decimalSchema';

export const specimenSchema = yup.object().shape({
  //General data
  colection_code: yup
    .string()
    .required(messages.required),
  catalog_id: yup
    .string()
    .max(20)
    .matches(catalogIdSpecimenRegex, messages.id)
    .required(messages.required),
  colection_date: yup
    .date()
    .max(new Date(), messages.maxDatetoday)
    .required(messages.required),
  hour: yup
    .string()
    .matches(hourRegex, messages.hour),
  status: yup
    .boolean()
    .required(messages.required),
  sex: yup
    .string()
    .matches(sexRegex, messages.sex)
    .required(messages.required),
  number_embryos: yup
    .number()
    .min(0),
  comment: yup
    .string()
    .max(200),

  //Morphometric measures
  length_total:  decimalSchema.clone(),
  length_ear: decimalSchema.clone(),
  length_paw: decimalSchema.clone(),
  length_tail: decimalSchema.clone(),
  weight: decimalSchema.clone(),

  //Location
  coordinates_cartesian_plane_x: "1", //
  coordinates_cartesian_plane_y: "", //
  geographical_coordinates_x: "", //
  geographical_coordinates_y: "", //
  utm_region: "", //
  msnm_google: "", //
  altitude: "", 
  institute_code: "", //
  institute: "", //
  specific_location: "", //
  municipality: "", //
  state: "", //
  country: "", //
});