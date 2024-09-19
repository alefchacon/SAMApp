import * as yup from 'yup';
import messages from '../messages';
import { emailRegex } from '../regexes';
export const emailSchema = yup
    .string()
    .matches(emailRegex, messages.email)
