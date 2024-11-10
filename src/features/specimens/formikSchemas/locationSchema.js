
import * as yup from 'yup';

import messages from '../../../validation/messages';
import { catalogIdSpecimenRegex, hourRegex, onlyWordsRegex, onlyWordsWithCommas } from '../../../validation/regexes';
import { decimalSchema } from '../../../validation/formikSchemas/decimalSchema';

export const locationSchema = yup.object().shape({
  coordinates_cartesian_plane_x: yup
    .number(messages.numeric)
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
  });