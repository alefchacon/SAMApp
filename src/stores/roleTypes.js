export const ROLE_TYPES = Object.freeze({
  VISITOR: "Visitante",
  ACADEMIC: "Academico",
  TECHNICAL_PERSON: "Técnico",
  validate: (role) => {
    return role === ROLE_TYPES.ACADEMIC || 
           role === ROLE_TYPES.TECHNICAL_PERSON;
  } 
})
