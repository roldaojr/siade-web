import {loadAppModule} from "../framework/application"
import * as components from "./components"
import * as states from "./states"
import * as configs from "./configs"
import * as runs from "./runs"

const appModule = {
	components: components,
    states: Object.values(states),
    configBlocks: Object.values(configs),
    runBlocks: Object.values(runs)
}

loadAppModule(appModule)
