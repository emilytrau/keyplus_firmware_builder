import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Section from './Section.js';
import FormBuilder from './FormBuilder.js';
import KBCollection from './../utils/KBCollection.js';

const styles = theme => ({
    updateButton: {
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class BuilderTabCollectionSettings extends React.Component {
    constructor(props) {
        super(props);

        const kbcollection = props.kbcollection;

        this.state = {
            value: {
                name: kbcollection.name
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(newValue) {
        this.setState({ value: newValue });
    }

    handleUpdate() {
        this.props.onUpdateKBCollection(new KBCollection({
            ...this.props.kbcollection,
            name: this.state.value.name || 'Untitled collection'
        }));
    }

    render() {
        return (
            <Section>
                <FormBuilder value={ this.state.value } onChange={ this.handleChange } form={[
                    {
                        type: 'textfield',
                        name: 'name',
                        label: 'Name',
                        textfield: {
                            placeholder: 'Untitled collection'
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