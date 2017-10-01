import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';
import { FormGroup, FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Switch from 'material-ui/Switch';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
    inputGroup: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    },
    help: {
        width: theme.spacing.unit * 1.5,
        height: theme.spacing.unit * 1.5,
        marginLeft: theme.spacing.unit * 0.5,
    }
});

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: props.form.reduce((prev, curr) => {
                return {
                    ...prev,
                    [curr.name]: false
                }
            }, {})
        }
        
        const defaultValues = props.value || {};
        props.onChange(props.form.reduce((prev, curr) => {
            return {
                ...prev,
                [curr.name]: defaultValues[curr.name] || this.getInitialValue(curr)
            }
        }, {}));

        this.getInitialValue = this.getInitialValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.generateInput = this.generateInput.bind(this);
    }

    getInitialValue(input) {
        switch(input.type) {
            case 'textfield':
                return '';
            case 'checkboxlist':
                return input.checkboxlist.checkboxes.reduce((prev, curr) => ({ ...prev, [curr.name]: false }), {});
            case 'switch':
                return false;
            case 'radiogroup':
                return '';
            case 'select':
                return input.select.multiple ? [] : '';
            default:
                throw new Error('Invalid input type');
        }
    }

    handleChange(input, newValue) {
        if (input.validator && !input.validator(newValue)) {
            // Invalid input
            return;
        }

        this.props.onChange({
            ...this.props.value,
            [input.name]: newValue
        });
    }

    handleCheckboxChange(input, checkbox, newValue) {
        this.handleChange(input, {
            ...this.props.value[input.name],
            [checkbox.name]: newValue
        });
    }

    generateInput(input, value) {
        let options;
        switch(input.type) {
            case 'textfield':
                options = input.textfield || {};
                return (
                    <TextField
                        multiline={ options.rows && options.rows > 1 }
                        onChange={ (e) => this.handleChange(input, e.target.value) }
                        placeholder={ options.placeholder }
                        rows={ options.rows || 1 }
                        value={ value }
                    />
                );
            case 'checkboxlist':
                options = input.checkboxlist;
                return (
                    <FormGroup row>
                        {
                            options.checkboxes.map((checkbox, index) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={ value[checkbox.name] }
                                                onChange={ (e) => this.handleCheckboxChange(input, checkbox, e.target.checked) }
                                            />
                                        }
                                        label={ checkbox.label }
                                        key={ index }
                                    />
                                )
                            })
                        }
                    </FormGroup>
                );
            case 'switch':
                options = input.switch;
                return (
                    <Switch
                        checked={ value }
                        onChange={ (e) => this.handleChange(input, e.target.checked) }
                    />
                );
            case 'radiogroup':
                options = input.radiogroup;
                return (
                    <RadioGroup
                        row
                        value={ value }
                        onChange={ (e) => this.handleChange(input, e.target.value) }
                    >
                        {
                            options.options.map((radiobutton, index) => {
                                return (
                                    <FormControlLabel
                                        control={ <Radio /> }
                                        value={ radiobutton.name }
                                        label={ radiobutton.label }
                                        key={ index }
                                    />
                                )
                            })
                        }
                    </RadioGroup>
                );
            case 'select':
                options = input.select;
                return (
                    <Select
                        multiple={ options.multiple }
                        value={ value }
                        onChange={ (e) => this.handleChange(input, e.target.value) }
                    >
                        {
                            options.options.map((menuitem, index) => {
                                return (
                                    <MenuItem 
                                        value={ menuitem.name }
                                        key={ index }
                                    >
                                        { menuitem.label }
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                )
            default:
                throw new Error('Invalid input type');
        }
    }

    render() {  
        const classes = this.props.classes;
        return (
            <div>
                {
                    this.props.form.map((input, index) => {
                        return (
                            <div
                                className={ classes.inputGroup }
                                key={ index }
                            >
                                <FormControl>
                                    <FormLabel>
                                        { input.label }
                                        {
                                            input.helpText ? (
                                                <Tooltip title={ input.helpText } placement='right'>
                                                    <IconButton className={ classes.help }>
                                                        <HelpIcon className={ classes.help } />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : null
                                        }
                                    </FormLabel>
                                    { this.generateInput(input, this.props.value[input.name] || this.getInitialValue(input)) }
                                </FormControl>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

FormBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    onChange: PropTypes.func,
    form: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['textfield', 'checkboxlist', 'switch', 'radiogroup', 'select', 'selectmultiple']).isRequired,
        // Key of the returned value
        name: PropTypes.string.isRequired,
        // Label to be displayed
        label: PropTypes.string.isRequired,
        // Function that returns true if input is accepted, false if rejected
        validator: PropTypes.func,
        helpText: PropTypes.string,
        // Configure optional parmeters based on type
        textfield: PropTypes.shape({
            placeholder: PropTypes.string,
            rows: PropTypes.number
        }),
        checkboxlist: PropTypes.shape({
            checkboxes: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired
            })).isRequired
        }),
        radiogroup: PropTypes.shape({
            options: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired
            })).isRequired
        }),
        select: PropTypes.shape({
            options: PropTypes.arrayOf(PropTypes.shape({
                // Key returned
                name: PropTypes.string.isRequired,
                // Label text shown to user
                label: PropTypes.string.isRequired
            })).isRequired,
            // Whether multiple items can be selected
            // Returns Array<string> instead of string if true
            multiple: PropTypes.bool
        })
    })).isRequired
}

export default withStyles(styles)(FormBuilder);