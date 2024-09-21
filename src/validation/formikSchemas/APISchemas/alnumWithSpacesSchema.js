import * as yup from 'yup';
import messages from '../../messages';
import { alnumWithSpacesRegex } from '../../regexes';

const alnumWithSpacesSchema = yup
    .string()
    .matches(alnumWithSpacesRegex, messages.onlyWords)

export default alnumWithSpacesSchema;