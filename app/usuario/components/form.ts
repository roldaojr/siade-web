
class UsuarioFormCtrl {
    static $inject = ["$mdDialog"]
    public usuario
    public form
    public promise

    constructor(protected $mdDialog) {
    }

    salvar() {
        if(this.form.$invalid) return
        this.usuario.password = ""
        this.promise = this.usuario.save().then(r => {
            history.back()
        })
    }

    excluirUsuario(ev, usuario) {
        let confirm = this.$mdDialog.confirm()
            .title("Excluir usuário")
            .textContent("Deseja realmente o usuário "+usuario.nome+
                         "? Esta ação não pode ser desfeita.")
            .targetEvent(ev)
            .ok("Excluir usuário")
            .cancel('Cancelar')
        this.$mdDialog.show(confirm).then(() => {
            history.back()
            console.log('excluir usuario', usuario.nome)
        })
    }
}

export const cpUsuarioForm:ng.IComponentOptions = {
    bindings: {"usuario": "<"},
    controller: UsuarioFormCtrl,
    controllerAs: "$ctrl",
    templateUrl: "usuario/components/form.tpl.html"
}
