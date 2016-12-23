export const RelatorioState = {
    parent: "main",
    name: "relatorio",
    url: "/relatorio",
    abstract: true,
}

export const RelatorioDiarioState = {
    parent: "main",
    name: "relatorio.diario",
    url: "/relatorio/diario",
    template: '<cp-relatorio-diario layout-fill layout="column" agentes="$resolve.agentes"/>',
    resolve: {
        agentes: (UsuarioDao) => {
            return UsuarioDao.buscarTodos()
        }
    }
}

export const RelatorioSemanalState = {
    parent: "main",
    name: "relatorio.semanal",
    url: "/relatorio/semanal",
    template: '<cp-relatorio-semanal layout-fill layout="column" agentes="$resolve.agentes"/>',
    resolve: {
        agentes: (UsuarioDao) => {
            return UsuarioDao.buscarTodos()
        }
    }
}

export const QrCodeState = {
    parent: "main",
    name: "qrcode",
    url: "/qrcode",
    template: '<cp-qr-code layout-fill layout="column"/>'
}
