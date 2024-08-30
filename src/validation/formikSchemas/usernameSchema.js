import * as yup from 'yup';
import messages from '../messages';
import { usernameRegex } from '../regexes';
export const usernameSchema = yup
    .string()
    .matches(usernameRegex, messages.username)
