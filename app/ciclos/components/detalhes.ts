class CicloDetalhesCtrl {
	static $inject = ["$mdDialog", "$mdToast", "$state", "TrabalhoDao"]

    public ciclo
    public trabalhos
    public progresso
    public promiseTrabalhos

    constructor(private $mdDialog, private $mdToast, private $state,
                private TrabalhoDao) {
    	this.promiseTrabalhos = TrabalhoDao.buscarPeloCiclo(this.ciclo)
    	                                   .then(r => this.trabalhos = r)
        this.progresso = this.calcular_progresso()
    }

    calcular_progresso() {
        let total = Math.round((this.ciclo.data_fim - this.ciclo.data_inicio) / 86400)
        let atual = Math.round((this.ciclo.data_fim - new Date().valueOf()) / 86400)
        return Math.round((1 - atual / total) * 100)
    }

    encerrar(ev) {
        let confirm = this.$mdDialog.confirm()
            .targetEvent(ev).ok("Encerrar ciclo").cancel('Cancelar')
            .title("Encerrar ciclo").textContent("Deseja realmente encerrar o ciclo "+
                   this.ciclo+"?")
        this.$mdDialog.show(confirm).then(() => {
            this.ciclo.fechado_em = new Date()
            return this.ciclo.save()
        }).then(r => {
            this.$mdToast.showSimple("Ciclo encerrado")
            this.$state.reload()
        }).catch(e => {
            if(!e) return
            this.$mdToast.showSimple("Erro: "+e.message)}
        )
    }
}

export const cpCicloDetalhes:ng.IComponentOptions = {
    bindings: {"ciclo": "<"},
    controller: CicloDetalhesCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/detalhes.tpl.html"
}
