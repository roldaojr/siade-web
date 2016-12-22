class RelatorioSemanalCtrl {
    static $inject = ["CicloDao", "RelatorioSemanalService"]

    public relatorioPromise
    public ciclo
    public agentes
    public agentesSel
    public data
    public tipo

    constructor(protected CicloDao, protected RelatorioSemanalService) {
    	this.tipo = "Semanal"
    }

    imprimir() {
        this.relatorioPromise = this.CicloDao.buscarAtual().then(ciclo => {
            this.RelatorioSemanalService.gerar(ciclo, this.data, this.agentesSel)
        })
    }
}

export const cpRelatorioSemanal:ng.IComponentOptions = {
    bindings: {"agentes": "<"},
    controller: RelatorioSemanalCtrl,
    controllerAs: "$ctrl",
    templateUrl: "relatorios/components/form.tpl.html"
}
