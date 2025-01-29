import * as yup from 'yup';
import messages from '../messages';
import { orcidRegex } from '../regexes';

export const orcidSchema = yup
    .string()
    .matches(orcidRegex, messages.orcid)
