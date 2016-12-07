
class CicloListarCtrl {
    static $inject = ["$scope", "CicloDao"]

	constructor($scope, CicloDao) {
        $scope.ciclosPromise = CicloDao
            .buscarTodos().then(r => {$scope.ciclos = r; console.log('buscarTodos', r)})
    }
}

export const cpCicloListar:ng.IComponentOptions = {
    controller: CicloListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/listar.tpl.html"
}
