/*! wps-airscript-router v1.0.1 */
const formatPath = (path) => {
    return path.startsWith('/') ? path : `/${path}`;
};
const parseRouteList = (routeList) => {
    const routes = {};
    routeList.forEach((route) => {
        const { path, handle, children = [] } = route;
        const parentPath = formatPath(path);
        if (handle) {
            routes[parentPath] = handle;
        }
        if (children.length > 0) {
            const fullPathChildren = children.map((child) => {
                return Object.assign(Object.assign({}, child), { path: parentPath + formatPath(child.path) });
            });
            const childRoutes = parseRouteList(fullPathChildren);
            Object.assign(routes, childRoutes);
        }
    });
    return routes;
};
const AppFactory = {
    createApp: (routeConfig) => {
        const app = {};
        app.defaultHandle = () => null;
        app.errorHandle = (error) => error;
        const routes = parseRouteList(routeConfig || []);
        app.routes = routes;
        app.route = (path, handle) => {
            routes[path] = handle;
        };
        app.setDefaultHandle = (handle) => {
            app.defaultHandle = handle;
        };
        app.setErrorHandle = (handle) => {
            app.errorHandle = handle;
        };
        app.getHandle = (path) => {
            const handle = routes[path] || app.defaultHandle;
            return () => {
                try {
                    return handle();
                }
                catch (error) {
                    return app.errorHandle(error);
                }
            };
        };
        return app;
    },
};

export { AppFactory as default };
