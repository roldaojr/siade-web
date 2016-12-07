export const RelatorioState = {
    parent: "main",
    name: "relatorio",
    url: "/relatorio",
    abstract: true,
}

export const RelatorioAtualState = {
    parent: "main",
    name: "relatorio.diario",
    url: "/relatorio/diario",
    templateUrl: "relatorios/components/relatorio-diario.tpl.html"
}


export const RelatorioAnterioresState = {
    parent: "main",
    name: "relatorio.semanal",
    url: "/relatorio/semanal",
    templateUrl: "relatorios/components/relatorio-semanal.tpl.html"
}
