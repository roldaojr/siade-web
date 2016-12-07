import {GenericDao} from "../../framework/services/dao"

export class BairroDao extends GenericDao {
    static $inject = ['Parse', 'BairroModel']

    public buscarTodos() {
        return this.getQuery().find()
    }

    public buscarPeloId(id:string) {
        return this.getQuery().get(id)
    }

    public buscarPrimeiro() {
        return this.getQuery().first()
    }
}

export class LogradouroDao extends GenericDao {
    static $inject = ["Parse", "LogradouroModel"]

    public buscarTodos() {
        return this.getQuery().find()
    }

    public buscarPeloId(id:string) {
        return this.getQuery().get(id)
    }

    public buscarPorNome(nome:string) {
        return this.getQuery().startsWith("nome", nome).find()
    }
}

export class QuadraDao extends GenericDao {
    static $inject = ["Parse", "QuadraModel"]

    public buscarPeloId(id:string) {
        return this.getQuery().get(id)
    }

    public buscarPeloBairro(bairro) {
        return this.getQuery().ascending("numero")
                   .equalTo("bairro", bairro).find()
    }
}

export class LadoDao extends GenericDao {
    static $inject = ["Parse", "LadoModel"]

    public buscarPelaQuadra(quadra) {
        return this.getQuery().include("logradouro").ascending("numero")
                   .equalTo("quadra", quadra).find()
    }

    public primeiroLadoDaQuadra(quadra) {
        return this.getQuery().ascending("numero")
                   .equalTo("quadra", quadra).first()
    }

    public salvarTodos(lados) {
        return this._parse.Object.saveAll(lados)
    }
}

export class ImovelDao extends GenericDao {
    static $inject = ["Parse", "ImovelModel"];

    public buscarPeloLado(lado) {
        return this.getQuery().ascending("ordem")
                   .equalTo("lado", lado).find()
    }
}
