import { alnumWithSpacesRegex } from "./regexes";

const messages = {
  required: "Este campo es requerido",
  alphanumeric: "Este campo sólo acepta letras, números, comas y puntos.",
  username: "Este campo sólo acepta letras, números y los signos: @ + - _ .",
  onlyWords: "Este campo sólo acepta letras del alfabeto y espacios.",
  onlyNames: "Este campo sólo acepta letras del alfabeto, espacios y puntos.",
  float: "Este campo sólo acepta números decimales.",
  email: "El email debe tener un formato válido.",
  campoOpcional: "Sin comentarios.",
  orcid: "El ORCID debe contener 19 caracteres, incluyendo 16 números separados por 3 guiones en el siguiente formato: 1234-1234-1234-1234",
  id: "Este campo sólo puede contener letras mayúsculas, letras y guiones",
  colectorCode: "Este campo sólo acepta letras del alfabeto, espacios y puntos.",
  maxDatetoday: "La fecha máxima es la de hoy",
  hour: "La hora es inválida",
  sex: "El sexo es inválido",
  passwordPolicy: "La contraseña debe cumplir con los criterios:",
  decimal: "Este campo sólo acepta cantidades decimales, del 0 hasta el 99.999, con un máximo de 3 digitos después del punto decimal",
  matchPasswords: "Las contraseñas deben coincidir"
  //min: (min) => `Must be at least ${min} characters`,
  //max: (max) => `Must be ${max} characters or less`,
};
  
export default messages;
  