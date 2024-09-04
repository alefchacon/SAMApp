import * as yup from 'yup';
import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import messages from '../../../validation/messages';

export const photosheetSchema = yup.object().shape({
  description: alphabeticSchema.clone().required(messages.required),
  //file:  yup.object().required(messages.required)
});