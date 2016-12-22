const dia = (24 * 3600 * 1000)

export class RelatorioSemanalService {
    static $inject = ["$filter", "Parse", "VisitaDao", "BairroDao",
                      "ImovelModel", "LadoModel", "QuadraModel", "LogradouroModel", "BairroModel"]

    public agentes
    public semana

    protected ciclo
    private contadores

    constructor(protected $filter, protected Parse, protected VisitaDao, protected BairroDao,
                protected ImovelModel, QuadraModel, BairroModel) {
    }

    public gerar(ciclo, data, agentes) {
        console.log("Gerando relatório...")
        return this.Parse.Promise.when(this.buscarDados(ciclo, data, agentes)).then(results => {
            console.log("buscarDados", results)
            let content = []
            results.forEach((it, idx) => {
                let pagina = this.paginaAgente(it)
                if(idx > 0) pagina[0].pageBreak = "before"
                content = content.concat(pagina)
            })
            let doc = this.docDefinition(content)
            console.log("gerar", content)
            pdfMake.createPdf(doc).open()
        })
    }

    private buscarDados(ciclo, data, agentes) {
        let data2 = new Date(data.getTime() + 7 * dia)
        if(data2 > ciclo.data_final) {
            data2 = ciclo.data_final
        }
        return agentes.map(agente => {
            return this.VisitaDao.buscarPorCicloDataEAgente(ciclo, data, agente)
                                 .include("imovel")
                                 .include("imovel.quadra")
                                 .include("imovel.quadra.bairro")
                                 .addAscending("agente")
                                 .find().then(visitas => {
                                     return {
                                         data_inicio: data,
                                         data_fim: data2,
                                         ciclo: ciclo,
                                         agente: agente,
                                         totais: this.gerarTotais(visitas),
                                     }
                                 })
        })
    }

    private docDefinition(content) {
        return {
            pageSize: "A4",
            pageOrientation: "landscape",
            pageMargins: [40, 40, 40, 40],
            content: content
        }
    }

    private gerarTotais(visitas) {
        let totais = {
            residencia: 0, comercio: 0, terreno: 0, outros: 0,
            ponto_estrategico: 0, inspecionados: 0, tratados: 0,
            amostra: 0, recuperado: 0, visita: 0, tubitos: 0,
            pendencia_recusado: 0, pendencia_fecheado: 0,
            depositos_tratados: 0, depositos_eliminados: 0,
            caixa_agua_elevada: 0, caixa_agua_baixa: 0,
            pequenos_depositos_moveis: 0, depositos_fixos: 0,
            pneus: 0, lixo: 0, depositos_naturais: 0,
            qtd_larvicida: 0, larvicidas: []
        }
        let imovel_tipo = ["residencia", "comercio", "terreno", "outros"]

        visitas.forEach(it => {
            // tipo do imovel
            totais[imovel_tipo[it.imovel.tipo]]++
            // ponto estrategico
            if(it.imovel.ponto_estrategico) totais.ponto_estrategico++
            // pendencias
            if(it.pendencia == 1) totais.pendencia_fecheado++
            if(it.pendencia == 2) totais.pendencia_recusado++
            if(it.tipo == 1) totais.recuperado++
            // imoveis inspecionados
            if(it.imovel_inspecionado) totais.inspecionados++
            // imoveis tratados
            if(it.imovel_tratado) totais.tratados++
            // depositos tratados
            it.depositos_tratados = it.depositos_tratados + totais.depositos_tratados
            // depositos eliminados
            it.depositos_eliminados = it.depositos_eliminados + totais.depositos_eliminados
            // depositos por tipo
            ["caixa_agua_elevada", "caixa_agua_baixa", "pequenos_depositos_moveis",
            "depositos_fixos", "pneus", "lixo", "depositos_naturais"].forEach(d => {
                totais[d] = it[d] + totais[d]
            })
            // amostras
            let total_amostra = it.amostra_final - it.amostra_inicial
            totais.amostra = total_amostra + totais.amostra
            // tubitos
            totais.tubitos = it.tubitos + totais.tubitos
            // larvicida
            totais.qtd_larvicida = it.quantidade_larvicida + totais.qtd_larvicida
            if(it.larvicida && !(it.larvicida in totais.larvicidas)) {
                totais.larvicidas.push(it.larvicida)
            }
            // visitas
            totais.visita++
        })
        return totais
    }

    private paginaAgente(dados) {
        return [
            { text: "Dados do Agente", style: "header" },
            this.tabelaDadosAgente(dados.ciclo, dados.agente,
                                   dados.data_inicio, dados.data_fim)
            { text: "Número de móveis trabalhados por tipo", style: "header" },
            this.tabelaImoveisPorTipo(dados.totais),
            {
                columns: [
                    [
                        { text: "Número de móveis", style: "header" },
                        this.tabelaNumeroImoveis(dados.totais),
                    ], [
                        { text: "Pendências", style: "header" },
                        this.tabelaPendencias(dados.totais),
                    ]
                ]
            },
            { text: "Informações de Tratamento com Larvicida", style: "header"},
            this.tabelaLarivicida(dados.totais),
            { text: "Números de depósitos inspecionados por tipo", style: "header"},
            this.tabelaDepositos(dados.totais)
        ]
    }

    private tabelaDadosAgente(ciclo, agente, data1, data2) {
        return {
            table: {
                widths: [ "*", "*", "*", "*", "*", "*" ],
                body: [
                    ["Agente", "Ciclo", "Data inicial", "Data Final", "Bairro", "Atividade"],
                    [
                        agente.nome,
                        ciclo.toString(),
                        this.$filter('date')(data1, 'dd/MM/yyyy'),
                        this.$filter('date')(data2, 'dd/MM/yyyy'),
                        "",
                        ciclo.atividade_label]
                ]
            }
        }
    }

    private tabelaImoveisPorTipo(totais) {
        return {
            table: {
                widths: [ "*", "*", "*", "*", "*", "*", "*" ],
                body: [
                    [
                        "Quarteirões Concluidos", "Residência", "Comércio",
                        "Terreno", "Outros", "PE", "Total"
                    ], [
                        0,
                        totais.residencia,
                        totais.comercio,
                        totais.terreno,
                        totais.outros,
                        totais.ponto_estrategico,
                        totais.visita
                    ].map(i => String(i))
                ]
            }
        }
    }

    private tabelaNumeroImoveis(totais) {
        return {
            table: {
                widths: [ "*", "*", "*" ],
                body: [
                    [
                        "Tratados", "Inspecionados", "Amostras coletadas"
                    ], [
                        totais.tratados, totais.inspecionados, totais.amostra
                    ].map(i => String(i))
                ]
            }
        }
    }

    private tabelaPendencias(totais) {
        return {
            table: {
                widths: [ "*", "*", "*" ],
                body: [
                    [
                        "Recusado", "Fechado", "Recuperados"
                    ], [
                        totais.pendencia_recusado,
                        totais.pendencia_fecheado,
                        totais.recuperado
                    ].map(i => String(i))
                ]
            }
        }
    }

    private tabelaLarivicida(totais) {
        return {
            table: {
                widths: [ "*", "*", "*", "*" ],
                body: [
                    [
                        "Tipo", "Quantidade", "Depósitos Tratados", "Depósitos Eliminados"
                    ], [
                        totais.larvicidas.join(", "),
                        totais.qtd_larvicida,
                        totais.depositos_tratados,
                        totais.depositos_eliminados
                    ].map(i => String(i))
                ]
            }
        }
    }

    private tabelaDepositos(totais) {
        return {
            table: {
                widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
                body: [
                    [
                        "A1", "A2", "B", "C", "D1", "d2", "E", "Total"
                    ], [
                        totais.caixa_agua_elevada,
                        totais.caixa_agua_baixa,
                        totais.pequenos_depositos_moveis,
                        totais.depositos_fixos,
                        totais.pneus,
                        totais.lixo,
                        totais.depositos_naturais,
                        totais.depositos_tratados
                    ].map(i => String(i))
                ]
            }
        }
    }
}
