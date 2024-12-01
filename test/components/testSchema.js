import * as yup from 'yup';
import onlyWordsSchema from '../../src/validation/formikSchemas/APISchemas/onlyWordsSchema';
import messages from '../../src/validation/messages';

export const testSchema = yup.object().shape({
  onlyWordsTest: onlyWordsSchema.clone().required(messages.required),
});