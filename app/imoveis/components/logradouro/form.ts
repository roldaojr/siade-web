
class LogradouroFormCtrl {
    public logradouro
    public form
    public promise

    constructor() {
    }

    salvar() {
        if(this.form.$invalid) return
        this.promise = this.logradouro.save().then(r => {
            history.back()
        })
    }
}

export const cpLogradouroForm:ng.IComponentOptions = {
    bindings: {"logradouro": "<"},
    controller: LogradouroFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/logradouro/form.tpl.html"
}
