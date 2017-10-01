import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    key: {
        '& > div': {
            position: 'absolute',
            background: 'black',
            'box-shadow': 'inset 0 0 0 3px white'
        },
        '& > div > div': {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        '& > div > div > div': {
            position: 'absolute',
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
            background: 'white',
            'z-index': 1
        },
        '&:hover > div > div > div': {
            background: 'lightgrey'
        }
    },
    selected: {
        '& > div': {
            background: 'red'
        }
    }
});

class BuilderKeyboard extends React.Component {
    render() {
        const { classes, keyboard, selectedKeyIndex, zoom, onKeyClick } = this.props;
        const [ maxWidth, maxHeight ] = keyboard.layout.reduce((prev, curr) => {
            return [
                Math.max(prev[0], curr.x + curr.width, curr.x + curr.x2 + curr.w2),
                Math.max(prev[1], curr.y + curr.height, curr.y + curr.y2 + curr.h2)
            ];
        }, [0, 0]);

        return (
            <div style={{
                position: 'relative',
                width: maxWidth * zoom,
                height: maxHeight * zoom
            }}>
                {
                    keyboard.layout.map((key, index) => {
                        const selected = selectedKeyIndex === index;
                        const onClick = () => onKeyClick(index);
                        const { x, y, width, height, x2, y2, w2, h2 } = key;

                        return (
                            <div
                                className={ classes.key + (selected ? ' ' + classes.selected : '') }
                                onClick={ onClick }
                                key={ index }
                            >
                                <div
                                    style={{
                                        left: x * zoom,
                                        top: y * zoom,
                                        width: width * zoom,
                                        height: height * zoom
                                    }}
                                >
                                    <div><div /></div>
                                </div>
                                <div
                                    style={{
                                        left: (x + x2) * zoom,
                                        top: (y + y2) * zoom,
                                        width: w2 * zoom,
                                        height: h2 * zoom
                                    }}
                                >
                                    <div><div /></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

BuilderKeyboard.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired,
    selectedKeyIndex: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    onKeyClick: PropTypes.func.isRequired
}

export default withStyles(styles)(BuilderKeyboard);