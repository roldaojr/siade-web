
class LogradouroListarCtrl {
    static $inject = ["$scope", "LogradouroDao"]

    constructor($scope, LogradouroDao) {
        $scope.logradourosPromise = LogradouroDao
            .buscarTodos().then(r => $scope.logradouros = r)
    }
}

export const cpLogradouroListar:ng.IComponentOptions = {
    controller: LogradouroListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/logradouro/listar.tpl.html"
}
