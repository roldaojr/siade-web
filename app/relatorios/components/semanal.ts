class RelatorioSemanalCtrl {
    public agentes
    public tipo

    constructor() {
    	this.tipo = "Semanal"
    }

    salvar() {
    }
}

export const cpRelatorioSemanal:ng.IComponentOptions = {
    bindings: {"agentes": "<"},
    controller: RelatorioSemanalCtrl,
    controllerAs: "$ctrl",
    templateUrl: "relatorios/components/form.tpl.html"
}
