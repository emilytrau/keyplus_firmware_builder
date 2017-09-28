import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BuilderAppBar from './components/BuilderAppBar.js';

import 'typeface-roboto';

const styles = theme => ({
    app: {
        width: '100%',
        height: '100vh'
    }
});

class App extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.app }>
                <BuilderAppBar />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);