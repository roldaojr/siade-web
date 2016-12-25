export const debugRouterRunBlock = ["$rootScope", $rootScope => {
    $rootScope.$on("$stateChangeStart",function(event, toState, toParams, fromState, fromParams){
        console.log("$stateChangeStart to "+toState.name+"- fired when the transition begins. toState,toParams : \n",toState, toParams)
    })
    $rootScope.$on("$stateChangeError",function(event, toState, toParams, fromState, fromParams, error){
        console.log("$stateChangeError - fired when an error occurs during transition.")
        console.log(arguments)
    })
    $rootScope.$on("$stateChangeSuccess",function(event, toState, toParams, fromState, fromParams){
        console.log("$stateChangeSuccess to "+toState.name+"- fired once the state transition is complete.")
    })
    $rootScope.$on("$viewContentLoading",function(event, viewConfig){
        console.log("$viewContentLoading - view begins loading - dom not rendered",viewConfig)
    })

    $rootScope.$on("$stateNotFound",function(event, unfoundState, fromState, fromParams){
        console.log("$stateNotFound "+unfoundState.to+"  - fired when a state cannot be found by its name.")
        console.log(unfoundState, fromState, fromParams)
    })
}]

export const authHookRunBlock = ["$rootScope", "$state", "$mdToast", "Parse", "UsuarioModel",
                                ($rootScope, $state, $mdToast, Parse, Usuario) => {
    $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
        if(["login", "logout", "signup"].indexOf(toState.name) > -1) return
        // verificar se o usuário está logado
        let currentUser = Usuario.current()
        $rootScope.currentUser = currentUser
        if (!(currentUser && currentUser.authenticated())) {
            event.preventDefault()
            $state.go("login", {}, {location:"replace"})
        }
        // verificar se o usuário possui permissão
        if(toState.permission == "supervisor" && !currentUser.isSupervisor()) {
            event.preventDefault()
            $mdToast.showSimple("Acesso negado")
        }
    })
}]

export const stateChangeRunBlock = ["$rootScope", "$mdSidenav", "$mdComponentRegistry",
                                    ($rootScope, $mdSidenav, $mdComponentRegistry) => {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        $mdComponentRegistry.when('left').then(() => {
            $mdSidenav('left').close()
        })
    })
}]
