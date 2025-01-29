import * as yup from 'yup';
import messages from '../../../validation/messages';
import { usernameSchema } from '../../../validation/formikSchemas/usernameSchema';

export const loginSchema = yup.object().shape({
  username: usernameSchema.clone().required(messages.required),
  password: usernameSchema.clone().required(messages.required),
});