
class LogradouroListarCtrl {
    static $inject = ["LogradouroDao"]
    public logradouros
    public promise

    constructor(LogradouroDao) {
        this.promise = LogradouroDao.buscarTodos().then(r => this.logradouros = r)
    }
}

export const cpLogradouroListar:ng.IComponentOptions = {
    controller: LogradouroListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/logradouro/listar.tpl.html"
}
