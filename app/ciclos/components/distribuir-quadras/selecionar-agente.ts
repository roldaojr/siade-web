class CicloSelecionarAgenteCtrl {
    static $inject = ["$state", "UsuarioDao", "CicloDao", "TrabalhoDao"]

    public agentesAsync
    public trabalhoAsync

    public agentes

    constructor(protected $state, UsuarioDao, protected CicloDao, protected TrabalhoDao) {
        this.agentesAsync = UsuarioDao.buscarTodos().then(r => this.agentes = r)
    }

    selecionarAgente(agente) {
        this.trabalhoAsync = this.CicloDao.buscarAtual()
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
