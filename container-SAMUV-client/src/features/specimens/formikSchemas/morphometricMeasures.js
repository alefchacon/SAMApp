
import * as yup from 'yup';

import messages from '../../../validation/messages';
import { catalogIdSpecimenRegex, hourRegex, sexRegex } from '../../../validation/regexes';

export const morphometricMeasures = yup.object().shape({
  colection_code: yup.string().required(messages.required),
  catalog_id: yup.string().max(20).matches(catalogIdSpecimenRegex, messages.id).required(messages.required),
  colection_date: yup.date()
                     .max(new Date(), messages.maxDatetoday)
                     .required(messages.required),
  hour: yup.string().matches(hourRegex, messages.hour),
  status: yup.boolean().required(messages.required),
  sex: yup.string().matches(sexRegex, messages.sex).required(messages.required),
  number_embryos: yup.number().min(0),
  comment: yup.string().max(200),
});