import App from './App.js';
import BuilderMain from './BuilderMain.js';

function reducer(state = {}, action) {
    console.log(action);
    return {
        app: App(state.app, action),
        main: BuilderMain(state.main, action)
    }
}

export default reducer;