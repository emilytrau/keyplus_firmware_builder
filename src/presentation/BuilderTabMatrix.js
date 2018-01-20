import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Section from './Section.js';
import BuilderKeyboard from './../container/BuilderKeyboard.js';
import Key from './../utils/Key.js';

const styles = theme => ({
    matrixControls: {
        display: 'flex',
        'justify-content': 'center',
        '& > span > *': {
            margin: theme.spacing.unit
        }
    }
});

class BuilderTabMatrix extends React.Component {
    render() {
        const { classes, keyboard, selectedKeyIndex, onUpdateKey } = this.props;
        const key = keyboard.layout[selectedKeyIndex];

        return (
            <div>
                <Section>
                    <BuilderKeyboard matrix />
                </Section>
                <Section>
                    <div className={ classes.matrixControls }>
                        <span>
                            <TextField
                                label='Row'
                                type='number'
                                disabled={ selectedKeyIndex === -1 }
                                value={ selectedKeyIndex === -1 ? '0' : key.row }
                                onChange={ (e) => {
                                    onUpdateKey(selectedKeyIndex, new Key({
                                        ...key,
                                        row: Math.max(parseInt(e.target.value, 10), 0)
                                    }))
                                }}
                            />
                            <TextField
                                label='Column'
                                type='number'
                                disabled={ selectedKeyIndex === -1 }
                                value={ selectedKeyIndex === -1 ? '0' : key.column }
                                onChange={ (e) => {
                                    onUpdateKey(selectedKeyIndex, new Key({
                                        ...key,
                                        column: Math.max(parseInt(e.target.value, 10), 0)
                                    }))
                                }}
                            />
                        </span>
                    </div>
                </Section>
            </div>
        );
    }
}

BuilderTabMatrix.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired,
    selectedKeyIndex: PropTypes.number.isRequired,
    onUpdateKey: PropTypes.func.isRequired
}

export default withStyles(styles)(BuilderTabMatrix);