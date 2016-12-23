
class ImovelFormCtrl {
    public imovel
    public form
    public promise

    constructor() {
    }

    salvar() {
        if(this.form.$invalid) return
        this.promise = this.imovel.save().then(imovel => {
            history.back()
        })
    }
}

export const cpImovelForm:ng.IComponentOptions = {
    bindings: {"imovel": "<"},
    controller: ImovelFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/imovel/form.tpl.html"
}
