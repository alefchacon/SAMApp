import * as yup from "yup";

export const getPartialSchema = (schema, fields) => {
  const newShape = {};
    
  fields.forEach(fieldName => {
    if (schema.fields[fieldName]) {
      newShape[fieldName] = schema.fields[fieldName];
    }
    
  });
  
  return yup.object().shape(newShape);
};

export const makeFieldsOptional = (schema, optionalFields) => {
  const newShape = { ...schema.fields };
  
  optionalFields.forEach(fieldName => {
    if (newShape[fieldName]) {
      newShape[fieldName] = newShape[fieldName].notRequired();
    }
  });
  
  return yup.object().shape(newShape);
};