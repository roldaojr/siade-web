class QuadraFormCtrl {
    static $inject = ["$scope", "LadoDao", "LadoModel", "LogradouroDao"]
    public quadra
    public lados

    constructor($scope, protected LadoDao, protected LadoModel, protected LogradouroDao) {
        console.log('QuadraFormCtrl')
        if(this.quadra.id) {
            $scope.ladosPromise = LadoDao
                .buscarPelaQuadra(this.quadra).then(r => this.lados = r)
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

    salvar() {
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
