
export class RelatorioDiarioService {
    static $inject = ["$filter", "Parse", "VisitaDao", "BairroDao",
                      "ImovelModel", "LadoModel", "QuadraModel", "LogradouroModel", "BairroModel"]

    public agentes
    public data

    protected ciclo

    constructor(protected $filter, protected Parse, protected VisitaDao, protected BairroDao,
                ImovelModel, LadoModel, QuadraModel, LogradouroModel, BairroModel) {
    }

    public gerar(ciclo, data, agentes) {
        console.log("Gerando relatório...")
        return this.Parse.Promise.when(this.buscarDados(ciclo, data, agentes)).then(results => {
            console.log("buscarDados", results)
            let content = []
            results.forEach(it => {
                content = content.concat(this.paginaAgente(it))
            })
            let doc = this.docDefinition(content)
            console.log("gerar", content)
            pdfMake.createPdf(doc).open()
        })
    }

    private buscarDados(ciclo, data, agentes) {
        return agentes.map(agente => {
            return this.VisitaDao.buscarPorCicloDataEAgente(ciclo, data, agente)
                                 .include("imovel")
                                 .include("imovel.lado")
                                 .include("imovel.lado.logradouro")
                                 .include("imovel.quadra")
                                 .include("imovel.quadra.bairro")
                                 .addAscending("agente")
                                 .addAscending("datahora")
                                 .find().then(visitas => {
                                     return {
                                         data: data,
                                         ciclo: ciclo,
                                         visitas: visitas,
                                         agente: agente
                                     }
                                 })
        })
    }

    private docDefinition(content) {
        return {
            pageSize: "A4",
            pageOrientation: "landscape",
            pageMargins: [20, 20, 20, 20],
            content: content
        }
    }

    private paginaAgente(dados) {
        return [
            { text: "Dados do Agente", style: "header" },
            this.tabelaDadosAgente(dados.ciclo, dados.agente, dados.data)
            { text: "Pesquisa Entomológica / Tratamento", style: "header" },
            this.tabelaVisitasAgente(dados.ciclo, dados.agente, dados.visitas)
        ]
    }

    private tabelaDadosAgente(ciclo, agente, data) {
        return {
            table: {
                widths: [ "*", "*", "*", "*", "*" ],
                body: [
                    ["Nome", "Ciclo", "data", "Bairro", "Atividade"],
                    [
                        agente.nome,
                        ciclo.toString(),
                        this.$filter('date')(data, 'dd/MM/yyyy'),
                        "",
                        ciclo.atividade_label]
                ]
            }
        }
    }

    private tabelaVisitasAgente(ciclo, agente, visitas) {
        let header = ["Quarteirão", "Lado", "Logradouro", "Nº Imóvel", "Tipo",
            "Pendência", "Eliminado", "Imóvel Tratado", "Tipo de Larvicida",
            "Qtd Larvicida", "Qtd de Depósitos Tratados"
        ]
        let linhas = visitas.map(visita => {
            return [
                String(visita.imovel.lado.quadra.numero),
                String(visita.imovel.lado.numero),
                String(visita.imovel.lado.logradouro.nome),
                String(visita.imovel.numero),
                String(visita.tipo_label),
                String(visita.pendencia_label),
                String(visita.depositos_eliminados || 0),
                visita.imovel_tratado ? "Sim" : "Não",
                String(visita.larvicida || ""),
                String(visita.quantidade_larvicida || 0),
                String(visita.depositos_tratados || 0)
            ]
        })
        linhas.unshift(header)
        return {
            table: {
                widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
                body: linhas
            },
            pageBreak: "after"
        }
    }
}
