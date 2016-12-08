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
        },
        atual: ($state, ciclo) => {
                if(!ciclo) $state.go("ciclo.iniciar", {}, {location:"replace"})
        }
    }
}

export const CicloIniciarState = {
    parent: "main",
    name: "ciclo.iniciar",
    url: "/ciclo/iniciar",
    template: '<cp-ciclo-form/>',
}

export const CicloAnterioresState = {
    parent: "main",
    name: "ciclo.anteriores",
    url: "/ciclo/anteriores",
    template: "<cp-ciclo-listar/>"
}
