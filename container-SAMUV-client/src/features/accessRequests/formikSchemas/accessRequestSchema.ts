import * as yup from "yup";
import onlyWordsApiSchema from "@/validation/formikSchemas/APISchemas/onlyWordsApiSchema";
import alnumWithSpacesSchema from "@/validation/formikSchemas/APISchemas/alnumWithSpacesSchema";
import messages from "../../../validation/messages";
import { alphanumericSchema } from "@/validation/formikSchemas/alphanumericSchema";
import { orcidSchema } from "@/validation/formikSchemas/orcidSchema";
import { emailSchema } from "@/validation/formikSchemas/emailSchema";
import { passwordSchema } from "@/features/user/formikSchemas/passwordSchema";

export const accessRequestSchema = yup.object().shape({
  orcid: orcidSchema.clone().required(messages.required),
  about: alphanumericSchema.clone().required(messages.required),

  academic: yup.object().shape({
    names: onlyWordsApiSchema.clone().required(messages.required),
    father_last_name: onlyWordsApiSchema.clone().required(messages.required),
    mother_last_name: onlyWordsApiSchema.clone().required(messages.required),
    state: onlyWordsApiSchema.clone().required(messages.required),
    major: onlyWordsApiSchema.clone().required(messages.required),
    city: onlyWordsApiSchema.clone().required(messages.required),
    college: onlyWordsApiSchema.clone().required(messages.required),
    position: alnumWithSpacesSchema.clone().required(messages.required),
    degree: onlyWordsApiSchema.clone().required(messages.required),
    user: yup.object().shape({
      email: emailSchema.clone().required(messages.required),
      username: yup.string().required(messages.required),
      ...passwordSchema.fields,
    }),
  }),
});
