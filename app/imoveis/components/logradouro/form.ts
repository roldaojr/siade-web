
class LogradouroFormCtrl {
    public logradouro;

    constructor() {
    }

    salvar() {
        this.logradouro.save().then(r => {
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
