const AppFactory = {
    createApp: (routeConfig) => {
        const app = {};
        app.defaultHandle = () => null;
        app.errorHandle = (error) => error;
        const routes = {};
        const _routeConfig = routeConfig || [];
        _routeConfig.forEach(route => {
            routes[route.path] = route.handle;
        });
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
    }
};

export { AppFactory as default };
