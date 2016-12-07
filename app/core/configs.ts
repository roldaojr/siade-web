const appId:string = ""
const clientKey:string = ""
const serverURL:string = ""

export const otherwiseConfig = ['$urlRouterProvider', $urlRouterProvider => {
    $urlRouterProvider.otherwise("/");
}]

export const backendConfig = ['ParseProvider', ParseProvider => {
    ParseProvider.initialize(appId, clientKey)
    ParseProvider.serverURL = serverURL
}]
