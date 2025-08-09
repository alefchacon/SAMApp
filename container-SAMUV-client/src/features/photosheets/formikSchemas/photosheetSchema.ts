import * as yup from "yup";
import onlyWordsApiSchema from "@/validation/formikSchemas/APISchemas/onlyWordsApiSchema";
import messages from "../../../validation/messages";

export const photosheetSchema = yup.object().shape({
  description: onlyWordsApiSchema.clone().required(messages.required),
  //file:  yup.object().required(messages.required)
});
