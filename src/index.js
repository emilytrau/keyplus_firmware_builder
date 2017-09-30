import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import './index.css';
import App from './App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue
    }
});

const store = createStore(reducer);

ReactDOM.render(
    <MuiThemeProvider theme={ theme }>
        <Provider store={ store }>
            <App />
        </Provider>
    </MuiThemeProvider>, document.getElementById('root')
);
registerServiceWorker();
