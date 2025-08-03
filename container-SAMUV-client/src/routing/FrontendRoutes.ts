export enum FrontendRoutes {
  LANDING = "",
  COLLECTION = `collection`,
  REQUEST_ACCESS = `request-access`,
  REQUESTS = `requests`,
  SEARCH = `search`,
  PHOTOSHEETS = `sheets`,
  SIGN_UP = `sign-up`,
  PERSONAL = `personnel`,
  ADD_SPECIMEN = `add-specimen`,
  MIGRATE = `migrate`,
  PROFILE = `profile`,
  ABOUT_COLLECTION = `about-collection`,
  ABOUT_INSTITUTE = `about-institute`,
  ABOUT_SYSTEM = `about-system`,
  SPECIES = `species`,
}

export enum FrontendSearchParams {
  SEARCH_QUERY = "query",
}

/**
 * These parameters are used to filter species by their taxonomic ranks.
 *
 * The backend logic uses the words "orden" and "gender", and the frontend utilizes these names as well
 * to maintain traceability, however, in taxonomical terms, the correct words for these ranks are
 * "order" and "genus". Given that the user can control these search parameters in the browser URL,
 * I am choosing to use the correct words, so the users can predict which words they can use.
 * That said, these are only used for frontend routing: for any other purpose, we use "gender" and "orden".
 */
export enum FrontendSpecieParams {
  orden = "order",
  family = "family",
  gender = "genus",
  specie_specie = "scientific_name",
  subspecie = "subspecie",
}

export default FrontendRoutes;
