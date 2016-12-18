import {loadAppModule} from "../framework/application"
import * as components from "./components"
import * as states from "./states"

const appModule = {
	components: components,
    states: Object.values(states)
};

loadAppModule(appModule);
