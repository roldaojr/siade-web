class BairroFormCtrl {
    public bairro
    public form

    constructor() {
    }

    salvar() {
        if(this.form.$invalid) return
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
