import App from './App.js';
import BuilderMain from './BuilderMain.js';
import BuilderKeyboard from './BuilderKeyboard.js';

function reducer(state = {}, action) {
    console.log(action);
    return {
        app: App(state.app, action),
        main: BuilderMain(state.main, action),
        keyboard: BuilderKeyboard(state.keyboard, action)
    }
}

export default reducer;