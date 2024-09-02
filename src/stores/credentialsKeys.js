const CREDENTIALS_KEYS = Object.freeze({
  TOKEN_ACCESS: "access",
  TOKEN_REFRESH: "refresh",
  USER_ID: "userId",
  ACADEMIC: "academic",
  TECHNICAL_PERSON: "technicalPerson",
  CREDENTIALS: "credentials",
  /*
  The API typically refers to the refresh token as simply "refresh", however, the log out 
  endpoint (http://localhost:8000/api/logout/) expects this value to be called 
  "refresh_token" hence the separation between TOKEN_REFRESH and TOKEN_REFRESH_LOGOUT
  TOKEN_REFRESH_LOGOUT is only used for the log out api call: for every other purpose, 
  use TOKEN_REFRESH.
  */
  TOKEN_REFRESH_LOGOUT: "refresh_token"
})

export default CREDENTIALS_KEYS;