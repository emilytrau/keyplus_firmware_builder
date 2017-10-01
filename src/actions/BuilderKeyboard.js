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