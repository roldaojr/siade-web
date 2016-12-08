import * as serverConfig from "../server.config"

export const otherwiseConfig = ['$urlRouterProvider', $urlRouterProvider => {
    $urlRouterProvider.otherwise("/");
}]

export const backendConfig = ['ParseProvider', ParseProvider => {
    ParseProvider.initialize(serverConfig.appId, serverConfig.clientKey)
    ParseProvider.serverURL = serverConfig.serverURL
    ParseProvider.Config.get()
}]
