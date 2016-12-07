
class BairroListarCtrl {
    static $inject = ["$scope", "BairroDao"]

    constructor($scope, BairroDao) {
        $scope.bairrosPromise = BairroDao
            .buscarTodos().then(r => $scope.bairros = r)
    }
}

export const cpBairroListar:ng.IComponentOptions = {
    controller: BairroListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/bairro/listar.tpl.html"
}
