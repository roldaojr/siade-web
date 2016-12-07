import {loadAppModule} from "../framework/application"
import * as states from './states'

const appModule = {
    states: Object.values(states)
};

loadAppModule(appModule);
