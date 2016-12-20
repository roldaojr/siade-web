import {loadAppModule} from "../framework/application"
import * as components from "./components"
import * as services from "./services"
import * as states from "./states"

const appModule = {
	components: components,
	services: services,
    states: Object.values(states)
};

loadAppModule(appModule);
