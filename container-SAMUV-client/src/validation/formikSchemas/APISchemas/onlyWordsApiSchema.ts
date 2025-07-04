import * as yup from "yup";
import messages from "../../messages";
import { onlyWordsRegex } from "../../regexes";

const onlyWordsApiSchema = yup
  .string()
  .matches(onlyWordsRegex, messages.onlyWords);

export default onlyWordsApiSchema;
