
export class GenericDao {

    constructor(protected _parse, protected _model) {
    }
    
    protected getQuery() {
        return new this._parse.Query(this._model)
    }

    public buscarTodos() {
        return this.getQuery().find()
    }

    public buscarPeloId(id:string) {
        return this.getQuery().get(id)
    }

    public salvar(obj:any) {
        return obj.save()
    }

    public excluir(obj:any) {
        return obj.delete()
    }
}
