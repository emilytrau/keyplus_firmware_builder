import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import BuilderAppBar from './ui/BuilderAppBar.js';
import BuilderMain from './ui/BuilderMain.js';

import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue
    }
});

const styles = theme => ({
    app: {
        display: 'flex',
        'flex-flow': 'column',
        width: '100%',
        height: '100vh'
    }
});

class App extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <MuiThemeProvider theme={ theme }>
                <div className={ classes.app }>
                    <BuilderAppBar />
                    <BuilderMain />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);