import * as yup from 'yup';
import messages from '../../messages';
import { onlyWordsRegex } from '../../regexes';

const onlyWordsSchema = yup
    .string()
    .matches(onlyWordsRegex, messages.onlyWords)

export default onlyWordsSchema;