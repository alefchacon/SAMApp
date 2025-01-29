
import * as yup from 'yup';

import messages from '../../../validation/messages';
import { catalogIdSpecimenRegex, hourRegex, onlyWordsRegex, onlyWordsWithCommas } from '../../../validation/regexes';
import { decimalSchema } from '../../../validation/formikSchemas/decimalSchema';

export const specimenSchema = yup.object().shape({
  //General data
  colection_code: yup
    .string()
    .matches(catalogIdSpecimenRegex, messages.id)
    .max(20)
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
  preparation_date: yup
    .date()
    .nullable()
    .max(new Date(), messages.maxDatetoday),
  hour: yup
    .string()
    .nullable()
    .matches(hourRegex, messages.hour),
  status: yup
    .boolean()
    .required(messages.required),
  sex: yup
    .string()
    .required(messages.required),
  reproductive_status: yup
    .string()
    .required(messages.required),
  nature: yup
    .string()
    .required(messages.required),
  number_embryos: yup
    .number()
    .min(0)
    .required("Si no tiene embriones, por favor ingrese un 0"),
  colection_number: yup
    .number()
    .min(0)
    .required(messages.required),
  class_age: yup
    .string()
    .max(50)
    .required(messages.required),
  comment: yup
    .string()
    .max(200),

  //Morphometric measures
  length_total:  decimalSchema.clone().nullable(),
  length_ear: decimalSchema.clone().nullable(),
  length_paw: decimalSchema.clone().nullable(),
  length_tail: decimalSchema.clone().nullable(),
  weight: decimalSchema.clone().nullable(),

  //Contributors
  colector: yup.object().required(messages.required),
  preparator: yup.object().required(messages.required),

  location: yup.object().shape({
    coordinates_cartesian_plane_x: yup
      .number()
      .required(messages.required), 
    coordinates_cartesian_plane_y: yup
      .number()
      .required(messages.required), 
    geographical_coordinates_x: yup
      .number()
      .required(messages.required), 
    geographical_coordinates_y: yup
      .number()
      .required(messages.required), 
    utm_region: yup
      .string()
      .max(4)
      .required(messages.required),
    msnm_google: yup
      .number()
      .required(messages.required), 
    altitude: yup.number()
      .required(messages.required),
    institute_code: yup
      .string()
      .max(100)
      .matches(catalogIdSpecimenRegex, messages.id)
      .required(messages.required),
    institute: yup
      .string()
      .max(150)
      .matches(onlyWordsWithCommas, messages.onlyWords)
      .required(messages.required),
    specific_location: yup
      .string()
      .max(100)
      .matches(onlyWordsWithCommas, messages.onlyWords),
    municipality: yup
      .string()
      .max(100)
      .matches(onlyWordsRegex, messages.onlyWords),
      state: yup
      .string()
      .max(100)
      .matches(onlyWordsRegex, messages.onlyWords)
      .required(messages.required),
      country: yup
      .string()
      .max(100)
      .matches(onlyWordsRegex, messages.onlyWords)
      .required(messages.required),
    }),
});