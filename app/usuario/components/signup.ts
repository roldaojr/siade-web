import * as serverConfig from "../../server.config"

class SignupFormCtrl {
    static $inject = ["$rootScope", "$http", "$mdToast", "$state", "Parse", "UsuarioModel"]
    public busy
    public usuario
    public chave_mestra:string
    public configurado:boolean

    constructor(protected $rootScope, protected $http, protected $mdToast, protected $state,
                protected Parse, protected UsuarioModel) {
        this.usuario = new this.UsuarioModel()
        this.configurado = Parse.Config.current().get("configurado")
    }

    doSignup() {
        if(this.configurado) return
        this.usuario.tipo = this.UsuarioModel.Tipos.SUPERVISOR
        this.busy = this.usuario.signUp().then(u => {
            this.$rootScope.currentUser = u
            this.$mdToast.showSimple("Criado com sucesso")
            this.finalizarConfig()
        }).then(r => this.$state.go("home"))
        .catch(e =>  this.$mdToast.showSimple("Erro de autenticação: "+e.message))
    }

    finalizarConfig() {
        let request = {
            method: "PUT",
            url: serverConfig.serverURL+"/config",
            data: {params: {configurado: true}},
            headers: {
                "X-Parse-Application-Id": serverConfig.appId,
                "X-Parse-Master-Key": this.chave_mestra
            }
        }
        return this.$http(request).then(r => {
            this.$mdToast.showSimple("Configuração concluída")
        }).catch(e => {
            if(e.status == 403) {
                this.$mdToast.showSimple("Chave mestra incorreta")
            } else {
                this.$mdToast.showSimple("Erro ao realizar configuração")
            }
        })
    }
}

export const cpSignupForm:ng.IComponentOptions = {
    controller: SignupFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "usuario/components/signup.tpl.html"
}
