import * as yup from 'yup';
import onlyWordsSchema from '../../../validation/formikSchemas/APISchemas/onlyWordsSchema';
import messages from '../../../validation/messages';
import { emailSchema } from '../../../validation/formikSchemas/emailSchema';

export const technicalPersonSchema = yup.object().shape({
  first_name: onlyWordsSchema.clone().required(messages.required),
  last_name: onlyWordsSchema.clone().required(messages.required),
  position: onlyWordsSchema.clone().required(messages.required),
  email: emailSchema.clone().required(messages.required),
});

