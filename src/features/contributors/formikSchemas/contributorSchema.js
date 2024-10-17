import * as yup from 'yup';
//import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import { onlyNamesRegex, colectorCodeRegex } from '../../../validation/regexes';
import messages from '../../../validation/messages';

export const contributorSchema = yup.object().shape({
  name: yup.string().matches(onlyNamesRegex, messages.onlyNames),
  code: yup.string().matches(colectorCodeRegex, messages.colectorCode).clone().required(messages.required),
});