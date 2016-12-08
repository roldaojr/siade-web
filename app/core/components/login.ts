class LoginFormCtrl {
    static $inject = ["$rootScope", "$mdToast", "$state", "Parse"]
    public busy
    public username
    public password
    public configurado

    constructor(protected $rootScope, protected $mdToast, protected $state,
                protected Parse) {
        this.configurado = Parse.Config.current().get("configurado")
    }

    doLogin() {
        this.busy = this.Parse.User.logIn(this.username, this.password)
            .then(u => {
                this.$rootScope.currentUser = u
                this.$mdToast.showSimple("Usuário autenticado")
                this.$state.go("home")
            })
            .catch(e =>  this.$mdToast.showSimple("Erro de autenticação: "+e.message))
    }
}

export const cpLoginForm:ng.IComponentOptions = {
    controller: LoginFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "core/components/login.tpl.html"
}
