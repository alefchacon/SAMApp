export const ROLE_TYPES = Object.freeze({
  VISITOR: "VISITOR",
  ACADEMIC: "ACADEMIC",
  TECHNICAL_PERSON: "TECHNICAL_PERSON",
  validate: (role) => {
    return role === ROLE_TYPES.ACADEMIC || 
           role === ROLE_TYPES.TECHNICAL_PERSON;
  } 
})
