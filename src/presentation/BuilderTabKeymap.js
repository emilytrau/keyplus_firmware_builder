import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BuilderTab from './BuilderTab';
import BuilderKeyboard from './BuilderKeyboard';

const styles = theme => ({
    keyboardDisplay: {
        padding: theme.spacing.unit,
        display: 'flex',
        'justify-content': 'center'
    }
});

class BuilderTabKeymap extends React.Component {
    render() {
        const { classes, keyboard } = this.props;

        return (
            <BuilderTab>
                <div className={ classes.keyboardDisplay }>
                    <BuilderKeyboard
                        keyboard={ keyboard }
                        selectedKeyIndex={ Math.floor(Math.random() * 50) }
                        zoom={ 50 }
                        onKeyClick={ console.log }
                    />
                </div>
            </BuilderTab>
        );
    }
}

BuilderTabKeymap.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderTabKeymap);