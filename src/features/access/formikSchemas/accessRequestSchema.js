import * as yup from 'yup';
import { alphanumericSchema } from '../../../validation/formikSchemas/alphanumericSchema';
import { orcidSchema } from '../../../validation/formikSchemas/orcidSchema';
import { emailSchema } from '../../../validation/formikSchemas/emailSchema';
import messages from '../../../validation/messages';

export const accessRequestSchema = yup.object().shape({
  orcid: orcidSchema.clone().required(messages.required),
  about: alphanumericSchema.clone().required(messages.required),
  email: emailSchema.clone().required(messages.required),
});