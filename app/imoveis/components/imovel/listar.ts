class ImovelListarCtrl {
    static $inject = ["$state", "$mdDialog", "ImovelDao", "LadoDao"]
    public lado
    public lados
    public imoveis
    public imoveisPromise
    public ladosPromise

    constructor(protected $state, protected $mdDialog
                protected ImovelDao, protected LadoDao) {
        this.ladosPromise = this.LadoDao.buscarPelaQuadra(this.lado.quadra)
                                        .then(r => this.lados = r)
        this.buscarImoveis()
    }

    buscarImoveis() {
        this.imoveisPromise = this.ImovelDao.buscarPeloLado(this.lado)
                                            .then(r => this.imoveis = r)
    }

    mudarLado() {
        this.$state.go('imovel.listar.lado',
            {ladoId: this.lado.id},
            {notify: false, location: 'replace'})
        this.buscarImoveis()
    }

    excluirImovel(ev, imovel) {
        let confirm = this.$mdDialog.confirm()
          .title("Excluir imovel")
          .textContent("Deseja realmente o imóvel nº"+
              imovel.numero+
              "? Esta ação não pode ser desfeita.")
          .targetEvent(ev)
          .ok("Excluir imovel")
          .cancel('Cancelar')
        this.$mdDialog.show(confirm).then(() => {
            let index = this.imoveis.indexOf(imovel)
            this.imoveis.splice(index, 1)
            console.log('excluir imovel', index)
        })
    }

    getTipoDisplay(tipo) {
        let ImovelTipo = {1: "Residencia", 2: "Comercio", 3: "Terreno", 4: "Outros"}
        return ImovelTipo[tipo]
    }
}

export const cpImovelListar:ng.IComponentOptions = {
    bindings: {'lado': '<'},
    controller: ImovelListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/imovel/listar.tpl.html"
}
