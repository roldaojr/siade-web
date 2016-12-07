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
    template: "<cp-bairro-listar/>"
}

export const BairroEditarState = {
    parent: "main",
    name: "bairro.editar",
    url: "/bairro/editar/:bairroId",
    template: '<cp-bairro-form bairro="$resolve.bairro"/>',
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
    template: '<cp-bairro-form bairro="$resolve.bairro"/>',
    resolve: {
    	bairro: (BairroModel) => {
    		return new BairroModel()
    	}
    }
}
