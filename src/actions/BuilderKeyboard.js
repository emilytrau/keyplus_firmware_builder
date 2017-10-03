export function zoomIn() {
    return {
        type: 'ZOOM_KEYBOARD_IN'
    }
}

export function zoomOut() {
    return {
        type: 'ZOOM_KEYBOARD_OUT'
    }
}

export function zoomReset() {
    return {
        type: 'ZOOM_KEYBOARD_RESET'
    }
}

export function selectKey(index) {
    return {
        type: 'SELECT_KEYBOARD_KEY',
        index
    }
}

export function selectLayer(layer) {
    return {
        type: 'SELECT_KEYBOARD_LAYER',
        layer
    }
}

export function selectMatrixView(view) {
    return {
        type: 'SELECT_KEYBOARD_MATRIXVIEW',
        view
    }
}

export function flip() {
    return {
        type: 'FLIP_KEYBOARD'
    }
}