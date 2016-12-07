import {loadAppModule} from "../framework/application"
import * as components from "./components"
import * as states from "./states"
import * as services from "./services"

const appModule = {
    components: components,
    services: services,
    states: Object.values(states)
}

loadAppModule(appModule)
