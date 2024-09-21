import * as yup from 'yup';
//import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import messages from '../../../validation/messages';

export const contributorSchema = yup.object().shape({
  //name: alphabeticSchema.clone().required(messages.required),
});