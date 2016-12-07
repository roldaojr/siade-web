class BackButtonCtrl {
    back() {
        return history.back()
    }
}

export const fwBackButton:ng.IComponentOptions = {
    controller: BackButtonCtrl,
    controllerAs: "$ctrl",
    template: 
        `<md-button class="menu md-icon-button" ng-click="$ctrl.back()" aria-label="Voltar">
            <md-icon md-font-icon="material-icons">keyboard_arrow_left</md-icon>
        </md-button>`
}
