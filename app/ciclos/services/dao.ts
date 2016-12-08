import {GenericDao} from "../../framework/services/dao"

export class CicloDao extends GenericDao {
    static $inject = ["Parse", "CicloModel"]

    public buscarTodos() {
        return this.getQuery().descending("ano_base").descending("numero").find()
    }

    public buscarAtual() {
        return this.getQuery().descending("ano_base").descending("numero").first()
    }

    public iniciarCiclo(ciclo) {
        this.buscarAtual().then(atual => {
            if(atual && atual.ano_base == ciclo.ano_base) {
                ciclo.numero = atual.numero + 1
            } else {
                ciclo.numero = 1
            }
            return ciclo.save()
        })
    }
}

export class VisitaDao extends GenericDao {
    static $inject = ["Parse", "VisitaModel"]

    public buscarPeloCiclo(ciclo) {
        return this.getQuery().descending("ano_base").descending("numero")
                   .equalTo("ciclo", ciclo).find()
    }
    public buscarPeloAgente(agente) {
        return this.getQuery().descending("ano_base").descending("numero")
                   .equalTo("agente", agente).find()
    }
    public buscarPeloImovel(imovel) {
        return this.getQuery().descending("ano_base").descending("numero")
                   .equalTo("imovel", imovel).find()
    }
}

export class TrabalhoDao extends GenericDao {
    static $inject = ["Parse", "TrabalhoModel", "CicloDao"]

    constructor(Parse, protected TrabalhoModel, protected CicloDao) {
        super(Parse, TrabalhoModel)
    }

    public buscarPeloAgenteECiclo(agente, ciclo) {
        return this.getQuery().equalTo("agente", agente)
                   .equalTo("ciclo", ciclo).find().then(r => {
            if(r.length > 0) return r[0]
            let t = new this.TrabalhoModel()
            t.ciclo = ciclo
            t.agente = agente
            return t.save()
        })
    }

    public buscarPeloAgente(agente) {
        return this.CicloDao.buscarAtual().then(c => {
            return this.buscarPeloAgenteECiclo(agente, c)
        })
    }

    public buscarPeloCiclo(ciclo) {
        return this.getQuery().include("agente").equalTo("ciclo", ciclo).find()
    }
}
