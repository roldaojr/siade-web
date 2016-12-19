export const QuadraState = {
    parent: 'main',
    name: "quadra",
    url: "/quadra",
    abstract: true,
};

export const QuadraListarState = {
    parent: 'main',
    name: "quadra.listar",
    url: "/quadra/listar/:bairroId",
    template: '<cp-quadra-listar layout-fill layout="column" bairro="$resolve.bairro"/>',
    resolve: {
        bairro: ($stateParams, BairroModel, BairroDao) => {
            if($stateParams.bairro){ 
                return $stateParams.bairro
            } else if($stateParams.bairroId) {
                return BairroModel.createWithoutData($stateParams.bairroId)
            } else {
                return BairroDao.buscarPrimeiro()
            }
        }
    }
}

export const QuadraAdicionarState = {
    parent: 'main',
    name: "quadra.adicionar",
    url: "/quadra/adicionar/:bairroId",
    template: '<cp-quadra-form layout-fill layout="column" quadra="$resolve.quadra"/>',
    params: {lado: null},
    resolve: {
        bairro: ($stateParams, BairroDao) => {
            if($stateParams.bairro){ 
                return $stateParams.bairro
            } else if($stateParams.bairroId) {
                return BairroDao.buscarPeloId($stateParams.bairroId)
            } else {
                return null
            }
        },
        quadra: (QuadraModel, bairro) => {
            let quadra = new QuadraModel()
            quadra.bairro = bairro
            return quadra
        }
    }
};

export const QuadraEditarState = {
    parent: 'main',
    name: "quadra.editar",
    url: "/quadra/editar/:quadraId",
    template: '<cp-quadra-form layout-fill layout="column" quadra="$resolve.quadra"/>',
    resolve: {
        quadra: ($stateParams, QuadraDao) => {
            return QuadraDao.buscarPeloId($stateParams.quadraId)
        }
    }
};
