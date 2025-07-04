import * as yup from "yup";
import messages from "../messages";
import { decimalRegex } from "../regexes";

export const decimalSchema = yup
  .number()
  .min(0, messages.decimal)
  .max(99.999, messages.decimal)
  .test("is-decimal", messages.decimal, (value) => {
    if (!value) {
      return false;
    }
    return Boolean(value.toString().match(decimalRegex));
  });
