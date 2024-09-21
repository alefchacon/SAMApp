import * as yup from 'yup';
import onlyWordsSchema from '../../../validation/formikSchemas/APISchemas/onlyWordsSchema';
import alnumWithSpacesSchema from '../../../validation/formikSchemas/APISchemas/alnumWithSpacesSchema';
import messages from '../../../validation/messages';
import { passwordRegex } from '../../../validation/regexesPassword';

export const academicSchema = yup.object().shape({
  names: onlyWordsSchema.clone().required(messages.required),
  father_last_name: onlyWordsSchema.clone().required(messages.required),
  mother_last_name: onlyWordsSchema.clone().required(messages.required),
  state: onlyWordsSchema.clone().required(messages.required),
  major: onlyWordsSchema.clone().required(messages.required),
  city: onlyWordsSchema.clone().required(messages.required),
  college: onlyWordsSchema.clone().required(messages.required),
  position: alnumWithSpacesSchema.clone().required(messages.required),
  degree: onlyWordsSchema.clone().required(messages.required),

  username: yup.string().required(messages.required),
  password: yup.string().matches(passwordRegex, messages.passwordPolicy),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], messages.matchPasswords)
    .required(messages.required),
});