export const CicloSelecionarAgenteState = {
    parent: "main",
    name: "ciclo.selecionar-agente",
    url: "/ciclo/distribuir-quadras/agente",
    params: {trabalho: null},
    template: '<cp-ciclo-selecionar-agente layout-fill layout="column"/>'
}

export const CicloSelecionarQuadraState = {
    parent: "main",
    name: "ciclo.selecionar-quadras",
    url: "/ciclo/distribuir-quadras/quadras/:trabalhoId",
    params: {trabalho: null},
    template: '<cp-ciclo-selecionar-quadras layout-fill layout="column" trabalho="$resolve.trabalho"/>',
    resolve: {
        trabalho: ($stateParams, TrabalhoDao) => {
            if($stateParams.trabalho) {
                return $stateParams.trabalho
            } else if($stateParams.trabalhoId) {
                return TrabalhoDao.buscarPeloId($stateParams.trabalhoId)
            }
        }
    }
}
