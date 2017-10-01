import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Section from './Section.js';
import BuilderKeyboard from './../container/BuilderKeyboard.js';

const styles = theme => ({

});

class BuilderTabMatrix extends React.Component {
    render() {
        const { classes, keyboard } = this.props;

        return (
            <Section>
                <BuilderKeyboard />
            </Section>
        );
    }
}

BuilderTabMatrix.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderTabMatrix);