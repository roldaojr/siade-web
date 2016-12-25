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
    permission: "supervisor",
    template: '<cp-ciclo-detalhes layout-fill layout="column" ciclo="$resolve.ciclo"/>',
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
    permission: "supervisor",
    template: '<cp-ciclo-form layout-fill layout="column"/>'
}

export const CicloAnterioresState = {
    parent: "main",
    name: "ciclo.anteriores",
    url: "/ciclo/anteriores",
    permission: "supervisor",
    template: '<cp-ciclo-listar layout-fill layout="column"/>'
}
