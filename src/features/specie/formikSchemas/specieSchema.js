import * as yup from 'yup';
import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import messages from '../../../validation/messages';

export const specieSchema = yup.object().shape({
  orden: alphabeticSchema.clone().required(messages.required),
  family: alphabeticSchema.clone().required(messages.required),
  gender: alphabeticSchema.clone().required(messages.required),
  epithet: alphabeticSchema.clone().required(messages.required),
  subspecie: alphabeticSchema.clone().required(messages.required),
});