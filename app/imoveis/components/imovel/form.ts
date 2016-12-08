
class ImovelFormCtrl {
    public imovel
    public form

    constructor() {
    }

    salvar() {
        if(this.form.$invalid) return
        this.imovel.save().then(imovel => {
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
