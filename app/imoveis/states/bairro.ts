export const BairroState = {
    parent: "main",
    name: "bairro",
    url: "/bairro",
    abstract: true,
}

export const BairroListarState = {
    parent: "main",
    name: "bairro.listar",
    url: "/bairro/listar",
    permission: "supervisor",
    template: '<cp-bairro-listar layout-fill layout="column"/>'
}

export const BairroEditarState = {
    parent: "main",
    name: "bairro.editar",
    url: "/bairro/editar/:bairroId",
    permission: "supervisor",
    template: '<cp-bairro-form layout-fill layout="column" bairro="$resolve.bairro"/>',
    params: {bairro: null},
    resolve: {
    	bairro: ($stateParams, BairroDao) => {
            if($stateParams.bairro) {
                return $stateParams.bairro
            } else {
    		    return BairroDao.buscarPeloId($stateParams.bairroId)
            }
    	}
    }
}

export const BairroAdicionarState = {
    parent: "main",
    name: "bairro.adicionar",
    url: "/bairro/adicionar",
    permission: "supervisor",
    template: '<cp-bairro-form layout-fill layout="column" bairro="$resolve.bairro"/>',
    resolve: {
    	bairro: (BairroModel) => {
    		return new BairroModel()
    	}
    }
}
