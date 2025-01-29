const getEnvironmentRoute = (name, devName, trailSlash = true) => {
    let route = import.meta.env[name];

    if (!Boolean(route)){
        route = import.meta.env[devName];
    }

    if (trailSlash && !route.endsWith("/")){
        route += "/"
    }
    
    return route;
}

const serverUrl =  getEnvironmentRoute(
    "VITE_APP_BACKEND_URL",
    "VITE_APP_BACKEND_URL_DEV"
);
const pathPrefix = getEnvironmentRoute(
    "VITE_APP_PATH_PREFIX",
    "VITE_APP_PATH_PREFIX_DEV"
);

// only for react router:
const simplePathPrefix = getEnvironmentRoute(
    "VITE_APP_PATH_PREFIX",
    "VITE_APP_PATH_PREFIX_DEV",
    false
);

const apiUrl = serverUrl.concat(`${pathPrefix}api/`);



export {serverUrl, apiUrl, pathPrefix, simplePathPrefix}