
class UsuarioListarCtrl {
    static $inject = ["UsuarioDao"]
    public usuarios
    public promise

    constructor(protected UsuarioDao) {
        this.promise = UsuarioDao.buscarTodos().then(r => this.usuarios = r)
    }
}

export const cpUsuarioListar:ng.IComponentOptions = {
    controller: UsuarioListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "usuario/components/listar.tpl.html"
}
