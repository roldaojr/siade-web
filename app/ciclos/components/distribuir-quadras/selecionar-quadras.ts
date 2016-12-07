class CicloSelecionarQuadraCtrl {
    static $inject = ["$state", "BairroDao", "QuadraDao", "TrabalhoModel", "QuadraModel"]

    public asyncLoad
    public bairros
    public bairro
    public quadras
    public quadras_sel
    public trabalho

    constructor(protected $state,
                protected BairroDao, protected QuadraDao,
                protected TrabalhoModel, protected QuadraModel) {
        this.asyncLoad = new Array()
        this.quadras_sel = new Array()
        this.asyncLoad.push(BairroDao.buscarTodos().then(r => {
            this.bairros = r
            this.bairro = r[0]
            this.buscarQuadras()
        }))
        this.asyncLoad.push(this.trabalho.quadras.query().find().then(r => {
            this.quadras_sel = r
        }))
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

    buscarQuadras() {
        this.asyncLoad.push(
            this.QuadraDao.buscarPeloBairro(this.bairro).then(r => this.quadras = r)
        )
    }

    mudarBairro() {
        this.buscarQuadras()
    }

    concluir() {
        let total_imoveis = this.quadras_sel.reduce((total, it) => {
            return total + (it.total_imoveis || 0)
        }, 0)
        this.trabalho.total_imoveis = total_imoveis
        this.asyncLoad.push(
            this.trabalho.save().then(r => {
                this.$state.go("ciclo.detalhes", {ciclo: r.ciclo})
            }).catch(e => {
                console.log(e)
            })
        )
    }
}

export const cpCicloSelecionarQuadras:ng.IComponentOptions = {
    bindings: {"trabalho": "<"},
    controller: CicloSelecionarQuadraCtrl,
    controllerAs: "$ctrl",
    templateUrl: "ciclos/components/distribuir-quadras/selecionar-quadras.tpl.html"
}
