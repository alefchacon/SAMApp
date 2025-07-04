import * as yup from "yup";
import onlyWordsApiSchema from "@/validation/formikSchemas/APISchemas/onlyWordsApiSchema";
import messages from "@/validation/messages";

export const specieSchema = yup.object().shape({
  orden: onlyWordsApiSchema.clone().required(messages.required),
  family: onlyWordsApiSchema.clone().required(messages.required),
  gender: onlyWordsApiSchema.clone().required(messages.required),
  specie_specie: onlyWordsApiSchema.clone().required(messages.required),
  subspecie: onlyWordsApiSchema.clone(),
});
