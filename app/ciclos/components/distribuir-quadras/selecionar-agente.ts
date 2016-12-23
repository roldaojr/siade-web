class CicloSelecionarAgenteCtrl {
    static $inject = ["$state", "UsuarioDao", "CicloDao", "TrabalhoDao"]

    public promiseAgentes
    public promiseTrabalho

    public agentes

    constructor(protected $state, UsuarioDao, protected CicloDao, protected TrabalhoDao) {
        this.promiseAgentes = UsuarioDao.buscarTodos().then(r => this.agentes = r)
    }

    selecionarAgente(agente) {
        this.promiseTrabalho = this.CicloDao.buscarAtual()
            .then(c => this.TrabalhoDao.buscarPeloAgenteECiclo(agente, c))
            .then(r => {
                return this.$state.go("ciclo.selecionar-quadras", {
                    trabalho: r, trabalhoId: r.id
                })
            })
    }
}

export const cpCicloSelecionarAgente:ng.IComponentOptions = {
    bindings: {"trabalho": "<"},
    controller: CicloSelecionarAgenteCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/distribuir-quadras/selecionar-agente.tpl.html"
}
