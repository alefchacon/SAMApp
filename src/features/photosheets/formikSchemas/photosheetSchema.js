import * as yup from 'yup';
import onlyWordsSchema from '../../../validation/formikSchemas/APISchemas/onlyWordsSchema';
import messages from '../../../validation/messages';

export const photosheetSchema = yup.object().shape({
  description: onlyWordsSchema.clone().required(messages.required),
  //file:  yup.object().required(messages.required)
});