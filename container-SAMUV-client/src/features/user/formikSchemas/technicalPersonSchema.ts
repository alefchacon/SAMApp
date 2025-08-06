import * as yup from "yup";
import onlyWordsApiSchema from "@/validation/formikSchemas/APISchemas/onlyWordsApiSchema";
import messages from "../../../validation/messages";
import { emailSchema } from "@/validation/formikSchemas/emailSchema";

export const technicalPersonSchema = yup.object().shape({
  position: onlyWordsApiSchema.clone().required(messages.required),
  user: yup.object().shape({
    first_name: onlyWordsApiSchema.clone().required(messages.required),
    last_name: onlyWordsApiSchema.clone().required(messages.required),
    email: emailSchema.clone().required(messages.required),
  }),
});
