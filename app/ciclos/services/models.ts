/// <reference path="../../../typings/index.d.ts" />

export const CicloModel = ["Parse", Parse => {
    class Ciclo extends Parse.Object {
        static Atividades = {
            LEVANTAMENTO_DE_INDICE: 1,
            TRATAMENTO: 2,
            LEVANTAMENTO_DE_INDICE_MAIS_TRATAMENTO: 3,
            1: "Lev. de índice",
            2: "Tratamento",
            3: "Lev. de índice + Tratamento"
        }

        public ano_base
        public numero
        public atividade

        constructor() {
            super("Ciclo")
        }

        toString():string {
            return this.numero+"/"+this.ano_base
        }

        get atividade_label():string {
            return Ciclo.Atividades[this.atividade]
        }
    }
    Parse.defineAttributes(Ciclo, [
        "numero", "ano_base", "atividade", "data_inicio", "data_fim", "fechado_em"
    ])
    Parse.Object.registerSubclass("Ciclo", Ciclo)
    return Ciclo
}]

export const VisitaModel = ["Parse", Parse => {
    let subClass = Parse.Object.extend("Visita")
    Parse.defineAttributes(subClass, [
        "imovel_tratado", "imovel_inspecionado",
        "depositos_tratados", "depositos_eliminados",
        "larvicida", "quantidade_larvicida",
        "caixa_agua_elevada", "caixa_agua_baixa",
        "pequenos_depositos_moveis", "depositos_fixos",
        "pneus", "lixo", "depositos_naturais",
        "amostra_inicial", "amostra_final", "tubitos",
        "data_hora", "ciclo", "agente", "imovel",
        "tipo_visita", "pendencia", "validada"
    ])
    return subClass
}]

export const TrabalhoModel = ["Parse", "QuadraModel", (Parse, QuadraModel) => {
    class Trabalho extends Parse.Object {
        private _quadras
        constructor() {
            super("Trabalho")
        }
        get quadras() {
            if(!this._quadras) {
                this._quadras = this.relation("quadras")
            }
            return this._quadras
        }
    }
    Parse.defineAttributes(Trabalho, [
        "agente", "ciclo", "total_imoveis", "total_visitas"
    ])
    Parse.Object.registerSubclass("Trabalho", Trabalho)
    return Trabalho
}]
