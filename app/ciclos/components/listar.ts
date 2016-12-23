
class CicloListarCtrl {
    static $inject = ["CicloDao"]
    public ciclos
    public promise

	constructor(CicloDao) {
        this.promise = CicloDao.buscarTodos().then(r => this.ciclos = r)
    }
}

export const cpCicloListar:ng.IComponentOptions = {
    controller: CicloListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/listar.tpl.html"
}
