class MenuCtrl {
    public target

    constructor(protected $mdSidenav, $attrs) {
        this.target = $attrs.target
    }

    sideNavToggle() {
        this.$mdSidenav(this.target).toggle()
    }
}

export const fwMenuButton:ng.IComponentOptions = {
    bindings: {"target": "<"},
    controller: MenuCtrl,
    controllerAs: "$ctrl",
    template: 
        `<md-button class="menu md-icon-button" hide-gt-sm ng-click="$ctrl.sideNavToggle()" aria-label="Mostrar menu">
            <md-icon md-font-icon="material-icons">menu</md-icon>
        </md-button>`
}
