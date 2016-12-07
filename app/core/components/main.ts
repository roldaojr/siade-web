class MainCtrl {
    public static $inject = ["$state", "UsuarioModel"]
    public currentUser

    constructor(protected $state, protected UsuarioModel) {
        this.currentUser = UsuarioModel.current()
    }

    logout() {
        this.currentUser.logOut()
        this.$state.go("login", {location:"replace"})
    }
}

export const main:ng.IComponentOptions = {
    controller: MainCtrl,
    controllerAs: "$ctrl",
    templateUrl: "core/components/main.tpl.html"
}
