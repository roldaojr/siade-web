export const UsuarioState = {
    parent: 'main',
    name: "usuario",
    url: "/usuario",
    abstract: true,
}

export const UsuarioListarState = {
    parent: "main",
    name: "usuario.listar",
    url: "/usuario/listar",
    permission: "supervisor",
    template: '<cp-usuario-listar layout-fill layout="column"/>',
}

export const UsuarioAdicionarState = {
    parent: "main",
    name: "usuario.adicionar",
    url: "/usuario/adicionar",
    permission: "supervisor",
    template: '<cp-usuario-form layout-fill layout="column" usuario="$resolve.usuario"/>',
    resolve: {
        usuario: (UsuarioModel) => {
            return new UsuarioModel()
        }
    }
}

export const UsuarioEditarState = {
    parent: "main",
    name: "usuario.editar",
    url: "/usuario/editar/:usuarioId",
    permission: "supervisor",
    params: {usuario: null},
    template: '<cp-usuario-form layout-fill layout="column" usuario="$resolve.usuario"/>',
    resolve: {
        usuario: ($stateParams, UsuarioDao) => {
            if($stateParams.usuario) {
                return $stateParams.usuario
            } else {
                return UsuarioDao.buscarPeloId($stateParams.usuarioId)
            }
        }
    }
}

export const usuarioInicialState = {
    name: "signup",
    url: "/signup",
    template: '<cp-signup-form layout-fill layout="column"/>'
}
