import * as yup from 'yup';
import onlyWordsSchema from '../../../validation/formikSchemas/APISchemas/onlyWordsSchema';
import messages from '../../../validation/messages';

export const specieSchema = yup.object().shape({
  orden: onlyWordsSchema.clone().required(messages.required),
  family: onlyWordsSchema.clone().required(messages.required),
  gender: onlyWordsSchema.clone().required(messages.required),
  specie_specie: onlyWordsSchema.clone().required(messages.required),
  subspecie: onlyWordsSchema.clone().required(messages.required),
});