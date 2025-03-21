/*! wps-airscript-router v1.0.4 */
type TRoutes = Record<string, Function>;
type THandle = () => any;
type TErrorHandle = (error: any) => any;
type IRoute = {
    path: string;
    handle: THandle;
    children?: undefined;
} | {
    path: string;
    handle?: THandle;
    children: IRoute[];
};
interface IApp {
    /**
     * 路由对象，keyMap格式，对应路径和处理函数
     */
    routes: TRoutes;
    /**
     * 默认处理函数，用于未匹配上对应的path时的默认处理，类似于404响应
     */
    defaultHandle: THandle;
    /**
     * 错误处理函数
     */
    errorHandle: TErrorHandle;
    /**
     * 创建路由
     * @param path
     * @param handle
     * @returns
     */
    route(path: string, handle: THandle): void;
    /**
     *
     * @param path
     * @returns
     */
    getHandle(path: string): () => any;
    /**
     * 设置默认的处理函数
     * @param handle 默认的处理函数
     * @returns
     */
    setDefaultHandle(handle: THandle): void;
    /**
     * 设置错误处理函数
     * @param handle 错误处理函数
     * @returns
     */
    setErrorHandle(handle: TErrorHandle): void;
}
declare const AppFactory: {
    createApp: (routeConfig?: Array<IRoute>) => IApp;
};

export { type IRoute, AppFactory as default };
