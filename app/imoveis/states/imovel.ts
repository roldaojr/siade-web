export const ImovelState = {
    parent: 'main',
    name: "imovel",
    url: "/imovel",
    abstract: true,
}

export const ImovelListarState = {
    parent: "main",
    name: "imovel.listar",
    url: "/imovel/listar/quadra/:quadraId",
    template: '<cp-imovel-listar lado="$resolve.lado"/>',
    resolve: {
        lado: ($stateParams, LadoDao, QuadraModel) => {
            let quadra = QuadraModel.createWithoutData($stateParams.quadraId)
            return LadoDao.primeiroLadoDaQuadra(quadra)
        }
    }
}


export const ImovelListarLadoState = {
    parent: "main",
    name: "imovel.listar.lado",
    url: "/imovel/listar/lado/:ladoId",
    template: '<cp-imovel-listar lado="$resolve.lado"/>',
    params: {lado: null},
    resolve: {
        lado: ($stateParams, LadoDao, LadoModel) => {
            if($stateParams.lado){
                return $stateParams.lado
            } else if($stateParams.ladoId) {
                return LadoDao.buscarPeloId($stateParams.ladoId)
            } else {
                return null
            }
        }
    }
}

export const ImovelAdicionarState = {
    parent: "main",
    name: "imovel.adicionar",
    url: "/imovel/adicionar/:ladoId",
    template: '<cp-imovel-form imovel="$resolve.imovel"/>',
    params: {lado: null},
    resolve: {
        lado: ($stateParams, LadoDao) => {
            if($stateParams.lado){ 
                return $stateParams.lado
            } else if($stateParams.ladoId) {
                return LadoDao.buscarPeloId($stateParams.ladoId)
            } else {
                return null
            }
        },
        imovel: (ImovelModel, lado) => {
            let imovel = new ImovelModel()
            imovel.lado = lado
            imovel.quadra = lado.quadra
            return imovel
        }
    }
}

export const ImovelEditarState = {
    parent: "main",
    name: "imovel.editar",
    url: "/imovel/editar/:imovelId",
    template: '<cp-imovel-form imovel="$resolve.imovel"/>',
    resolve: {
        imovel: ($stateParams, ImovelDao) => {
            return ImovelDao.buscarPeloId($stateParams.imovelId)
        }
    }
}
