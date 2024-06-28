import * as yup from 'yup';
import messages from '../messages';
import { floatRegex } from '../regexes';

export const floatSchema = yup
.number().test(
    'is-decimal',
    'invalid decimal',
    value => (value + "").match(floatRegex),
  )