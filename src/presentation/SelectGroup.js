import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'material-ui/FormGroup';
import { MenuItem } from 'material-ui/Menu';
import { find } from 'material-ui/utils/helpers';

class SelectGroup extends React.Component {
    constructor(props) {
        super(props);

        this.selects = [];

        this.focus = this.focus.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    focus() {
        if (!this.selects || !this.selects.length) {
            return;
        }

        const focusSelects = this.selects.filter(n => !n.disabled);

        if (!focusSelects.length) {
            return;
        }

        /*
        const selectedSelect = find(focusSelects, n => n.value);

        if (selectedSelect) {
            selectedSelect.focus();
            return;
        }
        */

        focusSelects[0].focus();
    }

    handleSelectChange(event, value) {

    }

    render() {
        const { children, name, value, onChange, options, ...other } = this.props;

        this.selects = [];

        const selectedOptions = [].concat(...Object.values(value));
        const unselectedOptions = Object.keys(options)
            .filter(n => selectedOptions.indexOf(n) === -1)
            .map((option, index) => {
                
            })

        return (
            <FormGroup { ...other }>
                {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) {
                        return null;
                    }

                    return React.cloneElement(child, {
                        key: index,
                        inputRef: node => {
                            this.selects.push(node);
                        },
                        onChange: this.handleSelectChange
                    })
                })}
            </FormGroup>
        );
    }
}

SelectGroup.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    // Object with [name]: ('value' || value[]) pairs
    value: PropTypes.string,
    // Object with [value]: 'label' pairs
    options: PropTypes.object
}

export default SelectGroup;