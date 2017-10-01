import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectKey, zoomIn, zoomOut, zoomReset } from './../actions/BuilderKeyboard.js';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        'align-items': 'center',
        'flex-flow': 'column',
        width: '100%',
        padding: theme.spacing.unit,
        'box-sizing':'border-box'
    },
    keyboardDisplay: {
        display: 'flex',
        'flex-flow': 'column',
        'align-items': 'center',
        position: 'relative',
        width: '100%'
    },
    scrollContainer: {
        position: 'absolute',
        width: '100%',
        'max-width': 'fit-content',
        'overflow-x': 'auto'
    },
    zoomButtons: {
        display: 'flex',
        'justify-content': 'center'
    },
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

const mapStateToProps = (state, ownProps) => ({
    keyboard: state.app.kbcollection.keyboards[state.main.selectedKeyboard],
    selectedKeyIndex: state.keyboard.selectedKeyIndex,
    zoom: state.keyboard.zoom
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onKeyClick: (index) => {
        dispatch(selectKey(index));
    },
    onZoomIn: () => {
        dispatch(zoomIn());
    },
    onZoomOut: () => {
        dispatch(zoomOut());
    },
    onZoomReset: () => {
        dispatch(zoomReset());
    }
});

class BuilderKeyboard extends React.Component {
    render() {
        const { classes, keyboard, selectedKeyIndex, zoom, onKeyClick, onZoomIn, onZoomOut, onZoomReset } = this.props;
        const [ maxWidth, maxHeight ] = keyboard.layout.reduce((prev, curr) => {
            return [
                Math.max(prev[0], curr.x + curr.width, curr.x + curr.x2 + curr.w2),
                Math.max(prev[1], curr.y + curr.height, curr.y + curr.y2 + curr.h2)
            ];
        }, [0, 0]);
        const keyboardDisplayWidth = maxWidth * zoom;
        const keyboardDisplayHeight = maxHeight * zoom;

        return (
            <div className={ classes.root }>
                <div className={ classes.zoomButtons }>
                    <IconButton onClick={ onZoomIn }>
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton onClick={ onZoomOut }>
                        <ZoomOutIcon />
                    </IconButton>
                    <Button onClick={ onZoomReset }>
                        Reset
                    </Button>
                </div>
                <div
                    style={{ height:keyboardDisplayHeight + 20 }}
                    className={ classes.keyboardDisplay }
                >
                    <div className={ classes.scrollContainer }>
                        <div style={{
                            position: 'relative',
                            width: keyboardDisplayWidth,
                            height: keyboardDisplayHeight
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
                                            { /* Outline div */ }
                                            <div
                                                style={{
                                                    left: x * zoom,
                                                    top: y * zoom,
                                                    width: width * zoom,
                                                    height: height * zoom
                                                }}
                                            >
                                                { /* Sets position to relative */}
                                                <div>
                                                    { /* Inner fill - absolute positioned to leave border */ }
                                                    <div />
                                                </div>
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
                    </div>
                </div>
            </div>
        );
    }
}

BuilderKeyboard.propTypes = {
    classes: PropTypes.object.isRequired,
    keyboard: PropTypes.object.isRequired,
    selectedKeyIndex: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    onKeyClick: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BuilderKeyboard));