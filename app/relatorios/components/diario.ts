class RelatorioDiarioCtrl {
    public agentes
    public tipo

    constructor() {
    	this.tipo = "Diário"
    }

    salvar() {
    }
}

export const cpRelatorioDiario:ng.IComponentOptions = {
    bindings: {"agentes": "<"},
    controller: RelatorioDiarioCtrl,
    controllerAs: "$ctrl",
    templateUrl: "relatorios/components/form.tpl.html"
}
