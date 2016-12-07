
class UsuarioListarCtrl {
    static $inject = ["$scope", "UsuarioDao"]
    private usuarios

    constructor(protected $scope, protected UsuarioDao) {
        $scope.usuariosPromise = UsuarioDao
            .buscarTodos().then(r => this.usuarios = r)
    }
}

export const cpUsuarioListar:ng.IComponentOptions = {
    controller: UsuarioListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "usuario/components/listar.tpl.html"
}
