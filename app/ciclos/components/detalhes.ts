class CicloDetalhesCtrl {
	static $inject = ["$mdDialog", "$mdToast", "$state", "TrabalhoDao"]

    public ciclo
    public trabalhos
    public trabalhosPromise

    constructor(private $mdDialog, private $mdToast, private $state,
                private TrabalhoDao) {
    	this.trabalhosPromise = TrabalhoDao.buscarPeloCiclo(this.ciclo)
    	                                   .then(r => this.trabalhos = r)
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
            console.log('erro', e)
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
