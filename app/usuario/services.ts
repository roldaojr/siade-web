import {GenericDao} from "../framework/services/dao"

export const UsuarioModel = ["Parse", Parse => {
    let Agente = Parse.User;
    Parse.defineAttributes(Agente, [
        "nome", "tipo"
    ])
    return Agente;
}];

export class UsuarioDao extends GenericDao {
    static $inject = ["Parse", "UsuarioModel"];
}
