const getEnvironmentRoute = (name, devName) => {
    let route = import.meta.env[name];

    if (!Boolean(route)){
        route = import.meta.env[devName];
    }

    if (!route.endsWith("/")){
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

const apiUrl = serverUrl.concat(`${pathPrefix}api/`);



export {serverUrl, apiUrl, pathPrefix}