class RelatorioDiarioCtrl {
    static $inject = ["CicloDao", "RelatorioDiarioService"]

    public relatorioPromise
    public ciclo
    public agentes
    public agentesSel
    public data
    public tipo
    public form

    constructor(CicloDao, protected RelatorioDiarioService) {
    	this.tipo = "Diário"
        CicloDao.buscarAtual().then(c => this.ciclo = c)
    }

    imprimir() {
        if(this.form.$invalid) return
        this.relatorioPromise = this.RelatorioDiarioService.gerar(this.ciclo, this.data, this.agentesSel)
    }
}

export const cpRelatorioDiario:ng.IComponentOptions = {
    bindings: {"agentes": "<"},
    controller: RelatorioDiarioCtrl,
    controllerAs: "$ctrl",
    templateUrl: "relatorios/components/form.tpl.html"
}
