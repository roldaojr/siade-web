/// <reference path="../../typings/index.d.ts" />

// Import our Angular dependencies
import * as angular from "angular"
import "angular-animate"
import "angular-aria"
import "angular-material"
import "angular-messages"
import "angular-sanitize"
import "angular-parse"
import "angular-ui-router"
import "angular-material-sidemenu"
import "angular-busy2"

// create angular module "app" and export
export const Application = angular.module("app", [
    "ui.router", "ngMaterial", "ngParse", "ngMaterialSidemenu", "angular-busy"
])

const BLANK_MODULE = {
    states: [],
    components: {},
    directives: {},
    services: {},
    filters: {},
    configBlocks: [],
    runBlocks: []
}

/**
 * Register each app module"s states, directives, components, filters, services,
 * and config/run blocks with the `ngmodule`
 *
 * @param appModule the feature module consisting of components, states, services, etc
 */
export function loadAppModule(appModule) {
    let module = Object.assign({}, BLANK_MODULE, appModule)

    Application.config(["$stateProvider", $stateProvider => module.states.forEach(state => {
        $stateProvider.state(state)
    })])

    Object.keys(module.components).forEach(name => {
        Application.component(name, module.components[name])
    })

    Object.keys(module.directives).forEach(name => {
        Application.directive(name, module.directives[name])
    })

    Object.keys(module.services).forEach(name => {
        Application.service(name, module.services[name])
    })

    Object.keys(module.filters).forEach(name => Application.filter(name, module.filters[name]))

    module.configBlocks.forEach(configBlock => Application.config(configBlock))

    module.runBlocks.forEach(runBlock => Application.run(runBlock))

    return Application
}
