import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Section from './Section.js';
import BuilderKeyboard from './../container/BuilderKeyboard.js';

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
            <Section>
                <div className={ classes.keyboardDisplay }>
                    <BuilderKeyboard />
                </div>
            </Section>
        );
    }
}

BuilderTabKeymap.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderTabKeymap);