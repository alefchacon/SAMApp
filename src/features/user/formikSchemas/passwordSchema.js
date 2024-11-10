import * as yup from 'yup';
import messages from '../../../validation/messages';
import { passwordRegex } from '../../../validation/regexesPassword';

export const passwordSchema = yup.object().shape({
  password: yup.string().matches(passwordRegex, messages.passwordPolicy).required(messages.required),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], messages.matchPasswords)
    .required(messages.required),
});

