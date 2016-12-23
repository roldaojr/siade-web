class CicloSelecionarQuadraCtrl {
    static $inject = ["$state", "BairroDao", "QuadraDao",
                      "TrabalhoModel", "QuadraModel"]
    public bairros
    public bairro
    public quadras
    public quadras_sel
    public trabalho
    public promiseBairros
    public promiseQuadras
    public promiseQuadrasSel
    public promiseTrabalho

    constructor(protected $state,
                protected BairroDao, protected QuadraDao,
                protected TrabalhoModel, protected QuadraModel) {
        this.buscarBairros()
        this.quadras_sel = []
        this.promiseQuadrasSel = this.trabalho.quadras.query().find()
            .then(r => this.quadras_sel = r)
    }

    quadraSelecionada(quadra) {
        return this.quadras_sel.findIndex(it => it.id == quadra.id) > -1
    }

    selecionarQuadra(quadra) {
        let idx = this.quadras_sel.findIndex(it => it.id == quadra.id)
        if(idx > -1) {
            this.quadras_sel.splice(idx, 1)
            this.trabalho.quadras.remove(quadra)
        } else {
            this.quadras_sel.push(quadra)
            this.trabalho.quadras.add(quadra)
        }
    }

    buscarBairros() {
        this.promiseBairros = this.BairroDao.buscarTodos().then(r => {
            this.bairros = r
            if(r.length > 0) this.bairro = r[0]
            this.mudarBairro()
        })
    }

    buscarQuadras() {
        this.promiseQuadras = this.QuadraDao.buscarPeloBairro(this.bairro)
                                            .then(r => this.quadras = r)
    }

    mudarBairro() {
        this.buscarQuadras()
    }

    concluir() {
        let total_imoveis = this.quadras_sel.reduce((total, it) => {
            return total + (it.total_imoveis || 0)
        }, 0)
        this.trabalho.total_imoveis = total_imoveis
        this.promiseTrabalho = this.trabalho.save().then(r => {
            this.$state.go("ciclo.detalhes", {ciclo: r.ciclo})
        })
    }
}

export const cpCicloSelecionarQuadras:ng.IComponentOptions = {
    bindings: {"trabalho": "<"},
    controller: CicloSelecionarQuadraCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/distribuir-quadras/selecionar-quadras.tpl.html"
}
