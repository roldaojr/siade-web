class CicloFormCtrl {
    public ciclo
    public form

    constructor(CicloModel, protected CicloDao) {
        this.ciclo = new CicloModel()
        this.ciclo.ano_base = new Date().getFullYear()
    }


    salvar() {
        if(this.form.$invalid) return
        this.CicloDao.iniciarCiclo(this.ciclo)
        this.ciclo.save().then(r => {
            history.back()
        })
    }
}

export const cpCicloForm:ng.IComponentOptions = {
    bindings: {"ciclo": "<"},
    controller: CicloFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/form.tpl.html"
}
