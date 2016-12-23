
class BairroListarCtrl {
    static $inject = ["BairroDao"]
    public bairros
    public promise

    constructor(BairroDao) {
        this.promise = BairroDao.buscarTodos().then(r => this.bairros = r)
    }
}

export const cpBairroListar:ng.IComponentOptions = {
    controller: BairroListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/bairro/listar.tpl.html"
}
