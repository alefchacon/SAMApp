import * as yup from 'yup';
import messages from '../messages';
import { alphabeticRegex } from '../regexes';

export const alphabeticSchema = yup
    .string()
    .matches(alphabeticRegex, messages.alphabetic)
