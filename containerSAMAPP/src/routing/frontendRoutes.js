import { pathPrefix } from "./backendRoutes";

/*
The deployment environment requires the prefix to be added to 
the frontend routing as well. 

I'm adding the prefix manually because doing it iteratively
would lose you the ability to query all the available options
with CTRL + SPACE and autocompleting them when using the catalog
in other parts of the system.
*/
const ROUTES = Object.freeze({
  LANDING: pathPrefix,
  SIGN_IN: `${pathPrefix}entrar`,
  COLLECTION: `${pathPrefix}coleccion`,
  REQUEST_ACCESS: `${pathPrefix}solicitar-acceso`,
  REQUESTS: `${pathPrefix}solicitudes`,
  SEARCH: `${pathPrefix}buscar`,
  PHOTOSHEETS: `${pathPrefix}fichas`,
  SIGN_UP: `${pathPrefix}registrarse`,
  PERSONAL: `${pathPrefix}personal`,
  ADD_SPECIMEN: `${pathPrefix}agregar-especimen`,
  MIGRATE: `${pathPrefix}migrar`,
  PROFILE: `${pathPrefix}perfil`,
  ABOUT_COLLECTION: `${pathPrefix}sobre-coleccion`,
  ABOUT_INSTITUTE: `${pathPrefix}sobre-instituto`,
  ABOUT_SYSTEM: `${pathPrefix}sobre-sistema`
})

export default ROUTES;