import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import BuilderLayoutGroupSelector from './BuilderLayoutGroupSelector.js';
import Section from './Section.js';
import FormBuilder from './FormBuilder.js';
import KBCollection from './../utils/KBCollection.js';

const styles = theme => ({
    updateButton: {
        //marginLeft: theme.spacing.unit,
        //marginBottom: theme.spacing.unit
    },
    section: {
        padding: theme.spacing.unit
    }
});

class BuilderTabCollectionSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layoutGroups: props.kbcollection.firmwareSettings.layoutGroups
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleLayoutGroupChange = this.handleLayoutGroupChange.bind(this);
    }

    handleUpdate() {
        const { onUpdateKBCollection, kbcollection } = this.props;
        onUpdateKBCollection(new KBCollection({
            ...kbcollection,
            name: this.nameField.value || 'Untitled collection',
            firmwareSettings: {
                ...kbcollection.firmwareSettings,
                layoutGroups: this.state.layoutGroups
            }
        }));
    }

    handleLayoutGroupChange(newValue) {
        this.setState({ layoutGroups: newValue });
    }

    render() {
        const { classes, kbcollection } = this.props;
        return (
            <Section className={ classes.section }>
                <TextField
                    label='Name'
                    placeholder='Untitled collection'
                    defaultValue={ kbcollection.name }
                    inputRef={ (r) => this.nameField = r }
                />
                <Divider />
                <BuilderLayoutGroupSelector
                    keyboards={ kbcollection.keyboards }
                    onChange={ this.handleLayoutGroupChange }
                    value={ this.state.layoutGroups }
                />
                <Divider />
                <Button
                    raised
                    onClick={ this.handleUpdate }
                    className={ classes.updateButton }
                >
                    Update
                </Button>
            </Section>
        );
    }
}

BuilderTabCollectionSettings.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    kbcollection: PropTypes.object.isRequired,
    onUpdateKBCollection: PropTypes.func.isRequired
}

export default withStyles(styles)(BuilderTabCollectionSettings);