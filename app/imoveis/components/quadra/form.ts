class QuadraFormCtrl {
    static $inject = ["LadoDao", "LadoModel", "LogradouroDao"]
    public quadra
    public lados
    public form
    public promise

    constructor(protected LadoDao, protected LadoModel, protected LogradouroDao) {
        if(this.quadra.id) {
            this.promise = LadoDao.buscarPelaQuadra(this.quadra)
                                  .then(r => this.lados = r)
        } else {
            this.lados = []
        }
    }

    adicionarLado() {
        let lado = new this.LadoModel()
        lado.quadra = this.quadra
        this.lados.push(lado)
    }

    pesquisarLogradouro(nome) {
        return this.LogradouroDao.buscarPorNome(nome)
    }

    validar_lado(value, lado) {
        let itens = this.lados.filter(it => it.numero == value)
        let valido = (itens.length == 1 && itens[0] != undefined && itens[0].id == lado.id) || itens.length == 0
        return valido
    }

    salvar() {
        if(this.form.$invalid) return
        this.quadra.total_lados = this.lados.length
        this.quadra.save()
            .then(r => this.LadoDao.salvarTodos(this.lados))
            .then(r => history.back())
    }
}

export const cpQuadraForm:ng.IComponentOptions = {
    bindings: {"quadra": "<"},
    controller: QuadraFormCtrl,
    controllerAs: '$ctrl',
    templateUrl: 'imoveis/components/quadra/form.tpl.html'
}
