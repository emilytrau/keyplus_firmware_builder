import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import BuilderTab from './BuilderTab';
import FormBuilder from './FormBuilder';
import Keyboard from './../utils/Keyboard.js';

const styles = theme => ({
    updateButton: {
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class BuilderTabKBSettings extends React.Component {
    constructor(props) {
        super(props);

        const keyboard = props.keyboard;

        this.state = {
            value: {
                name: keyboard.name
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(newValue) {
        this.setState({ value: newValue });
    }

    handleUpdate() {
        this.props.onUpdateKeyboard(new Keyboard({
            ...this.props.keyboard,
            name: this.state.value.name || 'Untitled keyboard'
        }));
    }

    render() {
        return (
            <BuilderTab>
                <FormBuilder value={ this.state.value } onChange={ this.handleChange } form={[
                    {
                        type: 'textfield',
                        name: 'name',
                        label: 'Name',
                        textfield: {
                            placeholder: 'Untitled keyboard'
                        }
                    }
                ]} />
                <Button
                    raised
                    onClick={ this.handleUpdate }
                    className={ this.props.classes.updateButton }
                >
                    Update
                </Button>
            </BuilderTab>
        );
    }
}

BuilderTabKBSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired,
    onUpdateKeyboard: PropTypes.func.isRequired
}

export default withStyles(styles)(BuilderTabKBSettings);