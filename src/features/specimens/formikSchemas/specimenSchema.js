import * as yup from 'yup';
import { alphabeticSchema } from '../../../validation/formikSchemas/alphabeticSchema';
import { floatSchema } from '../../../validation/formikSchemas/floatSchema';

import messages from '../../../validation/messages';

export const specimenSchema = yup.object().shape({
  colection_date: floatSchema.clone().required(messages.required),
  coordinates_cartesian_plane_x: floatSchema.clone().required(messages.required),
  coordinates_cartesian_plane_y: floatSchema.clone().required(messages.required),
  geographical_coordinates_x: floatSchema.clone().required(messages.required),
  geographical_coordinates_y: floatSchema.clone().required(messages.required),
});