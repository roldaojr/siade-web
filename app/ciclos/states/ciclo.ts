export const CicloState = {
    parent: "main",
    name: "ciclo",
    url: "/ciclo",
    abstract: true,
}

export const CicloDetalhesState = {
    parent: "main",
    name: "ciclo.detalhes",
    url: "/ciclo/detalhes/:cicloId",
    template: '<cp-ciclo-detalhes ciclo="$resolve.ciclo"/>',
    resolve: {
        ciclo: ($stateParams, CicloDao, CicloModel) => {
            if($stateParams.cicloId) {
                return CicloDao.buscarPeloId($stateParams.cicloId)
            } else {
                return CicloDao.buscarAtual()
            }
        }
    }
}

export const CicloAnterioresState = {
    parent: "main",
    name: "ciclo.anteriores",
    url: "/ciclo/anteriores",
    template: "<cp-ciclo-listar/>"
}
