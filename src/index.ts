type TRoutes = Record<string, Function>

type THandle = () => any
type TErrorHandle = (error: any) => any

interface IApp {
    /**
     * 路由对象，keyMap格式，对应路径和处理函数
     */
    routes: TRoutes
    /**
     * 默认处理函数，用于未匹配上对应的path时的默认处理，类似于404响应
     */
    defaultHandle: THandle
    /**
     * 错误处理函数
     */
    errorHandle: TErrorHandle
    /**
     * 创建路由
     * @param path 
     * @param handle 
     * @returns 
     */
    route(path: string, handle: THandle): void
    /**
     * 
     * @param path 
     * @returns 
     */
    getHandle(path: string): () => any
    /**
     * 设置默认的处理函数
     * @param handle 默认的处理函数
     * @returns 
     */
    setDefaultHandle(handle: THandle): void
    /**
     * 设置错误处理函数
     * @param handle 错误处理函数
     * @returns 
     */
    setErrorHandle(handle: TErrorHandle): void
}

const AppFactory = {
    createApp: (routeConfig?: Array<{ path: string, handle: THandle }>) => {
        const app = {} as IApp

        app.defaultHandle = () => null
        app.errorHandle = (error) => error

        const routes: TRoutes = {}

        const _routeConfig = routeConfig || []
        _routeConfig.forEach(route => {
            routes[route.path] = route.handle
        })

        app.routes = routes

        app.route = (path: string, handle: THandle) => {
            routes[path] = handle
        }

        app.setDefaultHandle = (handle: THandle) => {
            app.defaultHandle = handle
        }

        app.setErrorHandle = (handle: TErrorHandle) => {
            app.errorHandle = handle
        }

        app.getHandle = (path: string) => {
            const handle = routes[path] || app.defaultHandle
            return () => {
                try {
                    return handle()
                } catch (error) {
                    return app.errorHandle(error)
                }
            }
        }

        return app
    }
}

export default AppFactory