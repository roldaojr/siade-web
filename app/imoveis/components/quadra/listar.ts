
class QuadraListarCtrl {
    static $inject = ["$rootScope", "$state", "$mdDialog",
                      "QuadraDao", "BairroDao", "TrabalhoDao"]
    public quadras
    public bairros
    public bairro
    public bairrosPromise
    public quadrasPromise
    private _bairros

    constructor(protected $rootScope, protected $state, protected $mdDialog,
                protected QuadraDao, protected BairroDao, protected TrabalhoDao) {
        this.buscarBairros()
    }

    buscarBairros() {
        if(this.$rootScope.currentUser.isSupervisor()) {
            this.bairrosPromise = this.BairroDao.buscarTodos()
                                                .then(r => {this.bairros = r})
        } else {
            this.bairrosPromise = this.TrabalhoDao.buscarQuadrasPeloAgente(
                this.$rootScope.currentUser).then(quadras => {
                    let bairros = {}
                    quadras.forEach(quadra => {
                        let bairro = quadra.bairro
                        if(bairros[bairro.id] == undefined) {
                            bairro.quadras = []
                            bairros[bairro.id] = bairro
                        }
                        bairros[bairro.id].quadras.push(quadra)
                    })
                    this._bairros = bairros
                    this.bairros = Object.values(bairros)
                })
        }
    }

    buscarQuadras() {
        if(this.$rootScope.currentUser.isSupervisor()) {
            this.quadrasPromise = this.QuadraDao.buscarPeloBairro(this.bairro)
                                                .then(r => this.quadras = r)
        } else {
            this.quadras = this._bairros[this.bairro.id].quadras
        }
    }

    mudarBairro() {
        this.$state.go('quadra.listar',
            {bairroId: this.bairro.id},
            {notify: false, location: 'replace'})
        this.buscarQuadras()
    }

    excluirQuadra(ev, quadra) {
        let confirm = this.$mdDialog.confirm()
            .title("Excluir quadra")
            .textContent("Deseja realmente a quadra "+
                quadra.numero+
                "? Esta ação não pode ser desfeita.")
            .targetEvent(ev)
            .ok("Excluir quadra")
            .cancel('Cancelar')
        this.$mdDialog.show(confirm).then(() => {
            let index = this.quadras.indexOf(quadra)
            this.quadras.splice(index, 1)
            console.log('excluir quadra', index)
        })
    }
}

export const cpQuadraListar:ng.IComponentOptions = {
    bindings: {"bairro": "<"},
    controller: QuadraListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/quadra/listar.tpl.html"
}
