import * as yup from 'yup';
import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import messages from '../../../validation/messages';

export const specimenSchema = yup.object().shape({
  coordinates_cartesian_plane_x: alphabeticSchema.clone().required(messages.required),
});