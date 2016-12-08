import {GenericDao} from "../framework/services/dao"

export const UsuarioModel = ["Parse", Parse => {
    let Agente = Parse.User;
    Agente.Tipos = {
        AGENTE_DE_CAMPO: 0,
        SUPERVISOR: 1,
        0: "Agente de campo",
        1: "Supervisor"
    }
    Parse.defineAttributes(Agente, [
        "nome", "tipo"
    ])
    return Agente;
}];

export class UsuarioDao extends GenericDao {
    static $inject = ["Parse", "UsuarioModel"];
}
