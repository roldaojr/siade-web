class BairroFormCtrl {
    public bairro
    public form
    public promise

    constructor() {
    }

    salvar() {
        if(this.form.$invalid) return
        this.promise = this.bairro.save().then(r => {
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
