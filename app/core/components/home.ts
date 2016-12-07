
class HomeCtrl {
    public static $inject = ["$state"]

    constructor($state) {
        $state.go("quadra.listar", {}, {location: 'replace'})
    }
}

export const home:ng.IComponentOptions = {
    controller: HomeCtrl
}
