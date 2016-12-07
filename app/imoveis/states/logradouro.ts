export const LogradouroState = {
    parent: "main",
    name: "logradouro",
    url: "/logradouro",
    abstract: true,
}

export const LogradouroListarState = {
    parent: "main",
    name: "logradouro.listar",
    url: "/logradouro/listar",
    template: "<cp-logradouro-listar/>"
}

export const LogradouroEditarState = {
    parent: "main",
    name: "logradouro.editar",
    url: "/logradouro/editar/:logradouroId",
    template: '<cp-logradouro-form logradouro="$resolve.logradouro"/>',
    params: {logradouro: null},
    resolve: {
    	logradouro: ($stateParams, LogradouroDao) => {
            if($stateParams.logradouro) {
                return $stateParams.logradouro
            } else {
    		    return LogradouroDao.buscarPeloId($stateParams.logradouroId)
            }
    	}
    }
}

export const LogradouroAdicionarState = {
    parent: "main",
    name: "logradouro.adicionar",
    url: "/logradouro/adicionar",
    template: '<cp-logradouro-form logradouro="$resolve.logradouro"/>',
    resolve: {
    	logradouro: (LogradouroModel) => {
    		return new LogradouroModel()
    	}
    }
}
