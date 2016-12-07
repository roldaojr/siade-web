class BairroFormCtrl {
    public bairro;

    constructor() {
    }

    salvar() {
        this.bairro.save().then(r => {
            history.back()
        })
    }
}

export const cpBairroForm:ng.IComponentOptions = {
    bindings: {"bairro": "<"},
    controller: BairroFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/bairro/form.tpl.html"
}
