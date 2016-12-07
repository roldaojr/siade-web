import {loadAppModule} from "./application"
import * as components from "./components";
import * as configs from "./configs";

const appModule = {
    components: components,
    configBlocks: Object.values(configs)
}

loadAppModule(appModule)
