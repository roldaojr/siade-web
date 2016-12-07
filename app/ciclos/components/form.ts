class CicloFormCtrl {
    public ciclo;

    constructor() {
    }

    salvar() {
        /*this.ciclo.save().then(r => {
            history.back()
        })*/
    }
}

export const cpCicloForm:ng.IComponentOptions = {
    bindings: {"ciclo": "<"},
    controller: CicloFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/form.tpl.html"
}
